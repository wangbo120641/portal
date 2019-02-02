<!--
 /**
  * 共享指数大屏1
  * @desc 组件描述
  * @author l16076 
  * @date 2018/8/7 08:49
  * @example 调用示例
  */
-->
<template>
  <base-container :nav="false">
    <div class="share-chart-container ">
      <animate-line style="position: absolute"></animate-line>
      <div class="share-container">
        <div style="" class="share1-bg">
          <div class="share1-title"></div>
          <div class="">
            <el-row :gutter="20">
              <div style="padding:0 40px 40px 40px">
                <el-col :span="24">
                  <div class="share1-div">
                    <div class="key-index-title1">
                      <i class="iconfont icons-ribaojindu ml15" style="color: #1a97da;"></i>
                      <span> 关键指标</span>
                    </div>
                    <key-index>
                    </key-index>
                  </div>
                </el-col>
                <el-col :span="6">
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class=" top-div-left ">
                        <div style="padding-top: 30px;">
                          <div class="top-title">
                            <span>数据目录访问量TOP5</span>
                          </div>
                        </div>
                        <catalog-visit-top10-bar>
                        </catalog-visit-top10-bar>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class=" top-div-left ">
                        <div style="padding-top: 30px;">
                          <div class="top-title">
                            <span>数据目录订阅量TOP5</span>
                          </div>
                        </div>
                        <catalog-subscribe-top10>
                        </catalog-subscribe-top10>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <div class="">
                    <share1-center></share1-center>
                  </div>
                </el-col>
                <el-col  :span="6">
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class="top-div-right ">
                        <div style="padding-top: 30px;">
                          <div class="top-title">
                            <span>接口访问量TOP5</span>
                          </div>
                        </div>
                        <interface-visit-top10>
                        </interface-visit-top10>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="top-div-right ">
                        <div style="padding-top: 30px;">
                          <div class="top-title">
                            <span>接口订阅量TOP5</span>
                          </div>
                        </div>
                        <interface-subscribe-top10>
                        </interface-subscribe-top10>
                      </div>
                    </el-col>
                  </el-row>

                </el-col>
                <el-col :span="24">
                  <div class="share1-div mb10">
                    <div class="head-line">
                      <div class="key-index-title1">
                        <i class="iconfont icons-ribaojindu ml15" style="color: #1a97da;"></i>
                        <span>数据开放类别展示</span>
                      </div>
                    </div>
                    <open-data-statistics-bar-line>
                    </open-data-statistics-bar-line>
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </base-container>
</template>

<script>
  import BaseContainer from '../../../component/base-container';
  import KeyIndex from './operating-charts/key-index'; // 关键指标
  import CatalogVisitTop10Bar from './operating-charts/catalog-visit-top10-bar';// 数据目录访问量TOP10
  import CatalogSubscribeTop10 from './operating-charts/catalog-subscribe-top10'; // 数据目录订阅量TOP10
  import Share1Center from './operating-charts/share1-center'; // 中间动画
  import InterfaceVisitTop10 from './operating-charts/interface-visit-top10'; // 接口订阅量TOP10
  import InterfaceSubscribeTop10 from './operating-charts/interface-subscribe-top10'; // 接口访问量TOP10
  import OpenDataStatisticsBarLine from './operating-charts/open-data-statistics-bar-line';  // 数据开放统计
  import BreadNav from '../../../mixins/bread-nav';
  import AnimateLine from 'src/component/animate-line';


  export default {
    name: 'operating-index',
    components: {
      BaseContainer,
      KeyIndex,
      CatalogVisitTop10Bar,
      CatalogSubscribeTop10,
      OpenDataStatisticsBarLine,
      Share1Center,
      InterfaceVisitTop10,
      InterfaceSubscribeTop10,
      AnimateLine
    },
    mixins: [BreadNav],
    data() {
      return {};
    },
    watch: {},
    methods: {},
    mounted() {
    },
    computed: {}
  };
</script>

<style lang="stylus" src="./operating-index.styl">
</style>
