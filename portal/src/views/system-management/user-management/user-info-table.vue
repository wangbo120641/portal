<!--
     /**
      * 用户信息展示表格
      * @desc 展示用户信息
      * @author yyl 59288
      * @date 2018.7.25
      * @example 调用示例
      *  <user-info-table @onOperationClick="showDialog" @onSelectionChange="onSelectionChange" :query="query" :queryCondition="queryCondition"></user-info-table>
      * onSelectionChange：监听选项变化
      * onOperationClick: 监听操作按钮点击
      * query: 当需要更新table数据时所需修改的值
      * queryCondition: 查询条件
      */
       -->
<template>
  <div id="user-info-table">
    <el-table
      border
      ref="userInfoTableRef"
      :row-style="getRowStyle"
      row-class-name="row-class"
      :header-cell-style="getHeaderStyle"
      @selection-change="selectionChange"
      @row-click="rowClick"
      :data="usersInfo">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        label="序号"
        :min-width="50">
        <template slot-scope="scope">
          {{scope.$index + (pageInfo.currentPage - 1) * pageInfo.pageSize + 1}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        min-width="100"
        :show-overflow-tooltip="true"
        prop="userId">
      </el-table-column>
      <el-table-column
        label="姓名"
        min-width="100"
        :show-overflow-tooltip="true"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="sex">
        <template slot-scope="scope">
          {{scope.row.sex == '0' ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        prop="age">
      </el-table-column>
      <el-table-column
        label="组织"
        :show-overflow-tooltip="true"
        prop="departmentName">
      </el-table-column>
      <el-table-column
        label="角色"
        :show-overflow-tooltip="true"
        prop="roleName">
      </el-table-column>
      <!--<el-table-column-->
        <!--label="电话" -->
        <!--min-width="100"-->
        <!--:show-overflow-tooltip="true"-->
        <!--prop="phoneNumber">-->
      <!--</el-table-column>-->
      <el-table-column
        width="320"
        label="操作"
        prop="userId">
        <template slot-scope="scope">
          <div>
            <el-button
              opt-type="DETAIL"
              size="mini"
              plain
              type="success"
              @click="userDetail(scope.row.userId)">
              详情
            </el-button>
            <el-button
              opt-type="UPDATE"
              size="mini"
              plain
              type="primary"
              @click="userUpdate(scope.row.userId)">
              编辑
            </el-button>
            <el-button
              opt-type="DELETE"
              size="mini"
              plain
              type="danger"
              @click="updateUserStatus(scope.row)">
              {{scope.row.status === '0' ? '禁用' : '启用'}}
            </el-button>
            <el-button
              opt-type="RESET_PASSWORD"
              size="mini"
              plain
              type="warning"
              @click="resetPassword(scope.row)">
              重置密码
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <customer-pagination :parent-page-info="pageInfo" :total="total" @afterPageDataChange="pageChange"></customer-pagination>
  </div>
</template>
<script>
  import customerPagination from './customer-pagination'
  import API from "../../../rest-api/restApi";
  import manaUtil from '../management-util'

  export default {
    name: 'user-info-table',
    components: {
      customerPagination
    },
    props: {
      queryCondition: {},
      query: false,
    },
    data () {
      return {
        usersInfo: [],
        total: 0,
        // 查询排序条件
        tableParams: {
          dir: 'desc',
          field: 'createTime'
        },
        pageInfo: {
          currentPage: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      queryUserInfo: function (queryCondition) {
        var _that = this;
        // var param = Object.assign( this.pageInfo, _that.tableParams, _that.queryCondition);
        var param = Object.assign({}, _that.queryCondition, queryCondition);
        var pageParam = Object.assign({
          page: _that.pageInfo.currentPage,
          pageSize: _that.pageInfo.pageSize
        }, _that.tableParams);
        pageParam = _that.$qs.stringify(pageParam);
        // param.status = 0;     // 只查询启用的用户
        _that.$http({
          method: 'post',
          url: API.USER_QUERY + '?' + pageParam,
          data: JSON.stringify(param)
        }).then((response) => {
          var data = response.data;
          _that.queryUserInfoSuccess(data);
        }).catch((response) => {
        });
      },
      queryUserInfoSuccess: function (data) {
        this.total = data.data.total;
        this.usersInfo = data.data.data;
      },
      pageChange: function (pageInfo) {
        this.pageInfo = pageInfo;
        this.queryUserInfo();
      },
      userDetail: function (id) {
        var user = this.findUser(id);
        this.$emit('onOperationClick', {type: 'detail', user: user});
      },
      userUpdate: function (id) {
        var user = this.findUser(id);
        this.$emit('onOperationClick', {type: 'update', user: user});
      },
      /**
       * @description 禁用启用用户
       * @param user
       */
      updateUserStatus: function (user) {
        // this.beforeDeleteUser(id, this.onDeleteUser);
        this._updateUserState(user);
      },
      // beforeDeleteUser: function (id, onDeleteUser) {
      //   this.$confirm('确定删除当前用户？', '提示', {
      //     confirmButtonText: '确 定',
      //     cancelButtonText: '取 消',
      //     type: 'warning'
      //   }).then(() => {
      //     onDeleteUser(id);
      //   }).catch(() => {
      //   });
      // },
      _updateUserState: function (user) {
        var _that = this;
        var status = user.status === '0' ? '1' : '0';
        var param = {
          status: status,
          users: [{
            userId: user.userId
          }]
        };
        _that.$http({
          method: 'post',
          url: API.USER_DELETE,
          data: JSON.stringify(param)
        }).then((response) => {
          if (response.data.code == 1) {
            this.$notify({
              message: status === '1' ? '用户禁用成功！' : '用户启用成功！',
              type: 'success',
              offset: 120,
              duration: 2000,
              position: 'top-right'
            });
            // _that.afterDeleteUser();
            user.status = status;
          }
          ;
        }).catch((response) => {
        });
      },
      // afterDeleteUser: function () {
      //   this.pageInfo.currentPage = 1;
      //   this.queryUserInfo();
      // },
      // 重置密码
      resetPassword (row) {
        var _that = this;
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '确认重置当前用户'),
            h('span', {style: 'color: #333;font-weight: bold'}, row.userName),
            h('span', null, '的密码？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          _that.onResetPassword(row.userId);
        }).catch(() => {
        });
      },
      onResetPassword (id) {
        var _that = this;
        var data = {
          userId: id
        };
        this.$http({
          method: 'patch',
          url: API.ROLE_INIT_PASSWORD,
          data: JSON.stringify(data)
        }).then((response) => {
          if(response.data.code === '1') {
            _that.$notify({
              message: '重置密码成功！密码为“用户名@123”',
              type: 'success',
              offset: 120,
              duration: 2000,
              position: 'top-right'
            });
            _that.queryUserInfo();
          }
        }).catch((response) => {
          console.log(response);
        });
      },
      selectionChange: function (val) {
        this.$emit('onSelectionChange', val);
      },
      findUser: function (id) {
        for (var index in this.usersInfo){
          if(this.usersInfo[index].userId == id){
            return this.usersInfo[index];
          }
        };
        return null;
      },
      rowClick: function (row, event, column) {
        if (!manaUtil.isClickButton(event))
          this.$refs['userInfoTableRef'].toggleRowSelection(row);
      },
      getRowStyle: function ({row, rowIndex}) {
        return rowIndex % 2 == 1 ? {
          background: '#F0F2F5'
        } : {};
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5'
        };
      }
    },
    watch: {
      query: function () {
        var condition = {};
        for (var key in this.queryCondition) {
          if (this.queryCondition[key] != '') {
            condition[key] = this.queryCondition[key];
          }
        }
        this.pageInfo.currentPage = 1;
        this.queryUserInfo(condition);
      }
    },
    mounted: function () {
      this.queryUserInfo();
    }
  };
</script>

<style scoped>
  .user-info-table .el-table .row-class td{
    padding: 5px 0px;
  }
  .user-info-table .el-button{
    margin-left: 10px;
  }
</style>
