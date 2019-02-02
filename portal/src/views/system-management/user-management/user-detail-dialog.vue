<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      title="用户详情"
      style="overflow: hidden"
      :visible.sync="dialogVisible_">
      <el-form
        :model="operatedUser" 
        label-width="140px"
        :inline="true">
        <el-row >
          <el-col :span="12">
            <el-form-item label="姓名：" >
              <template >
                {{operatedUser.userName}}
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织：" >
              <template>
                {{operatedUser.departmentName}}
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：">
              {{operatedUser.sex == 0 ? '男' : '女'}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄：" >
              {{operatedUser.age}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话：" >
              {{operatedUser.phoneNumber}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码：" >
              {{operatedUser.identityNumber}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：">
              {{operatedUser.emailAddress}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色：">
              <el-tooltip class="item" effect="dark" :content="operatedUser.roleName" placement="bottom-start">
                <div class="hidden-div" >
                  {{operatedUser.roleName}}
                </div>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import treeTable from '../tree-table-demo'
  export default {
    name: 'user-detail-dialog',
    components: {
      treeTable
    },
    props: {
      dialogVisible: false,
      operatedUser: {}
    },
    data() {
      return {
        dialogVisible_: false,
      }
    },
    methods: {
      
    },
    computed: {
      
    },
    watch: {
      dialogVisible: function () {
        this.dialogVisible_ = true;
      }
    },
  }
</script>

<style scoped>
  .el-dialog .el-form-item{
    width: 100%; 
    white-space: nowrap;
    overflow: hidden;
  }
  .el-dialog{
    overflow: hidden;
  }
  .hidden-div{
    display: inline-block; 
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
