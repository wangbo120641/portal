<!--
 /**
  * 共享大屏1-数据开放统计
  * @desc 组件描述
  * @author l16076 
  * @date 2018/8/07 09:13
  * @example 调用示例
  */
-->
<template>
  <div>
    <el-carousel :autoplay="false" type="card" height="300px" class="open-container">
      <el-carousel-item>
        <div class="open-div">
          <div class="open-title">部门分类top10</div>
          <div class="open-chart dept" v-html="rawHtmlDept" ref="openDept" @mouseover="mouseover()"
               @mouseout="mouseout()">
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="open-div">
          <div class="open-title">基础分类top10</div>
          <div class="open-chart basic" v-html="rawHtmlBasic" ref="openBasic" @mouseover="mouseover()"
               @mouseout="mouseout()">
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="open-div">
          <div class="open-title">主题分类top10</div>
          <div class="open-chart theme" v-html="rawHtmlTheme" ref="openTheme" @mouseover="mouseover()"
               @mouseout="mouseout()">
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import resize from '@/mixins/resize';
  import echarts from 'echarts';
  import API from '../../../../rest-api/restApi';

  require('echarts/theme/macarons'); // echarts theme

  export default {
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
        default: '270px'
      }
    },
    data() {
      return {
        basicChart: null,
        deptChart: null,
        themeChart: null,
        basicChartData: {},
        deptChartData: {},
        themeChartData: {},
        basicTime: null,
        deptTime: null,
        themeTime: null,
        rawHtmlTheme: null,
        rawHtmlDept: null,
        rawHtmlBasic: null,
        screenWidth: document.body.clientWidth
      };
    },
    mounted() {
      this.getData();
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          that.screenWidth = window.screenWidth;
        })();
      };
    },
    watch: {
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.basicChart.resize();
            that.deptChart.resize();
            that.themeChart.resize();
            that.timer = false;
          }, 400);
        }
      }
    },
    beforeDestroy() {
      if (!this.basicChart || !this.deptChart || !this.themeChart) {
        return;
      }
      clearInterval(this.basicTime);
      clearInterval(this.deptTime);
      clearInterval(this.themeTime);
      this.basicChart = null;
      this.deptChart = null;
      this.themeChart = null;

    },
    methods: {
      getData() {
        let _that = this;
        let nullDom = '<div id="chart3-nodata" style="text-align: center;font-weight: bold;line-height: 140px; color: #e0dede">暂无数据</div>';
        this.$http({
          method: 'post',
          url: API.OPEN_COUNT
        }).then((res) => {
          _that.basicChartData = res.data.data.basic;
          _that.deptChartData = res.data.data.dept;
          _that.themeChartData = res.data.data.theme;
          if (_that.basicChartData.category.length > 0) {
            _that.basicChart = null;
            _that.initChart('basic');
          } else {
            _that.rawHtmlBasic = nullDom;
          }
          if (_that.deptChartData.category.length > 0) {
            _that.deptChart = null;
            _that.initChart('dept');
          } else {
            _that.rawHtmlDept = nullDom;
          }
          if (_that.themeChartData.category.length > 0) {
            _that.themeChart = null;
            _that.initChart('theme');
          } else {
            _that.rawHtmlTheme = nullDom;
          }
        }).catch((response) => {
          _that.rawHtmlBasic = nullDom;
          _that.rawHtmlDept = nullDom;
          _that.rawHtmlTheme = nullDom;
        });
      },
      setOptions(type) {
        let _that = this;
        let option = {
          grid: {
            top: '10%',
            left: '5%',
            right: '15%',
            bottom: '28%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: [],
            textStyle: {
              color: '#cccccc',
              fontSize: 12
            },
            right: '25px',
            orient: 'horizontal',
          },
          xAxis: [
            {
              type: 'category',
              name: '名称',
              nameTextStyle: {
                color: '#ffffff',
              },
              data: [],
              axisPointer: {
                type: 'shadow'
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
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '数量',
              nameTextStyle: {
                color: '#ffffff',
              },
              axisLabel: {
                color: '#ffffff'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#ffffff',
                  type: 'dashed'
                }
              },
              minInterval: 1
            }
          ],
          series:
            [
              {
                name: '数据目录',
                type: 'bar',
                barWidth: 16,
                data: []
              },
              {
                name: '文件',
                type: 'bar',
                barWidth: 16,
                data: []
              },
              {
                name: '接口量',
                type: 'bar',
                barWidth: 16,
                data: []
              },
              {
                name: '总量',
                type: 'line',
                data: []
              }
            ]
        };
        switch (type) {
          case 'basic':
            if (_that.basicChartData) {
              let basicOption = option;
              basicOption.xAxis[0].data = _that.basicChartData.category;
              basicOption.legend.data = _that.basicChartData.legendData;
              basicOption.series[0] = _that.basicChartData.seriesData[0];
              basicOption.series[1] = _that.basicChartData.seriesData[1];
              basicOption.series[2] = _that.basicChartData.seriesData[2];
              basicOption.series[3] = _that.basicChartData.seriesData[3];
              _that.basicChart.setOption(basicOption);
              _that.basicTime = _that.autoPlay(_that.basicTime, _that.basicChart, basicOption);
            }
            break;
          case 'dept':
            if (_that.deptChartData) {
              let deptOption = option;
              deptOption.xAxis[0].data = _that.deptChartData.category;
              deptOption.legend.data = _that.deptChartData.legendData;
              deptOption.series[0] = _that.deptChartData.seriesData[0];
              deptOption.series[1] = _that.deptChartData.seriesData[1];
              deptOption.series[2] = _that.deptChartData.seriesData[2];
              deptOption.series[3] = _that.deptChartData.seriesData[3];
              _that.deptChart.setOption(deptOption);
              _that.deptTime = _that.autoPlay(_that.deptTime, _that.deptChart, deptOption);
            }
            break;
          case 'theme':
            if (_that.themeChartData) {
              let themeOption = option;
              themeOption.xAxis[0].data = _that.themeChartData.category;
              themeOption.legend.data = _that.themeChartData.legendData;
              themeOption.series[0] = _that.themeChartData.seriesData[0];
              themeOption.series[1] = _that.themeChartData.seriesData[1];
              themeOption.series[2] = _that.themeChartData.seriesData[2];
              themeOption.series[3] = _that.themeChartData.seriesData[3];
              _that.themeChart.setOption(themeOption);
              _that.themeTime = _that.autoPlay(_that.themeTime, _that.themeChart, themeOption);
            }
            break;
        }

      },
      initChart(type) {
        let _that = this;
        switch (type) {
          case 'basic':
            _that.basicChart = echarts.init(this.$refs['openBasic'], 'macarons');
            break;
          case 'dept':
            _that.deptChart = echarts.init(this.$refs['openDept'], 'macarons');
            break;
          case 'theme':
            _that.themeChart = echarts.init(this.$refs['openTheme'], 'macarons');
            break;
        }
        _that.setOptions(type);
      },
      // 自动播放tooltip
      autoPlay(time, chart, data) {
        clearInterval(time);
        let index = 0; // 播放所在下标
        if (chart) {
          time = setInterval(function () {
            chart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: index
            });
            index++;
            if (index >= data.xAxis[0].data.length) {
              index = 0;
            }
          }, 3000);
          return time;
        }
      },

      mouseover() {
        let that = this;
        let chart = event.currentTarget.className;
        switch (chart) {
          case 'open-chart basic':
            clearInterval(that.basicTime);
            break;
          case 'open-chart dept':
            clearInterval(that.deptTime);
            break;
          case 'open-chart theme':
            clearInterval(that.themeTime);
            break;
        }
      },

      mouseout() {
        let that = this;
        let chart = event.currentTarget.className;
        switch (chart) {
          case 'open-chart basic':
            that.setOptions('basic');
            break;
          case 'open-chart dept':
            that.setOptions('dept');
            break;
          case 'open-chart theme':
            that.setOptions('theme');
            break;
        }
      }
    }
  }
  ;
</script>
<style lang="stylus" src="../operating-index.styl"></style>
