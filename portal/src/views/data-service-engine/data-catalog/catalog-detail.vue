<!--
     /**
      * 资源详情
      * @desc 展示数据目录的详细数据
      * @author wf
      * @date 2018/9/18
      * @example 调用示例
      *  <catalog-detail></catalog-detail>
      */
       -->
<template>
  <base-container :nav-items="navItems">
    <el-row :gutter="20">
      <el-col :span="1">
        &nbsp;
      </el-col>
      <el-col :span="22">
        <div class="resContainer" style="">
          <el-row :gutter="20" style="margin-left: 1px;margin-right: 1px;">
            <el-col :span="24">
              <div class="fl">
                <i class="iconfont icons-shejimulu mr5" style="color:#333333;"></i>
                <span class="detail-title fwb">{{baseInfo.resourceName}}</span>
              </div>
              <div class="fr">
                <el-button opt-type="COLLECTION" class="card-buttton" type="primary" plain size="mini"
                           @click="cataCollect(baseInfo.id,baseInfo.isCollect)" v-show="baseInfo.status !== '下线中'">
                  <i
                    :class="['f14',$store.state.auth.isLogin && baseInfo.isCollect === '1' ? 'el-icon-star-on' : 'el-icon-star-off']"></i>
                  {{$store.state.auth.isLogin && baseInfo.isCollect === '1' ? '已收藏' : '收藏'}}
                </el-button>
                <el-button opt-type="SUBSCRIPTION_CANCEL" class="card-buttton" type="danger" plain size="mini"
                           @click="unsubscribeClick(baseInfo)"
                           v-if="$store.state.auth.isLogin &&baseInfo.isSubs==='1'">
                  <i class="iconfont icons-subscription-solid f14"></i>
                  已订阅
                </el-button>
                <el-button v-else opt-type="SUBSCRIPTION" class="card-buttton" type="danger" plain size="mini"
                           @click="subscClick(baseInfo,baseInfo.isSubs)">
                  <i :class="['icon iconfont', $store.state.auth.isLogin && baseInfo.isSubs === '2'? 'icons-subscription-solid' : 'icons-subscription-soft']" style="font-size: 14px;"></i>
                  {{$store.state.auth.isLogin && baseInfo.isSubs==='2'?'订阅中':'订阅'}}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div class="detail-simple-info">
              <div class="row">
                <div class="row-td"><span>组织来源 : </span><span>{{baseInfo.dataSource}}</span></div>
                <div class="row-td"><span>共享方式类型 : </span><span>{{baseInfo.sharingType | formatSharingType}}</span></div>
                <div class="row-td"><span>更新周期 : </span><span>{{baseInfo.dataUpdatePeriod}}</span></div>
              </div>
              <div class="row">
                <div class="row-td"><span>访问量 : </span><span>{{baseInfo.viewCount}}</span></div>
                <div class="row-td"><span>收藏量 : </span><span>{{baseInfo.collectCount	}}</span></div>
                <div class="row-td"><span>订阅量 : </span><span>{{baseInfo.subsCount}}</span></div>
              </div>
              <div class="row">
                <div><label class="ml20">资源描述 : </label><span class="ml20">{{baseInfo.remark}}</span></div>
              </div>
            </div>
          </el-row>
          <div style="padding: 10px;">
            <el-tabs v-model="tabName">
              <el-tab-pane style="padding-right: 30px;" name="baseinfo">
                <span slot="label"><i class="el-icon-info"></i> 基本信息</span>
                <api-panel>
                  <span slot="header">基本信息</span>
                  <info-list>
                    <info-item style="width:100%;" label="目录名称" :value="baseInfo.resourceName"></info-item>
                    <info-item label="目录状态" :value="baseInfo.status ? baseInfo.status : '无'"></info-item>
                    <info-item label="所属主题" :value="baseInfo.itemBeanForCatalogAndApi.zhuti ? baseInfo.itemBeanForCatalogAndApi.zhuti : '无'"></info-item>
                    <info-item label="开放类型" :value="baseInfo.openType ? baseInfo.openType : '无'"></info-item>
                    <info-item label="所属基础" :value="baseInfo.itemBeanForCatalogAndApi.jichu ? baseInfo.itemBeanForCatalogAndApi.jichu : '无'"></info-item>
                    <info-item label="开放条件" :value="baseInfo.openCondition ? baseInfo.openCondition : '无'"></info-item>
                    <info-item label="所属部门" :value="baseInfo.itemBeanForCatalogAndApi.department ? baseInfo.itemBeanForCatalogAndApi.department : '无'"></info-item>
                    <info-item label="共享方式分类" :value="baseInfo.sharingWay ? baseInfo.sharingWay : '无'"></info-item>
                    <info-item label="组织来源" :value="baseInfo.dataSource ? baseInfo.dataSource : '无'"></info-item>
                    <info-item label="共享方式类型" :value="baseInfo.sharingType | formatSharingType"></info-item>
                    <info-item label="更新周期" :value="baseInfo.dataUpdatePeriod ? baseInfo.dataUpdatePeriod : '无'"></info-item>
                    <info-item label="共享类型" :value="baseInfo.sharingProperty ? baseInfo.sharingProperty : '无'"></info-item>
                    <info-item label="资源" :value="baseInfo.resourceType ? baseInfo.resourceType : '无'"></info-item>
                    <info-item label="共享条件" :value="baseInfo.sharingCondition ? baseInfo.sharingCondition : '无'"></info-item>
                    <info-item label="资源格式类型" :value="baseInfo.resourceTypeDetail ? baseInfo.resourceTypeDetail : '无'"></info-item>
                  </info-list>
                </api-panel>
                <api-panel>
                  <span slot="header">内容简介</span>
                  <info-list>
                    <info-item style="width:100%;" label="资源描述" :value="baseInfo.remark"></info-item>
                  </info-list>
                </api-panel>
                <api-panel>
                  <span slot="header">使用情况</span>
                  <info-list>
                    <info-item label="访问量" :value="baseInfo.viewCount"></info-item>
                    <info-item label="收藏量" :value="baseInfo.collectCount"></info-item>
                    <info-item label="订阅量" :value="baseInfo.subsCount"></info-item>
                  </info-list>
                </api-panel>
                <api-panel v-show="baseInfo.isSubs === '1'">
                  <span slot="header">订阅信息</span>
                  <info-list v-if="baseInfo.applyType === '3'">
                    <info-item label="下行路径" :value="baseInfo.url" style="width: 100%;"></info-item>
                  </info-list>
                  <info-list v-else-if="baseInfo.applyType === '2'">
                    <info-item label="接口url" :value="baseInfo.url"></info-item>
                    <info-item label="token" :value="baseInfo.token"></info-item>
                  </info-list>
                  <div v-else>
                    <info-list>
                      <info-item label="数据库名称" :value="baseInfo.dbName"></info-item>
                      <info-item label="表名称" :value="baseInfo.tableName"></info-item>
                    </info-list>
                    <el-table :data="baseInfo.columnList">
                      <el-table-column prop="deptCode" label="部门编码"></el-table-column>
                      <el-table-column prop="enName" label="英文名"></el-table-column>
                      <el-table-column prop="cnName" label="中文名"></el-table-column>
                      <el-table-column prop="type" label="类型"></el-table-column>
                    </el-table>
                  </div>
                </api-panel>
              </el-tab-pane>
              <el-tab-pane style="padding-right: 30px;padding-left:30px;">
                <span slot="label"><i class="el-icon-date"></i> 数据项</span>
                <el-table
                  :data="dataItems"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <!-- <el-table-column
                    prop="itemNameEn"
                    label="英文名">
                    <template slot-scope="scope">
                      {{scope.row.itemNameEn || '暂无数据'}}
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="itemNameCn"
                    label="信息项名称">
                  </el-table-column>
                  <el-table-column
                    prop="itemDataType"
                    label="信息项类型">
                  </el-table-column>
                  <el-table-column
                    prop="itemDataLength"
                    label="信息项长度">
                  </el-table-column>
                  <el-table-column
                    prop="sharingProperty"
                    label="共享类型">
                  </el-table-column>
                  <el-table-column
                    prop="sharingCondition"
                    label="共享条件">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间">
                    <template slot-scope="scope">
                      {{dateFormat(scope.row.createTime)}}
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  style="padding-top: 20px"
                  v-show="dataItemsPages.total>5"
                  @size-change="handleDItemsSizeChange"
                  @current-change="handleDItemsCurrentChange"
                  :current-page="dataItemsPages.currentPage"
                  :page-sizes="[5,10, 20,30, 50]"
                  :page-size="dataItemsPages.pageSize"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataItemsPages.total">
                </el-pagination>

              </el-tab-pane>
              <el-tab-pane name="analysis">
                <span slot="label"><i class="el-icon-picture-outline"></i> 数据分析</span>
                <div style="position: relative;width:100%">
                  <div id="echarts" style="height:450px;width:680px;">
                    <span v-if="!chartIsShow" class="noData">暂无数据！</span>
                  </div>
                  <div style="position: absolute;left: 50%;right:0;height:450px;top:0;">
                    <el-row :gutter="20" style="height: 100%;">
                      <el-col :span="2" style="height: 100%;">
                        &nbsp;
                      </el-col>
                      <el-col :span="7" style="height: 100%;">
                        <div class="countPanel blue">
                          <div class="title">
                            <i class="iconfont icons-fuwu-active" style="color:#4F82FF;"></i>
                          </div>
                          <div class="body">
                        <span class="count">
                        {{baseInfo.viewCount}}<span class="connoer">次</span>
                        </span>
                            <span class="des">目录访问量</span>
                          </div>
                        </div>
                      </el-col>

                      <el-col :span="7" style="height: 100%;">
                        <div class="countPanel yellow">
                          <div class="title">
                            <i class="iconfont icons-jiekou" style="color:#4F82FF;"></i>
                          </div>
                          <div class="body">
                        <span class="count">
                        {{baseInfo.subsCount}}<span class="connoer">次</span>
                        </span>
                            <span class="des">目录订阅量</span>
                          </div>
                        </div>
                      </el-col>

                      <el-col :span="7" style="height: 100%;">
                        <div class="countPanel green">
                          <div class="title">
                            <i class="iconfont icons-buoumaotubiao44" style="color:4F82FF;"></i>
                          </div>
                          <div class="body">
                        <span class="count">
                          {{baseInfo.collectCount}}<span class="connoer">次</span>
                        </span>
                            <span class="des">目录收藏量</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="1">
                        &nbsp;
                      </el-col>
                    </el-row>

                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane style="padding-right: 30px;">
                <span slot="label"><i class="el-icon-share"></i> API服务</span>
                <api-panel :show-icon="false" :showIcon="true">
                  <span slot="header">接口列表</span>
                  <el-table
                    :data="resApis"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="apiName"
                      label="接口名称">
                      <template slot-scope="scope">
                        <a href="javascript:void (0)"
                           @click="$router.push({name:'interfaceDetail',params:{id:scope.row.catalogId,title:'接口详情'}})">{{scope.row.apiName}}</a>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="collect"
                      label="收藏状态">
                      <template slot-scope="scope">
                        {{scope.row.collect?'已收藏':'未收藏'}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="sub"
                      label="订阅状态">
                      <template slot-scope="scope">
                        {{scope.row.sub | formatSubState }}
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    style="padding-top: 20px"
                    v-show="APIsPages.total>5"
                    @size-change="handleAPISizeChange"
                    @current-change="handleAPICurrentChange"
                    :current-page="APIsPages.currentPage"
                    :page-sizes="[5,10, 20, 30, 50]"
                    :page-size="APIsPages.pageSize"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="APIsPages.total">
                  </el-pagination>
                </api-panel>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="1">
        &nbsp;
      </el-col>
    </el-row>
    <el-dialog title="订阅" :visible.sync="dialogFormVisible">
      <el-form :model="subscForm" ref="subscForm" :rules="subscRules" label-width="90px">
        <el-form-item label="用户类型" prop="useType">
          <el-radio-group v-model="subscForm.useType">
            <el-radio :label="0">学生</el-radio>
            <el-radio :label="1">机关</el-radio>
            <el-radio :label="2">事业单位</el-radio>
            <el-radio :label="3">社会团体</el-radio>
            <el-radio :label="4">企业</el-radio>
            <el-radio :label="5">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用途" prop="effectInfo">
          <el-radio-group v-model="subscForm.effectInfo">
            <el-radio :label="0">学习</el-radio>
            <el-radio :label="1">研究</el-radio>
            <el-radio :label="2">商业</el-radio>
            <el-radio :label="3">公益</el-radio>
            <el-radio :label="4">教育</el-radio>
            <el-radio :label="5">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申请理由" prop="applyReason">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="subscForm.applyReason">
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用期限">
              <el-select v-model="subscForm.applyDay" placeholder="请选择使用期限">
                <el-option label="三天" value="3"></el-option>
                <el-option label="一周" value="7"></el-option>
                <el-option label="一个月" value="30"></el-option>
                <el-option label="三个月" value="90"></el-option>
                <el-option label="半年" value="180"></el-option>
                <el-option label="一年" value="365"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自定义" prop="applyDay">
              <el-input placeholder="请输入天数" v-model="subscForm.applyDay" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="medium" @click="dialogFormVisible = false" plain>取 消</el-button>
        <el-button type="primary" size="medium" @click="subscSubmitForm('subscForm')" plain>确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="订阅信息" :visible.sync="dialogApproveFormVisible">
      <el-form :model="approveForm" label-width="100px">
        <el-form-item label="用户类型 : ">
          {{approveForm.useType}}
        </el-form-item>
        <el-form-item label="用途 : ">
          {{approveForm.effectInfo}}
        </el-form-item>
        <el-form-item label="申请理由 : ">
          {{approveForm.applyReason}}
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用期限 : ">
              {{approveForm.applyDay}} 天
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </base-container>
</template>

<script>
  import API from '../../../rest-api/restApi';
  import BreadNavMixin from '../../../mixins/bread-nav';
  import resize from '@/mixins/resize';

  import BaseContainer from '../../../component/base-container';
  import InfoList from '../../../component/info-list';
  import InfoItem from '../../../component/info-item';
  import Vue from 'vue';
  import ApiPanel from '../../../component/api-panel';
  import dataFormatFnList from '../../../util/dataFormat';
  import catalogSharingTypes from './catalog-list-sharingTypes';

  export default {
    name: 'catalog-detail',
    components: {ApiPanel, BaseContainer, InfoList, InfoItem},
    mixins: [BreadNavMixin, resize],
    props: {},
    data () {
      var dayCheck = (rule, value, callback) => {
        if (!/^[1-9]+[0-9]*$/.test(value) || Number(value) > 365 || Number(value) <= 0) {
          this.subscForm.applyDay = '';
          return callback(new Error('使用期限请输大于0~365的整数!'));
        }
        callback();
      };

      return {
        tabName: 'baseinfo',
        baseInfo: {itemBeanForCatalogAndApi: {}},
        resApis: [],
        dataItems: [],
        statistics: {},
        dataCatalogId: null,
        chart: null,
        chartIsShow: false,
        dataItemsPages: {
          currentPage: 1,
          total: 0,
          pageSize: 10
        },
        APIsPages: {
          currentPage: 1,
          total: 0,
          pageSize: 10
        },
        approveForm: {}, // 弹框
        dialogFormVisible: false,
        dialogApproveFormVisible: false, // 弹框判断
        subscForm: {
          applyType: '1',
          apiId: '',
          apiName: '',
          useType: '',
          effectInfo: '',
          applyReason: '',
          applyDay: ''
        },
        subscRules: {
          useType: [
            {required: true, message: '请选择用户类型', trigger: 'change'}
          ],
          effectInfo: [
            {required: true, message: '请选择用途', trigger: 'change'}
          ],
          applyReason: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ],
          applyDay: [
            {required: true, message: '请输入使用期限'},
             {required: true, validator: dayCheck, trigger: 'blur'}
          ]
        },
        subscripList: []
      };
    },
    beforeCreate () {
      // 动态加载echarts插件，减少初次加载的js包大小
      if (!this.$echarts) {
        import('echarts').then(e => {
          Vue.prototype.$echarts = e;
        });
      }
    },
    created () {
      let param = {'id': this.$route.params.id};

      this.dataCatalogId = this.$route.params.id;
      this.$http.post(API.RES_DETAIL, JSON.stringify(param)).then(resp => {
        this.baseInfo = resp.data.data;
      });
      this.getApis(); // API服务
      this.getDataItems(); // 数据项
      this.postResStaics(param); // 统计数据
    },
    mounted () {
    },
    filters: {
      formatDate: function (value) {
        if (!value) return '';
        value = value.slice(0, 19).replace('T', ' ');
        return value;
      },
      formatSubState: function (value) {
        switch (value) {
          case 0 : return '未订阅';
          case 1 : return '已订阅';
          case 2 : return '订阅中';
          default: return '未订阅';
        }
      },
      formatSharingType (value) {
        if(!value) return '无';
        var resu = catalogSharingTypes.filter(item => item.value === value);
        return resu && resu.length > 0 ? resu[0].label : '无';
      }
    },
    methods: {
      // 日期格式转换
      dateFormat (str) {
        return dataFormatFnList.dateFormat(str);
      },
      // 获取基本信息
      getList () {
        let _that = this;

        this.$http.post(API.RES_DETAIL, JSON.stringify({'id': _that.dataCatalogId})).then(resp => {
          _that.baseInfo = resp.data.data;
        });
      },
      // API服务
      getApis () {
        let _that = this;
        let params = {
          'id': String(_that.dataCatalogId),
          'page': _that.APIsPages.currentPage,
          'pageSize': _that.APIsPages.pageSize,
          'dir': 'desc',
          'field': 'id'
        };
        // 请求接口列表数据

        this.$http.post(API.RES_APIS_POST, JSON.stringify(params)).then(res => {
          _that.resApis = res.data.data.data;
          _that.APIsPages.total = res.data.data.total;
        });
      },
      // 请求数据项
      getDataItems () {
        let _that = this;
        let ditemsParams = {
          'id': String(_that.dataCatalogId),
          'page': _that.dataItemsPages.currentPage,
          pageSize: _that.dataItemsPages.pageSize
        };

        this.$http.post(API.RES_DATA_ITEM_POST, JSON.stringify(ditemsParams)).then(res => {
          _that.dataItems = res.data.data.data;
          _that.dataItemsPages.total = res.data.data.total;
        });
      },
      // 请求统计数据
      postResStaics (params) {
        let _that = this;

        this.$http.post(API.RES_STAICS_POST, JSON.stringify(params)).then(res => {
          _that.statistics = res.data.data;
          if (_that._isMounted) {
            _that.initChart();
          } else {
            _that.mountEndInterval = setInterval(() => {
              clearInterval(this.mountEndInterval);
              _that.initChart();
            }, 500);
          }
        });
      },
      collection () {
        let params = {id: this.baseInfo.id, collectType: 0, status: this.baseInfo.collectState === '1' ? '0' : '1'};

        this.$http.post(API.RES_COLL_POST, JSON.stringify(params)).then(resp => {
          this.baseInfo.collectState = (this.baseInfo.collectState == '0' || this.baseInfo.collectState == null) ? '1' : '0';
          this.$notify({
            title: '成功',
            message: resp.data.message,
            type: 'success',
            duration: 2000, // 弹框显示时间，毫秒,
            offset: 120
          });
          this.postResStaics({'id': this.$route.params.dataCatalogId});
        });
      },
      cancelCollection () {
        this.$confirm('您确定取消收藏么?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.collection();
        }).catch(() => {
          this.$notify({
            title: '成功',
            message: '已取消删除',
            type: 'success',
            duration: 2000, // 弹框显示时间，毫秒,
            offset: 120
          });
        });
      },
      initChart () {
        if (this.statistics.seriesData.map(d => d.data.length).reduce((a, b) => a + b) === 0) {
          this.chartIsShow = false;
          return;
        } else {
          this.chartIsShow = true;
        }
        var option = {
          title: {
            text: '目录访问量',
            x: 50
            // subtext: '测试数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.statistics.legendData
          },
          toolbox: {
            show: true,
            feature: {
              // mark: {show: true},
              // dataView: {show: true, readOnly: false},
              // magicType: {show: true, type: ['line', 'bar']},
              // restore: {show: true},
              // saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.statistics.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: this.statistics.seriesData.map(ser => {
            return {
              name: ser.name,
              type: 'line',
              data: ser.data,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            };
          })
        };
        var dc = document.getElementById('echarts');
        // console.log(dc.parentElement.clientWidth)

        dc.style.width = document.getElementsByClassName('el-tabs__content')[0].clientWidth / 2 + 'px';
        // 判断echarts是否加载完毕
        if (this.$echarts) {
          this.chart = this.$echarts.init(document.getElementById('echarts'));
          this.chart.setOption(option);
        } else {
          this.timeinterval = setInterval(() => {
            if (this.$echarts) {
              clearInterval(this.timeinterval);
              this.chart = this.$echarts.init(document.getElementById('echarts'));
              this.chart.setOption(option);
            }
          }, 500);
        }
      },

      handleDItemsSizeChange (size) {
        this.dataItemsPages.pageSize = size;
        this.dataItemsPages.currentPage = 1;
        this.getDataItems();
      },
      handleDItemsCurrentChange (page) {
        this.dataItemsPages.currentPage = page;
        this.getDataItems();
      },
      handleAPISizeChange (size) {
        this.APIsPages.pageSize = size;
        // this.getApis();
      },
      handleAPICurrentChange (page) {
        this.APIsPages.currentPage = page;
        // this.getApis();
      },
      // 收藏
      cataCollect (id, cataStatus) {
        let status = cataStatus === '0' ? '1' : '0';

        if (cataStatus === '1') {
          this.$confirm('确定取消收藏该数据目录吗?', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
          }).then(() => {
            this.collect(id, status);
          });
        } else if (cataStatus === '0') {
          this.collect(id, status);
        }
      },
      // 收藏请求
      collect (id, status) {
        let param = {
          'id': id,
          'status': status,
          'collectType': '1'
        };

        this.$http.post(API.CATALOG_COLLECT, param).then((res) => {
          this.getList();
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success',
            offset: 120
          });
        }).catch((res) => {
          console.log(res);
        });
      },
      _promptApi () {
        this.$alert('请到API接口模块中订阅', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        });
      },
      /**
       * @description 用户所在部门该目录已订阅过，该目录不能重复订阅
       * @param catalog
       * @returns {Promise<any>}
       * @private
       */
      _checkUserDepSubsStatus (catalog) {
        var _this = this;
        return new Promise((resolve, reject) => {
          _this.$http.get(API.CATALOG_SUBS_STATUS_CHECK + '?' + this.$qs.stringify({apiId: catalog.id})).then(res => {
            if (!res.data.data) {
              _this.$confirm('您所在的部门已经有人订阅过该目录了，请不要重复订阅！', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning',
                center: true
              });
              return reject(res.data);
            }
            resolve(res.data);
          }).catch(err => {
            console.log(err);
          });
        });
      },
      // 订阅按钮
      subscClick (item, isSub) {
        let _that = this;
        if (isSub === '2') return;
        // todo 本部门用户不能订阅相同部门数据
        if (item.dataSource === this.$store.state.user.department.departmentName) {
          return _that.$confirm('本部门用户不能订阅本部门数据', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning',
            center: true
          });
        }
        if (item.sharingType === 'api') { // 目录类型是api时到api接口订阅
          return _that._promptApi();
        }
  
        this.subscForm.apiId = item.id;
        this.subscForm.apiName = item.resourceName;

        // todo file&DB类型 本部门中已订阅的数据不能重复订阅
        if (item.sharingType === 'file' || item.sharingType === 'DB') {
          return _that._checkUserDepSubsStatus(item).then(res => {
            // todo 未订阅 校验通过
            this.dialogFormVisible = true;
          });
        }
        // todo 其他类型未订阅
        this.dialogFormVisible = true;
      },
      // 订阅表单提交
      subscSubmitForm (formName) {
        let _that = this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = Object.assign(this.subscForm); // TODO待后续接口对接时注释需打开

            this.$http({
              method: 'post',
              url: globals.serverUrl + '/ds/apiInfo/subscription',
              data: JSON.stringify(data)
            }).then((res) => {
              this.dialogFormVisible = false;
              _that.$notify({
                title: '成功',
                message: res.data.message,
                type: 'success',
                offset: 120
              });
              _that.getList();
              _that.$refs['subscForm'].resetFields();
            }).catch((response) => {
              console.log(response);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 取消订阅
      unsubscribeClick (item) {
        let _that = this;

        if (item.sharingType === 'api') { // 目录类型是api时到api接口订阅
          return _that._promptApi();
        }
  
        this.$confirm('是否取消订阅?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          let data = {apiId: item.applyId, applyType: '1'};

          this.$http({
            method: 'post',
            url: globals.serverUrl + '/ds/apiInfo/cancelsubs',
            data: JSON.stringify(data)
          }).then((res) => {
            _that.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success',
              offset: 120
            });
            _that.getList();
          }).catch((response) => {
            console.log(response);
          });
        }).catch(() => {
        });
      }
    },
    computed: {
      getDataItemsByPage () {
        if (this.dataItems.length > 0) {
          let startIndex = (this.dataItemsPages.currentPage - 1) * this.dataItemsPages.pageSize;
          let endIndex = startIndex + this.dataItemsPages.pageSize;

          return this.dataItems.slice(startIndex, endIndex);
        }
      }
      // getApisByPage () {
      //   if (this.resApis.length > 0) {
      //     let startIndex = (this.APIsPages.currentPage - 1) * this.APIsPages.pageSize;
      //     let endIndex = startIndex + this.APIsPages.pageSize;
      //
      //     return this.resApis.slice(startIndex, endIndex);
      //   }
      // }
    },
    watch: {
      tabName (newValue, oldValue) {
        if (newValue == 'analysis') {
          document.getElementById('echarts').style.width = '50%';
        }
      }
    }
  };
</script>

<style scoped>
  .resContainer {
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #d1cdd1aa;
    padding: 30px 20px;
    /*-webkit-box-shadow: inset hoff voff blur #000;*/
    /*-moz-box-shadow: inset hoff voff blur #000;*/
  }

  .detail-title {
    color: #333333;
    font-size: 18px;
    font-weight: bolder;
  }

  .detail-simple-info {
    margin: 10px 0 5px;
  }

  .detail-simple-info .row {
    margin-bottom: 8px;
    color: #656565;
    font-size: 12px;
    display: flex;
  }

  .detail-simple-info .row > div {
    margin: 3px 20px;
  }
  .detail-simple-info .row > div.row-td {
    min-width: 310px;
  }
  .detail-simple-info .row > div span:first-child {
    margin-left: 20px;
  }
  .detail-simple-info .row > div span:nth-child(odd) {
    width: 80px;
    display: inline-block;
  }
  .detail-simple-info .row > div span:nth-child(even) {
    width: 208px;
    display: inline-block;
  }
  a:link {
    color: #409EFF;
    text-decoration: underline;
  }

  a:visited {
    color: #0000FF;
    text-decoration: none;
  }

  a:hover {
    color: #FF00FF;
    text-decoration: none;
  }

  a:active {
    color: #D200D2;
    text-decoration: none;
  }

  div.countPanel {
    border: 1px solid #fafafa;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    height: 80%;
    margin-top: 10%;
    padding-top: 10px;
    width: 150px;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
  }

  div.countPanel .title {
    height: 80px;
    width: 80px;
    border-radius: 50px;
    text-align: center;
    padding: 15px 10px;
    box-sizing: border-box;
    font-size: 26px;
    margin-left: auto;
    margin-right: auto;
    margin: 10px auto 10px auto;
    padding-top: 26px;
  }

  div.countPanel .title i.iconfont {
    font-size: 3vh;
  }

  div.countPanel.yellow .title {
    color: #FECA19;
    background-color: #FFF6D9;
  }

  div.countPanel.yellow .count {
    color: #FECA19;
  }

  div.countPanel.blue .title {
    color: #4F82FF;
    background-color: #E5ECFF;
  }

  div.countPanel.blue .count {
    color: #4F82FF;
  }

  div.countPanel.green .title {
    color: #29CC97;
    background-color: #DFF7F0;
  }

  div.countPanel.green .count {
    color: #29CC97;
  }

  div.countPanel .title img {
    width: 32px;
    height: 32px;
  }

  div.countPanel .body {
    padding: 10px;
    padding-top: 20px;
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: #747474;
  }

  div.countPanel .connoer {
    font-size: 12px;
  }

  div.countPanel .body .des {
    text-align: center;
    font-size: 14px;
    display: block;
    padding: 20px 10px;
  }

  div.countPanel .body .count {
    text-align: center;
    font-size: 50px;
    display: block;
    margin-top: 40px;

  }

  div.countPanel.yellow .body {

  }

  div.countPanel.blue .body {

  }

  div.countPanel.green .body {

  }

  div.countPanel {
    color: #ffffff;
    /*box-shadow: 0 2px 12px 0 #e6a23c;*/
  }

  #echarts {
    text-align: center
  }

  .noData {
    text-align: center;
    margin-top: 100px;
    display: inline-block;
    font-size: 18px;
  }
</style>
