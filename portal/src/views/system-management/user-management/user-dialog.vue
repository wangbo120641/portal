<!--
     /**
      * 用户对话框
      * @desc 对用户信息的操作是显示对话框
      * @author yyl 59288
      * @date 2018.7.25
      * @example 调用示例
      *  <user-dialog @afterInfoUpdate="queryUser" :departments="departments" :type="dialogType" :operatedUser="operatedUser" :dialogVisible="dialogVisible"></user-dialog>
      * afterInfoUpdate: 在用户信息更新之后，所要执行操作
      * departments: 传入的部门信息，需父组件传入（也可添加查找逻辑）
      * type: dialog类型（add: 添加操作  update: 更新操作  detail: 显示详细信息）
      * operatedUser: 当前所操作的User对象
      * dialogVisible: 控制dialog的visible
      */
       -->
<template>
  <div class="user-management-dialog-div">
    <el-dialog
      class="user-dialog"
      :close-on-click-modal="false"
      :before-close="dialogClose"
      width="700px"
      :title="title"
      :visible.sync="dialogVisible_">
      <el-form
        ref="userInfoForm"
        :model="operatedUser_"
        :rules="rules"
        label-width="100px"
        style="text-align: left"
        :inline="true">
        <el-row>
           <el-col :span="12">
            <el-form-item label="用户名：" :prop="getRulesProp('userId')">
              <el-input size="small" v-model="operatedUser_.userId" :disabled="type === 'update'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：" :prop="getRulesProp('userName')">
              <el-input size="small" v-model="operatedUser_.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：" :prop="getRulesProp('sex')">
              <el-select size="small" class="select" clearable v-model="operatedUser_.sex">
                <el-option label="男" value="0" key="0">
                </el-option>
                <el-option label="女" value="1" key="1">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="组织：" :prop="getRulesProp('departmentId')" class="right-item">
              <el-select size="small" clearable class="select" v-model="operatedUser_.departmentId">
                <el-option
                  v-for="item in departments"
                  :label="item.departmentName"
                  :value="item.id"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄：" :prop="getRulesProp('age')" class="right-item">
              <el-input size="small" clearable v-model="operatedUser_.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：" :prop="getRulesProp('phoneNumber')">
              <el-input size="small" clearable v-model="operatedUser_.phoneNumber"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件号码：" :prop="getRulesProp('identityNumber')">
              <el-input size="small" clearable v-model="operatedUser_.identityNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱：" :prop="getRulesProp('emailAddress')" class="right-item">
              <el-input size="small" clearable v-model="operatedUser_.emailAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色选择：">
              <div class="check-roles-div" align="left" style="width:550px;">
                <el-select filterable multiple clearable
                           class="select"
                           size="small"
                           v-model="selectedRoles"
                           placeholder="请选择角色">
                  <el-option
                    v-for="role in roleDate"
                    :label="role.roleName"
                    :value="role.id"
                    :key="role.id"
                  >
                  </el-option>
                </el-select>
                <!--<el-tree
                  clearable
                  @check-change="treeCheckChange"
                  ref="roleTree"
                  node-key="id"
                  :default-checked-keys="!operatedUser_.roleId ? [] : operatedUser_.roleId.split(',')"
                  :data="roleDate"
                  :props="treeProps"
                  @node-click="nodeClick"
                  show-checkbox></el-tree>-->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>-->
        <!--<el-col :span="24">-->
        <!--<el-form-item label="角色选择：">-->
        <!--<div class="check-roles-div" align="left">-->
        <!--<el-select filterable multiple clearable-->
        <!--class="select"-->
        <!--size="small"-->
        <!--v-model="selectedRoles"-->
        <!--placeholder="请选择角色"> -->
        <!--<el-option -->
        <!--v-for="role in roleDate"-->
        <!--:label="role.roleName"  -->
        <!--:value="role.id"-->
        <!--:key="role.id"-->
        <!--&gt;-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--&lt;!&ndash;<el-tree-->
        <!--clearable-->
        <!--@check-change="treeCheckChange"-->
        <!--ref="roleTree"-->
        <!--node-key="id"-->
        <!--:default-checked-keys="!operatedUser_.roleId ? [] : operatedUser_.roleId.split(',')"-->
        <!--:data="roleDate"-->
        <!--:props="treeProps"-->
        <!--@node-click="nodeClick"-->
        <!--show-checkbox></el-tree>&ndash;&gt;-->
        <!--</div>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" plain type="danger" @click="onCancelClick">取 消</el-button>
        <el-button size="medium" plain type="primary" @click="commitUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import treeTable from '../tree-table-demo';
  import API from '../../../rest-api/restApi';
  import manaUtil from '../management-util';

  export default {
    name: 'user-dialog',
    components: {
      treeTable
    },
    props: {
      dialogVisible: false,
      type: '',
      departments: '',
      operatedUser: {}
    },
    data () {
      var checkAge = (rule, value, callback) => {
        var matchRes = manaUtil.numPattern(value);
        // matchRes || value === '' ? callback() : callback(new Error('年龄必须为数字'));

        if (matchRes || value === '') {
          if (value > 18 && value < 100) {
            callback();
          } else {
            callback(new Error('年龄必须大于18且小于100'));
          }
        } else {
          callback(new Error('年龄必须为数字'));
        }
      };
      var checkPhone = (rule, value, callback) => {
        var matchRes = manaUtil.phonePattern(value);

        matchRes ? callback() : callback(new Error('请输入正确电话'));
      };
      var checkIdentityNumber = (rule, value, callback) => {
        var matchRes = manaUtil.identityNumberPattern(value);

        matchRes ? callback() : callback(new Error('请输入正确身份证号码'));
      };
      var checkEmailAddress = (rule, value, callback) => {
        var matchRes = manaUtil.emailPattern(value);

        matchRes ? callback() : callback(new Error('请输入正确邮箱地址'));
      };
      var checkUserIdReg = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
          return;
        }
        if (!RegExp(/^([a-z]|[A-Z]|[0-9]){3,20}$/im).test(value)) {
          callback(new Error('请输入3-20位由字母和数字组成的用户名'));
        } else {
          // todo 重名校验
          if (this.type == 'update') {
            if (this.operatedUser.userId === value) {
              callback();
              return;
            }
          }
          this.checkUserId(value, callback, '此用户名已被使用');
        }
      };

      return {
        dialogVisible_: false,
        operatedUser_: {},
        operatedUserCopy: {},
        department: '',
        credentialsType: '',
        operate: true,
        selectedRoles: [],
        treeProps: {
          children: '',
          label: 'roleName'
        },
        roleDate: [],
        rules: {
          userId: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {validator: checkUserIdReg, trigger: 'change'}
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {max: 15, message: '用户名不能大于15个字符', trigger: 'blur'},
            {min: 2, message: '用户名不能少于2个字符', trigger: 'blur'}

          /* {validator: checkRepetition, trigger: 'blur'} */
          ],
          departmentId: [
            {required: true, message: '请选择组织'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'},
            {validator: checkAge, trigger: 'blur'}
          ],
          phoneNumber: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          emailAddress: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: checkEmailAddress, trigger: 'blur'}
          ],
          identityNumber: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {validator: checkIdentityNumber, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      queryRole: function () {
        var _that = this;
        var callback = function (response) {
          _that.roleDate = response.data.data.data;
        };

        manaUtil.queryBaseInfoByURL(_that, API.ROLE_GET, 'post', callback);
      },
      commitUserInfo: function () {
        var _that = this;

        _that.operatedUser_.checkedRoles = _that.selectedRoles;
        _that.$refs['userInfoForm'].validate((valid) => {
          if (valid) {
            this.type == 'update' ? this.updateUserInfo() : this.addUserInfo();
            // eval('_that.'+this.type+'UserInfo()');
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      onCancelClick: function () {
        this.dialogVisible_ = false;
        this.dialogClose();
      },
      resetForm: function (dialogClosed) {
        if (this.type == 'add' || (dialogClosed == 1 && this.type == 'update')) {
          this.operatedUser_ = {};
          this.$refs['userInfoForm'].resetFields();
          // this.resetTreeCheck([]);
        } else if (this.type == 'update') {
          this.operatedUser_ = JSON.parse(JSON.stringify(this.operatedUser));
          var checked = !this.operatedUser_.roleId ? [] : this.operatedUser_.roleId.split(',');

          this.$refs['userInfoForm'].resetFields();
          this.resetTreeCheck(checked);
        }
      },
      updateUserInfo: function () {
        var _that = this;
        var param = {
          authUserInfoEntity: _that.operatedUser_,
          authUserRoleEntityList: _that.operatedUser_.checkedRoles.map((item) => ({
            roleId: item,
            userId: _that.operatedUser_.userId
          }))
        };

        _that.$http({
          method: 'patch',
          url: API.USER_UPDATE,
          data: JSON.stringify(param)
        }).then((response) => {
          if (response.data.code == 1) {
            _that.updateSuccess();
            this.$notify({
              message: '用户信息更新成功',
              type: 'success',
              offset: 120
            });
          }
        }).catch((response) => {

        });
      },
      addUserInfo: function () {
        var _that = this;
        var param = {
          authUserInfoEntity: _that.operatedUser_,
          authUserRoleEntityList: _that.operatedUser_.checkedRoles.map((item) => ({
            roleId: item
          }))
        };

        _that.$http({
          method: 'post',
          url: API.USER_INSERT,
          data: JSON.stringify(param)
        }).then((response) => {
          if (response.data.code == 1) {
            _that.updateSuccess();
            this.$notify({
              message: '用户信息添加成功',
              type: 'success',
              offset: 120
            });
          }
        }).catch((response) => {

        });
      },
      updateSuccess: function () {
        this.dialogVisible_ = false;
        this.dialogClose();
        this.$emit('afterInfoUpdate');
      },
      treeCheckChange: function (data, checked, node) {
        if (checked) {
          // this.$refs['roleTree'].setCheckedKeys([data.id]);
        }
      },
      resetTreeCheck: function (checkedKeys) {
        this.$refs['roleTree'].setCheckedKeys(checkedKeys);
      },
      getRulesProp: function (prop) {
        if (this.operate) {
          return prop;
        }
  
        return '';
      },
      dialogClose: function (done) {
        this.resetForm(1);
        if (done) {
          done();
        }
      },
      // nodeClick: function (data, node) {
      //   var checksKeys = this.$refs['roleTree'].getCheckedKeys();
      //   checksKeys.push(data.id);
      //   this.$refs['roleTree'].setCheckedKeys(checksKeys);
      // },
      // todo 重名校验
      checkUserId: function (userId, callback, errorMsg) {
        this.$http.post(globals.serverUrl + API.USER_QUERY_PINPOINT, JSON.stringify({userId: userId})).then(res => {
          if (res.data.data === '0') {
            callback(new Error(errorMsg));
          }
          callback();
        }).catch(res => {
          callback();
        });
      }

    },
    computed: {
      title: function () {
        switch (this.type) {
          case 'add':
            return '添加用户';
          case 'update':
            return '修改用户';
          case 'detail':
            return '用户详情';
        }
      }
    },
    watch: {
      dialogVisible: function () {
        this.dialogVisible_ = true;
        this.operatedUser_ = JSON.parse(JSON.stringify(this.operatedUser));
        this.selectedRoles = !this.operatedUser_.roleId ? [] : this.operatedUser_.roleId.split(',');
        // if (this.$refs['roleTree']) {
        //   this.$refs['roleTree'].setCheckedKeys(!this.operatedUser_.roleId ? [] : this.operatedUser_.roleId.split(','));
        // }
      },
      'operatedUser_.departmentId': function (newValue, oldValue) {
        var dept = this.departments.find(dept => dept.id == newValue);

        if (dept) {
          this.operatedUser_.departmentName = dept.departmentName;
        }
      },

    /* operatedUser: function () {
        this.operatedUser_ = Object.assign({},this.operatedUser);
      }, */
      type: function () {
        if (this.type == 'detail') {
          this.operate = false;
        } else {
          this.operate = true;
        }
      }
    },
    mounted: function () {
      this.queryRole();
    },
    updated: function () {
      /* if (this.$refs['roleTree']) {
        this.$refs['roleTree'].setCheckedKeys(!this.operatedUser_.roleId ? [] : this.operatedUser_.roleId.split(','));
      } */
    }
  };
</script>

<style scoped>
  .select {
    width: 92%;
  }

  .el-form--inline .right-item {
    margin-right: 14px;
  }

  .user-dialog .el-dialog .el-dialog__body {
    overflow: hidden;
  }

  .el-dialog .el-form-item {
    width: 100%;
    white-space: nowrap;
    /*overflow: hidden;*/
  }

  .dialog-footer {
    margin-right: 20px;
  }

  .check-roles-div {
    width: 200px;
    max-height: 100px;
    overflow-y: auto
  }
</style>

