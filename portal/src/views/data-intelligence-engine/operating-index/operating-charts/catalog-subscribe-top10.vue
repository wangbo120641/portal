<!--
 /**
  * 共享大屏1-数据目录订阅量TOP10
  * @desc 组件描述
  * @author wangyan 
  * @date 2018/8/07 09:39
  * @example 调用示例
  */
-->
<template>
  <div class="chart tcenter" :style="{height:height,width:width}" v-html="rawHtml"></div>
</template>

<script>
  import resize from '@/mixins/resize';
  import echarts from 'echarts';
  import API from '../../../../rest-api/restApi';

  require('echarts/theme/macarons'); // echarts theme
  const animationDuration = 6000;
  const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];

  export default {
    name: 'datalog-subscribe-top10',
    mixins: [resize],
    props: {
      width: {
        type: String,
        default: '90%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data () {
      return {
        chart: null,
        oprion: {},
        chartData: {},
        rawHtml: null
      };
    },
    mounted () {
      this.getData();
    },
    beforeDestroy () {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    watch: {
      chartData: {
        deep: true,
        handler (val) {
          this.setOptions(val);
        }
      }
    },
    methods: {
      getData () {
        var _that = this;
        var data = {
          // type: 'operating',
          topN: 10
        };

        data = Object.assign({}, data);
        this.$http({
          method: 'post',
          url: API.DATALOG_SUBSCRIBE + '?' + this.$qs.stringify({top: 5})
        }).then((res) => {
          var resData = res.data.data;

          if (resData && resData.seriesData[0].data.length > 0) {
            _that.chartData = res.data.data;
            _that.initChart();
          } else {
            _that.rawHtml = '<div id="chart3-nodata" style="text-align: center;font-weight: bold;line-height: 140px; color: #666">暂无数据</div>';
          }
        }).catch((response) => {
          _that.rawHtml = '<div id="chart3-nodata" style="text-align: center;font-weight: bold;line-height: 140px; color: #666">暂无数据</div>';
          console.log(response);
        });
      },
      // 自动播放tooltip
      autoPlay () {
        var that = this;
        var mTime2 = null;
        var index = 0; // 播放所在下标

        if (that.chart) {
          mTime2 = setInterval(function () {
            that.chart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
            index++;
            if (index > that.chartData.seriesData[0].data.length) {
              // if (index > that.option.series.data.length) {
            index = 0;
          }
          }, 3000);
        }
      },
      setOptions () {
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          label: {
            formatter: function (params) {
              return params.seriesIndex;
            }
          },
          legend: {
            x: 'center',
            y: 'bottom',
            type: 'scroll',
            pageIconColor: '#fff',
            pageIconInactiveColor: 'gray',
            pageTextStyle: {
              color: '#fff'
            },
            formatter: function (name) {
              // if (name.length <= 5) {
              //   return name;
              // } else
              //   return name.slice(0, 5) + '…';
              return name;
            },
            textStyle: {
              color: '#cccccc'
            },
            data: this.chartData.category
          },
          grid: {
            top: '10%',
            left: '20%',
            right: '10%',
            bottom: '6%',
            containLabel: true
          },
          calculable: true,
          animationDuration: 1000,
          animationEasing: 'quadraticIn',
          series: {
            name: '数据目录订阅量top5',
            type: 'pie',
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  if (params.name.length <= 4) {
                    return params.name;
                  } else {
                    return params.name.slice(0, 4) + '…';
                  }
                }
              }
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 10
              }
            },
            radius: [20, 70],
            center: ['50%', '40%'],
            roseType: 'area',
            data: this.chartData.seriesData[0].data
          }
        };
        if (this.chartData.seriesData[0].data) {
          this.chart.setOption(this.option);
          // this.autoPlay();
        }
      },
      initChart () {
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions();
      }
    }
  };
</script>
