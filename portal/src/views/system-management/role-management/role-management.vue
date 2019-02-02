<!--
     /**
      * 角色管理
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018年07月25日17:22:43
      * @example 调用示例
      *  <role-management></role-management>
      */
       -->
<template>
  <!--<base-container :nav-items="navItems">-->
  <div>
    <div style="background: white; " class="role-management">
      <div style="padding: 10px 40px 30px 40px;">
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="display: inline-block; padding: 20px 0px; width: 60%">
              <el-input style="width: 50%" clearable size="small" v-model="keywords"
                        placeholder="请输入角色名称检索..." @input="doSearch">
                <el-button slot="append" @click="queryRoleInfo" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="fr" style="padding: 20px 0px;">
              <el-button opt-type="ADD" size="small" type="success" @click="handleAdd" plain>新增角色</el-button>
              <el-button opt-type="DELETE" size="small" type="danger" @click="handleMuiltDelete" :disabled="selection.length == 0" plain>删除角色</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="select-total" >已选择<span>{{selection.length}}</span>条数据</div>
            <el-table 
              ref="roleTable"
              border
              class="roleTable"
              :data="data"
              @row-click="rowClick"
              @selection-change="handleSelectionChange"
              @sort-change="sortChange"
              :header-cell-style="getHeaderStyle"
              :row-class-name="roleTableClass"
              :default-sort="{prop: 'createTime', order: 'descending'}"
              style="width: 100%">
              <el-table-column type="selection" :selectable="selectable"></el-table-column>
              <el-table-column label="序号" min-width="50">
                <template slot-scope="scope">
                  {{scope.$index + (pageInfo.currentPage - 1) * pageInfo.pageSize + 1}}
                </template>
              </el-table-column>
              <el-table-column prop="roleName" :show-overflow-tooltip="true" label="角色名称" ></el-table-column>
              <el-table-column prop="default" label="是否默认" >
                <template slot-scope="scope">{{ scope.row.default==true?'是':'否' }}</template>
              </el-table-column>
              <el-table-column prop="roleDetail"  :show-overflow-tooltip="true" label="角色描述"></el-table-column>
              <el-table-column prop="status"  label="角色状态">
                <template slot-scope="scope">{{ scope.row.status==0?'启用':'禁用' }}</template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="createTime" sortable label="创建时间" min-width="160px" >
                <template slot-scope="scope">
                  {{formatDate(scope.row.createTime)}}
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="updateTime"  label="修改时间"  min-width="160px" >
                <template slot-scope="scope">
                  {{formatDate(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="260">
                <template slot-scope="scope">
                  <el-button opt-type="DETAIL" size="mini" plain type="success" @click="handleView(scope.$index, scope.row)">
                    详情
                  </el-button>
                  <el-button opt-type="UPDATE" size="mini" plain type="primary" @click="handleEdit(scope.$index, scope.row)"
                             :disabled="!scope.row.checkboxDisabled">
                    编辑
                  </el-button>
                  <el-button opt-type="DELETE" size="mini" plain type="danger" @click="handleDelete(scope.row)"
                             :disabled="!scope.row.checkboxDisabled">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <customerPagination :parent-page-info="pageInfo" :total="total" @afterPageDataChange="pageChange"></customerPagination>
            <!--<el-pagination class="fr"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[20, 50, 100, 200]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>-->
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="role-management-dialogs-div">
      <!--新增和编辑窗口-->
      <el-dialog :title="currentEdit.id ? '编辑角色' : '新增角色'" width="50%" 
                 :visible.sync="dialogVisible" @close="handleFormCancel" 
                 :close-on-click-modal="false">
        <el-form ref="roleForm"
                 class="pro-info"
                 :model="currentEdit"
                 :rules="rules" size="small"
                 label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色名称 :" prop="roleName">
                <el-input v-model="currentEdit.roleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色状态 :" prop="status">
                <el-select style="width: 100%" v-model="currentEdit.status"   placeholder="请选择状态">
                  <el-option key="0" label="启用" value="0"></el-option>
                  <el-option key="1" label="禁用" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色描述 :" prop="roleDetail">
                <el-input v-model="currentEdit.roleDetail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="权限选择 :" prop="">
                <div style="height:300px;padding: 10px;border:1px solid rgb(228, 226, 210)">

                  <role-menu-rights
                    ref="roleRights"
                    :role="currentEdit"
                    :dialog-visible="dialogVisible"
                    tree-type="update"
                    :menu-tree-data="menuTreeData"
                    @data-change="handleRoleChange">
                  </role-menu-rights>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="handleFormCancel" plain size="medium">取 消</el-button>
          <el-button type="primary" @click="handleSubmit" plain size="medium">确 定</el-button>
        </div>
      </el-dialog>

      <!--查看详情窗口-->
      <el-dialog title="角色详情"  :visible.sync="viewerVisible" @close="currentView={}" :close-on-click-modal="false" width="600px" style="height: 600px">
        <div style="height:400px;">
          <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
              <div style="height: 300px;">
                <role-base-info :role="currentView" style="margin-left: 20px;"></role-base-info>
              </div>
            </el-tab-pane>
            <el-tab-pane  label="应用权限"> <div style="height: 300px;">
              <role-menu-rights
                :role="currentView"
                tree-type="detail"
                :menu-tree-data="menuTreeData"
                :disabled="true">
              </role-menu-rights>
            </div></el-tab-pane>
            <el-tab-pane label="关联用户"> <div style="height: 300px;">
              <role-rel-users v-if="viewerVisible" :role="currentView"></role-rel-users>
            </div></el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
    
  <!--</base-container>-->
  </div>
</template>


<script>
  import API from '../../../rest-api/restApi';
  import qs from 'qs';
  import BaseContainer from '../../../component/base-container';
  import RoleBaseInfo from './role-baseinfo';
  import RoleMenuRights from './role-menu-rights';
  import RoleRelUsers from './role-rel-users';
  import BreadNav from '../../../mixins/bread-nav';
  import customerPagination from '../user-management/customer-pagination'
  import manaUtil from '../management-util'
  import formatDate from '../../../util/dataFormat'

  export default {
    name: 'role-management',
    mixins: [BreadNav],
    data () {
      var checkRepetition = (rule, value, callback) => {
        var vue = this;
        if(this.currentEdit.id){
          if (this.currentEdit_.roleName == value) {
            callback();
            return;
          }
        }
        manaUtil.debounce(function () {
          if (vue.dialogVisible)
            manaUtil.checkRepetition(vue, {roleName: value}, API.ROLE_GET_PINPOINT, callback, '此角色名已被使用!')
        },200)
      }

      var rules = {
        'roleName': [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {validator: checkRepetition, trigger: 'blur'},
          {min: 3, message: '长度不能少于3个字符', trigger: 'blur'},
          {max: 20, message: '长度不能大于20个字符', trigger: 'blur'},
        ],
        'status': [
          {required: true, message: '请选择角色状态', trigger: 'change'}
        ]
      };
      return {
        keywords: '',
  
        data: [],
        selection: [],
        currentEdit: {},
        currentEdit_: {}, //备份原始数据
        currentEditRights: {}, // 传递给rolemenurights的权限配置，不直接传递currentedit是防止新增的时候填写form导致子组件刷新的问题
        currentView: {},
        dialogVisible: false, // 编辑窗口显示隐藏控制
        viewerVisible: false, // 查看详情窗口显示隐藏控制
        rules: rules,

        menuTreeData: [], // 菜单树，用于勾选权限
        // roleSelectedTreeNames: [], // 当前角色选择的菜单names
        menuRights: [], // 当前菜单对应的页面操作权限
        selectedMenuRights: [], // 当前角色选择的菜单内部权限
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          dir: 'desc',
          field: 'createTime'
        },
        total: 0,
      };
    },
    components: {BaseContainer, RoleBaseInfo, RoleMenuRights, RoleRelUsers,customerPagination},
    created () {
      // 获取角色列表，还需要配置这个角色具有的菜单权限和菜单页面内的操作权限
      //this.queryRoleInfo();   //在页面参数挂载完成时，会自动查询（由自定义分页组件触发---主要返回分页信息之后再查询）
      // 获取菜单和菜单页面内配置的权限
      this.queryMenuInfo();
    },
    beforeRouteEnter (to, from, next) {
      next();
    },
    methods: {
      queryRoleInfo: function () {
        var _that = this;
        var pageInfo = {
          page: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize,
          dir: 'desc',
          field: 'createTime'
        }
        var param = _that.keywords == '' ? {} : {roleName: _that.keywords};
        _that.$http({
          method: 'post',
          url: API.ROLE_GET + '?' + _that.$qs.stringify(pageInfo),
          data: JSON.stringify(param)
        }).then((resp) => {
          _that.data = resp.data.data.data;
          _that.total = resp.data.data.total;
          _that.data.forEach( (item) => {
            manaUtil.forEachRight(item.menuData,'functionTypes');
            // todo '2'可编辑 '1'不可编辑
            debugger
            item.checkboxDisabled = item.visibleFlag === '2';
          })
        });
      },
      queryMenuInfo: function () {
        var _that = this;
        _that.$http({
          method: 'post',
          url: API.MENU_TREE,
          data: JSON.stringify({})
        }).then((res) => {
          _that.menuTreeData = res.data.data[0].id == 1 ? res.data.data[0].childMenus : res.data.data;
          manaUtil.forEachRight(_that.menuTreeData, 'menuOperations');
        }).catch((response) => {
          
        });
      },
      doSearch () {
        // 获取角色列表，还需要配置这个角色具有的菜单权限和菜单页面内的操作权限
        var _that = this;
        manaUtil.debounce(function () {
          _that.pageInfo.currentPage = 1;
          _that.queryRoleInfo();
        },500);
      },
      handleRoleChange (newRole) {
      //  选中的角色   的  菜单和菜单权限发生变化时的会掉
        console.log(newRole);
      },
      handleSelectionChange (selection) {// 菜单checkbox变化后，把选中的项目存起来
        this.selection = selection.filter(item => {return item.visibleFlag === '2'});
      },
      handleSizeChange () {

      },
      handleView (index, row) {
        this.currentView = row;
        console.log(row)
        this.viewerVisible = true;
      },
      handleAdd () {
        this.currentEdit = {};
        this.dialogVisible = true;
      },
      handleEdit (index, row) {
        this.currentEdit = Object.assign({}, row);
        this.currentEdit_ =  row;
        this.currentEditRights = {rights: Object.assign(row.rights || [])};
        this.dialogVisible = true;
      },
      // 点击提交按钮，有id就是修改，没有就是新增
      handleSubmit () {
      //  判断所填信息是否合法
  
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            this.currentEdit.rights = this.$refs['roleRights'].getRole().rights;
  
            if (this.currentEdit.id) {
              this.doEdit();
            } else {
              this.doAdd();
            }
          } else {
            this.$notify({
              showClose: true,
              duration: 2000,  // 弹框显示时间，毫秒
              message: '请按要求填写表单！',
              type: 'error',
              offset: 120
            });
            return false;
          }
        });
      },
      // form点击取消按钮
      handleFormCancel () {
        this.$refs['roleForm'].resetFields();
        this.$refs['roleRights'].resetRole();
        this.dialogVisible = false;
        this.currentEdit = {};
        this.currentEditRights = {};
      },
      handleCurrentChange () {
      },
      handleDelete (row) {
        this.doDelete([{id: row.id}]);
      },
      // 点击批量删除按钮
      handleMuiltDelete () {
        if (this.selection.length === 0) {
          this.$notify({
            showClose: true,
            duration: 2000,  // 弹框显示时间，毫秒
            message: '您当前未选择任何数据',  // 返回 response 里的错误信息
            type: 'info',
            offset: 120
          });
        } else {
          var ids = this.selection.map((select) => ({
            id: select.id
          }));
          this.doDelete(ids);
        }
      },
      setMenuChecked () {
      //  todo:设置
      },
      doAdd () {
        //this.currentEdit.insert_time = new Date();
        this.currentEdit.default = false;
        //console.log(manaUtil.treeToArray(this.currentEdit.rights, 'rights'))
        var _that = this;
        var param = {
          authRoleInfoEntity: _that.currentEdit,
          authRoleMenuEntityList: _that.$refs.roleRights.$refs.menuTree.getCheckedNodes().map( item => {
            return {
              menuId: item.id,
              functionType: manaUtil.formatFunctionType2String(item.functionTypes)
            }
          }),
        }
        this.$http({
          url: API.ROLE_INSERT,
          method: 'post',
          data: JSON.stringify(param)
        }).then(resp => {
          this.currentEdit = {};
          this.dialogVisible = false;
          this.$notify({
            message: resp.data.message,
            type: 'success',
            offset: 120
          });
          this.queryRoleInfo();
        });
      },
      doEdit () {
        //this.currentEdit.update_time = new Date();
        var _that = this;
        var param = {
          authRoleInfoEntity: _that.currentEdit,
          authRoleMenuEntityList: _that.$refs.roleRights.$refs.menuTree.getCheckedNodes().map( item => {
            return {
              roleId: _that.currentEdit.id,
              menuId: item.id,
              functionType: manaUtil.formatFunctionType2String(item.functionTypes)
            }
          }),
        }
        _that.$http({
          url: API.ROLE_UPDATE,
          method: 'patch',
          data: JSON.stringify(param)
        }).then(resp => {
          if (resp.data.code == 1){
            this.currentEdit = {};
            this.dialogVisible = false;
            this.queryRoleInfo();
          }
          this.$notify({
            message: resp.data.message,
            type: 'success',
            offset: 120
          });
        });
      },
      // 执行删除操作
      doDelete (data) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: API.ROLE_DELETE, 
            method: 'delete', 
            data: JSON.stringify(data)
          }).then((resp) => {
            this.$refs['roleTable'].clearSelection();
            this.data = resp.data.data;
            this.$notify({
              type: 'success',
              message: '删除成功!',
              offset: 120
            });
            this.pageInfo.currentPage = 1;
            this.queryRoleInfo();
          });
        });
      },
      pageChange: function (pageInfo) {
        this.pageInfo.currentPage = pageInfo.currentPage;
        this.pageInfo.pageSize = pageInfo.pageSize;
        this.queryRoleInfo();
      },
      rowClick: function (row, event) {
        if (!manaUtil.isClickButton(event) && row.checkboxDisabled)
          this.$refs['roleTable'].toggleRowSelection(row);
      },
      formatDate: function (date) {
        return date ? formatDate.dateFormat(new Date(date), 'yyyy-MM-dd hh:mm:ss') : null;
      },
      roleTableClass: function ({row, rowIndex}) {
        var className = rowIndex % 2 == 1 ? 'single-row' : 'double-row';
        return className;
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5',
        };
      },
      sortChange: function (sort) {
        if (!sort.prop) {
          return;
        }
        var _that = this;
        var order = sort.order;
        var dir = 'desc';
        switch (order){
          case 'descending':
            dir = 'desc';
            break;
          case 'ascending':
            dir = 'asc';
            break;
        }
        _that.pageInfo.dir = dir;
        _that.pageInfo.currentPage = 1;
        _that.queryRoleInfo();
      },
      selectable (row, index) {
        return row.checkboxDisabled;
      }
    },
    computed: {
      roleSelectedTreeNames: {
        get () {
          if (this.currentEdit.rights) {return this.currentEdit.rights.map(item => item.menuName);} else {return [];}
        }
      }
    },
    watch: {
      dialogVisible (value) {
        if (!value) {
          this.currentEdit = {};
        }
      }
    },
    mounted: function () {
      
    }
  };
</script>


<style scoped>
  /*.roleTable {
    background-color: #f0f9eb;
  }*/
  .role-management .el-table tr.single-row{
    background-color: #F0F2F5;
  }
  .dialog-footer{
    margin-right: 20px;
  }
  /*.role-management .el-table*/
</style>

<style lang="stylus" >
  .role-management-dialogs-div .el-dialog .el-dialog__body{
    padding: 20px 40px;
  }
</style>
