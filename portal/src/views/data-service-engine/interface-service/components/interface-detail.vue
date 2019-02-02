<!--
     /**
      * 组件名称
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/8/1
      * @example 调用示例
      *  <interface-detail></interface-detail>
      */
       -->
<template>
  <base-container :nav-items="navItems">
    <el-row :gutter="20">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <div class="interContainer" style="">
          <el-row :gutter="20" style="margin-left: 1px;margin-right: 1px;">
            <el-col :span="24">
              <div class="fl">
                <i class="iconfont icons-xinhao" style="font-size:18px;color:#333333;"></i>
                <span class="detail-title fwb">{{baseInfo.apiName}}</span>
              </div>
              <div class="fr">
                <el-button opt-type="COLLECTION" plain size="small" @click="collect(baseInfo)" :type="'primary'" v-show="baseInfo.status !== '下线中'">
                            <i :class="['icon iconfont', $store.state.auth.isLogin && baseInfo.isCollect === '1' ? 'el-icon-star-on' : 'el-icon-star-off']"></i>
                            {{$store.state.auth.isLogin && baseInfo.isCollect === '1' ? '已收藏' : '收藏'}}
                          </el-button>
                <!-- 未订阅 or 订阅中  -->
                 <el-button opt-type="SUBSCRIPTION" type="danger" plain size="small" @click="subscript(baseInfo)" v-if="baseInfo.isSubs != '1'">
                            <i :class="['icon iconfont', $store.state.auth.isLogin && baseInfo.isSubs === '0' || !$store.state.auth.isLogin ? 'icons-subscription-soft' : 'icons-subscription-solid']"></i>
                           {{baseInfo.subsText }}
                          </el-button>
                 <!-- 已订阅 -->         
                 <el-button opt-type="SUBSCRIPTION_CANCEL" type="danger" plain size="small" @click="subscript(baseInfo)" v-if="$store.state.auth.isLogin && baseInfo.isSubs == '1'">
                            <i :class="['icon iconfont', 'icons-subscription-solid']"></i>
                           {{baseInfo.subsText }}
                          </el-button>         
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div class="detail-simple-info ml10">
              <dl>
                <!-- <span>所属主题 : {{baseInfo.themeType}}</span> -->
                <dt><span>组织来源:</span></dt>
                <dd><span>{{baseInfo.dataSource}}</span></dd>
                <dt><span>开放类型:</span></dt>
                <dd><span>{{baseInfo.openType}}</span></dd>
                <dt><span>更新周期:</span></dt>
                <dd><span>{{baseInfo.dataUpdatePeriod}}</span></dd>
                <!-- <dt><span>更新时间:</span></dt>
                <dd><span>{{baseInfo.updateTime|formatDate}}</span></dd> -->
              </dl>
              <dl>
                <!-- <span>所属主题 : {{baseInfo.themeType}}</span> -->
                <dt><span>访问量：</span></dt>
                <dd><span>{{baseInfo.viewCount}}</span></dd>
                <dt><span>收藏量：</span></dt>
                <dd><span>{{baseInfo.collectCount}}</span></dd>
                <dt><span>订阅量:</span></dt>
                <dd><span>{{baseInfo.subsCount}}</span></dd>
              </dl>
              <dl>
                <dt><span>资源描述:</span></dt>
                <dd style="width: 80%;" class="title-ellipsis" :title="baseInfo.remark"><span>{{baseInfo.remark}}</span></dd>
              </dl>
            </div>
          </el-row>
          <div class="pd10">
            <el-tabs>
              <el-tab-pane style="padding-right: 30px">
                <span slot="label"><i class="el-icon-info"></i> 基本信息</span>
                <api-panel>
                  <span slot="header">基本信息</span>
                  <info-list>
                    <info-item label="接口名称" :value="baseInfo.apiName"></info-item>
                    <info-item label="接口目录" :value="baseInfo.resourceName ? baseInfo.resourceName : '无'"></info-item>
                    <info-item label="接口状态" :value="baseInfo.status ? baseInfo.status : '无'"></info-item>
                    <info-item label="所属主题" :value="baseInfo.itemBeanForCatalogAndApi &&　baseInfo.itemBeanForCatalogAndApi.jichu ? baseInfo.itemBeanForCatalogAndApi.jichu : '无'"></info-item>
                    <info-item label="开放类型" :value="baseInfo.openType ? baseInfo.openType : '无'"></info-item>
                    <info-item label="所属基础" :value="baseInfo.itemBeanForCatalogAndApi &&　baseInfo.itemBeanForCatalogAndApi.zhuti ? baseInfo.itemBeanForCatalogAndApi.zhuti : '无'"></info-item>
                    <info-item label="开放条件" :value="baseInfo.openCondition  ? baseInfo.openCondition : '无'"></info-item>
                    <info-item label="所属部门" :value="baseInfo.itemBeanForCatalogAndApi &&　baseInfo.itemBeanForCatalogAndApi.department ?　baseInfo.itemBeanForCatalogAndApi.department : '无'"></info-item>
                    <info-item label="共享方式分类" :value="baseInfo.sharingWay ? baseInfo.sharingWay : '无'"></info-item>
                    <info-item label="组织来源" :value="baseInfo.dataSource ? baseInfo.dataSource : '无'"></info-item>
                    <info-item label="共享方式类型" :value="baseInfo.sharingType ? (baseInfo.sharingType === 'api' ? '接口' : '无') : '无'"></info-item>
                    <info-item label="更新周期" :value="baseInfo.dataUpdatePeriod ? baseInfo.dataUpdatePeriod : '无'"></info-item>
                    <info-item label="共享类型" :value="baseInfo.sharingProperty ? baseInfo.sharingProperty : '无'"></info-item>
                    <info-item label="资源格式" :value="baseInfo.resourceType ? baseInfo.resourceType : '无'"></info-item>
                    <info-item label="共享条件" :value="baseInfo.sharingCondition ? baseInfo.sharingCondition : '无'"></info-item>
                    <info-item label="资源格式类型" :value="baseInfo.resourceTypeDetail ? baseInfo.resourceTypeDetail : '无'"></info-item>
                  </info-list>
                </api-panel>
                <api-panel>
                  <span slot="header">内容简介</span>
                  <info-list>
                    <info-item label="资源描述" :title="baseInfo.remark" :value="baseInfo.remark"></info-item>
                  </info-list>
                </api-panel>
                <api-panel>
                  <span slot="header">使用情况</span>
                  <info-list>
                    <info-item label="访问量" :value="baseInfo.viewCount"></info-item>
                    <info-item label="收藏量" :value="baseInfo.collectCount"></info-item>
                    <info-item label="订阅量" :value="baseInfo.subsCount"></info-item>
                    <!-- <info-item label="调用次数" :value="baseInfo.callCount"></info-item> -->
                  </info-list>
                </api-panel>
                <api-panel v-show="baseInfo.isSubs === '1'">
                  <span slot="header">订阅信息</span>
                  <info-list>
                    <info-item label="接口url" :value="baseInfo.url ? baseInfo.url : '无'"></info-item>
                    <info-item label="token" :value="baseInfo.token ? baseInfo.token : '无'"></info-item>
                  </info-list>
                </api-panel>
              </el-tab-pane>
              <el-tab-pane style="padding-right: 30px">
                <span slot="label"><i class="el-icon-date"></i> 接口说明</span>
                <!--<api-panel v-if="$store.state.auth.isLogin && baseInfo.isSubs === '1'">-->
                  <!--<span slot="header">服务调用</span>-->
                  <!--<span>上下文地址 : {{interParams.visitAddress}}</span><br/>-->
                  <!--<span>token : {{interParams.token}}</span>-->
                  <!--&lt;!&ndash;<span>接口版本:1.0</span>&ndash;&gt;-->
                <!--</api-panel>-->
                <api-panel>
                  <span slot="header">请求参数</span>
                  <span>所有参数都需要进行URL编码</span><br/>
                  <span>传入参数</span><br/>
                  <el-table
                    :data="interParams.requestList"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="paramName"
                      label="参数名称">
                    </el-table-column>
                    <el-table-column
                      prop="paramType"
                      label="参数类型">
                    </el-table-column>
                    <el-table-column
                      prop="paramLength"
                      label="字段长度">
                    </el-table-column>
                    <el-table-column
                      prop="necessary"
                      label="是否必填">
                    </el-table-column>
                    <el-table-column
                      prop="paramDirection"
                      label="入参/出参">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="参数注释">
                    </el-table-column>
                  </el-table>
                </api-panel>
                <api-panel>
                  <span>返回参数</span><br/>
                  <el-table
                    :data="interParams.responseList"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="itemNameCn"
                      label="参数名称">
                    </el-table-column>
                    <el-table-column
                      prop="itemDataType"
                      label="参数类型">
                    </el-table-column>
                    <el-table-column
                      prop="itemDataLength"
                      label="字段长度">
                    </el-table-column>
                    <el-table-column
                      prop="openType"
                      label="开放类型">
                    </el-table-column>
                    <el-table-column
                      label="开放条件">
                      <template slot-scope="scope">
                        {{scope.row.openCondition ? scope.row.openCondition : '无'}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="备注">
                      <template slot-scope="scope">
                        {{scope.row.remark ? scope.row.remark : '无'}}
                      </template>
                    </el-table-column>
                  </el-table>
                </api-panel>
              </el-tab-pane>
              <el-tab-pane style="padding-right: 30px">
                <span slot="label"><i class="el-icon-picture-outline"></i> 错误码参照表</span>
                <api-panel>
                  <span slot="header">服务级错误码参照(error_code):</span>
                  <el-table
                    :data="errorData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="错误码">
                    </el-table-column>
                    <el-table-column
                      prop="content"
                      label="说明">
                    </el-table-column>
                  </el-table>
                </api-panel>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <el-dialog title="订阅" :visible.sync="dialogFormVisible">
          <el-form :model="subscForm" ref="subscForm" :rules="subscRules" label-width="100px">
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
        <!-- <el-dialog title="订阅信息" :visible.sync="dialogApproveFormVisible">
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
          <div slot="footer" class="dialog-footer" v-if="approveForm.isSub==='1'">
            <el-button type="danger" size="small" @click="dialogFormVisible = false">取消订阅</el-button>
          </div>
        </el-dialog> -->
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
  </base-container>
</template>
<script>
  import dada from './interface-detail.js';
  export default {
    ...dada
  };
</script>
<style scoped lang="stylus">
  .interContainer {
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #d1cdd1aa;
    padding: 30px 20px;
  }

  .detail-title {
    font-size: 18px;
    font-weight: bolder;
    color: #333333;
  }

  .detail-simple-info {
    margin: 8px 10px;
  }

  .detail-simple-info > dl {
    margin-bottom: 10px;
    color: #656565;
    font-size: 12px;
    display: flex;
  }
  .detail-simple-info dt:first-child  span{
    margin-left 20px;
  }
  .detail-simple-info dt{
    margin 3px 10px;
    width 8%;
  }
  .detail-simple-info dd {
    margin: 3px 10px;
    width 15%;
  }
  .collect-btn.el-button.is-round {
    padding: 8px 20px;
  }
</style>
<style lang="stylus">
  .el-dialog {
    min-width 700px;
  }
</style>

