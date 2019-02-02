<!--
     /**
      * 用户管理
      * @desc 对用户信息的基本操作
      * @author yyl 59288
      * @date 2018.7.25
      * @example 调用示例
      *  <user-management></user-management>
      */
       -->
<template>
  <div>
    <!--<base-container :nav-items="navItems" :nav="false">-->
    <!--<div slot="banner" style="height: 0px"></div>-->
    <!--<div style="width: 100%;padding-top: 100px;font-size: 48px;text-align: center;"></div>-->
    <div style="padding: 1% 40px;  background: white;    min-width: 1000px;">
      <el-form v-model="queryCondition" :inline="true" class="userForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="组织：">
              <el-input clearable v-model="queryCondition.departmentName" @input="conditionInput"
                        placeholder="请输入组织名" size="small">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="姓名：">
              <el-input v-model="queryCondition.userName" @input="conditionInput" clearable size="small"
                        placeholder="请输入姓名">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名：">
              <el-input v-model="queryCondition.userId" @input="conditionInput" clearable size="small"
                        placeholder="请输入用户名">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="display: inline-block; " class="fr">
              <el-button opt-type="ADD" size="small" type="success" plain @click="addUser">新增用户</el-button>
              <el-button opt-type="DELETE" size="small" type="danger" plain @click="batchForbidden"
                         :disabled="selectionUsers.length == 0">批量禁用
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="">
        <div class="select-total">已选择<span>{{selectionUsers.length}}</span>条数据</div>
        <user-info-table
          @onOperationClick="showDialog"
          @onSelectionChange="onSelectionChange"
          :query="query"
          :queryCondition="queryCondition">
        </user-info-table>
      </div>
      <div class="user-management-dialogs">
        <user-dialog
          @afterInfoUpdate="queryUser"
          :departments="departments"
          :type="dialogType"
          :operatedUser="operatedUser"
          :dialogVisible="dialogVisible">
        </user-dialog>
        <user-detail-dialog :operatedUser="operatedUser" :dialogVisible="userDetailDialogVisible"></user-detail-dialog>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <!--</base-container>-->
  </div>
</template>

<script>
  import userInfoTable from './user-management/user-info-table'
  import userDialog from './user-management/user-dialog'
  import userDetailDialog from './user-management/user-detail-dialog'
  import BaseContainer from '../../component/base-container';
  import BreadNav from '../../mixins/bread-nav';
  import API from "../../rest-api/restApi";
  import manaUtil from './management-util'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    name: 'user-management',
    mixins: [BreadNav],
    components: {
      ElRow,
      userInfoTable,
      userDialog,
      userDetailDialog,
      BaseContainer
    },
    data() {
      return {
        query: false,
        dialogVisible: false,
        userDetailDialogVisible: false,
        departments: [],
        dialogType: '',
        operatedUser: {},
        selectionUsers: [],
        queryCondition: {
          departmentName: '',
          userId: '',
          userName: ''
        }
      }
    },
    methods: {
      queryDepartmentInfo: function () {
        var _that = this;
        var callback = function (response) {
          _that.departments = response.data.data.data;
        }
        manaUtil.queryBaseInfoByURL(_that, API.COMPANY_QUERY, 'post', callback, {status: 0});
      },
      queryByCondition: function () {
        this.query = !this.query;
      },
      /**
       * @description 批量删除用户
       * @param
       */
      batchForbidden: function () {
        var selectedUsers = this.selectionUsers;
        var selectedUsersId = selectedUsers.map((user) => {
          return user.userId;
        });
        this.beforeBatchForbidden(selectedUsersId, this.onBatchDelete);
      },
      beforeBatchForbidden: function (selectedUsersId, onBatchDelete) {
        var idsLength = selectedUsersId.length;
        if (idsLength == 0) {
          this.$notify({
            message: '未选中用户',
            type: 'warning',
            offset: 120,
            duration: 2000,
            position: 'top-right'
          });
          return;
        }
        this.$confirm('您确定禁用这' + idsLength + '位用户吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          onBatchDelete(selectedUsersId);
        }).catch(() => {
        });
      },
      onBatchDelete: function (selectedUsersId) {
        var errorMessage = function () {
          this.$notify({
            message: '批量禁用失败',
            type: 'error',
            offset: 120,
            duration: 2000,
            position: 'top-right'
          });
        }
        var param = {
          status: 1,
          users: selectedUsersId.map((id) => ({
            userId: id
          }))
        };
        this.$http({
          method: 'post',
          url: API.USER_DELETE,
          data: JSON.stringify(param)
        }).then((response) => {
          if (response.data.code == 1) {
            this.$notify({
              message: '批量禁用成功',
              type: 'success',
              offset: 120,
              duration: 2000,
              position: 'top-right'
            });
            this.queryUser();
          } else {
            errorMessage();
          }
        }).catch((response) => {
          errorMessage();
        });
      },
      addUser: function () {
        this.dialogType = 'add';
        this.operatedUser = {};
        this.dialogVisible = !this.dialogVisible;
      },
      onSelectionChange: function (selections) {
        this.selectionUsers = selections;
      },
      showDialog: function (info) {
        this.dialogType = info.type;
        if (this.dialogType == 'detail') {    //修改匹配为 'detail' 将用户信息详情以单独dialog形式展开，便于单独修改样式
          this.showUserDetailDialog(info);
        } else {
          this.operatedUser = info.user;
          this.dialogVisible = !this.dialogVisible;
        }
      },
      showUserDetailDialog: function (info) {
        this.operatedUser = info.user;
        this.userDetailDialogVisible = !this.userDetailDialogVisible;
      },
      queryUser: function () {
        this.queryByCondition();
      },
      conditionInput: function () {
        var _that = this;
        manaUtil.debounce(function () {
          _that.query = !_that.query;
        }, 500)
        //this.query = !this.query;
      }
    },
    computed: {},
    mounted: function () {
      this.queryDepartmentInfo();
    }
  };
</script>

<style lang="stylus" src="./system-management.styl" scoped>
  
</style>
