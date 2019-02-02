<!--
 /**
  *共享大屏1-中间动画
  * @desc 组件描述
  * @author wangyan 
  * @date 2018/8/2 10:51
  * @example 调用示例
  */
-->
<template>
  <div class="share1-center">
    <div class="center-title">
      <div class="fl">累计交换</div>
      <div class="cneter-title-bg" ref="total">{{nowTotal}}</div>
      <div class="fl">条</div>
    </div>
    <div>
      <div class="center-map">
        <div v-for="item in 4" :class="'center-light light'+item"></div>
        <div v-for="item in 4" :class="'center-w-light wl'+item"></div>
        <div class="rotateX">
          <div class="center-container">
            <!--<div class="dot" style="left: 300px; top: 300px;"></div>-->
            <div class="box" style="left: 300px; top: 500px;">
              <div class="module-scale">经济</div>
            </div>
            <div class="box" style="left: 428.558px; top: 453.209px;">
              <div class="module-scale">医疗</div>
            </div>
            <div class="box" style="left: 496.962px; top: 334.73px;">
              <div class="module-scale">教育</div>
            </div>
            <div class="box" style="left: 473.205px; top: 200px;">
              <div class="module-scale">安全</div>
            </div>
            <div class="box" style="left: 368.404px; top: 112.061px;">
              <div class="module-scale">交通</div>
            </div>
            <div class="box" style="left: 231.596px; top: 112.061px;">
              <div class="module-scale">就业</div>
            </div>
            <div class="box" style="left: 126.795px; top: 200px;">
              <div class="module-scale">环境</div>
            </div>
            <div class="box" style="left: 103.038px; top: 334.73px;">
              <div class="module-scale">能源</div>
            </div>
            <div class="box" style="left: 171.442px; top: 453.209px;">
              <div class="module-scale">科技</div>
            </div>
          </div>
        </div>
       
      </div>

    </div>
  </div>
</template>

<script>
  import resize from '@/mixins/resize';
  import API from '../../../../rest-api/restApi';
import {setInterval, clearInterval} from 'timers';

  export default {
    name: 'share1-center',
    mixins: [resize],
    props: {
      width: {
        type: String,
        default: '717px'
      },
      height: {
        type: String,
        default: '677px'
      }
    },
    data () {
      return {
        total: '暂无数据',
        nowTotal: '暂无数据',
        dotLeft: 0,
        dotTop: 0,
        boxLeft: 0,
        boxTop: 0,
        centerTimer: null
      };
    },
    mounted () {
      var _this = this;

      _this.getData();
      _this.centerTimer = setInterval(function () {
        _this.getData();
      }, 180000);
    },
    methods: {
      getData () {
        var _that = this;

        this.$http({
          method: 'post',
          url: API.CENTER
        }).then((res) => {
          _that.total = res.data.data.total;
          _that.NumAutoPlusAnimation();
        }).catch((response) => {
          console.log(response);
        });
      },
      NumAutoPlusAnimation () {
        var that = this;
        // var totalDom = that.$refs['total'];
        var option = {
          time: 1500,
          finalNum: that.total,
          regulator: 50
        };
        var step = option.finalNum / (option.time / option.regulator);// 每30ms增加的数值
        var count = 0;// 计数器
        var initial = 0;
        var timer = setInterval(function () {
          count = count + step;

          if (count >= option.finalNum) {
            clearInterval(timer);
            count = option.finalNum;
          }
          // t未发生改变的话就直接返回
          var t = Math.floor(count);

          if (t === initial) return;
          initial = t;
          that.nowTotal = initial.toLocaleString();
        }, 30);
      }
    },
    destroyed () {
      if (this.centerTimer) {
        clearInterval(this.centerTimer);
      }
    }
  };
</script>
