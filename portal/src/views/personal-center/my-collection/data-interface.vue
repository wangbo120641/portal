<template>
  <el-container style="display: block">
    <div class="container directory" v-if="paging.total !== 0">
      <div class="data-con" v-for="item in sourceDirctory" :key="item.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="width: 100%;">
            <h1 class="text-flow"><a class="da-title" @click="skipInterfaceDetail(item)">
              <i class="iconfont icons-xinhao" style="color:#2364f0;"></i>
              <span style="margin-left: 5px;" :title="item.apiInfo.apiName">{{item.apiInfo.apiName }}</span>
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
                  <div class="dic-upper pb5  pl20 over-nowrap">组织来源：{{item.dataSource}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="dic-downer pb5 pl20 over-nowrap">接口目录：{{item.resourceName }}</div>
                </el-col>
                <el-col :span="12">
                  <div class="dic-downer pb5 pl20 over-nowrap">开放类型：{{item.openType }}</div>
                </el-col>
                <el-col :span="12">
                  <div class="dic-upper  pb5 pl20 over-nowrap">共享方式分类：{{item.sharingWay }}</div>
                </el-col>
                <el-col :span="12">
                  <div class="dic-upper  pb5 pl20 over-nowrap">共享方式类型：{{item.sharingType | transformSharingType }}</div>
                </el-col>
              </el-col>
              <el-col :span="4">
                <div class="dic-upper over-nowrap" style="">
                  <el-button type="danger" opt-type="COLLECTION" plain size="mini" @click="cancelCollection(item)" title="点击取消收藏"
                             v-if="item.isCollect==='1'"><i class="icon iconfont icons-buoumaotubiao44" style="font-size: 14px;"></i>
                             <span>取消收藏</span>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <div v-if="paging.total === 0" class="dic-all-empty">
      <div class="con-empty">
        <i class="table-empty iconfont icons-table-content-search"></i>
        <h1>接 口 收 藏 暂 无 数 据</h1>
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

<script>
  import API from '../../../rest-api/restApi';
  import sharingTypes from 'src/views/data-service-engine/data-catalog/catalog-list-sharingTypes';

  export default {
    name: 'data-interface',
    data () {
      return {
        sourceDirctory: [],
        paging: {
          currentPage: 1,
          pageSize: 10,
          currentPages: [10],
          total: 0,
          tableParams: {
            'page': 1,
            'pageSize': 10,
            'dir': 'asc',
            'field': 'id',
            'type': '2'
          }
        }
      };
    },
    mounted () {
      this.getSourceDirectory(this.paging.tableParams);
    },
    methods: {
      // 接口收藏查询
      getSourceDirectory (param) {
        let that = this,
          params = param || this.paging.tableParams;
        // url = this.childTab === 'subscription' ? '/system/orderInfo/list?' : '/system/collectInfo/list?',
        // collectType = this.childTab === 'subscription' ? '4' : '1';

        that.$http({
          method: 'post',
          url: API.COLLECT_INFO + '?' + this.$qs.stringify(params)
        }).then(res => {
          that.sourceDirctory = res.data.data.data;
          // console.log(that.sourceDirctory[0].apiInfo.apiName);
          that.paging.total = res.data.data.total;
        }).catch(res => {
          console.log(res);
        });
      },
      handleSizeChange (val) {
        this.paging.pageSize = val;
        this.paging.tableParams.pageSize = val;
        this.paging.currentPage = 1;
        this.getSourceDirectory(this.paging.tableParams);
      },
      handleCurrentChange (val) {
        this.paging.currentPage = val;
        this.paging.tableParams.page = val;
        this.getSourceDirectory(this.paging.tableParams);
      },
      // 取消接口收藏
      cancelCollection (item) {
        let that = this;

        that.$confirm('您确认要取消收藏吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(res => {
          that.$http({
            method: 'post',
            url: '/se/collection',
            data: JSON.stringify({id: item.id, status: '0', collectType: '2'})
          }).then(res => {
            that.$notify({
              type: 'success',
              message: res.data.message,
              offset: 120
            });
            that.getSourceDirectory(this.paging.tableParams);
          });
        });
      },
      skipInterfaceDetail (item) {
        this.$router.push({
          name: 'interfaceDetail',
          params: {id: item.id, navLabel: '接口详情', parentNavItems: this.navItems}
        });
      }
    },

    props: ['childTab'],
    filters: {
      transformSharingType: function (value){
        var resu = sharingTypes.filter(item => {return item.value === value});
        return resu && resu.length > 0 ? resu[0].label : '无';
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import 'data-directory.styl'
</style>
