<template>
  <div>
    <div class="se-gw-title"><img src="/static/image/share-index2/se-title-three.png"/></div>
    <div class="se-gw-content">
      <div class="se-gw-rcontent">
        <div class="gw-left">
          <div class="circle-model-one">
            <div id="gearwheelOne" class="gearwheel"></div>
          </div>
        </div>
        <div class="gw-middle">
          <div class="circle-model-two">
            <div id="gearwheelTwo" class="gearwheel"></div>
          </div>
        </div>
        <div class="gw-right">
          <div class="circle-model-three">
            <div id="gearwheelThree" class="gearwheel"></div>
          </div>
        </div>
        <div class="font font-one"><span>部门</span></div>
        <div class="font font-two"><span>基础</span></div>
        <div class="font font-three"><span>主题</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';

  export default {
    name: 'applications-process',
    data: function () {
      return {
        pieData: {}
      };
    },
    methods: {
      pieOneInit () {
        var _this = this;
        var pieOne = echarts.init(document.getElementById('gearwheelOne'), null, {renderer: 'svg'});
        var pieTwo = echarts.init(document.getElementById('gearwheelTwo'), null, {renderer: 'svg'});
        var pieThree = echarts.init(document.getElementById('gearwheelThree'), null, {renderer: 'svg'});
  
        // todo 获取svg text内容 动态添加子元素动画元素 animateTransform
        var textAnimate = function () {
          var texts = document.getElementsByTagName('text');

          for (var i = 0; i < texts.length; i++) {
            var at = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
            var bbox = texts[i].getBBox();

            at.setAttributeNS(null, 'attributeName', 'transform');
            at.setAttributeNS(null, 'type', 'rotate');
            at.setAttributeNS(null, 'begin', '0s');
            at.setAttributeNS(null, 'dur', '30s');
            // 获取text元素位置定义旋转原点
            at.setAttributeNS(null, 'from', '0 ' + (Number(bbox.x) + Number(bbox.width / 2)) + ' ' + (Number(bbox.y) + Number(bbox.height / 2)));
            at.setAttributeNS(null, 'to', '-360 ' + (Number(bbox.x) + Number(bbox.width / 2)) + ' ' + (Number(bbox.y) + Number(bbox.height / 2)));
            at.setAttributeNS(null, 'repeatCount', 'indefinite');
            // todo 左边和右边轮子反向旋转 中间轮子正向旋转
            if (texts[i].parentNode.parentNode.parentNode.getAttribute('id') === 'gearwheelTwo') {
              at.setAttributeNS(null, 'dur', '15s');
              at.setAttributeNS(null, 'to', '360 ' + (Number(bbox.x) + Number(bbox.width / 2)) + ' ' + (Number(bbox.y) + Number(bbox.height / 2)));
            }
            texts[i].appendChild(at);
          }
        };
        var options = {
          tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          animation: false,
          legend: {
            show: false,
            orient: 'vertical',
            x: 'left'
          },
          series: [
            {
              name: '',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '100%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: []
            },
            {
              name: '',
              type: 'pie',
              radius: ['40%', '79%'],
              label: {
                normal: {
                  position: 'inner'
                }
              },
              data: []
            }
          ],
          color: ['rgb(0,100,145)', 'rgb(0,37,92)', 'rgb(44,178,219)']
        };
        var clone = function (obj) {
          var o;

          if (typeof obj === 'object') {
            if (obj === null) {
              o = null;
            } else {
              if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                  o.push(clone(obj[i]));
                }
              } else {
                o = {};
                for (var j in obj) {
                  o[j] = clone(obj[j]);
                }
              }
            }
          } else {
            o = obj;
          }
          return o;
        };
        var options1 = clone(options), options2 = clone(options), options3 = clone(options);

        options1.series[1].data = _this._convertPieData(this.pieData.department);
        options2.series[1].data = _this._convertPieData(this.pieData.foundations);
        options3.series[1].data = _this._convertPieData(this.pieData.themes);
        pieOne.setOption(options1);
        pieTwo.setOption(options2);
        pieThree.setOption(options3);
        textAnimate();
      },
      pieDateGet () {
        var _this = this;

        this.$http.post(globals.serverUrl + '/shareIndex/shareAnalyze/cataTop').then(res => {
          _this.pieData = res.data.data;
          _this.pieOneInit();
        }).catch(res => {
          _this.$notify({
            type: 'warning',
            message: '数据获取失败',
            offset: 120
          });
        });
      },
      _convertPieData (arr) {
        return arr && arr.length > 0 ? arr.map(item => {
          return {value: 100, name: item.name};
        }) : [];
      }

    },
    mounted: function () {
      this.pieDateGet();
    }
  };
</script>
<style scoped lang="stylus">
  .se-gw-content {
    width: 966px;
    margin: 0px 10% 0px 20%;
    height: 580px;
    background: url('/static/image/share-index2/se-bg-gearwheel.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .se-gw-rcontent {
    position: relative;
    width: 100%;
    height: 100%;

    .gearwheel {
      width: 100%;
      height: 100%;
    }

    .gw-left {
      width: 430px;
      height: 430px;
      position: absolute;
      left: 3%;
      bottom: 125px;
    }

    .circle-model-one {
      background: url('/static/image/share-index2/se-gearwheel-one.png');
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      animation: circleOne 30s linear infinite normal;
    }

    .gw-middle {
      width: 190px;
      height: 190px;
      position: absolute;
      left: 42.5%;
      bottom: 364px;
    }

    .circle-model-two {
      background: url('/static/image/share-index2/se-gearwheel-two.png');
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      animation: circleTwo 15s linear infinite normal;
    }

    .gw-right {
      width: 390px;
      height: 390px;
      position: absolute;
      right: 13%;
      bottom: 26px;
    }

    .circle-model-three {
      background: url('/static/image/share-index2/se-gearwheel-three.png');
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      animation: circleThree 30s linear infinite normal;
    }
  }

  .font {
    height: 40px;
    width: 100px;
    text-align: center;
    font-size: 25px;
    color: rgb(255, 255, 255);
  }

  .font-one {
    position: absolute;
    left: 190px;
    top: 226px;
  }

  .font-two {
    position: absolute;
    left: 455px;
    top: 107px;
  }

  .font-three {
    position: absolute;
    left: 595px;
    top: 341px;
  }

  // .gearwheel svg text {
  // animation circleReverse 6s linear infinite normal;
  // -webkit-animation circleReverse 6s linear infinite normal;
  // }
  @keyframes circleOne {
    0% {
      -webkit-transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(180deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes circleTwo {
    0% {
      -webkit-transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(-180deg);
    }

    100% {
      -webkit-transform: rotate(-360deg);
    }
  }

  @keyframes circleThree {
    0% {
      -webkit-transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(180deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
