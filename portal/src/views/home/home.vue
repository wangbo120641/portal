<template>
  <div class="pzh-home h-100">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <!--首页一-->
      <div class="section section-table section-one">
        <div class="radar-ring"></div>
        <div class="radar-light light-one">
          <div class="radar-light-ball"></div>
        </div>
        <div class="radar-light light-two">
          <div class="radar-light-ball"></div>
        </div>
        <div class="radar-light light-three">
          <div class="radar-light-ball"></div>
        </div>
        <div class="radar-light light-four">
        </div>
        <div class="section-one-bg">
          <div class="section-one-con">
            <img src="/static/image/home/home-word.png" :class="'pb30 '+(homeOneAni?'home-word':'')"
                 style="opacity: 0;"/>
            <el-input placeholder="" v-model="nameSearch" class="input-with-select special-input pt20 pb20"
                      style="width: 700px;"
                      @keyup.enter.native="$router.push({name:'dataCatalog',params:{nameSearch:nameSearch}})">
              <el-button slot="append" icon="el-icon-search"
                         @click="$router.push({name:'dataCatalog',params:{nameSearch:nameSearch}})"></el-button>
            </el-input>
            <div class="pb30 pt30 success-data">
            <span v-for="(item,index) in criticalItem" :key="index">
            {{item.typeName}}<span class="success-num"> {{item.typeCount}} </span>{{item.typeUnit}}
              <span v-if="index!==(criticalItem.length-1)"> , </span> 
            </span>
            </div>
            <a @click="$refs.fullpage.api.moveSectionDown()" class="godown">
              <i class="el-icon-arrow-down" style="font-size: 30px;"></i>
            </a>
          </div>
        </div>
      </div>
      <!--首页二-->
      <div class="section section-table section-two">
        <div class="section-two-con">
          <div class="type-btn">
            <span>部门信息资源目录</span>
            <span>主题信息资源目录</span>
            <span>基础信息资源目录</span>
          </div>
          <el-carousel trigger="click" :autoplay=true :initial-index=1 :interval="10000" height="480px">
            <!--轮播画板 1-->
            <el-carousel-item class="carousel-con1">
              <el-row class="carousel-row">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3" class="tc pt30 pb30 cp"
                        v-for="(item,index) in departmentData" :key="index">
                  <div style="height: 66px;"
                       :class="imgShow===item.imagePath?'icon-hover':''"
                       @click="$router.push({name:'dataCatalog',params:{treeItem:item,name:'department'}})"
                       @mouseover="selectStyleImg(item)"
                       @mouseout="outStyleImg(item)">
                    <img
                      :onerror="imgErrorIcon"
                      v-bind:src="item.imageBase"/>
                  </div>
                  <div :class="'pt10 ceee '+(imgShow===item.imagePath?'c-orange':'')">{{item.categoryName}}</div>
                </el-col>
              </el-row>
            </el-carousel-item>
            <!--轮播画板 2-->
            <el-carousel-item class="carousel-con2">
              <el-row class="carousel-row">
                <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="3" class="tc pt30 pb30 cp"
                        v-for="(item,index) in themeData" :key="index">
                  <div style="height: 66px;"
                       :class="imgShow===item.imagePath?'icon-hover':''"
                       @click="$router.push({name:'dataCatalog',params:{treeItem:item,name:'theme'}})"
                       @mouseover="selectStyleImg(item)"
                       @mouseout="outStyleImg(item)">
                    <img
                      :onerror="imgErrorIcon"
                      v-bind:src="item.imageBase"/>
                  </div>
                  <div :class="'pt10 ceee '+(imgShow===item.imagePath?'c-orange':'')">{{item.categoryName}}</div>
                </el-col>
              </el-row>
            </el-carousel-item>
            <!--轮播画板 3-->
            <el-carousel-item class="carousel-con3">
              <el-row class="carousel-row">
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="3" class="tc pt30 pb30 cp"
                        v-for="(item,index) in basisData" :key="index">
                  <div style="height: 66px;"
                       :class="imgShow===item.imagePath?'icon-hover':''"
                       @click="$router.push({name:'dataCatalog',params:{treeItem:item,name:'basic'}})"
                       @mouseover="selectStyleImg(item)"
                       @mouseout="outStyleImg(item)">
                    <img
                      :onerror="imgErrorIcon"
                      v-bind:src="item.imageBase"/>
                  </div>
                  <div :class="'pt10 ceee '+(imgShow===item.imagePath?'c-orange':'')">{{item.categoryName}}</div>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          <div class="section-two-line"></div>
        </div>
        <a @click="$refs.fullpage.api.moveSectionDown()" class="godown">
          <i class="el-icon-arrow-down" style="font-size: 30px;"></i>
        </a>
      </div>
      <!--首页三-->
      <div class="section section-table section-three">
        <div class="section-three-con">
          <el-carousel
            trigger="click"
            :autoplay=true
            :interval="10000"
            height="500px"
            @change="hotCardChange"
            type="card">
            <!--轮播画板 1 热门-->
            <el-carousel-item class="carousel-con4">
              <el-row class="carousel-row">
                <p class="hot-title"> 热门目录 </p>
                <!--图表-->
                <el-col :span="14" class="" style="height:400px;">
                  <datalog-top10 ref="topChild"></datalog-top10>
                </el-col>
                <!--列表-->
                <el-col :span="10" class="pr30">
                  <div v-if="datalogTopTable.length!==0" style="color: #73DBFD" class="pb10">访问量Top10</div>
                  <ul class="datalog-table">
                    <li v-for="(item,index) in datalogTopTable" :key="index"
                        class="cf title-ellipsis">
                      <p style="width: 80%;" class="fl title-ellipsis"
                         @click="$router.push({name:'dataCatalog',params:{nameSearch:item.typeName}})">
                        {{index+1}}、{{item.typeName}}</p>
                      <p class="fr cddd">
                        <i class="el-icon-view c9"></i>
                        {{item.visitCount}}
                      </p>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-carousel-item>
            <!--轮播画板 2-->
            <el-carousel-item class="carousel-con4">
              <el-row class="carousel-row">
                <p class="hot-title"> 热门接口 </p>
                <!--图表-->
                <el-col :span="14" class="" style="height:400px;">
                  <interface-top10 ref="topChild2"></interface-top10>
                </el-col>
                <!--列表-->
                <el-col :span="10" class="pr30">
                  <div v-if="interfaceTopTable.length!==0" style="color: #73DBFD" class="pb10">访问量Top10</div>
                  <ul class="datalog-table">
                    <li v-for="(item,index) in interfaceTopTable" :key="index"
                        class="cf title-ellipsis">
                      <p style="width: 80%;" class="fl title-ellipsis"
                         @click="$router.push({name:'interfaceService',params:{nameSearch:item.typeName}})">
                        {{index+1}}、{{item.typeName}}</p>
                      <p class="fr cddd">
                        <i class="el-icon-view c9"></i>
                        {{item.visitCount}}
                      </p>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-carousel-item>
            <!--轮播画板 3-->
            <el-carousel-item class="carousel-con4">
              <el-row class="carousel-row">
                <p class="hot-title"> 政策法规 </p>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="20">
                  <ul class="datalog-table only-table">
                    <li v-for="(item,index) in policiesTopTable" :key="index"
                        class="cf title-ellipsis">
                      <p style="width: 77%;" class="fl title-ellipsis"
                         @click="$router.push({name:'policiesRegulations',params:{nameSearch:item.name}})">
                        <i class="el-icon-document pr5" style="color:#ff9600;"></i>
                        {{item.name}}
                      </p>
                      <p class="fr cddd">
                        <i class="el-icon-date c9"></i>
                        {{dateFormat(item.createTime)}}
                      </p>
                    </li>
                  </ul>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
              </el-row>
            </el-carousel-item>
            <!--轮播画板 4-->
            <el-carousel-item class="carousel-con4">
              <el-row class="carousel-row">
                <p class="hot-title"> 热门分类 </p>
                <div style="padding: 0 11%;padding-top: 30px;">
                  <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4" class="tc pt15 pb20 cp"
                          v-for="(item,index) in hotClassTopTable" :key="index">
                    <div class="hot-icon-bg"
                         @click="$router.push({name:'dataCatalog',params:{treeItem:{id:item.typeId,categoryName:item.typeName},name:''}})">
                      <img
                        v-if="imgShow!==item.imagePath"
                        :onerror="imgErrorIcon"
                        v-bind:src="item.imageBase"/>
                    </div>
                    <div class="pt10" style="color:#eee;">{{item.typeName}}</div>
                  </el-col>
                </div>
              </el-row>
            </el-carousel-item>
            <!--轮播画板 5-->
            <el-carousel-item class="carousel-con4">
              <el-row class="carousel-row" justify="center">
                <p class="hot-title"> 最新数据 </p>
                <!--列表1-->
                <el-col :span="12" class="pr20 pl30">
                  <div style="color: #999" class="pb10">最新目录</div>
                  <ul class="datalog-table">
                    <li v-for="(item,index) in datalogNewTable" :key="index"
                        class="cf title-ellipsis">
                      <p style="width: 100%;" class="title-ellipsis"
                         @click="$router.push({name:'dataCatalog',params:{nameSearch:item.name}})">
                        <span class="pr5" style="color: #74dcfe;">{{dateFormat(item.createTime)}}</span>{{item.name}}
                      </p>
                    </li>
                  </ul>
                </el-col>
                <!--列表2-->
                <el-col :span="12" class="pr30 pl20">
                  <div style="color: #999" class="pb10">最新接口</div>
                  <ul class="datalog-table">
                    <li v-for="(item,index) in interfaceNewTable" :key="index"
                        class="cf title-ellipsis">
                      <p style="width: 100%;" class="title-ellipsis"
                         @click="$router.push({name:'interfaceService',params:{nameSearch:item.name}})">
                        <span class="pr5" style="color: #74dcfe;">{{dateFormat(item.createTime)}}</span>{{item.name}}
                      </p>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          <!--<img v-bind:src="'/static/image/home/tixing.png'"/>-->
        </div>
        <!--<a @click="$refs.fullpage.api.moveSectionUp()" class="godown">-->
        <!--<i class="el-icon-arrow-up" style="font-size: 30px;"></i>-->
        <!--</a>-->
      </div>
    </full-page>
  </div>
</template>
<script>
  import DatalogTop10 from './home-echerts/datalog-top10-bar'; // 数据目录订阅量TOP10
  import InterfaceTop10 from './home-echerts/interface-top10-bar'; // 接口订阅量TOP10
  import dataFormatFnList from '../../util/dataFormat';
  import BreadNav from 'src/mixins/bread-nav';
  import Vue from 'vue';
  import API from '../../rest-api/restApi';
  import imageErrorIcon from './image/bumen-icon.png';
  import imageErrorIconHot from './image/hot-icon.png';
  import VueFullPage from 'vue-fullpage.js';
  Vue.use(VueFullPage);
  
  export default {
    name: 'home',
    components: {
      DatalogTop10,
      InterfaceTop10
    },
    mixins: [BreadNav],
    data () {
      return {
        // 整屏切换配置
        options: {
          afterLoad: this.afterLoad, // 回调函数
          scrollBar: false,
          // menu: '#menu',
          navigation: true,
          navigationPosition: 'right',
          anchors: ['pageOne', 'pageTwo', 'pageThree'],
          sectionsColor: ['#666', '#999', '#333', '#fff']
        },
        criticalItem: [],
        nameSearch: '', // 搜索框
        homeOneAni: false, // 八个字效果
        sourceType: {},
        departmentData: [], // 部门
        themeData: [], // 主题
        basisData: [], // 基础
        imgErrorIcon: 'this.src="' + imageErrorIcon + '"',
        imgErrorIconHot: 'this.src="' + imageErrorIconHot + '"',
        imgShow: '',
        datalogTopTable: [], // 数据目录Top10
        interfaceTopTable: [], // 接口Top10
        policiesTopTable: [], // 政策法规
        hotClassTopTable: [], // 热门分类
        datalogNewTable: [], // 数据目录最新
        interfaceNewTable: [] // 接口最新
      };
    },
    beforeCreate () {
     
    },
    created () {

      let _that = this;
      // 获取关键项指标

      _that.$http({
        method: 'post',
        url: globals.serverUrl + '/ae/platKeyCountQuery'
      }).then(resp => {
        _that.criticalItem = resp.data.data;
        _that.criticalItem.forEach((data, i) => {
          _that.NumAutoPlusAnimation(data.typeCount, i);
        });
      });
      // 获取分类
      this.$http({
        method: 'post',
        url: globals.serverUrl + '/se/dataCatalog/queryCategoryList?type=index'
      }).then(resp => {
        if (resp.data.data) {
          resp.data.data.forEach(item => {
            if (item.children) {
              item.children.map(child => {
                _that.imageTransform(child);
              });
            }
          });
        }
        let department = resp.data.data.filter(param => {return param.categoryName === '部门';}),
          theme = resp.data.data.filter(param => {return param.categoryName === '主题';}),
          basic = resp.data.data.filter(param => {return param.categoryName === '基础';});

        _that.departmentData = department && department[0] ? department[0].children : [];
        _that.themeData = theme && theme[0] ? theme[0].children : [];
        _that.basisData = basic && basic[0] ? basic[0].children : [];
      });
    },
    methods: {
      imageTransform (item, errImg) {
        var img = {
          path: './image/',
          name: item.imagePath || 'bumen-icon',
          ext: '.png',
          errImg: errImg || imageErrorIcon
        };
        var path = img.path + img.name + img.ext;

        import(`${path}`).then(module => {
          item.imageBase = module;
        }).catch(res => {
          item.imageBase = img.errImg;
        });
      },
      // imgErrorIcon (event) {
      //   debugger;
      //   var img = event.srcElement;

      //   img.src = '/static/image/home/bumen-icon.png"';
      //   img.onerror = null;
      // },
      // 日期格式转换
      dateFormat (str) {
        return dataFormatFnList.dateFormat(str);
      },
      // 整屏切换后触发
      afterLoad (anchorLink, item) {
        if (item.index === 0) {
          this.homeOneAni = true;
        }
        if (item.index === 1) {
          this.homeOneAni = false;
        }
        if (item.index === 2) {
          this.homeOneAni = false;
        }
      },
      // 鼠标移入小图标
      selectStyleImg (item) {
        this.imgShow = item.imagePath;
      },
      // 鼠标移出小图标
      outStyleImg (item) {
        this.imgShow = '';
      },
      // 轮播改变事件触发
      hotCardChange () {
        let _that = this;
        // 重新渲染echerts，适应宽度

        setTimeout(function () {
          if (_that.datalogTopTable.length !== 0) {_that.$refs.topChild.chart.resize();}
          if (_that.interfaceTopTable.length !== 0) {_that.$refs.topChild2.chart.resize();}
        }, 500);
      },
      // 数据目录访问量Top10的值
      postDatalogTop () {
        let _that = this;

        this.$http({
          method: 'post',
          url: globals.serverUrl + '/ae/PlatDatalogVisitTQry?topN=10'
        }).then((res) => {
          _that.datalogTopTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },
      // 接口访问量Top10的值
      postInterfaceTop () {
        let _that = this;

        this.$http({
          method: 'post',
          url: globals.serverUrl + '/ae/PlatApiVisitTQry?topN=10'
        }).then((res) => {
          _that.interfaceTopTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },
      // 政策法规
      postPoliciesTop () {
        let _that = this;

        this.$http({
          method: 'post',
          url: globals.serverUrl + '/ae/queryLawsNewTopN?topN=10'
        }).then((res) => {
          _that.policiesTopTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },
      // 热门分类
      postHotClassTop () {
        let _that = this;

        this.$http({
          method: 'post',
          url: globals.serverUrl + '/ae/PlatDatalogTypeTQry?topN=12'
        }).then((res) => {
          _that.hotClassTopTable = res.data.data;
          if (_that.hotClassTopTable) {
            _that.hotClassTopTable.forEach(item => {
              item.imagePath = item.typeUnit;
              _that.imageTransform(item);
            });
          }
        }).catch((response) => {
          console.log(response);
        });
      },
      // 最新目录
      postDatalogNew () {
        let _that = this;

        this.$http({
          method: 'post',
          url: API.NEW_DATSALOG + '?topN=10'
        }).then((res) => {
          _that.datalogNewTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },
      // 最新接口
      postInterfaceTNew () {
        let _that = this;

        this.$http({
          method: 'post',
          url: API.NEW_INTERFACE + '?topN=10'
        }).then((res) => {
          _that.interfaceNewTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },

      NumAutoPlusAnimation (total, i) {
        var that = this;
        // var totalDom = that.$refs['total'];
        var option = {
          time: 1500,
          finalNum: total,
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

          if (t === initial) {
            return;
          }
          initial = t;
          that.criticalItem[i].typeCount = initial;
        }, 30);
      },
      munusBindEvent () {
        var sections = document.getElementById('fp-nav').children.item(0).children,
          _this = this;

        sections.item(0).addEventListener('click', function () {
          _this.$refs.fullpage.api.moveTo(1);
        });
        sections.item(1).addEventListener('click', function () {
          _this.$refs.fullpage.api.moveTo(2);
        });
        sections.item(2).addEventListener('click', function () {
          _this.$refs.fullpage.api.moveTo(3);
        });
      }
    },
    mounted () {
      // 数据目录访问量Top10的值
      this.postDatalogTop();
      // 接口
      this.postInterfaceTop();
      // 政策法规
      this.postPoliciesTop();
      // 热门分类
      this.postHotClassTop();
      // 数据目录最新
      this.postDatalogNew();
      // 接口最新
      this.postInterfaceTNew();

      this.munusBindEvent();
    }
  };
</script>

<style lang="stylus" src="./home.styl"></style>
