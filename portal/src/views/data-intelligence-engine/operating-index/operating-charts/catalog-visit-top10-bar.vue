<!--
 /**
  * 共享大屏1-数据目录访问量TOP10
  * @desc 组件描述
  * @author wangyan   
  * @date 2018/8/2 10:51
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

  export default {
    name: 'catalog-visit-top10-bar',
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
        default: '80%'
      }
    },
    data() {
      return {
        time: null,
        chart: null,
        chartData: {
          optionData: {}
        },
        rawHtml: null,
        idArray: []
      };
    },
    mounted() {
      this.getData();

    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      clearTimeout(this.time);
      this.chart.dispose();
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
      getData() {
        let _that = this;
        let data = {
          // type: 'operating',
          topN: 10
        };
        data = Object.assign({}, data);
        this.$http({
          method: 'post',
          url: API.DATALOG_VISIT + '?top=5',
        }).then((res) => {
          let resData = res.data.data;
          _that.idArray = resData.seriesData[0].extraData;
          if (resData && resData.seriesData.length > 0 && resData.seriesData[0].data.length > 0) {
            _that.chartData.optionData = res.data.data;
            this.initChart();
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
              left: '10%',
              right: '17%',
              bottom: '6%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              name: '目录',
              nameTextStyle: {
                color: '#fff'
              },
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
            series: this.setSeriesData(optionData),
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
            animationDuration: 6000,
            animationEasing: 'quadraticIn',
            barWidth: 14,  // 统计条宽度
            itemStyle: {
              normal: {
                // barBorderRadius: 10,
                color: '#12D2FF'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#cccccc',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  textAlign: 'left',
                  fontSize: 12
                }
              }
            }
          };
          seriesList.push(seriesObj);
        });
        this.autoPlay();
        return seriesList;
      },

      // 柱图点击跳转事件
      onclick(event) {
        let that = this, xIndex
        let pointInPixel = [event.zrX, event.zrY];
        if (that.chart.containPixel('grid', pointInPixel)) {
          xIndex = that.chart.convertFromPixel({seriesIndex: 0}, pointInPixel)[0];
          xIndex === -0 ? 0 : xIndex;
          let catalogid = that.idArray[xIndex].catalogId;
          that.$router.push({name: 'catalogDetail', params: {id: catalogid}});
        }
      },

      // 自动播放tooltip
      autoPlay() {
        let that = this;
        clearTimeout(that.time);
        let index = 0; // 播放所在下标
        if (that.chart) {
          that.time = setInterval(function () {
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
        clearInterval(this.time);
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
