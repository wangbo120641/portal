<!--
 /**
  * 组织管理
  * @desc 组件描述
  * @author w16901
  * @date 2018年7月25日16:22:00
  * @example 调用示例
  *  <company-management></company-management>
  */
-->
<template>
  <!--<base-container :nav-items="navItems" aside-side="left">-->
  <div class="system-containt">
    <el-row>
      <el-col :span="6">
        <div class="company-management-base-div" style="height: 100%; width: 100%;">
          <!--左侧树-->
          <el-card class="box-card" style="height: 375px;">
            <div class="left-tree-div">
              <div class="tree-search-div">
                <el-input
                  size="small"
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
                  <el-button slot="append" @click="filterTextNode" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <el-tree
                style="margin-top: 10px"
                class="filter-tree"
                :data="treeData"
                :props="defaultProps"
                default-expand-all
                @node-click="handleTreeNodeClick"
                :filter-node-method="filterNode"
                ref="tree2">
              </el-tree>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row class="company-management-base-div-el-row" style="margin-left: 10px;margin-bottom: 20px">
          <el-col class="box-sh" style="border:1px solid #ebeef5">
            <!--右侧部分-->
            <div class="right-info-div">
              <!--搜索+按钮-->
              <el-form :inline="true" :model="formInline" size="small" class="">
                <el-row>
                  <el-col :span="10">
                    <el-input style=" margin: 10px 0px" clearable size="small"
                              v-model="formInline.departmentName"
                              @input="departmentNameInput"
                              placeholder="请输入组织名称">
                      <el-button slot="append" @click="getTableData" icon="el-icon-search"></el-button>
                    </el-input>
                  </el-col>
                  <el-col :span="6">&nbsp;</el-col>
                  <el-col :span="8">
                    <!--<el-button type="primary" @click="getTableData">搜索</el-button>-->
                    <!--<div class="fr" style=" margin: 10px 0px">-->
                    <!--<el-button opt-type="ADD" type="primary" size="small" plain @click="addOrganizeClick('')">添加组织</el-button>-->
                    <!--<el-button opt-type="DELETE" type="danger" size="small" plain :disabled="selectListRow.length===0" @click="handleMuiltDelete">批量删除</el-button>-->
                    <!--</div>-->
                  </el-col>
                </el-row>
              </el-form>
              <!--列表-->
              <div class="company-management-info-div">
                <!-- <div class="select-total" >已选择<span>{{selectListRow.length}}</span>条数据</div> -->
                <el-table
                  border
                  ref="companyTable"
                  :row-style="getRowStyle"
                  :header-cell-style="getHeaderStyle"
                  v-loading="loading"
                  element-loading-text="加载中..."
                  element-loading-spinner="el-icon-loading"
                  :data="tableData"
                  size="small"
                  style="font-size:14px;"
                  @row-click="rowClick"
                  @sort-change="sortChange"
                  @selection-change="handleSelectionChange">
                  <!-- <el-table-column
                    type="selection">
                  </el-table-column> -->
                  <el-table-column
                    label="序号"
                    width="80">
                    <template slot-scope="scope">
                      {{scope.$index + (currentPage - 1) * pageSize + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="departmentName"
                    label="组织名称">
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="parentDepartmentName"
                    label="父级组织">
                    <template slot-scope="scope">
                      {{scope.row.parentDepartmentName}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    property="departmentDetail"
                    label="组织描述">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" width="270" trigger="hover" :content="scope.row.departmentDetail">
                        <div slot="reference" class="title-ellipsis"><span>{{scope.row.departmentDetail }}</span></div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    label="操作"
                    width="80"
                    prop="operate">
                    <template slot-scope="scope">
                      <el-button opt-type="DETAIL" type="success" plain size="mini" @click="handleDetail(scope.row)">
                        详情
                      </el-button>
                      <!--<el-button opt-type="UPDATE" size="mini" type="success" plain @click="handleUpdate(scope.row)">编辑</el-button>-->
                      <!--<el-button opt-type="DELETE" size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  align="right"
                  background
                  style="margin-top: 30px"
                  @size-change="pageSizeChange" @current-change="pageCurrentChange"
                  :current-page="currentPage" :page-sizes="currentPages"
                  :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


    <div class="company-management-dialogs-div">
      <el-dialog :close-on-click-modal="false" :title="dialogStatus" :visible.sync="dialogFormVisible" width="50%">
        <el-form ref="organizeForm" :model="organizeForm" :rules="organizeRules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="父级组织" prop="parentDepartmentCode">
                <el-select
                  filterable
                  v-model="organizeForm.parentDepartmentCode"
                  :disabled="organizeForm.parentDepartmentCode == 0"
                  placeholder="请选择">
                  <el-option
                    v-for="item in getListData"
                    :label="item.departmentName"
                    :key="item.departmentCode"
                    :value="item.departmentCode"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织名称" prop="departmentName">
                <el-input v-model="organizeForm.departmentName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="组织描述" prop="departmentDetail">
                <el-input type="textarea" v-model="organizeForm.departmentDetail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" type="danger" plain @click="dialogFormVisible=false">取 消</el-button>
          <el-button size="medium" type="primary" plain @click="addOrganizeSubmitForm('organizeForm')">
            确 定
          </el-button>
          <!--<el-button size="medium" type="primary" v-if="isRisksUpdate" @click="risksUpdateSubmitForm('organizeForm')" round>-->
          <!--提 交-->
          <!--</el-button>-->
        </div>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" title="组织详情" width="40%" :visible.sync="dialogDetailFormVisible">
        <el-form class="pd20" :model="detailTableData" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="组织名称 :">
                <span class="pl15">{{detailTableData.departmentName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="父级组织 :">
                <span class="pl15"> 
                  {{detailTableData.parentDepartmentName?detailTableData.parentDepartmentName:'无'}}
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="组织描述 :">
                  <div class="remark-div pl15">
                      <el-popover placement="bottom-start" width="400" trigger="hover" :content="detailTableData.departmentDetail">
                        <div slot="reference" class="title-ellipsis"><span>{{detailTableData.departmentDetail }}</span></div>
                      </el-popover>
                  </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>

    <!--</base-container>-->
  </div>
</template>

<script>
  import API from '../../rest-api/restApi';
  import BaseContainer from '../../component/base-container';
  import BreadNav from '../../mixins/bread-nav';
  import qs from 'qs';
  import manaUtil from './management-util';

  export default {
    name: 'company-management',
    mixins: [BreadNav],
    data () {
      var checkRepetition = (rule, value, callback) => {
        var vue = this;

        if (vue.organizeForm.id && vue.organizeForm.id != '') {
          callback();
          return;
        }
        if (!vue.organizeForm.parentDepartmentCode || vue.organizeForm.parentDepartmentCode == '') {
          callback();
          return;
        }
        manaUtil.debounce(function () {
          if (vue.dialogFormVisible) {
            manaUtil.checkRepetition(vue, {
              departmentName: value,
              parentDepartmentCode: vue.organizeForm.parentDepartmentCode,
              status: 0   // 限制为启用组织
            }, API.COMPANY_QUERY_PINPOINT, callback, '父级组织下此组织已存在!');
          }
        }, 200);
      };

      return {
        // 弹框
        dialogFormVisible: false,
        dialogDetailFormVisible: false,
        loading: false,
        // 树搜索框
        filterText: '',
        // 树-数据
        treeData: [],
        listData: [],
        departments: [],
        defaultProps: {
          children: 'children',
          label: 'departmentName'
        },
        // 分页总条数
        total: 0,
        // 分页-展示条数选择
        currentPages: [5, 10, 15, 20],
        // 默认第几页
        currentPage: 1,
        // 默认每页条数
        pageSize: 10,
        // 分页设置
        tableParams: {
          'page': 1,
          'pageSize': 10,
          'dir': 'asc',
          'field': 'id'
        },
        // 右侧搜索框
        formInline: {
          departmentName: ''
        },
        expandRowId: '',  // 左侧树被点击的行id
        // 添加和修改弹框标题
        dialogStatus: '',
        // 列表选中的行
        selectListRow: [],
        detailTableData: {
          createTime: '',
          departmentName: '',
          departmentDetail: '',
          id: '',
          parentDepartmentName: '',
          parentDepartmentCode: '',
          status: '',
          updateTime: ''
        },
        // 列表-数据
        tableData: [],
        organizeForm: {},
        organizeRules: {
          parentDepartmentCode: [
            {required: true, message: '请选择父级组织', trigger: 'change'}
          ],
          riskLevel: [
            {required: true, message: '请选择组织', trigger: 'change'}
          ],
          riskEmergency: [
            {required: true, message: '请输入组织名称'}
            // {min: 2, message: '组织名称不能少于2个字符'},
            // {max: 30, message: '组织名称不能大于30个字符'},
          ],
          departmentName: [
            {required: true, message: '请输入组织名称'},
            {min: 2, message: '组织名称不能少于2个字符'},
            {max: 30, message: '组织名称不能大于30个字符'},
            {validator: checkRepetition, trigger: 'blur'}
          ],
          departmentDetail: [
            {required: false, message: ''},
            {max: 256, message: '描述信息不能大于256个字符'}
          ],
          riskDetail: [
            {required: true, message: '请输入负责人', trigger: 'blur'}
          ],
          riskStrategy: [
            {required: true, message: '请输入人数', trigger: 'blur'}
          ],
          planEndDate: [
            {required: true, message: '请输入位置', trigger: 'change'}
          ],
          riskState: [
            {required: true, message: '请输入电话', trigger: 'change'}
          ],
          riskType: [
            {required: true, message: '请输入备注', trigger: 'change'}
          ]
        },
        clickData: ''  // 暂存被点击的tree节点
      };
    },
    watch: {},
    methods: {
      // 树节点被点击时的回调
      handleTreeNodeClick (data, node) {
        if (node) {node.expanded = true;}
        var clickData = manaUtil.treeToArray([data], 'children');

        this.clickData = clickData;
        this.expandRowId = data.id;
        this.selectListRow = [];
        this.currentPage = 1;
        this.staticSetTableData({
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });

      /* this.getTableData(); */
      },

      staticSetTableData: function (page) {
        var tableData = [];

        for (let i in this.clickData) {
          if (i >= (page.currentPage - 1) * page.pageSize && i <= (page.currentPage) * page.pageSize - 1) {
            tableData.push(this.clickData[i]);
          }
        }
        this.total = this.clickData.length;
        this.tableData = tableData;
      },

      resetTreeClickRow: function () {
        if (this.expandRowId != '') {
          var findNode = function (id, treeData) {
            for (var index in treeData) {
              var treeNode = treeData[index];

              if (id == treeNode.id) {
                return treeNode;
              }
              var res = findNode(id, treeNode.children);

              if (res) {
                return res;
              }
            }
            return null;
          };
          var res = findNode(this.expandRowId, this.treeData);

          if (res) {
            this.handleTreeNodeClick(res);
          }
        } else {
          this.getTableData();
        }
      },

      // 对树节点进行筛选时执行的方法
      filterNode (value, data) {
        if (!value) return true;
        return data.departmentName.indexOf(value) !== -1;
      },
      filterTextNode: function () {
        this.$refs.tree2.filter(this.filterText);
      },
      // 获取数据-树
      getTreeData () {
        let _that = this;

        manaUtil.queryBaseInfoByURL(_that, API.COMPANY_QUERY, 'post', function (response) {
          _that.listData = response.data.data.data;
          _that.treeData = manaUtil.arrayToTree(response.data.data.data, 'departmentCode', 'parentDepartmentCode');
          // _that.treeData = _that.treeData[0].id == 1 ? _that.treeData[0].children : children;
          // _that.findParent(_that.tableData);
          _that.resetTreeClickRow();
        }, {status: 0});
      },
      // 模糊查询
      onSubmit () {
        this.getTableData();
      },
      // 添加组织按钮
      addOrganizeClick (row) {
        this.organizeForm = {
          riskTitle: '',
          riskLevel: '',
          riskEmergency: '',
          riskDetail: '',
          riskStrategy: row.name,
          planEndDate: '',
          riskState: '',
          riskType: '',
          dealStaffId: '',
          staffName: ''
        };
        this.dialogStatus = '添加组织';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['organizeForm'].clearValidate();
        });
      },
      // 每页条数改变时会触发
      pageSizeChange (val) {
        this.pageSize = val;
        this.tableParams.pageSize = val;
        this.currentPage = 1;
        if (this.clickData == '') {
          this.getTableData({
            page: this.currentPage,
            pageSize: this.pageSize
          });
        } else {
          this.staticSetTableData({
            currentPage: this.currentPage,
            pageSize: this.pageSize
          });
        }
      },
      // 当前页变动时候触发的事件
      pageCurrentChange (val) {
        this.currentPage = val;
        this.tableParams.page = val;

        if (this.clickData == '') {
          this.getTableData({
            'page': val
          });
        } else {
          this.staticSetTableData({
            currentPage: this.currentPage,
            pageSize: this.pageSize
          });
        }
      },
      // 提交表单
      addOrganizeSubmitForm (form) {
        let _that = this;

        this.$refs[form].validate((valid) => {
          if (valid) {
            if (!_that.organizeForm.id || _that.organizeForm.id == '') {_that.postAddProInfoData(_that.organizeForm);} else {_that.postUpdateProInfoData(_that.organizeForm);}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 存储数据-新增项目信息
      postAddProInfoData (data) {
        let _that = this;

        this.$http({
          method: 'post',
          // url: 'pms/project-save',
          url: API.COMPANY_INSERT,
          data: JSON.stringify(data)
        }).then((response) => {
          this.$notify({
            showClose: true, // 是否显示关闭按钮
            duration: 2000,  // 弹框显示时间，毫秒
            message: response.data.message,
            type: 'success',
            offset: 120
          });
          _that.dialogFormVisible = false;
          _that.getTableData();
          _that.getTreeData();
        }).catch((response) => {
          console.log(response);
        });
      },
      postUpdateProInfoData: function (data) {
        data.parentObj = undefined;
        data.children = [];
        let _that = this;

        this.$http({
          method: 'patch',
          // url: 'pms/project-save',
          url: API.COMPANY_UPDATE,
          data: JSON.stringify(data)
        }).then((response) => {
          this.$notify({
            showClose: true, // 是否显示关闭按钮
            duration: 2000,  // 弹框显示时间，毫秒
            message: response.data.message,
            type: 'success',
            offset: 120
          });
          _that.dialogFormVisible = false;
          // _that.getTableData();
          _that.getTreeData();
        }).catch((response) => {
          console.log(response);
        });
      },
      // 当表格的排序条件发生变化的时候会触发该事件
      sortChange (val) {
        if (!val.prop) {
          return;
        }
        let order = 'asc';

        if (val.order === 'descending') {
          order = 'desc';
        } else {
          order = 'asc';
        }
        this.currentPage = 1;
        this.tableParams.field = val.prop;
        this.tableParams.dir = order;
        this.getTableData({
          'page': this.currentPage,
          'field': val.prop,
          'dir': order
        });
      },
      // 多选操作
      handleSelectionChange (val) {
        this.selectListRow = val;
      },
      // 获取列表
      getTableData (value) {
        let _that = this;
        // 表格接口传参示例
        let data = {
          departmentName: ''
        };

        data = Object.assign({status: 0}, data, this.formInline); // TODO待后续接口对接时注释需打开
        if (data.departmentName == '') {
          data.departmentName = undefined;
        }
        let param = Object.assign({}, this.tableParams, value);

        param = this.$qs.stringify(param);
        this.$http({
          method: 'post',
          url: '/auth/dptInfo_query' + '?' + param,
          data: JSON.stringify(data)
        }).then((res) => {
          _that.loading = false;
          _that.tableData = res.data.data.data;
          _that.total = res.data.data.total;
        }).catch((response) => {
          _that.loading = false;
        });
      },
      findParent: function (departments) {
        var findParent = function (department, treeData) {
          for (let index in treeData) {
            var data = treeData[index];

            if (department.parentDepartmentCode == data.departmentCode) {
              department.parentDepartmentName = data.departmentName;
              return;
            }
            findParent(department, data.children);
          }
        };

        for (let index in departments) {
          var department = departments[index];

          findParent(department, this.treeData);
        }
      },
      // 权限详情
      handleDetail (row) {
        this.dialogDetailFormVisible = true;
        this.detailTableData = Object.assign({}, row);
      },
      // 更新权限模态框
      handleUpdate (row) {
        this.organizeForm = JSON.parse(JSON.stringify(row)); // copy obj
        this.dialogStatus = '修改组织';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['organizeForm'].clearValidate();
        });
      },
      handleDelete (row) {
        this.doDelete([{id: row.id}]);
      },
      // 点击批量删除按钮
      handleMuiltDelete () {
        if (this.selectListRow.length === 0) {
          this.$notify({
            showClose: true,
            duration: 2000,  // 弹框显示时间，毫秒
            message: '您当前未选择任何数据',  // 返回 response 里的错误信息
            type: 'info',
            offset: 120
          });
        } else {
          let ids = this.selectListRow.map((select) => ({id: select.id}));

          this.doDelete(ids);
        }
      },
      // 执行删除操作
      doDelete (data) {
        let _that = this;

        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: API.COMPANY_DELETE,
            method: 'patch',
            data: JSON.stringify(data)
          }).then((resp) => {
            _that.$refs['companyTable'].clearSelection();
            // _that.tableData = resp.data.data;
            _that.currentPage = 1;
            _that.tableParams.page = 1;
            _that.getTableData({page: 1});
            _that.getTreeData();
            this.$notify({
              type: 'success',
              message: '删除成功!',
              offset: 120
            });
          });
        });
      },
      rowClick: function (row, event) {
        if (!manaUtil.isClickButton(event)) {this.$refs['companyTable'].toggleRowSelection(row);}
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5'
        };
      },
      getRowStyle: function ({row, rowIndex}) {
        return (rowIndex % 2 == 1 ? {
          background: '#F0F2F5'
        } : {});
      },
      findDeptById: function (id) {
        var findDeptById = function (id, array) {
          if (!array) {
            return null;
          }
          for (var index in array) {
            var dept = array[index];

            if (dept.id == id) {
              return dept;
            }
            dept = findDeptById(id, dept.children);
            if (dept) {
              return dept;
            }
          }
        };

        return findDeptById(id, this.treeData);
      },
      departmentNameInput: function () {
        var _that = this;

        manaUtil.debounce(function () {
          _that.getTableData({page: 1});
        }, 500);
      }
    },
    mounted () {
      this.getTreeData();
      this.getTableData();
    },
    computed: {
      /* navItems () {// 从route中返回当前路径信息
        return this.$route.matched.map((route) => {
          return {label: route.meta.title ? route.meta.title : route.meta.tip, pathName: route.name};
        });
      } */
      getListData: function () {
        if (this.organizeForm.id == 1) {
          return this.listData;
        }
        if (this.organizeForm.id && !this.organizeForm.children) {
          this.organizeForm = this.findDeptById(this.organizeForm.id);
        }
        var children = manaUtil.treeToArray(this.organizeForm.children, 'children');

        this.listData.forEach((data) => {
          data.disabled = false;
          if (this.organizeForm.id == data.id) {
            data.disabled = true;
          }
          for (var index in children) {
            var item = children[index];

            if (data.id == item.id) {
              data.disabled = true;
              break;
            }
          }
        });
        return this.listData;
      }
    },
    components: {
      BaseContainer
    }
  };
</script>

<style scoped>
  .remark-div {
    display: inline-block;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dialogs-div .el-dialog .el-dialog__body {
    padding: 20px 40px;
  }

  .dialog-footer {
    margin-right: 20px;
  }

  .left-tree-div {
    overflow-y: auto
  }

  .right-info-div {
    padding: 1.5% 40px;
    position: relative;
    min-height: 410px;
  }

  .tree-search-div {
    margin: 10px 0;
  }

  .company-management-info-div {
    margin-top: 5px;
  }

  .company-management-base-div {
    /*position: absolute;*/
    padding: 0 10px 20px 20px;
    box-sizing: border-box;
  }

  .company-management-base-div .company-management-base-div-el-row {
    width: 100%;
  }
</style>

<style lang="stylus">
  .company-management-dialogs-div .el-dialog .el-dialog__body {
    padding: 20px 40px;
  }

  .company-management-base-div .company-management-base-div-el-row .el-col-19 {
    width: 100%;
  }
  .company-management-base-div .el-tree {
    max-height: 290px;
    overflow-y: auto;
  }
</style>

