<template>
  <base-container :nav-items="navItems">
    <div style="padding: 1% 2%;  background: white;">
      <div>
        <el-row>
          <el-col :span="12">
            <div style="display: inline-block; padding: 20px 0px; width: 100%">
              <el-input
                style="width:60%;"
                placeholder="请输入应用名搜索" clearable
                size="medium"
                v-model="searchAppName"
                @input="appNameInput"
              >
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div style=" padding-top: 20px; width: 100%; text-align: right; ">
              <el-button
                style="margin-right: 3%"
                plain
                type="danger"
                size="small"
                :disabled="selectedApps.length == 0"
              >
                批量删除
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          ref="appTableRef"
          :data="appData"
          :row-style="getRowStyle"
          :header-cell-style="getHeaderStyle"
          @row-click="rowClick"
          @select-change="selectChange"
        >
          <el-table-column 
            type="selection" >
          </el-table-column>
          <el-table-column 
            type="index"  
            label="序号" >
          </el-table-column>
          <el-table-column
            label="名称"
            prop="applicationName"
          >
          </el-table-column>
          <el-table-column
            label="应用类型"
            prop="applicationType"
          >
          </el-table-column>
          <el-table-column
            label="应用链接"
            prop="applicationUrl"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  plain
                  type="success"
                  size="mini"
                  @click="showDetail(scope.row)"
                >
                  详情
                </el-button>
                <el-button
                  plain
                  type="primary"
                  size="mini"
                  @click="showUpdate(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  plain
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.row)"
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <customer-pagination
          :total="total"
          @afterPageDataChange="pageChange"
        >
        </customer-pagination>
      </div>
    </div>
    <div>
      <dialog :visible.sync="recommendedVisible">
        <el-row>
          <el-col :span="20">
            <el-form-item prop="approveOption" label="审批意见:">
              <el-input type="textarea"  placeholder="请输入审批意见" v-model="approveComment.approveOption" style="width: 80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </dialog>
    </div>
  </base-container>
</template>

<script>
  import baseContainer from '../../../component/base-container'
  import BreadNav from '../../../mixins/bread-nav';
  import manaUtil from '../management-util'
  import API from "../../../rest-api/restApi";
  import customerPagination from '../user-management/customer-pagination'
  export default {
    name: "application-management",
    mixins: [BreadNav],
    components: {
      baseContainer,
      customerPagination
    },
    data() {
      return {
        searchAppName: '',
        appData: [],
        selectedApps: [],
        recommendedVisible: false,
        pageInfo: {
          page: 1,
          pageSize: 10,
          field: 'id',
          dir: 'desc'
        },
        total: 0,
      }
    },
    mounted: function () {
      this.queryAppInfo();
    },
    watch: {
      
    },
    methods: {
      queryAppInfo: function (pageInfo) {
        var _that = this;
        var pageParam = Object.assign(_that.pageInfo,pageInfo);
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
      showAdd: function () {
        
      },
      showDetail: function (app) {
        
      },
      showUpdate: function (app) {
        
      },
      handleDelete: function (app) {
        this.doDelete([{id: app.id}])
      },
      batchDelete: function () {
        var appIds = this.selectedApps.map( (app) => ({
          id: app.id
        }));
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
            data: JSON.stringify({id: '12323'})
          }).then( (response) => {
            console.log(response)
          }).catch( (response) => {
            console.log(response)
          })
        }).catch(function () {
          
        });
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
      rowClick: function (row, event, column) {
        if (!manaUtil.isClickButton(event))
          this.$refs['appTableRef'].toggleRowSelection(row);
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5'
        }
      },
      getRowStyle: function ({row, rowIndex}) {
        return rowIndex % 2 == 1 ? {
          background: '#F0F2F5'
        } : {};
      },
      selectChange: function (value) {
        this.selectedApps = value;
      }
    }
  }
</script>

<style scoped>

</style>
