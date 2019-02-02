<!--
 /**
  * 共享大屏1-接口订阅量TOP10
  * @desc 组件描述
  * @author wangyan 
  * @date 2018/8/9 10:51
  * @example 调用示例
  */
-->
<template>
  <div :class="className" :style="{height:height,width:width}" v-html="rawHtml"
       @click="onclick"
       @mouseover="mouseover"
       @mouseout="mouseout"></div>
</template>

<script>
  import resize from '@/mixins/resize';
  import echarts from 'echarts';
  import API from '../../../../rest-api/restApi';

  require('echarts/theme/macarons'); // echarts theme
  const animationDuration = 6000;
  const colorList = ['#5082ff', '#d6ba5c', '#54caa3', '#8d98b3', '#d48265', '#499df3', '#f55d90', '#2ec4e9', '#6768da', '#30c4cd', '#c4ccd3'];
  const graduColorTopList = ['#4D35FF', '#046CFF', '#0CC5C2', 'rgba(13,177,205,0.8)'];
  const graduColorBottomList = ['#E249FF', '#36C5FF', '#58F1CC', '#821eff'];
  export default {
    name: 'interface-visit-top10',
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
        default: '300px'
      }
    },
    data() {
      return {
        interTime: null,
        chart: null,
        chartData: {
          optionData: {}
        },
        rawHtml: null,
        idArray: []

      };
    },
    mounted() {
      this.getOptionData();
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      clearTimeout(this.interTime);
      this.chart.dispose()
      this.chart = null;
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val);
        }
      }
    },
    methods: {
      getOptionData() {
        let _that = this;
        this.$http({
          method: 'post',
          url: API.INTERFACE_VISIT + '?top=5'
        }).then((res) => {
          let resData = res.data.data;
          if (resData && resData.seriesData.length > 0 && resData.seriesData[0].data.length > 0) {
            _that.chartData.optionData = res.data.data;
            _that.idArray = resData.seriesData[0].extraData;
          } else {
            _that.rawHtml = '<div style="text-align: center;font-weight: bold;line-height: 140px; color: #666">暂无数据</div>';
          }
        }).catch((response) => {
          _that.rawHtml = '<div style="text-align: center;font-weight: bold;line-height: 140px; color: #666">暂无数据</div>';
          console.log(response);
        });
      },
      setOptions({optionData} = {}) {
        if (optionData.seriesData) {
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              show: false,
              right: '30%',
              itemWidth: 10,
              itemHeight: 10,
              textStyle: {
                color: '#ffffff',
                fontSize: 14
              },
              data: optionData.legendData
            },
            grid: {
              top: '15%',
              left: '12%',
              right: '17%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              name: '接口',
              data: optionData.category,
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#f0f0f0'
                }
              },
              axisLabel: {
                color: '#ffffff',
                interval: 0,
                rotate: 25,
                showMaxLabel: true,
                formatter: function (value) {
                  if (value.length <= 5) {
                    return value;
                  } else
                    return value.slice(0, 5) + '…';
                }
              }
            }],
            yAxis: [{
              type: 'value',
              name: '次',
              nameTextStyle: {
                color: '#ffffff',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 14
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                color: '#ffffff'
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#cccccc8f',
                  type: 'dashed'
                }
              },
              minInterval: 1
            }],
            series: this.setSeriesData(optionData)
          });
        }
      },
      setSeriesData(val) {
        let seriesData = val.seriesData;
        let seriesList = [];
        seriesData.map((item, index) => {
          let data = item.data;
          let dataList = [];
          for (let i = 0; i < data.length; i++) {
            let dataStyle = {
              name: '',
              value: data[i],
              itemStyle: {
                normal: {
                  color: colorList[i]
                }
              }
            };
            dataList.push(dataStyle);
          }
          let seriesObj = {
            name: item.name,
            type: 'bar',
            data: dataList,
            animationDuration: 1000,
            animationEasing: 'quadraticIn',
            barWidth: 14,
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#cccccc',
                  // color: '#70DDA7',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  textAlign: 'left',
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: graduColorBottomList[index]
                }, {
                  offset: 1,
                  color: graduColorTopList[index]
                }]),
                barBorderRadius: 0,
                borderWidth: 0
              }
            }
          };
          seriesList.push(seriesObj);
        });
        this.autoPlay()
        return seriesList;
      },

      // 柱图点击跳转事件
      onclick(event) {
        let that = this, xIndex
        let pointInPixel = [event.zrX, event.zrY];
        if (that.chart.containPixel('grid', pointInPixel)) {
          xIndex = that.chart.convertFromPixel({seriesIndex: 0}, pointInPixel)[0];
          xIndex === -0 ? 0 : xIndex;
          let catalogId = that.idArray[xIndex].catalogId;
          this.$router.push({name: 'interfaceDetail', params: {id: catalogId}});
        }
      },

      // 自动播放tooltip
      autoPlay() {
        let that = this;
        clearTimeout(that.interTime);
        let index = 0; // 播放所在下标
        if (that.chart) {
          that.interTime = setInterval(function () {
            that.chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: index
            });
            index++;
            if (index >= that.chartData.optionData.category.length) {
              index = 0;
            }
          }, 3000);
        }
      },
      mouseover() {
        clearInterval(this.interTime);
      },

      mouseout() {
        this.autoPlay();
      },

      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(this.chartData);
      }
    }
  };
</script>
<style lang="stylus" src="../operating-index.styl"></style>
