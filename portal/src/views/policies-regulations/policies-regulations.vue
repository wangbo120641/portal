<!--
 /**
  * 政策法规
  * @desc 组件描述
  * @author 16610
  * @date 2018年9月12日
  * @example 调用示例
  *  <policies-regulations></policies-regulations>
  */
-->
<template>
  <base-container :nav-items="navItems">
    <com-banner slot="banner" :cbHeight="300">
      <div class="regulation-banner">
        <!--<animate-line style="position: absolute"></animate-line>-->
        <span class="regulation-big-title">政策.法规</span>
      </div>
    </com-banner>
    <div>
      <div class="regulation-container">
        <el-row :gutter="20">
          <el-col :span="1">
            &nbsp;
          </el-col>
          <el-col :span="17">
            <div class="regulation-list bg-white">
              <el-row class="list-title">
                <el-col :span="6">
                  <div class="">
                    <img src="../../../static/image/icon/reg-icon.png" style=" margin-bottom: -3px;">
                    <span class="f22 pl5">政策法规</span>
                  </div>
                </el-col>
                <el-col :span="14">
                  <el-input placeholder="文件标题搜索" v-model="nameSearch" clearable class="reg-search"
                            @input="searchButton">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" plain class="fr" @click="addbutton" size="medium" opt-type="ADD">
                    <i class="iconfont icons-new pr5"></i>新增
                  </el-button>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :sapn="24" class="regulationType pd15">
                   <span class="db fl" style="line-height: 24px">法规类型：</span>
                   <span @click="resetTagSelect" class="ml10 db fl"
                         style="color: #409eff;cursor:pointer;line-height: 24px">不限</span>
                   <template v-for="item in typeList">
                     <div class=" ml10 db fl">
                     <span v-if="!tagSelected(item)" class="typeClass"
                           @click="tagClick(item,true)">{{item}}</span>
                       <el-tag v-else closable :disable-transitions="true" type="success" @close="tagClick(item,false)"
                               size="small">
                         {{item}}
                       </el-tag>
                     </div>
                   </template>
                 </el-col>-->
                <el-col :span="24">
                  <el-card v-for="item,index in list" :key="index" class="regulation-card mg15 bacf8f9f9">
                    <div slot="header" class="clearfix" style="width: 100%;">
                      <div class="df over-nowrap">
                        <img src="../../../static/image/icon/regulation.png"/>
                        <span class="regulationTitle cp" @click="goTODetail(item.id)"
                              :title="item.title">{{item.title}}</span>
                      </div>
                    </div>
                    <el-row>
                      <el-col :span="20">
                        <!-- <p class="pd10 pl30">法规类型：{{item.lawType}}</p> -->
                        <p class="pt10 pb10 pl30">发布时间：{{dateFormat(item.publishTime)}}</p>
                        <p class="pb10 pl30">描述：{{item.description}}</p>
                      </el-col>
                      <el-col :span="4">
                        <el-button v-if="$store.state.auth.isLogin" type="danger" plain class="regulation-delete"
                                   @click="removeRegulation(item.id)"
                                   size="mini" opt-type="DELETE">
                          <i class="el-icon-delete "></i>删除
                        </el-button>
                      </el-col>
                    </el-row>
                  </el-card>
                  <div v-if="total === 0" class="dic-all-empty">
                    <div class="con-empty">
                      <i class="table-empty iconfont icons-table-content-search"></i>
                      <h1>暂 无 数 据</h1>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="cf pt30">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="params.page"
                  :pager-count="7"
                  :page-sizes="[5,10]"
                  :page-size="params.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  class="fr">
                </el-pagination>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <el-card class="new-data mb20 rel bacf8f9f9 mt20 " shadow="never">
              <div slot="header" class="clearfix">
                <p class="fl new-title">最新目录</p>
                <p class="fr  new-more default-more" @click="$router.push({name:'dataCatalog', params: {nameSearch: ''}})">MORE </p>
                <img src="../../../static/image/icon/xin.png" class="new-img"/>
              </div>
              <ul>
                <li v-for="(item,index) in datalogNewTable" :key="index">
                  <p class="new-datalog" @click="$router.push({name:'catalogDetail',params:{id: item.id }})">
                    <span :title="item.name" class="datalog-name"> {{index+1}}.{{item.name}}</span>
                    <span class="pr5 datalog-time color-gray">{{dateFormat(item.createTime)}}</span>
                  </p>
                </li>
              </ul>
            </el-card>
            <el-card class="new-data mb20 rel bacf8f9f9" shadow="never">
              <div slot="header" class="clearfix">
                <p class="fl new-title">最新接口</p>
                <p class="fr  new-more default-more" @click="$router.push({name:'interfaceService', params: {nameSearch: ''}})">MORE </p>
                <img src="../../../static/image/icon/xin.png" class="new-img"/>
              </div>
              <ul>
                <li v-for="(item,index) in interfaceNewTable" :key="index">
                  <p class="new-datalog" @click="$router.push({name:'interfaceDetail',params:{id:item.id}})">
                    <span :title="item.name" class="datalog-name"> {{index+1}}.{{item.name}}</span>
                    <span class="pr5 datalog-time color-gray">{{dateFormat(item.createTime)}}</span>
                  </p>
                </li>
              </ul>
            </el-card>
          </el-col>
          <el-col :span="1">
            &nbsp;
          </el-col>
        </el-row>
      </div>
    </div>
    <regulation-add :dialogAdd="dialogAdd" ref="radd" @getList="getRList"></regulation-add>
  </base-container>

</template>
<script>
  import BaseContainer from '../../component/base-container';
  import ComBanner from 'src/component/com-banner/com-banner';
  import BreadNav from '../../mixins/bread-nav';
  import API from '../../rest-api/restApi';
  import RegulationAdd from './regulation-add';
  import _ from 'lodash';
  import dataFormatFnList from '../../util/dataFormat';
  import AnimateLine from 'src/component/animate-line';

  export default {
    name: 'policies-regulations',
    components: {
      BaseContainer,
      ComBanner,
      RegulationAdd,
      AnimateLine
    },
    mixins: [BreadNav],
    data () {
      return {
        nameSearch: '',
        selectType: [],
        params: {
          page: 1,
          pageSize: 5,
          field: 'updateTime',
          dir: 'desc'
        },
        typeList: [],
        typeTotal: 0,
        list: [],
        // 分页数据
        currentPage: 1,
        pageSize: 8,
        total: 0,
        dialogAdd: false,
        datalogNewTable: {},
        interfaceNewTable: {}
      };
    },
    watch: {
      nameSearch: function (newQuestion, oldQuestion) {
        this.getRList();
      }
    },
    mounted () {
      // 判断是否带值从首页跳进来
      if (this.$route.params.nameSearch) {
        this.nameSearch = this.$route.params.nameSearch;
      }
      this.getType();
      this.postDatalogNew();
      this.postInterfaceTNew();
      this.getRList();
    },
    methods: {
      getType () {
        this.$http({
          method: 'post',
          url: API.TYPE_LIST
        }).then(resp => {
          this.typeList = resp.data.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      // 最新目录
      postDatalogNew () {
        let _that = this;

        this.$http({
          method: 'post',
          url: API.NEW_DATSALOG + '?topN=5'
        }).then((res) => {
          _that.datalogNewTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },
      // 日期格式转换
      dateFormat (str) {
        return dataFormatFnList.dateFormat(str);
      },
      // 最新接口
      postInterfaceTNew () {
        let _that = this;

        this.$http({
          method: 'post',
          url: API.NEW_INTERFACE + '?topN=5'
        }).then((res) => {
          _that.interfaceNewTable = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      },
      getRList: _.debounce(function () {
        let data = {
          'title': this.nameSearch,
          'lawType': this.selectType
        };
        let formatterParams = this.$qs.stringify(this.params);

        this.$http({
          method: 'post',
          url: API.REGULATION_LIST + '?' + formatterParams,
          data: data
        }).then(resp => {
          this.list = resp.data.data.data;
          this.total = resp.data.data.total;
        }).catch((res) => {
          console.log(res);
        });
      }, 500),
      searchButton () {
        this.resetPage();
        this.getRList();
      },
      // 分页事件
      handleSizeChange (val) {
        this.params.pageSize = val;
        this.getRList();
      },
      handleCurrentChange (val) {
        this.params.page = val;
        this.getRList();
      },
      // 标签点击事件
      tagClick (item, select) {
        this.resetPage();
        if (select) {
          this.selectType.push(item);
          this.getRList();
        } else {
          this.handleClose(item);
        }
      },
      tagSelected (tag) {
        return this.selectType.indexOf(tag) >= 0;
      },
      // 标签关闭
      handleClose (tag) {
        this.resetPage();
        this.selectType.splice(this.selectType.indexOf(tag), 1);
        this.getRList();
      },
      // 清空选中标签
      resetTagSelect () {
        this.resetPage();
        this.selectType = [];
        this.getRList();
      },
      resetPage () {
        this.params.page = 1;
      },
      // 新增文件弹框按钮
      addbutton () {
        this.dialogAdd = !this.dialogAdd;
      },
      // 详情页
      goTODetail (id) {
        this.$router.push({
          name: 'regulationDetail',
          params: {
            id: id
          }
        });
      },
      removeRegulation (id) {
        this.$confirm('确定删除该政策法规吗?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.deleteFile(id);
        });
      },
      deleteFile (id) {
        this.$http({
          method: 'post',
          url: API.DELETE_FILE + '?id=' + id
        }).then(res => {
          this.getRList();
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success',
            offset: 120
          });
        }).catch((res) => {
          console.log(res);
        });
      }
    },
    computed: {}
  };
</script>

<style lang="stylus" src="./policies-regulations.styl">

</style>

