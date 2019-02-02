<template>
  <base-container :nav-items="navItems">
    <el-row :gutter="20">
      <el-col :span="1">&nbsp; </el-col>
      <el-col :span="22">
        <div class="base-div">
          <div class="search-div">
            <el-row>
              <el-col :span="24">
                <el-input size="small"
                          class="fr search-input app-search-div"
                          suffix-icon="el-icon-search"
                          @input="appNameInput" v-model="searchAppName"
                          placeholder="请输入应用名搜索...">
                </el-input>
              </el-col>
            </el-row>
          </div>
          <div class="app-info-div">
            <el-card class="app-info-card"
                     style="margin-bottom: 1%; height: 210px"
                     v-for="app in appData"
                     :key="app.id">
              <div slot="header" class="box-card-div">
                <i class="iconfont icons-applications"></i>
                <a :title="app.applicationName">
                  {{app.applicationName}}
                </a>
              </div>
              <el-row style="height: 100%">
                <el-col :span="21" style="height: 100%">
                  <div class="app-img-div">
                    <img :src="app.photo"/>
                  </div>
                  <div class="app-text-div">
                    <el-form :inline="true" label-position="right">
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="应用类型：">
                            {{app.applicationType}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="开发单位：">
                            <el-tooltip class="item" effect="dark" :content="app.developerName" placement="bottom-start">
                              <div class="overload-div">
                                {{app.developerName}}
                              </div>
                            </el-tooltip>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="推 荐 值：">
                            {{app.recommendValue}}
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="联 系 人：">
                            <div class="overload-div">
                              {{app.customerName}}
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="联系电话：">
                            <div class="overload-div">
                              {{app.contactPhone}}
                            </div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="联系邮箱：">
                            <div class="overload-div">
                              {{app.contactEmail}}
                            </div>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="访问链接：">
                            <el-tooltip class="item" effect="dark" :content="app.applicationUrl" placement="top">
                              <div class="overload-div">
                                {{app.applicationUrl}}
                              </div>
                            </el-tooltip>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="访 问 量：">
                            {{app.visitCount}}
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="buts-div">
                    <div class="but-div">
                      <el-popover
                        opt-type="RECOMMEND"
                        placement="top"
                        width="160"
                        :value="currentAppId == app.id">
                        <el-slider
                          class="recommend-value-slider"
                          v-model="tempApp.recommendValue"
                          :show-input-controls="false"
                          input-size="mini"
                        >
                        </el-slider>
                        <span>推荐值:{{tempApp.recommendValue}}</span>
                        <div style="text-align: right; margin: 0">
                          <el-button type="primary" size="mini" @click="onSureClick(app)">确定</el-button>
                        </div>
                        <el-button class="card-button recommend-but"
                                   :type="recommend[app.id].info.type == 'recommend'? 'success' : 'primary'" plain
                                   size="mini"
                                   @click="showRecommended(app)"
                                   slot="reference">
                          <i class="iconfont icons-dianzan_active"></i>
                          {{recommend[app.id].info.value}}
                        </el-button>
                      </el-popover>
                    </div>
                    <div class="but-div">
                      <el-button opt-type="DELETE"
                                 class="card-button" type="danger" plain icon="el-icon-delete"
                                 @click="handleDelete(app)"
                                 size="mini" >
                        删除
                      </el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <div class="pagination-div">
            <customer-pagination :parent-page-info="pageInfo" :total="total" :default-page-size="pageSize" @afterPageDataChange="pageChange"></customer-pagination>
          </div>
        </div>
        <div class="app-dialogs-div">
          <div class="recommended-dialog">
            <el-dialog :visible.sync="recommendedVisible"
                       :close-on-click-modal="false"
                       title="应用推荐"
                       :before-close="closeRecommendDialog">
              <el-form ref="recommendedRef"
                       :rules="recommendedRules"
                       label-position="right"
                       :inline="true" :model="tempApp">
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="recommendValue" label="推荐值:" style="width: 100%">
                      <el-input v-model="tempApp.recommendValue" class="recommend-value-input" placeholder="请输入推荐值 1-100（正整数）" size="small"></el-input>
                      <span class="hint-span">请输入1-100的正整数</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div style="text-align: right">
                      <el-button plain type="danger" @click="onCancelClick" size="small">取 消</el-button>
                      <el-button plain type="primary" size="small" @click="submitRecommended">确 定</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="1">&nbsp; </el-col>
    </el-row>
    
  </base-container>
</template>

<script>
  import baseContainer from '../../../component/base-container';
  import BreadNavMixin from '../../../mixins/bread-nav';
  import API from "../../../rest-api/restApi";
  import manaUtil from "../../system-management/management-util"
  import customerPagination from '../../system-management/user-management/customer-pagination'
  export default {
    name: "app-management",
    mixins: [BreadNavMixin],
    components: {
      baseContainer,
      customerPagination
    },
    data() {
      var checkRecommendedValue = (rule, value, callback) => {
        if (!value || value == ''){
          callback();
          return;
        }
        var res = manaUtil.numPattern(value,'plus',true);
        if (res == 1){
          var numValue = Number.parseInt(value);
          if (numValue > 100){
            rule.message = '请输入1-100的正整数';
            callback(new Error(rule.message))
          } else {
            callback();
          }
        } else {
          callback(new Error(rule.message));
        }
      }
      return {
        searchAppName: '',
        appData: [],
        recommendedVisible: false,
        detailVisible: false,
        currentAppId: '',
        tempApp: {},
        recommend: {},
        isActive: false,
        popoverVisible: false,
        pageInfo: {
          page: 1,
          pageSize: 5,
          field: 'recommendValue',
          dir: 'desc'
        },
        total: 0,
        pageSize: 5,
        recommendedRules: {
          recommendValue: [
            {required: true, message: '请输入推荐值', trigger: 'blur'},
            {validator: checkRecommendedValue, message: '请输入正整数', trigger: 'blur'}
          ]
        }
      }
    },
    mounted: function () {
      this.queryAppInfo();
    },
    watch: {
      appData: function () {
        var _that = this;
        this.appData.forEach( app => {
          _that.recommend[app.id] = {};
          _that.recommend[app.id].info = _that.getRecommendInfoObject('recommend');
          _that.recommend[app.id].tempApp = JSON.parse(JSON.stringify(app));
        })
        _that.currentAppId = '';
      }
    },
    methods: {
      queryAppInfo: function (pageInfo) {
        var _that = this;
        var pageParam = Object.assign(_that.pageInfo,pageInfo);
        _that.pageInfo = pageParam;
        pageParam = {
          pageNum: pageParam.page,
          pageSize: pageParam.pageSize,
          dir: pageParam.dir,
          orderBy: pageParam.field
        };
        var conditionParam = {
          applicationName: _that.searchAppName
        };
        var param = Object.assign(pageParam, conditionParam);
        _that.$http({
          method: 'post',
          url: API.APP_SHOW_POST,
          data: JSON.stringify(param)
        }).then( (response) => {
          if (response.data.code == '1') {
            _that.appData = response.data.data.data;
            _that.total = response.data.data.total;
          }
        }).catch( (response) => {
          console.log(response)
        });
      },
      showDetail: function(app) {
        this.tempApp = app;
        this.detailVisible = true;
      },
      showRecommended: function(app){
        this.recommend[app.id].info.popoverVisible = true;
        if (this.currentAppId != '' && this.currentAppId != app.id){
          this.resetBeforeApp();
        }
        if(this.recommend[app.id].info.type == 'recommend'){
          this.tempApp = JSON.parse(JSON.stringify(this.recommend[app.id].tempApp));
          this.tempApp.recommendValue = Number.parseInt(this.tempApp.recommendValue);
        }
        this.currentAppId = app.id;
      },
      onSureClick: function (app) {
        this.submitRecommended(1);
        app.recommendValue = this.tempApp.recommendValue;
        this.recommend[app.id].tempApp = JSON.parse(JSON.stringify(app));
        this.currentAppId = '';
      },
      resetBeforeApp: function () {
        !this.recommend[this.currentAppId] || (this.recommend[this.currentAppId].info = this.getRecommendInfoObject('recommend'));
      },
      handleDelete: function (app) {
        this.doDelete([app.id])
      },
      batchDelete: function () {
        var appIds = this.selectedApps.map( app => app.id);
        this.doDelete(appIds);
      },
      doDelete: function (ids) {
        var _that = this;
        _that.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(function () {
          _that.$http({
            method: 'post',
            url: API.APP_DELETE_POST,
            data: JSON.stringify({apps: ids})
          }).then( (response) => {
            if (response.data.code == '1') {
              _that.$notify({
                message: '应用删除成功！',
                type: 'success',
                offset: 120
              })
              _that.queryAppInfo({page: 1});
            }
          }).catch( (response) => {
            console.log(response)
          })
        }).catch(function () {

        });
      },
      submitRecommended: function (noDialog) {
        var _that = this;
        var submit = function () {
          _that.$http({
            method: 'post',
            url: API.APP_SET_RECOMMEND_VALUE,
            data: JSON.stringify(_that.tempApp)
          }).then( (response) => {
            if (response.data.code) {
              _that.$notify({
                message: '推荐值设置成功',
                type: 'success',
                offset: 120
              })
              //_that.queryAppInfo();                   //需要修改后查询时，放开
              //_that.closeRecommendDialog();
            }
          }).catch( (response) => {

          })
        }
        if (noDialog){
          submit();
        }else {
          _that.$refs['recommendedRef'].validate( (va) => {
            if (va){
              submit();
            }
          })
        }

      },
      onCancelClick: function(){
        this.closeRecommendDialog();
      },
      pageChange: function (pageInfo) {
        this.queryAppInfo({
          page: pageInfo.currentPage,
          pageSize: pageInfo.pageSize
        })
      },
      appNameInput: function () {
        var _that = this;
        manaUtil.debounce(function () {
          _that.queryAppInfo({page: 1});
        },500);
      },
      closeRecommendDialog: function (done) {
        this['recommendedVisible'] = false;
        this.$refs['recommendedRef'].resetFields();
        if (done){
          done();
        }
      },
      appendButtonHover: function (event) {
        console.log(event)
      },
      getRecommendInfoObject: function (type) {
        return type == 'recommend' ? {
          type : 'recommend',
          value : '推荐',
          sliderShow : false,
          popoverVisible: false,
        } : {
          type : 'submit',
          value : '确定',
          sliderShow : true,
          popoverVisible: true,
        }
      },
      allDomClick: function (ev) {
        if (this.isActive){
          if (!manaUtil.isOperationClick(ev,['BUTTON'])){
            this.resetBeforeApp();
            this.currentAppId = '';
          }
        }
      }
    },
    computed: {

    },
    destroyed: function () {
      this.isActive = false;
    },
  }
</script>

<style scoped>
  .app-img-div{
    display: inline-block;
    width: 10%;
  }
  .app-img-div img{
    width: 120px;
  }
  .app-text-div{
    display: inline-block;
    width: 85%;
  }
  .el-form-item{
    margin-bottom: 0px;
  }
  .but-div{
    text-align: center;
    margin: 15px 0%;
  }
  .base-div{
    background: white;
    padding: 1% 1%;
  }
  .search-div{
    margin-bottom: 1%;
  }
  .recommended-dialog .el-form-item{
    margin-bottom: 22px;
  }
  .recommended-dialog .el-form--inline .el-form-item__content{
    width: 91%;
  }
  .box-card-div{
    padding: 10px 10px;
    color: #333333;
  }
  .overload-div{
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .append-button :hover{

  }
  .app-search-div{
    width: 30%;
  }
  .recommend-value-slider{
    position: relative;
    /*display: inline-block;*/
  }
  .recommend-value-slider-div{
    height: 20px;
    white-space: nowrap;
    text-align: center;
    /*overflow: hidden;*/
  }
  .buts-div{
    position: absolute;
    top: 30px;
    right: 60px;
  }
  .app-dialogs-div .recommend-value-input{
    width: auto;
  }
  .app-dialogs-div .hint-span{
    margin-left: 10px;
    color: #3a8ee6;
    font-size: 12px;
  }
  /*.el-card .el-card__body{*/
  /*padding-top: 10px;*/
  /*}*/
</style>
<style scoped>
  .app-info-div .el-form{
    margin-left: 25px;
  }
  .app-info-div .el-form-item{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
<style lang="stylus" >
  .app-dialogs-div .el-dialog .el-dialog__body{
    padding: 20px 40px;
  }
  .app-info-div .el-card .el-card__header{
    background: #F0F2F5;
    padding: 0px 0px;
  }

</style>
