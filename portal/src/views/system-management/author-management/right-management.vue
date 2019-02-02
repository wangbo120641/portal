<!--
     /**
      * 权限管理
      * @desc 组件描述
      * @author lj 16076
      * @date 2018.7.26
      * @example 调用示例
      *  <right-management></right-management>
      */
       -->
<template>
  <!--<base-container :nav-items="navItems" class="base-right-management">-->
  <div class="base-right-management">
    <div style="background: white;padding: 10px 40px 30px 40px">
      <el-row :gutter="20">
        <el-col :span="24">
          <div style="display: inline-block; padding: 20px 0px; width: 60%">
            <el-input style="width:50%;" clearable size="small"
                      @input="inputMenuName"
                      v-model="formInline.menuName"
                      placeholder="请输入菜单名称">
              <el-button slot="append" @click="getTableData" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="fr" style="padding: 20px 0px; ">
            <el-button opt-type="ADD" size="small" type="success" @click="handleCreate"
                       plain>新增菜单
            </el-button>
            <!--<el-button size="small" type="danger" :disabled="multipleSelection.length == 0" @click="multipleDelete(multipleSelection)"
                       plain>删除
            </el-button>-->
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <tree-table align="center"
                        @onDetailClick="handleDetail"
                        @onUpdateClick="handleUpdate"
                        @onDeleteClick="handleDelect"
                        :data="authManagementList" :columns="columns" border>
            </tree-table>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="right-management-dialogs-div">
      <el-dialog :close-on-click-modal="false" :title="dialogTextMap[dialogStatus]" width="600px"
                 :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="authorityData" size="small" label-position="right"
                 label-width="80px">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="authorityData.menuName"></el-input>
          </el-form-item>
          <!--<el-form-item label="菜单ID" prop="id">
            <el-input v-model="authorityData.id"></el-input>
          </el-form-item>-->
          <el-form-item label="父级菜单" prop="parentMenuCode">
            <el-select v-model="authorityData.parentMenuCode">
              <el-option
                v-for="item in computeAllMenu"
                :label="item.menuName"
                :value="item.menuCode"
                :key="item.id"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
            <!--<el-input v-model="authorityData.parentObj.menuName"></el-input>-->
          </el-form-item>
          <!--<el-form-item label="权限类型" prop="menuType">
            <el-select class="filter-item" v-model="authorityData.menuType" placeholder="请选择">
              <el-option v-for="item in  authTypeOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="菜单状态" prop="status">
            <el-select class="filter-item" v-model="authorityData.status" placeholder="请选择">
              <el-option v-for="item in  statusOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单操作" prop="menuOperations">
            <!--<el-checkbox-group v-model="authorityData.menuOperations">
              <el-checkbox label="delete">删除</el-checkbox>
            </el-checkbox-group>-->
            <el-select multiple clearable filterable 
                       style="width: 60%" 
                       placeholder="请选择操作" 
                       v-model="authorityData.menuOperations">
              <el-option
                v-for="item in operatingAuthorizations"
                :label="item.dictLabel"
                :value="item.dictValue"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作URL" v-if="menuButtonList.length>0">
            <el-row v-for="(menubutton ,index) in  menuButtonList" :key="index" style="margin-top: 5px;">
              <el-col :span="5"><span>{{optLabel(menubutton.buttonName) }}</span></el-col>
              <el-col :span="19">
                <el-input v-model="menubutton.url" placeholder="请填写操作URL"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="菜单描述" prop="remark">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述"
                      v-model="authorityData.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button plain @click="dialogFormVisible = false" type="danger" size="medium">取 消</el-button>
          <el-button plain v-if="dialogStatus === 'add'" type="primary" @click="createData" size="medium">确 定</el-button>
          <el-button plain v-if="dialogStatus === 'edit'" type="primary" @click="updateData" size="medium">确 定</el-button>
        </div>
      </el-dialog>
      <author-detail-dialog ref="authorityDetail"
                            :operatingAuthorizations="operatingAuthorizations"></author-detail-dialog>
    </div>
    
  <!--</base-container>-->
  </div>
</template>


<script type="text/ecmascript-6">
  import rightManagement from './right-management';

  export default {
    ...rightManagement
  };
</script>


<style scoped>
  .content-info {
    width: 100%;
    height: 100%;
  }

  .dialog-footer {
    margin-right: 20px;
  }
</style>
<style lang="stylus" >
  .base-right-management .el-table .cell {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right-management-dialogs-div .el-dialog .el-dialog__body{
    padding: 20px 40px;
  }
</style>
