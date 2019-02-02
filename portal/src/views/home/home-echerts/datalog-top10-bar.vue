<!--
 /**
  * 首页3-数据目录访问量TOP10
  * @desc 组件描述
  * @author wufan   
  * @date 2018/9/12
  * @example 调用示例
  */
-->
<template>
  <div :class="className" :style="{height:height,width:width}" v-html="rawHtml" @mouseover="clearAutoPlay" @mouseleave="autoPlay"></div>
</template>

<script>
  import resize from '@/mixins/resize';
  import echarts from 'echarts';
  import API from '../../../rest-api/restApi';

  require('echarts/theme/macarons'); // echarts theme
  const animationDuration = 6000;
  const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];

  export default {
    name: 'datalog-top10-bar',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data () {
      return {
        homeTime: null,
        chart: null,
        chartData: {
          optionData: {
            category: [],
            seriesData: [
              {name: '访问量', data: []},
              {name: '收藏量', data: []},
              {name: '订阅量', data: []}
            ],
            legendData: ['访问量', '收藏量', '订阅量']
          }
        },
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
      clearTimeout(this.homeTime);
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
          url: globals.serverUrl + '/ae/PlatDatalogVisitTQry?topN=10'
        }).then((res) => {
          let resData = res.data.data;

          if (resData.length > 0) {
            resData.map(function (param) {
              _that.chartData.optionData.category.push(param.typeName);
              _that.chartData.optionData.seriesData[0].data.push(param.visitCount);
              _that.chartData.optionData.seriesData[1].data.push(param.collectCount);
              _that.chartData.optionData.seriesData[2].data.push(param.orderCount);
            });
            this.initChart();
          } else {
            _that.rawHtml = '<div style="text-align: center;line-height: 140px; font-size:16px;color: #ccc">暂无数据</div>';
          }
        }).catch((response) => {
          _that.rawHtml = '<div style="text-align: center;line-height: 140px;font-size:16px; color: #ccc">暂无数据</div>';
          console.log(response);
        });
      },
      setOptions ({optionData} = {}) {
        if (optionData.seriesData) {
          this.chart.setOption({
            color: ['#006cff', '#74dcfe', '#ff9600'],
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              show: true,
              right: '30%',
              itemGap: 30,
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                color: '#cccccc',
                fontSize: 12
              },
              data: optionData.legendData
            },
            grid: {
              top: '10%',
              left: '8%',
              right: '8%',
              bottom: '6%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              name: '',
              data: optionData.category,
              axisLine: {
                show: false
              },

              axisLabel: {
                color: '#ffffff',
                interval: 0,
                rotate: 25,
                showMaxLabel: true,
                formatter: function (value) {
                  if (value.length <= 5) {
                    return value;
                  } else {return value.slice(0, 5) + '…';}
                }
              }
            }],
            yAxis: [{
              type: 'value',
              name: '次',
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true,
                color: '#ffffff'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#cccccc8f',
                  type: 'dashed'
                }
              }
            }],
            series: this.setSeriesData(optionData)
          });
        }
      },
      setSeriesData (val) {
        var seriesData = val.seriesData;
        var seriesList = [];

        seriesData.map((item, index) => {
          var seriesObj = {
            name: item.name,
            type: 'bar',
            data: item.data,
            animationDuration,
            barWidth: 8,  // 统计条宽度
            itemStyle: {
              normal: {
                // barBorderRadius: 10,
                // 定制显示（按顺序）
                // color: function (params) {
                //   let colorList = ['#006cff', '#74dcfe', '#ff9600','#006cff', '#74dcfe', '#ff9600','#006cff', '#74dcfe', '#ff9600','#006cff', '#74dcfe', '#ff9600'];
                //   return colorList[params.dataIndex];
                // }
              }
            },
            label: {
              normal: {
                show: true,
                formatter: '{c}',
                position: 'top',
                textStyle: {
                  color: '#eee',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  textAlign: 'left',
                  fontSize: 11
                }
              }
            }
          };

          seriesList.push(seriesObj);
        });
        this.autoPlay();
        return seriesList;
      },

      // 自动播放tooltip
      autoPlay () {
        let that = this;

        clearTimeout(that.homeTime);
        let index = 0; // 播放所在下标

        if (that.chart) {
          that.homeTime = setInterval(function () {
            that.chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: index
            });
            index++;
            if (index > that.chartData.optionData.category.length) {
              index = 0;
            }
          }, 3000);
        }
      },
      clearAutoPlay () {
        clearInterval(this.homeTime);
      },
      initChart () {
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(this.chartData);
      }
    }
  };
</script>
<!--<style lang="stylus" src="../operating-index.styl"></style>-->
