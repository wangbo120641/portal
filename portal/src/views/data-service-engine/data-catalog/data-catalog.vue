<!--
 /**
  * 数据目录
  * @desc 数据目录
  * @author wufan
  * @date 20180911
  * @example 调用示例
  *  <data-catalog></data-catalog>
  */
-->
<template>
  <base-container :nav-items="navItems" :bcTop="300">
    <!--上方的banner-->
    <div slot="banner" class="catalog-banner rel">
      <animate-line class="abs"></animate-line>
      <el-row>
        <el-col :span="13" style="padding-top: 100px;padding-left: 7%;">
          <p class="catalog-big-title tc cfff f30">开放 &nbsp;&nbsp; 共享 &nbsp;&nbsp; 共赢</p>
          <p class="catalog-big-title tc cfff pt15 f16">{{$t('project.addressName')}}政务信息共享平台，携手共建美好生活</p>
        </el-col>
        <el-col :span="11" class="tc">
          <img src="/static/image/banner/catalog-banner.png-icon.png"/>
        </el-col>
      </el-row>
    </div>
    <!--标题-->
    <el-row :gutter="20" class="pb10">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="5">
        <div class="catalog-type cf" style="margin-top: 75px;">
          <img class="pr10 fl" src="/static/image/data-catalog/tree-icon.png"/>
          <span class="fl cp" @click="treeTitleClick(treeTitle)">
          <span v-if="treeTitle==='0'">全部</span><span v-if="treeTitle==='2'">主题</span><span  v-if="treeTitle==='3'">部门</span><span  v-if="treeTitle==='1'">基础</span>分类
          </span>
          <span @click="treeTitleClick(treeTitle)" class="fr f12 lh24 pr10 cp" style="color: #1e7dff;"><i class="el-icon-refresh"></i> 全部</span>
        </div>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="目录名称搜索" v-model="nameSearch" clearable class="input-with-select catalog-search" @input="searchButton">
          <el-select v-model="searchSharingType" slot="prepend" palceholder="请选择共享方式类型" @change="searchTypeChange">
            <el-option v-for="item in sharingTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchButton"></el-button>
        </el-input>
        <div class="cf lh26 pt30">
          <label v-if="typeSelect!==''" class="catalog-type pl5 pr5 cf fl">
            <img class="fl pr5" src="/static/image/data-catalog/all-class.png"/>
            <span class="fl"><span class="catalog-total">{{typeSelect}}</span>共有<span
              class="catalog-total">{{total}}</span>条数据目录</span>
          </label>
          <label v-else class="catalog-type pl5 pr5 cf fl">
            <img class="fl pr5" src="/static/image/data-catalog/all-class.png"/>
            <span class="fl">全部分类共有<span class="catalog-total">{{total}}</span>条数据目录</span>
          </label>
          <div class="fr catalog-rank"><!--排序-->
            <el-button :class="param.orderBy==='publishTime'?'rank-active':''" @click="rankChange('publishTime')">
              发布日期
              <i v-if="param.orderBy==='publishTime'&&param.dir==='desc'"
                 class="iconfont icons-paixu-jiangxu"></i>
              <i v-if="param.orderBy==='publishTime'&&param.dir==='asc'"
                 class="iconfont icons-paixu-shengxu"></i>
            </el-button>
            <el-button :class="param.orderBy==='dataUpdatePeriodNumber'?'rank-active':''"
                       @click="rankChange('dataUpdatePeriodNumber')">
              更新周期
              <i v-if="param.orderBy==='dataUpdatePeriodNumber'&&param.dir==='desc'"
                 class="iconfont icons-paixu-jiangxu"></i>
              <i v-if="param.orderBy==='dataUpdatePeriodNumber'&&param.dir==='asc'"
                 class="iconfont icons-paixu-shengxu"></i>
            </el-button>
            <el-button :class="param.orderBy==='viewCount'?'rank-active':''" @click="rankChange('viewCount')">
              访问排序
              <i v-if="param.orderBy==='viewCount'&&param.dir==='desc'"
                 class="iconfont icons-paixu-jiangxu"></i>
              <i v-if="param.orderBy==='viewCount'&&param.dir==='asc'"
                 class="iconfont icons-paixu-shengxu"></i>
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="5" style="padding-top: 75px;">
        <div class="catalog-type cf">
          热门接口
          <rect-badge>HOT</rect-badge>
          <span CLASS="f14 fr lh24 cp default-more"
                @click="$router.push({name:'interfaceService',params:{nameSearch: ''}})">MORE</span>
        </div>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
    <!--内容区域-->
    <el-row :gutter="20" class="catalog-con">
      <!--留白左-->
      <el-col :span="1">&nbsp;</el-col>
      <!--树-->
      <el-col :span="5" class="blue-box ise-content">
        <el-tree
          :data="treeData"
          :props="{children: 'children',label: 'categoryName'}"
          :default-expand-all="true"
          :node-key="'id'"
          ref="catalogTree"
          @node-click="treeNodeClick">
            <span class="customer-tree-node" slot-scope="{node, data}">
            <i :class="['icon iconfont icons-wenjianjia', data.selected ? 'selected' : '']"></i>
            <span>{{data.categoryName}}</span>
            </span>
        </el-tree>
      </el-col>
      <!--中间目录-->
      <el-col :span="12" class="have-height">
        <div v-if="total===0" class="pt10 mb10 tc c9"
             style="height: 80px;padding-top: 80px;">
          暂无数据
        </div>
        <el-card class="box-card cata-card catalog-list-card" v-for="(item,index) in dataCatalog" :key="index">
          <div slot="header" class="clearfix catalog-header w-100"
               @click="$router.push({name:'catalogDetail',params:{id:item.id,parentNavItems:navItems, viewState: 1}})">
            <div class="catalog-p" :title="item.resourceName">
              <a><i class="iconfont icons-tuichudenglu1 f20" style="color: #006cff;"></i>
                {{item.resourceName}}</a>
            </div>
          </div>
          <el-row>
            <el-col :span="9">
              <p class="pb10 catalog-p catalog-inline">
                <label class="catalog-list-name fl catalog-label">所属主题：</label>
                <label class="title-ellipsis fl catalog-content" :title="item.itemBeanForCatalogAndApi&&item.itemBeanForCatalogAndApi.zhuti ? item.itemBeanForCatalogAndApi.zhuti : '无'">
                  {{ item.itemBeanForCatalogAndApi&&item.itemBeanForCatalogAndApi.zhuti ? item.itemBeanForCatalogAndApi.zhuti : '无'}}
                </label>
              </p>
              <p v-if="item.itemBeanForCatalogAndApi&&item.itemBeanForCatalogAndApi.department!==null"
                 class="pb10 catalog-p catalog-inline">
                <label class="catalog-list-name fl catalog-label">所属部门：</label>
                <label class="title-ellipsis fl catalog-content">{{item.itemBeanForCatalogAndApi.department }}</label>
              </p>
              <p class="pb10 catalog-p catalog-inline">
                <label class="catalog-list-name fl catalog-label">所属基础：</label>
                <label class="title-ellipsis fl catalog-content" :title="item.itemBeanForCatalogAndApi&&item.itemBeanForCatalogAndApi.jichu ? item.itemBeanForCatalogAndApi.jichu : '无'">
                  {{item.itemBeanForCatalogAndApi&&item.itemBeanForCatalogAndApi.jichu ? item.itemBeanForCatalogAndApi.jichu : '无'}}
                </label>
              </p>
              <!-- <p v-if="item.dataSource" class="pb10 catalog-p">
                <label class="catalog-list-name">组织来源：</label>
                {{item.dataSource ? item.dataSource : '无'}}
              </p> -->
            </el-col>
            <el-col :span="9">
              <p v-if="item.dataUpdatePeriod!==null"
                 class="pb10 catalog-p">
                <label class="catalog-list-name">更新周期：</label>
                {{item.dataUpdatePeriod }}
              </p>
              <p v-if="item.dataUpdatePeriod!==null"
                 class="pb10 catalog-p">
                <label class="catalog-list-name">发布日期：</label>
                {{dateFormat(item.publishTime) }}
              </p>
              <p class="pb10 catalog-p"><label class="catalog-list-name">共享方式类型： </label>
                {{item.sharingType | transformSharingType}}
              </p>
            </el-col>
            <el-col :span="6">
              <el-button opt-type="COLLECTION" class="card-buttton" type="primary" plain size="mini"
                         @click="cataCollect(item.id,item.isCollect)">
                <i
                  :class="['f14', $store.state.auth.isLogin && item.isCollect === '1' ? 'el-icon-star-on' : 'el-icon-star-off']"></i>
                {{$store.state.auth.isLogin && item.isCollect === '1' ? '已收藏' : '收藏'}}
              </el-button>
              <!--订阅和取消订阅接口不一样，所以配置了两个权限-->
              <el-button opt-type="SUBSCRIPTION_CANCEL" class="card-buttton" type="danger" plain size="mini"
                         @click="unsubscribeClick(item)"
                         v-if="$store.state.auth.isLogin &&item.isSubs==='1'">
                <i class="iconfont icons-subscription-solid f12"></i>
                已订阅
              </el-button>
              <el-button v-else opt-type="SUBSCRIPTION" class="card-buttton" type="danger" plain size="mini"
                         @click="subscClick(item,item.isSubs)">
                <i :class="['icon iconfont', $store.state.auth.isLogin && item.isSubs === '2'? 'icons-subscription-solid' : 'icons-subscription-soft']" style="font-size: 14px;"></i>
                {{$store.state.auth.isLogin && item.isSubs==='2'?'订阅中':'订阅'}}
              </el-button>
            </el-col>
            <el-col :span="24" class="cf">
              <p class="pb10 catalog-p title-ellipsis fl" style="width: 80%;">
                <label class="catalog-list-name catalog-label fl">资源描述：</label>
                <label class="fl">{{item.remark}}</label>
              </p>
              <span class="fr c9 pr20">
                <i class="el-icon-view"></i>
                {{item.viewCount}} &nbsp; &nbsp;
                <i class="el-icon-star-off"></i>
                {{item.collectCount}}
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5" class="new-interface">
        <div class="blue-box area-card">
          <div v-if="interfaceNewTable.length===0" class="pt10 mb10 tc c9"
               style="height: 80px;padding-top: 80px;">
            暂无数据
          </div>
          <ul class="datalog-table">
            <li v-for="(item,index) in interfaceNewTable" :key="index">
              <p style="width: 95%;" class="title-ellipsis pl15 cp"
                 @click="$router.push({name: 'interfaceDetail', params: {id: item.typeId}})">
                {{item.typeName}}
              </p>
            </li>
          </ul>
        </div>
        <div class="catalog-type pt30 pb10">
          政策法规
          <rect-badge>NEW</rect-badge>
          <span class="f14 fr lh24 cp default-more"
                @click="$router.push({name:'policiesRegulations',params:{}})">MORE</span>
        </div>
        <div class="blue-box area-card">
          <div v-if="policiesTopTable.length===0" class="pt10 mb10 tc c9"
               style="height: 80px;padding-top: 80px;">
            暂无数据
          </div>
          <ul class="datalog-table">
            <li v-for="(item,index) in policiesTopTable" :key="index">
              <p style="width: 95%;" class="title-ellipsis pl15 cp"
                 @click="$router.push({name:'regulationDetail',params:{id:item.id}})">
                {{item.name}}
              </p>
            </li>
          </ul>
        </div>
      </el-col>
      <!--留白右-->
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
    <div class="tc pd30">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pager-count="7"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="订阅" :visible.sync="dialogFormVisible" class="change-width">
      <el-form :model="subscForm" ref="subscForm" :rules="subscRules" label-width="90px" >
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
    <!--<el-dialog title="订阅信息" :visible.sync="dialogApproveFormVisible">-->
      <!--<el-form :model="approveForm" label-width="100px">-->
        <!--<el-form-item label="用户类型 : ">-->
          <!--{{approveForm.useType}}-->
        <!--</el-form-item>-->
        <!--<el-form-item label="用途 : ">-->
          <!--{{approveForm.effectInfo}}-->
        <!--</el-form-item>-->
        <!--<el-form-item label="申请理由 : ">-->
          <!--{{approveForm.applyReason}}-->
        <!--</el-form-item>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="使用期限 : ">-->
              <!--{{approveForm.applyDay}} 天-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
  </base-container>
</template>

<script type="text/ecmascript-6">
  import dataCatalog from './data-catalog';

  export default {
    ...dataCatalog
  };
</script>

<style lang="stylus" src="./data-catalog.styl" scoped></style>
