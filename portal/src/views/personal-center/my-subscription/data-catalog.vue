<!--
 /**
  * 个人中心-我的订阅-数据目录
  */
-->
<template>
  <el-container style="display: block">
    <div class="container directory">
      <div v-for="(item) in catalogSub" class="dic-all-con" v-if="paging.total !== '0'">
        <div class="data-con">
          <el-card class="box-card sub-catalog-card">
            <div slot="header" class="clearfix" style="width: 100%;  ">
              <h1 class="text-flow"><a class="da-title" @click="skipInterfaceDetail(item)">
                <i class="iconfont icons-xinhao" style="color:#2364f0;"></i>
                <span style="margin-left: 5px;" :title="item.resourceName">{{item.resourceName }}</span>
              </a>
              </h1>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="20" class="pl20">
                  <el-row class="c6 lh20">
                    <el-col :span="10">
                      <div class="dic-upper over-nowrap">所属部门：{{item.itemBeanForCatalogAndApi.department }}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="dic-upper over-nowrap">组织来源：{{item.dataSource }}</div>
                    </el-col>
                  </el-row>
                  <el-row class="c6 lh20">
                    <el-col :span="10">
                      <div class="dic-downer over-nowrap">开放类型：{{item.openType }}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="dic-downer over-nowrap">开放条件：{{item.openCondition }}</div>
                    </el-col>
                  </el-row>
                  <el-row class="c6 lh14">
                    <el-col :span="10">
                      <div class="dic-upper over-nowrap">共享方式分类：{{item.sharingWay }}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="dic-upper over-nowrap">共享方式类型：{{item.sharingType | transformSharingType}}</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <div class="dic-upper over-nowrap" style="">
                    <el-button type="danger" plain size="mini" @click="cancelCollection(item)" title="点击取消订阅"
                               opt-type="SUBSCRIPTION_CANCEL" v-if="item.isSubs==='1'">
                      <i class="icon iconfont icons-subscription-solid" style="font-size: 14px;"></i>
                      <span>取消订阅</span>
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>

      </div>
    </div>
    <div v-if="paging.total == '0'" class="dic-all-empty">
      <div class="con-empty">
        <i class="table-empty iconfont icons-table-content-search"></i>
        <h1>目 录 订 阅 暂 无 数 据</h1>
      </div>
    </div>
    <div class="pagination cf paging">
      <el-pagination
        class="fr"
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
  import ElRow from 'element-ui/packages/row/src/row';
  import sharingTypes from 'src/views/data-service-engine/data-catalog/catalog-list-sharingTypes';

  export default {
    components: {ElRow},
    name: 'data-catalog',
    data () {
      return {
        select: '',
        catalogSub: [],
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
            'type': '1'
          }
        }
      };
    },
    props: ['childTab'],

    mounted () {
      this.getSourceDirectory(this.paging.tableParams);
    },
    methods: {
      // 获取目录列表
      getList () {
        let _that = this;
        let param = this.$qs.stringify(_that.param);

        this.$http({
          method: 'post',
          url: API.CATALOG_LIST + '?page=1&pageSize=10&field=&dir=asc',
          data: JSON.stringify(_that.queryData)
        }).then(res => {
          _that.dataCatalog = res.data.data.data;
          _that.total = res.data.data.total;
        });
      },
      // 目录订阅查询
      getSourceDirectory (param) {
        let that = this;
        let params = param || this.paging.tableParams;

        that.$http({
          method: 'post',
          url: API.ORDER_LIST + '?' + this.$qs.stringify(params),
          data: JSON.stringify({type: '1'})
        }).then(res => {
          that.catalogSub = res.data.data.data;
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
      cancelCollection (item) {
        let that = this;
        let param = {
          apiId: item.id,
          applyType: '1'
        };

        that.$confirm('您确认要取消订阅吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(res => {
        that.$http({
            method: 'post',
            url: globals.serverUrl + API.INTERFACE_SUBSCRIPTION_CANCEL,
            data: JSON.stringify(param)
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
          name: 'catalogDetail',
          params: {id: item.id, navLabel: '目录详情', parentNavItems: this.navItems}
        });
      }
    },
    filters: {
      transformSharingType: function (value){
        var resu = sharingTypes.filter(item => {return item.value === value});
        return resu && resu.length > 0 ? resu[0].label : '无';
      }
    }

  };
</script>

<style scoped lang="stylus">
  @import '../my-collection/data-directory.styl'
  .con-empty {
    margin: 140px 0;
  }

  .data-con .el-card__header {
    background-color: #ebeef5;
    padding: 10px 20px;
  }
</style>
