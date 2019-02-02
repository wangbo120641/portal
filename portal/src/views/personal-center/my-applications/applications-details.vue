<template>
  <div class="cards-content">
    <div class="container">
      <div v-for="(item) in applications" :key="item.id" class="card-box-custom">
        <el-card class="box-card" :body-style="{'padding': '0'}">
          <div class="dic-con">
            <h1 class="card-head title-ellipsis"><i class="iconfont icons-application-cell" style="color: grey;margin: 0 5px;"></i><span style="margin-left: 5px;" :title="item.applicationName">{{item.applicationName }}</span></h1>
            <dl>
              <dt>
                <div class="img mt10">
                  <img :src="item.photo"/>
                </div>
              </dt>
              <dd>
                <el-row class="c6 lh20 pl10" style="height: 35px">
                  <el-col :span="7"><div class="mt20" :title="item.applicationType">应用类型：{{item.applicationType }}</div></el-col>
                  <el-col :span="7"><div class="mt20 text-flow" v-bind:title="item.developerName">开发单位：{{item.developerName }}</div></el-col>
                  <el-col :span="5"><div class="mt20">推荐值：{{item.recommendValue }}</div></el-col>
                  <el-col :span="3"><div style="margin: 6px 0 0 60%">
                    <el-button type="primary" plain size="mini" @click="openApplicationWindow(item)" opt-type="UPDATE">修改</el-button>
                  </div></el-col>
                </el-row>
                <el-row class="c6 lh14 pl10" style="height: 25px">
                  <!--<el-col :span="6"><div class="dic-label">更新时间：</div><div class="dic-row-con">{{item.updateTime }}</div></el-col>-->
                  <el-col :span="7"><div class="mt10" :title="item.customerName">联系人：{{item.customerName }}</div></el-col>
                  <el-col :span="7"><div class="mt10" :title="item.contactPhone">联系电话：{{item.contactPhone }}</div></el-col>
                  <el-col :span="5"><div class="mt10" :title="item.contactEmail ? item.contactEmail : '无'">联系邮箱：{{item.contactEmail ? item.contactEmail : '无'}}</div></el-col>
                  <el-col :span="3"><div style="margin: 0 0 0 60%">
                    <el-button type="danger" plain size="mini" @click="deleteApplication(item)" class="mt5" opt-type="DELETE">删除</el-button>
                  </div></el-col>
                </el-row>
                <el-row class="pl10 mt10 lh18">
                  <el-col :span="20"><div class="dic-des-con c9"><span>应用访问链接：</span><a @click="handleClick(item)">{{item.applicationUrl }}</a></div></el-col>
                </el-row>
              </dd>
            </dl>
          </div>
        </el-card>
      </div>
    </div>
    <div v-if="paging.total == 0" class="dic-all-empty">
      <div class="con-empty">
        <i class="table-empty iconfont icons-table-content-search"></i>
        <h1>暂  无  数  据</h1>
      </div>
    </div>
    <div class="pagination cf paging">
      <el-pagination
        background
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total">
      </el-pagination>
    </div>
    <el-dialog width="50%" :visible.sync="applicationsWindow" title="应用修改" @close="applicationWindowClose">
      <div>
          <el-form :model="appForm" ref="appForm" :rules="rules" label-width="30%" >
            <el-row>
              <el-col :span="24">
                <el-form-item prop="applicationName" label="应用名称:">
                  <el-input v-model="appForm.applicationName" size="small" style="width: 70%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="developerName" label="开发单位:">
                  <el-input v-model="appForm.developerName" size="small" style="width: 70%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="applicationUrl" label="应用访问链接:">
                  <el-input v-model="appForm.applicationUrl" size="small" style="width: 70%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="customerName" label="联系人:">
                  <el-input v-model="appForm.customerName" size="small" style="width: 70%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="contactPhone" label="联系电话:">
                  <el-input v-model="appForm.contactPhone" size="small" style="width: 70%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="contactEmail" label="联系邮箱:">
                  <el-input v-model="appForm.contactEmail" size="small" style="width: 70%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="applicationType" label="应用类型:">
                  <el-select v-model="appForm.applicationType" size="small" style="width: 70%">
                    <el-option v-for="item in applicationTypes" :label="item.dictLabel" :value="item.dictValue" :key="item.dictValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="photo" label="应用图片:">
                  <img v-bind:src="appForm.photo" style="height: 120px;width: 120px;" alt="#" v-if="appForm.photo != ''" />
                  <i class="icon iconfont icons-Android" style="height: 120px;width: 120px;display: inline-block;font-size: 55px;" v-else></i>
                  <el-button type="primary" plain size="small" @click="updateAppPhoto">上传图片</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-button type="primary" plain size="small" @click="applicationSubmit" style="float: right">提交</el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" plain size="small" @click="applicationReset" style="float: right">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        
      </div>
    </el-dialog>
    <el-dialog v-bind:visible.sync="photoAreaVisible" title="图片选择" width="50%"  @close="handleCropperClose" style="z-index: 2;">
      <cropper-img v-if="cropShow" ref="cropper" :crop-width="100" :crop-height="100" @crop="handleCrop"></cropper-img>
    </el-dialog>
  </div>
</template>

<script>
  import details from './applications-details.js';
  export default {
    ...details
  };
</script>
<style src="./applications-details.styl" scoped lang="stylus"></style>
<style lang="stylus">
  dl {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  }
</style>
