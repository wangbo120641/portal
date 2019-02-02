<template>
<base-container :navItems="navItems" :bcTop="300" class="interface-service">
     <div slot="banner" class="interface-banner ref">
      <animate-line class="abs"></animate-line>
      <el-row>
        <el-col :span="13" style="padding-top: 100px;padding-left: 7%;">
          <p class="catalog-big-title tc cfff f30">开放 &nbsp;&nbsp; 共享 &nbsp;&nbsp; 共赢</p>
          <p class="catalog-big-title tc cfff pt15 f16">{{$t('project.addressName')}}政务信息共享平台，携手共建美好生活</p>
        </el-col>
        <el-col :span="11" class="tc">
          <img src="/static/image/interface-service/interface-banner-dynamic.png"/>
        </el-col>
      </el-row>
    </div>
    <div class="" >
      <div class="ise-header mt40">
      <el-row>
        <el-col :span="7">&nbsp;</el-col>
        <el-col :span="10">
          <div class="ml10 mr10">
             <el-input placeholder="接口名称搜索" class="search-center" v-model="searchContent" @input="debounceSearch">
              <el-button slot="append" icon="el-icon-search" @click="interfaceDataQuery"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="7">&nbsp;</el-col>
      </el-row>
    </div>
    <div class="ise-content">
      <el-row >
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="5">
            <div class="c-title">
              <div class="fl mt5 mr5"><img src="/static/image/data-catalog/tree-icon.png"></div>
              <label class="fl mt5 cp" @click="categoryQuery"><span class="title-font">{{$route.meta.title + '分类'}}</span></label>
              <span class="fr f12 lh32 pr10 cp" style="color: #1e7dff;" @click="categoryQuery"><i class="el-icon-refresh"></i> 全部</span>
            </div>
           <div class="cl-content content-bg" style="padding: 20px 10px;">
             <el-tree
            :data="treeData"
            :props="{label:'categoryName', children: 'children'}"
            :node-key="'id'"
            ref="tree"
            class="filter-tree"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            @node-click="nodeClick">
              <span class="customer-tree-node" slot-scope="{node, data}">
                <i :class="['icon iconfont icons-wenjianjia', data.selected ? 'selected' : '']"></i>
                <span>{{data.categoryName }}</span>
              </span>
            </el-tree>
           </div>
        </el-col>
        <el-col :span="12">
          <div class="cm-content">
              <div class="c-title">
                <div class="fl mt5 mr5"><img src="/static/image/interface-service/interface-service-cate.png"></div>
                <label class="fl mt5"><span class="title-font">
                  <span style="color: #ff9600;">{{(treeNodeSelected.categoryName ? treeNodeSelected.categoryName : $route.meta.title) }}</span> 有 <span style="color: #ff9600;">{{ pagging.total }}</span>  个接口</span>
                </label>
                <el-button size="mini" class="fr btn-br" style="margin: 5px 0 0 20px;" @click="troggleCollectOrder('collectCount', collectOrder)">
                  收藏量
                  <i :class="['icon iconfont ml10', collectOrder ? 'icons-paixu-shengxu': 'icons-paixu-jiangxu']"></i>
                </el-button>
                <el-button size="mini" class="fr btn-br" style="margin-top: 5px;" @click="troggleSubscriptOrder('subsCount')">
                  订阅量
                  <i :class="['icon iconfont ml10', subscriptOrder ? 'icons-paixu-shengxu': 'icons-paixu-jiangxu']"></i>
                </el-button>
             </div>
             <div class="cl-content  cm-center-content">
               <div v-for="(item) in interfaceData" class="dic-all-con" :key="item.id">
                  <div class="dic-con">
                    <h1><a class="da-title" @click="skipInterfaceDetail(item)"><i class="iconfont icons-xinhao"
                                                                                  style="color:#2364f0;"></i><span
                      style="margin-left: 5px;">{{item.apiName }}</span></a></h1>
                     <el-row class="c6 lh20 pl10 mt5">
                      <el-col :span="9">
                        <div class="mt5 title-ellipsis" :title="item.itemBeanForCatalogAndApi.zhuti">所属主题：{{item.itemBeanForCatalogAndApi.zhuti ?  item.itemBeanForCatalogAndApi.zhuti : '无'}}</div>
                        <div class="mt5">所属部门：{{item.itemBeanForCatalogAndApi.department ? item.itemBeanForCatalogAndApi.department : '无'}}</div>
                        <div class="mt5">所属基础：{{item.itemBeanForCatalogAndApi.jichu ? item.itemBeanForCatalogAndApi.jichu : '无'}}</div>
                        <!-- <div class="mt5">组织来源：{{item.dataSource ? item.dataSource : '无'}}</div> -->
                      </el-col>
                       <el-col :span="9">
                         <div class="mt5">接口目录：{{item.resourceName }}</div>
                         <div class="mt5">开放条件：{{item.openCondition }}</div>
                         <div class="mt5">共享类型：{{item.sharingProperty }}</div>
                       </el-col>
                      <el-col :span="6">
                        <el-button type="primary" plain size="mini" @click="collect(item)" opt-type="COLLECTION">
                          <i :class="['icon f14', $store.state.auth.isLogin && item.isCollect === '1' ? 'el-icon-star-on' : 'el-icon-star-off']"></i>
                          {{$store.state.auth.isLogin && item.isCollect === '1' ? '已收藏' : '收藏'}}
                        </el-button>
                        <el-button type="danger" plain size="mini" @click="subscript(item)" v-if="$store.state.auth.isLogin && item.isSubs == '1'" opt-type="SUBSCRIPTION_CANCEL">
                          <i style="font-size: 14px;" :class="['icon iconfont',  'icons-subscription-solid']"></i>
                          {{item.subsText }}
                        </el-button>
                        <el-button type="danger" plain size="mini" @click="subscript(item)" v-if="item.isSubs != '1'" opt-type="SUBSCRIPTION">
                          <i style="font-size: 14px;" :class="['icon iconfont', $store.state.auth.isLogin && item.isSubs === '0' || !$store.state.auth.isLogin ? 'icons-subscription-soft' : 'icons-subscription-solid']"></i>
                          {{item.subsText }}
                        </el-button>
                      </el-col>
                     </el-row>
                    <el-row class="pl10">
                      <el-col :span="16">
                        <p class="dic-des-con c9 title-ellipsis"><span>资源描述：{{item.remark }}</span></p>
                      </el-col>
                      <el-col :span="8">
                        <span class="fr c9 pr20">
                          <i class="el-icon-view"></i>
                          {{item.viewCount}}
                          <i class="el-icon-star-off ml20"></i>
                          {{item.collectCount}}
                          <i class="icon iconfont icons-subscription-soft ml20"></i>
                          {{item.subsCount}}
                        </span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
             </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="c-title">
            <label class="fl mt5"><span class="title-font">热门目录</span></label>
            <rect-badge class="mt5 fl">HOT</rect-badge>
            <div class="fr mt10 mr5 default-more cp" @click="$router.push({'name': 'dataCatalog',params: {treeItem: {}}})">MORE</div>
          </div>
          <div class="area-card pd15 area-top content-bg">
            <div v-if="newDirectoryData.length===0" class="pt10 mb10 tc c9"
                 style="height: 80px;padding-top: 80px;">
              暂无数据
            </div>
            <ul class="datalog-table">
              <li v-for="(item,index) in newDirectoryData" :key="item.typeId">
                <p style="width: 95%;" class="title-ellipsis pl15 cp"
                   @click="skipDirectoryDetail(item)" :title="item.typeName">
                  {{item.typeName}}
                </p>
              </li>
            </ul>
          </div>
          <div class="c-title pt20">
            <label class="fl mt5"><span class="title-font">热门应用</span></label>
            <rect-badge class="mt5 fl">HOT</rect-badge>
            <div class="fr mt10 mr5 default-more cp" @click="$router.push({'name': 'applyShow'})">MORE</div>
          </div>
          <div class="area-card pd15 area-bottom content-bg">
            <div v-if="newApplicationData.length===0" class="pt10 mb10 tc c9"
                 style="height: 80px;padding-top: 80px;">
              暂无数据
            </div>
            <ul class="datalog-table">
              <li v-for="(item,index) in newApplicationData" :key="item.id">
                <p style="width: 95%;" class="title-ellipsis pl15 cp"
                   @click="skipApplicationDetail(item)" :title="item.applicationName">
                  {{item.applicationName}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
      </el-row>
    </div>
    <div class="ise-bottom">
      <el-row>
        <el-col :span="24">
          <div class="pagination tc pd30">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagging.currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagging.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagging.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    </div>
    <el-dialog title="订阅" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="subscForm" ref="subscForm" :rules="subscRules"  label-width="90px">
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
              <el-input type="text" placeholder="请输入天数" v-model ="subscForm.applyDay" clearable>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="medium" @click="resetSubscribeFields()" plain>取 消</el-button>
        <el-button type="primary" size="medium" @click="subscSubmitForm('subscForm')" plain>确 定</el-button>
      </div>
  </el-dialog>
  </base-container>
</template>

<script>
  import data from './interface-service.js';
  export default {
    ...data
  };
</script>

<style scoped lang="stylus" src="./interface-service.styl"></style>
<style lang="stylus">
  .interface-service {
    .el-input-group--append .el-input__inner {
      border-color: rgb(127, 181, 255);
      border-radius: 6px 0 0 6px;
    }
    .el-input-group__append {
      background: rgb(0,108,255);
      border-radius: 0 6px 6px 0;
      border-color: rgb(0,108,255);
       i {
         font-size: 20px;
        color: white;
       }
       i:hover {
         transform scale3d(1.8,1.8, 1.8);
       }
     }
     .el-tree {
        background: rgb(248,249,249); 
      }
    .el-dialog {
      min-width: 700px;
    }
  }
</style>
