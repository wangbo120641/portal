<template>
  <!--<base-container :nav-items="navItems">-->
  <div>
    <div style="padding: 30px 40px; background: white">

      <div class="search pb20">
        <el-input style="width:30%;" size="small"
                  placeholder="请输入类型名称查询"
                  @input="dictNameInput"
                  v-model="dictName" clearable>
          <el-button slot="append" @click="getDicTypeTree" icon="el-icon-search"></el-button>
        </el-input>
        <!--<el-button type="primary" plain @click="">搜索</el-button>-->
        <div class="fr" style="">
          <el-button opt-type="ADD" type="success" size="small" plain id="dicTypeAdd"
                     @click="changeStatus($event)">新增字典类型
          </el-button>
          <el-button opt-type="DELETE" type="danger" size="small" plain
                     :disabled="dicTypeMultipleSelection.data.length==0" @click="removeBatch(dicTypeMultipleSelection)">
            批量删除
          </el-button>
        </div>
      </div>
      <div>
        <div class="select-total" >已选择<span>{{dicTypeMultipleSelection.data.length}}</span>条数据</div>
        <el-table
          border
          :row-style="getRowStyle"
          :header-cell-style="getHeaderStyle"
          ref="dictTypeTable"
          :data="dictType"
          id="dictTypeTable"
          :default-sort="{prop: 'updateTime', order: 'descending'}"
          @sort-change="sortChange"
          @row-click="dicTypeHandleCurrentChange"
          @selection-change="dicTypeHandleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column min-width="50" label="序号">
            <template slot-scope="scope">
              {{scope.$index + (dicTypePageInfo.page - 1) * dicTypePageInfo.pageSize + 1}}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="dictName" label="类型名称">
            <template slot-scope="scope">
              <a @click="getDictData(scope.row.dictType)">{{scope.row.dictName}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">{{ scope.row.status==0?'正常':'停用' }}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createUser" label="创建者" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column show-overflow-tooltip prop="updateUser" label="更新者" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column show-overflow-tooltip prop="createTime" sortable label="创建时间" min-width="100">
            <template slot-scope="scope">
              {{dateFormat(scope.row.createTime)}}
            </template>
          </el-table-column>
          <el-table-column  show-overflow-tooltip prop="updateTime" sortable label="更新时间" min-width="100">
            <template slot-scope="scope">
              {{dateFormat(scope.row.updateTime)}}
            </template>
          </el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip label="备注"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="操作" min-width="230">
            <template slot-scope="scope">
              <el-button opt-type="DETAIL" plain type="success" size="mini" id="dicTypeShow"
                         @click="changeStatus($event,scope.row)">
                详情
              </el-button>
              <el-button opt-type="UPDATE" plain type="primary" size="mini" id='dicTypeEdit'
                         @click="changeStatus($event,scope.row)">
                编辑
              </el-button>
              <el-button opt-type="DELETE" plain type="danger" size="mini" @click="dicTypeDel(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align="right" name="dicTypePage"
                       style="margin-top: 30px;"
                       background
                       @size-change="handleSizeChange(dicType,$event)"
                       @current-change="pageHandleCurrentChange(dicType,$event)"
                       :current-page="dicTypePageInfo.page"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="dicTypePageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="dicTypeTotal">
        </el-pagination>
      </div>
    </div>
    <div class="dic-type-dialogs-div">
      <el-dialog
        :close-on-click-modal="false"
        :title="dialogTextMap[dialogStatus]"
        width="40%"
        :visible.sync="dialogFormVisible">
        <el-form v-if="dialogStatus === 'dicTypeAdd'||dialogStatus === 'dicTypeEdit'||dialogStatus==='dicTypeShow'"
                 :rules="dicRules"
                 ref="dictTypeOne"
                 :model="dictTypeOne" label-position="right" label-width="100px">
          <el-form-item label="类型名称：" :prop="getProp('dictName')">
            <template v-if="detailShow">
              {{dictTypeOne.dictName}}
            </template>
            <el-input v-else v-model="dictTypeOne.dictName" placeholder="请输入字典类型名称" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="字典类型：" :prop="getProp('dictType')">
            <template v-if="detailShow">
              {{dictTypeOne.dictType}}
            </template>
            <el-input v-else v-model="dictTypeOne.dictType" placeholder="请输入字典类型" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="状态：" :prop="getProp('status')">
            <template v-if="detailShow">
              {{dictTypeOne.status == '0' ? '正常' : '停用'}}
            </template>
            <el-select v-else v-model="dictTypeOne.status" placeholder="请选择字典状态" :disabled='isDisabled'>
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" :prop="getProp('remark')">
            <template v-if="detailShow">
              {{dictTypeOne.remark}}
            </template>
            <el-input v-else type="textarea" v-model="dictTypeOne.remark" :disabled='isDisabled'></el-input>
          </el-form-item>
        </el-form>


        <div slot="footer" class="dialog-footer">
          <!-- <el-button v-if="dialogStatus === 'dicTypeAdd'" @click="resetForm" type="danger" plain size="medium">取 消</el-button> -->
          <el-button @click="closeForm" type="danger" plain size="medium">取 消</el-button>
          <el-button v-if="dialogStatus === 'dicTypeAdd'" plain type="primary" id="dicTypeAddSubmit"
                     @click="dicTypeAdd" size="medium">确 定
          </el-button>
          <el-button v-if="dialogStatus === 'dicTypeEdit'" plain type="primary" id="dicTypeEditSubmit"
                     @click="dicTypeEdit" size="medium">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <!--</base-container>-->
</template>

<script>
  /**
   * 字典管理
   * @desc 字典管理js
   * @author wy
   * @date 20180728
   */
  import API from '../../../rest-api/restApi';
  import BaseContainer from '../../../component/base-container';
  import dateFormat from '../../../util/dataFormat';
  import manaUtil from '../management-util';
  import BreadNav from '../../../mixins/bread-nav';

  export default {
    name: 'dic-type',
    mixins: [BreadNav],
    watch: {
      dialogFormVisible: function () {
        if (!this.dialogFormVisible) {
          this.resetForm();
        }
      },
      dialogStatus: function (value) {
        this.detailShow = (value == 'dicTypeShow');
      },
      dicTypeTotal: function () {
        if (this.dicTypeTotal) {
          this.getAllDicType(this.dicTypeTotal);
        }
      }
    },
    data () {
      var checkRepetition = (rule, value, callback) => {
        var vue = this;

        if (vue.dialogStatus === 'dicTypeEdit') {
          if (vue.dictTypeOne.dictName == vue.dictTypeOne_.dictName) {
            callback();
            return;
          }
        }
        manaUtil.debounce(function () {
          if (vue.dialogFormVisible) {manaUtil.checkRepetition(vue, {dictName: value}, API.DICT_TYPE_GET_PINPOINT, callback, '此字典类型已存在!');}
        }, 200);
      };

      return {
        dictType: [],
        dictName: '',
        dictTypeOne: {},
        dictTypeOne_: {},
        // dictTypeTree: [],
        dictData: [],
        dictDataOne: {},
        filterText: '',
        input: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isDisabled: false,
        detailShow: false,
        dicTypeMultipleSelection: {
          name: 'dicTypeMultipleSelection',
          data: []
        },
        dicDataMultipleSelection: {
          name: 'dicDataMultipleSelection',
          data: []
        },
        sels: [],
        dicType: 'dicType',
        dicData: 'dicData',
        dicTypePageInfo: {
          page: 1,
          pageSize: 10,
          field: 'updateTime',
          dir: 'desc'
        },

      /* dicTypeCurrentPage: 1,
        dicDataCurrentPage: 1, */
        dicTypeTotal: 0,
        dicDataTotal: 0,
        allDicType: [],   // 存储所有dicType
        // 弹窗数据
        dialogFormVisible: false,
        dialogStatus: '',
        dialogTextMap: {
          dicTypeAdd: '新增字典类型',
          dicTypeShow: '字典类型详情',
          dicTypeEdit: '编辑字典类型',
          dicDataAdd: '新增字典数据',
          dicDataShow: '字典数据详情',
          dicDataEdit: '编辑字典数据'
        },

        dicRules: {
          dictName: [
            {required: true, message: '字典名称不能为空', trigger: 'change'},
            {validator: checkRepetition, trigger: 'blur'}
          ],
          dictSort: [{required: true, message: '字典排序不能为空', trigger: 'change'}],
          dictLabel: [{required: true, message: '字典标签不能为空', trigger: 'change'}],
          dictValue: [{required: true, message: '字典键值不能为空', trigger: 'change'}],
          dictType: [{required: true, message: '请选择字典类型', trigger: 'change'}],
          isDefault: [{required: true, message: '请选择是否默认', trigger: 'change'}],
          status: [{required: true, message: '请选择字典状态', trigger: 'change'}]
        }
      };
    },
    components: {BaseContainer},
    mounted () {
      this.getDicTypeTree();
      // this.getDicData();
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      dateFormat: function (date) {
        return dateFormat.dateFormat(date);
      },
      // 获取字典类型树
      getDicTypeTree () {
        var param = this.$qs.stringify(this.dicTypePageInfo);

        this.$http({
          method: 'post',
          url: API.DICT_TYPE_GET + '?' + param,
          data: JSON.stringify({
            dictName: this.dictName
          })
        }).then((res) => {
          this.dictType = res.data.data.data;
          this.dicTypeTotal = res.data.data.total;
        }).catch((res) => {
          console.log(res);
        });
      },

      // 新增、详情、编辑按钮点击状态
      changeStatus (e, row) {
        let id = e.currentTarget.id;

        row = JSON.parse(JSON.stringify(row || {}));
        this.dialogFormVisible = true;
        if (id === 'dicTypeAdd') {
          // this.dictTypeOne = {};
          this.resetForm();
          this.isDisabled = false;
          this.dialogStatus = 'dicTypeAdd';
        } else if (id === 'dicTypeShow') {
          this.dictTypeOne = row;
          this.isDisabled = true;
          this.dialogStatus = 'dicTypeShow';
        } else if (id === 'dicTypeEdit') {
          this.dictTypeOne = row;
          this.dictTypeOne_ = JSON.parse(JSON.stringify(row));
          this.isDisabled = false;
          this.dialogStatus = 'dicTypeEdit';
        }
      },

      // 校验表单
      dicTypeVerify (form) {
        let _that = this;
        var res = true;

        _that.$refs[form].validate((valid) => {
          res = valid;
        });
        return res;
      },

      // 新增字典类型
      dicTypeAdd () {
        var _that = this;

        if (_that.dicTypeVerify('dictTypeOne')) {
          _that.dicTypeInsert(this.dictTypeOne, function (response) {
            _that.dialogFormVisible = false;
            _that.$notify({
              message: response.data.message,
              type: 'success',
              offset: 120
            });
            _that.getDicTypeTree();
          });
        }
        // 新增接口 数据：this.dictTypeOne
        // this.dialogFormVisible = false;
      },
      dicTypeInsert: function (data, callback) {
        this.$http({
          method: 'post',
          url: API.DICT_TYPE_INSERT,
          data: JSON.stringify(data)
        }).then((response) => {
          if (response.data.code == 1) {
            callback(response);
          }
        }).catch((response) => {

        });
      },

      // 修改字典类型
      dicTypeEdit () {
        var _that = this;

        if (_that.dicTypeVerify('dictTypeOne')) {
          _that.dicTypeUpdate(this.dictTypeOne, function (response) {
            _that.dialogFormVisible = false;
            _that.$notify({
              message: response.data.message,
              type: 'success',
              offset: 120
            });
            _that.getDicTypeTree();
          });
        }
        // 修改接口 数据：this.dictTypeOne
        // this.dialogFormVisible = false;
      },
      dicTypeUpdate: function (data, callback) {
        this.$http({
          method: 'patch',
          url: API.DICT_TYPE_UPDATE,
          data: JSON.stringify(data)
        }).then((response) => {
          if (response.data.code == 1) {
            callback(response);
          }
        }).catch((response) => {

        });
      },

      // 表单取消按钮
      resetForm () {
        var _this = this;

        if (this.$refs['dictTypeOne']) {
          this.$refs['dictTypeOne'].resetFields();
          Object.keys(_this.dictTypeOne).forEach(key => {
            _this.dictTypeOne[key] = '';
          });
        }
      },
      // 关闭编辑窗口
      closeForm () {
        this.dialogFormVisible = false;
      },
      // 批量删除
      removeBatch (multipleSelection) {
        var url = '';
        let _that = this;
        var ids = multipleSelection.data.map(element => element.id);

        if (multipleSelection.name === 'dicTypeMultipleSelection') {
          url = API.DICT_TYPE_DEL;
        } else if (multipleSelection.name === 'dicDataMultipleSelection') {
          url = API.DICT_DATA_DEL;
        }
        if (ids.length === 0) {
          this.$notify('请先选择要删除的数据');
        } else {
          _that.deleteDic('确定要删除选中的字典数据吗?', url, ids, function () {
            if (multipleSelection.name === 'dicTypeMultipleSelection') {
              _that.getDicTypeTree();
            } else if (multipleSelection.name === 'dicDataMultipleSelection') {
              _that.getDicData();
            }
          });
        }
      },

      // 字典类型每行点击事件
      dicTypeHandleCurrentChange (row, event, column) {
        if (!manaUtil.isOperationClick(event, ['A', 'BUTTON'])) {this.$refs.dictTypeTable.toggleRowSelection(row);}
      },

      // 字典数据每行点击事件
      dicDataHandleCurrentChange (row, event, column) {
        if (!manaUtil.isClickButton(event)) {this.$refs.multipleTable.toggleRowSelection(row);}
      },

      // 字典类型选中变化事件
      dicTypeHandleSelectionChange (val) {
        this.dicTypeMultipleSelection.data = val;
      },
      // 字典数据选中变化事件
      dicDatahHandleSelectionChange (val) {
        this.dicDataMultipleSelection.data = val;
      },

      handleDetail (row) {

      },

      // 类型、数据每页显示数据change
      handleSizeChange (type, val) {
        if (type === 'dicType') {
          this.dicTypePageInfo.pageSize = val;
          this.getDicTypeTree();
        } else if (type === 'dicData') {
          this.dicDataPageInfo.pageSize = val;
          this.getDicData();
        }
      },

      // 类型、数据分页切换
      pageHandleCurrentChange (type, val) {
        if (type === 'dicType') {
          this.dicTypePageInfo.page = val;
          this.getDicTypeTree();
        } else if (type === 'dicData') {
          this.dicDataPageInfo.page = val;
          this.getDicData();
        }
      },

      getAllDicType: function (total) {
        var param = this.$qs.stringify({
          page: 1,
          pageSize: total,
          field: 'id',
          dir: 'asc'
        });

        this.$http({
          method: 'post',
          url: API.DICT_TYPE_GET + '?' + param,
          data: JSON.stringify({})
        }).then((res) => {
          if (res.data.code == 1) {
            this.allDicType = res.data.data.data;
          }
        }).catch((res) => {
          console.log(res);
        });
      },
      dicTypeDel: function (row) {
        var _that = this;
        var ids = [row.id];

        _that.deleteDic('确定删除当前字典类型？', API.DICT_TYPE_DEL, ids, function () {
          _that.dicTypePageInfo.currentPage = 1;
          _that.getDicTypeTree();
        });
      },
      dicDataDel: function (row) {
        var _that = this;
        var ids = [row.id];

        _that.deleteDic('确定删除当前字典数据？', API.DICT_DATA_DEL, ids, function () {
          _that.getDicData();
        });
      },
      deleteDic: function (confirmMessage, url, ids, callback) {
        var _that = this;

        _that.$confirm(confirmMessage, '提示').then(() => {
          _that.$http({
            method: 'delete',
            url: url,
            data: JSON.stringify(ids)
          }).then(res => {
            if (res.data.code == 1) {
              _that.$notify({
                message: res.data.message,
                type: 'success',
                offset: 120
              });
              callback();
            }
          });
        }).catch((error) => {
          console.log(error);
        });
      },
      getDictData: function (type) {
        this.$router.push({
          name: 'dicData',
          params: {
            dictType: type
          }
        });
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
      },
      dictNameInput: function () {
        var _that = this;

        manaUtil.debounce(function () {
          _that.dicTypePageInfo.page = 1;
          _that.getDicTypeTree();
        }, 500);
      },
      getProp: function (prop) {
        var p = this.detailShow ? '' : prop;

        return p;
      },
      dialogClose: function (done) {
        this.$refs['dictTypeOne'].resetFields();
        done();
      },
      sortChange: function (sort) {
        if (!sort.prop) {
          return;
        }
        var _that = this;
        var order = sort.order;
        var dir = 'desc';

        switch (order) {
          case 'descending':
            dir = 'desc';
            break;
          case 'ascending':
            dir = 'asc';
            break;
        }
        _that.dicTypePageInfo.dir = dir;
        _that.dicTypePageInfo.field = sort.prop;
        _that.dicTypePageInfo.page = 1;
        _that.getDicTypeTree();
      }
    },
    computed: {
      // navItems() {// 从route中返回当前路径信息
      //  return this.$route.matched.map((route) => {
      //    return {label: route.meta.title ? route.meta.title : route.meta.tip, pathName: route.name};
      //  });
      // }
    }

  };
</script>

<style scoped>

  .el-dialog .el-dialog__body {
    padding: 20px 40px;
  }

  #dictTypeTable {
    width: 100%;
  }

  .title1 {
    font-size: 20px;
    font-weight: bold;
  }

  .dialog-footer {
    margin-right: 20px;
  }
</style>

<style lang="stylus">
  .dic-type-dialogs-div .el-dialog .el-dialog__body {
    padding: 20px 40px;
  }
</style>
