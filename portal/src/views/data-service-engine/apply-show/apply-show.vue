<!--
 /**
  * 应用展示
  * @desc 应用展示
  * @author ljj-17773
  * @date 20180730
  * @example 调用示例
  *  <data-apply></data-apply>
  */
-->
<template>
  <base-container :nav-items="navItems" aside-side="right" :aside-width="300">
    <div slot="banner" style="height: 300px">
      <div class="appShowBanner">
        <animate-line style="position: absolute"></animate-line>
        <div class="bannerTitle">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td><span class="fl">开放</span></td>
              <td class="tc"><span>共享</span></td>
              <td><span class="fr">共赢</span></td>
            </tr>
            <tr>
              <td colspan="3">
                <span>{{$t('project.addressName')}}政务信息共享平台，携手共建美好生活</span>
              </td>
            </tr>
          </table>
          
        </div>
        <div class="gif">
          <img src="/static/image/banner/appJif.png"/>
        </div>
        
      </div>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="1">
        &nbsp;
      </el-col>
      <el-col :span="17">
        <el-card class="appShow" shadow="never">
          <div slot="header" class="clearfix">
            <div style="display: inline-block;width:50px;height:32px;line-height:32px;overflow: hidden">类别：</div>
            <div style="display: inline-block;width:40px;height:32px;overflow: hidden;margin-right: 5px;">
              <span @click="selectedAppTypes=[]" class="typeClass"
                    style="color:rgb(64, 158, 255);padding: 0px;">不限</span>
            </div>
            <template v-for="appType in appTypes">
              <div style="display: inline-block;height:32px;overflow: hidden;margin-right: 5px;">
                <span v-if="!tagSelected(appType)" class="typeClass" @click="handleSelectTag(appType,true)">{{appType.dictLabel}}</span>
                <el-tag v-else closable :disable-transitions="true" type="success"
                        @close="handleSelectTag(appType,false)">
                  {{appType.dictLabel}}
                </el-tag>
              </div>
            </template>
          </div>
          <div>
            <el-row>
              <el-col :span="24" style="border-bottom:1px solid #c5c5c5;padding:5px;padding-bottom:10px;">
                <span class="fl" style="line-height: 30px;margin-left: 0px;">共{{filter.total}}个应用</span>
                <div class="appSort">
                  <el-button round :type="sort.sortType=='visit'?'primary':'default'" size="mini"
                             @click="toggleSort('visit')">
                    访问量排序
                    <i v-if="sort.asc && sort.sortType=='visit'" class="iconfont icons-paixu-shengxu"></i>
                    <i v-if="(!sort.asc) && sort.sortType=='visit'" class="iconfont icons-paixu-jiangxu"></i>
                  </el-button>
                  <el-button round :type="sort.sortType=='name'?'primary':'default'" size="mini"
                             @click="toggleSort('name')">
                    名称排序
                    <i v-if="sort.asc && sort.sortType=='name'" class="iconfont icons-paixu-shengxu"></i>
                    <i v-if="(!sort.asc) && sort.sortType=='name'" class="iconfont icons-paixu-jiangxu"></i>
                  </el-button>
                </div>

                <div class="fr">
                  <el-button opt-type="APPLICATION_MANAGEMENT" type="success" plain size="small"
                             @click="appManagementShow"><i class="iconfont icons-yingyongguanli"
                                                           style="font-size: 12px"></i>&nbsp;&nbsp;应用管理
                  </el-button>
                  <el-button  opt-type="ADD" @click="handleAddApp" type="primary" plain size="small"><i
                    class="iconfont icons-application-cell" style="font-size: 12px"></i>&nbsp;&nbsp;添加应用
                  </el-button>
                </div>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="24" v-if="appTotal===0">
                <div class="pt10 mb10"
                     style="border-bottom:1px solid #dcdfe6;text-align: center;height: 80px;padding-top: 80px;color: #999;">
                  暂无数据
                </div>
              </el-col>
              <el-col v-else :md="8" :lg="6" v-for="app,index in apps" :key="index" class="pd20">
                <el-card shadow="never" class="app-card" :body-style="{ padding: '0px' }">
                  <div class="app-div pd20">
                    <div class="appImgDiv">
                      <img :src="app.photo" class="appImage tcenter ">
                    </div>
                  </div>
                  <div style="padding: 14px;">
                    <div class="title-ellipsis tc"><span>{{app.applicationName}}</span></div>
                  </div>
                  <div class="tc img-bg noselect"   @click="handleAppClick(app)" unselectable="on">
                    <div class="margin-auto">
                      <p class="pb10 title-ellipsis" :title="app.applicationName" style="max-width: 187px;">{{app.applicationName}}</p>
                      <p class="title-ellipsis" :title="app.developerName" style="padding: 0px 5px 10px 5px;max-width: 187px;">开发单位：{{app.developerName}}</p>
                      <p class="pb10">应用类型：{{app.applicationType}}</p>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <div class="pt30 cf">
              <el-pagination
                background
                class="fr"
                :page-sizes="[20, 50, 100, 200]"
                :page-size="filter.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="filter.pageNum"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="filter.total">
              </el-pagination>
            </div>

          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <div :style="minPanelStyle">
          <div class="minPanel">
            <div class="mtitle">
              <span>访问排行</span>
              <rect-badge>NEW</rect-badge>
              <!--<span class="more">MORE</span>-->
            </div>
            <div class="body">
              <ul class="listShowLine">
                <li v-for="(app ,index) in visitSortApps" :key="index" @click="handleAppClick(app)">
                  <!--<div class="cardContainer" :title="app.applicationName">-->
                  <!--<img v-bind:src="app.photo" class="img">-->
                  <!--<div class="textContainer"><span class="title">{{app.applicationName}}</span></div>-->
                  <!--</div>-->
                  <div class="cardContainer">
                <span class="index">
                  <el-badge :value="index+1" class="indexBadge">
                  </el-badge>
                </span>
                    <div class="img">
                      <img v-bind:src="app.photo" class="img">
                    </div>
                    <div class="textContainer">
                      <span class="visitCount"><span style="display: inline">{{app.visitCount}}</span>次</span>
                      <span class="title">{{app.applicationName}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="minPanel" style="top: 5px">
            <div class="mtitle">
              <span>推荐应用</span>
              <rect-badge>HOT</rect-badge>
              <!--<span class="more">MORE</span>-->
            </div>
            <div class="body">
              <ul class="listShowMin">
                <li v-for="(app ,index) in adviceApps" :key="index" @click="handleAppClick(app)" style="width:50%">
                  <div class="cardContainer" :title="app.applicationName">
                    <img v-bind:src="app.photo" class="img">
                    <div class="textContainer"><span class="title">{{app.applicationName}}</span></div>
                  </div>

                </li>
              </ul>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :span="1">
        &nbsp;
      </el-col>
    </el-row>
    
    <el-dialog title="申请应用" width="50%" top="10vh" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="applicationWindowClose">
      <el-form ref="addForm" :model="applyApp" size="small" label-position="right" :rules="rules" label-width="120px"
               class="mr10">
        <el-form-item label="应用名称" prop="applicationName">
          <el-input v-model="applyApp.applicationName" placeholder="请填写应用名称"></el-input>
        </el-form-item>
        <el-form-item label="应用访问链接" prop="applicationUrl">
          <el-input v-model="applyApp.applicationUrl" placeholder="请填写应用访问链接"></el-input>
        </el-form-item>
        <el-form-item label="开发单位" prop="developerName">
          <el-input v-model="applyApp.developerName" placeholder="请填写开发单位名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="customerName">
          <el-input v-model="applyApp.customerName" placeholder="请填写联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="applyApp.contactPhone" placeholder="请填写联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="contactEmail">
          <el-input type="email" v-model="applyApp.contactEmail" placeholder="请填写联系人电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="应用图片" prop="photo">
          <div style="height:70px;width:200px;overflow: hidden" class="clearfix">
            <div class="fl">
              <!--<span>&nbsp;</span>-->
              <i class="el-icon-picture" v-show="!(applyApp.photo && applyApp.photo.length>0)"
                 style="width:70px;height:70px;font-size: 80px;margin-top: -10px; color:#d7d7d7"></i>
              <img :src="applyApp.photo" v-show="applyApp.photo && applyApp.photo.length>0" alt=""
                   style="width:70px;height: 70px;">
            </div>
            <div class="fl" style="height:70px;margin-left: 10px;">
              <el-button @click="handleCropShow">选择图片</el-button>
            </div>
          </div>
        </el-form-item>
        <!--<el-form-item label="是否推荐" prop="recommendType">-->
        <!--<el-radio v-model="applyApp.recommendType" label="0">否</el-radio>-->
        <!--<el-radio v-model="applyApp.recommendType" label="1">是</el-radio>-->
        <!--</el-form-item>-->
        <el-form-item label="应用类型" prop="applicationType">
          <el-select v-model="applyApp.applicationType" placeholder="请选择应用类型">
            <el-option v-for="(appType ,index) in appTypes" :key="index" :label="appType.dictLabel"
                       :value="appType.dictValue"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button type="danger" size="medium" plain @click="handleCancel">取 消</el-button>
            <el-button type="primary" size="medium" plain @click="handleSubmit">确 定</el-button>
       </span>
    </el-dialog>

    <!--选择图片界面-->
    <el-dialog title="图片选择" width="900px" top="10vh" :visible.sync="cropperVisible" @close="handleCropperClose"
               :close-on-click-modal="false">
      <el-row>
        <el-col :span="24">
          <cropper-img v-if="cropShow" ref="cropper" :crop-width="50" :crop-height="50"
                       @crop="handleCrop"></cropper-img>
        </el-col>
      </el-row>
    </el-dialog>

  </base-container>
</template>

<script type="text/ecmascript-6">
  import applyShow from './apply-show';

  export default {
    ...applyShow
  };
</script>

<style lang="stylus" src="./apply-show.styl" scoped></style>
