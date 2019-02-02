<!--
     /**
      * 粒子特效背景（会变幻的线）
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/9/17
      * @example 调用示例
      *  <animate-line></animate-line>
      */
       -->
<template>
  <div ref="lineContent" class="animateLine">
    <canvas ref="lineCanvas" id="lineCanvas"></canvas>
  </div>
</template>

<script>
  function Circle(pos, rad, color, ctx) {
    var _this = this;
    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
      ctx.fill();
    };
  }

  export default {
    name: 'animate-line',
    props: {
      containerClass: {
        type: String,
        default() {
          return 'app';
        }
      },
      headerHeight: {
        type: Number,
        default() {
          return 120;
        }
      }
    },
    data() {
      return {
        ctx: null,
        animateHeader: true,
        points: [],
        target: {x: 0, y: 0},
        width: null,
        height: null,
        container: null
      };
    },
    created() {
    },
    mounted() {
      this.container = document.getElementsByClassName(this.containerClass)[0];
      this.initBanner();
      this.initAnimation();
      this.addListeners();
    },
    beforeDestroy() {
      //组件销毁前停止动画并清理内存，防止动画一直运行，影响性能
      this.animateHeader = false;
      this.points = null;
      this.ctx = null;
      this.container = null;
      
    },
    methods: {
      initBanner() {
        this.width = this.$refs.lineContent.clientWidth;
        this.height = this.$refs.lineContent.clientHeight;
        this.target = {x: this.width / 2, y: this.height / 2};

        this.$refs.lineCanvas.width = this.width;
        this.$refs.lineCanvas.height = this.height;
        this.ctx = this.$refs.lineCanvas.getContext('2d');

        // create points
        this.points = [];
        for (var x = 0; x < this.width; x = x + this.width / 20) {
          for (var y = 0; y < this.height; y = y + this.height / 20) {
            var px = x + Math.random() * this.width / 20;
            var py = y + Math.random() * this.height / 20;
            var p = {x: px, originX: px, y: py, originY: py};
            this.points.push(p);
          }
        }
        // for each point find the 5 closest points
        for (var i = 0; i < this.points.length; i++) {
          var closest = [];
          var p1 = this.points[i];
          for (var j = 0; j < this.points.length; j++) {
            var p2 = this.points[j];
            if (!(p1 == p2)) {
              var placed = false;
              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (closest[k] == undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }

              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in this.points) {
          var c = new Circle(this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)', this.ctx);
          this.points[i].circle = c;
        }
      },
      addListeners() {
        if (!('ontouchstart' in window)) {
          window.addEventListener('mousemove', this.mouseMove);
        }
        // window.addEventListener('scroll', this.scrollCheck);
        window.addEventListener('resize', this.resize);
      },
      mouseMove(e) {
        var posx = 0, posy = 0;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
          var scrollTop = this.container ? this.container.scrollTop : 0;
          posy = e.pageY + scrollTop - this.headerHeight;
        } else if (e.clientX || e.clientY) {
          posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        this.target.x = posx;
        this.target.y = posy;
      },
      resize() {
        if (!this.$refs.lineContent) {
          return;
        }
        this.width = this.$refs.lineContent.clientWidth;
        this.height = this.$refs.lineContent.clientHeight;
        /* largeHeader.style.height = height+'px'; */
        this.$refs.lineCanvas.width = this.width;
        this.$refs.lineCanvas.height = this.height;
        this.initBanner();
        this.initAnimation();
        this.addListeners();
      },
      initAnimation() {
        this.animate();
        for (var i in this.points) {
          this.shiftPoint(this.points[i]);
        }
      },
      animate() {
        if (this.animateHeader) {
          this.ctx.clearRect(0, 0, this.width, this.height);
          for (var i in this.points) {
            // detect points in range
            if (Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
              this.points[i].active = 0.3;
              this.points[i].circle.active = 0.6;
            } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
              this.points[i].active = 0.1;
              this.points[i].circle.active = 0.3;
            } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
              this.points[i].active = 0.02;
              this.points[i].circle.active = 0.1;
            } else {
              this.points[i].active = 0;
              this.points[i].circle.active = 0;
            }

            this.drawLines(this.points[i]);
            this.points[i].circle.draw();
          }

          requestAnimationFrame(this.animate);
        }

      },
      shiftPoint(p) {
        // 不负责动画，只负责生成动画路径的的补间路径
        var _this = this;
        TweenLite.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: Circ.easeInOut,
          onComplete: function () {
            if (_this.animateHeader) {
              _this.shiftPoint(p);
            }
          }
        });
      },
      // Canvas manipulatio
      drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
          this.ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
          this.ctx.stroke();
        }
      },

      // Util
      getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
    }
  };
</script>

<style scoped lang="stylus">
  .animateLine {
    width 100%
    height 100%
  }
</style>
