<template>
  <el-container class="container directory">
    <div class="data-con" v-for="item in sourceDirctory" :key="item.id" v-if="paging.total !== 0">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="width: 100%;">
          <h1 class="text-flow"><a class="da-title" @click="skipInterfaceDetail(item)">
            <i class="iconfont icons-xinhao" style="color:#2364f0;"></i>
            <span style="margin-left: 5px;" :title="item.resourceName">{{item.resourceName }}</span>
          </a>
          </h1>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="20">
              <el-col :span="12">
                <div class="dic-upper pb5 pl20 over-nowrap">所属部门：{{item.itemBeanForCatalogAndApi.department }}</div>
              </el-col>
              <el-col :span="12">
                <div class="dic-upper pb5  pl20 over-nowrap">组织来源：{{item.dataSource }}</div>
              </el-col>
              <el-col :span="12">
                <div class="dic-downer pb5 pl20 over-nowrap">开放类型：{{item.openType }}</div>
              </el-col>
              <el-col :span="12">
                <div class="dic-downer pb5 pl20 over-nowrap">开放条件：{{item.openCondition }}</div>
              </el-col>
              <el-col :span="12">
                <div class="dic-upper  pb5 pl20 over-nowrap">共享方式分类：{{item.sharingWay }}</div>
              </el-col>
              <el-col :span="12">
                <div class="dic-upper  pb5 pl20 over-nowrap">共享方式类型：{{item.sharingType | transformSharingType}}</div>
              </el-col>
            </el-col>
            <el-col :span="4">
              <div class="dic-upper over-nowrap">
                <el-button type="danger" plain size="mini" class="btn" @click="cancelCollection(item)"
                           opt-type="COLLECTION" title="点击取消收藏"  v-if="item.isCollect==='1'">
                  <i class="icon iconfont icons-buoumaotubiao44" style="font-size: 14px;"></i>
                  <span>取消收藏</span>
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div v-if="paging.total === 0" class="dic-all-empty">
      <div class="con-empty">
        <i class="table-empty iconfont icons-table-content-search"></i>
        <h1>目 录 收 藏 暂 无 数 据</h1>
      </div>
    </div>
    <div class="cf">
      <el-pagination
        class="fr pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total">
      </el-pagination>
    </div>
  </el-container>
</template>

<script type="text/ecmascript-6" src="./data-directory-card.js">
</script>

<style scoped src="./data-directory-card.styl" lang="stylus">
</style>
<style lang="stylus">
  .container.directory .el-card__header {
    padding: 10px 20px 3px 20px;
    // background: linear-gradient(to right, #a0b0e8, #ecf5ff, #fff);
    background-color: #f2f5ff;
  }
</style>
