<template>
  <base-container :nav-items="navItems">
  <!--<div>-->
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <div style=" margin-top: 1%; background: white">
          <p class="title1">字典数据</p>
          <div class="search">
            <el-input style=" width: 30%" size="small"
                      placeholder="请输入字典标签查询"
                      @input="dictLabelInput"
                      v-model="dictLabel" clearable>
              <el-button slot="append" @click="getDicData" icon="el-icon-search"></el-button>
            </el-input>
            <!--<el-button type="primary" plain @click="">搜索</el-button>-->
            <div class="fr">
              <el-button opt-type="ADD" type="success" size="small" id="dicDataAdd" plain
                         @click="changeStatus($event)">新增字典数据
              </el-button>
              <el-button opt-type="DELETE" type="danger" size="small" plain
                         :disabled="dicDataMultipleSelection.data.length==0" @click="removeBatch(dicDataMultipleSelection)">
                批量删除
              </el-button>
            </div>
          </div>
          <div>
            <div class="select-total" >已选择<span>{{dicDataMultipleSelection.data.length}}</span>条数据</div>
            <el-table
              border
              :header-cell-style="getHeaderStyle"
              :row-style="getRowStyle"
              ref="multipleTable"
              :data="dictData"
              tooltip-effect="dark" style="width: 100%"
              :default-sort="{prop: 'updateTime', order: 'descending'}"
              @sort-change="sortChange"
              @selection-change="dicDatahHandleSelectionChange"
              @row-click="dicDataHandleCurrentChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column min-width="50" label="序号">
                <template slot-scope="scope">
                  {{scope.$index + (dicDataPageInfo.page - 1) * dicDataPageInfo.pageSize + 1}}
                </template>
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true" min-width="80" prop="dictLabel" label="字典标签"></el-table-column>
              <el-table-column :show-overflow-tooltip="true"  min-width="80" prop="dictValue" label="字典键值"></el-table-column>
              <el-table-column :show-overflow-tooltip="true"  min-width="80" prop="dictTypeName" label="字典类型"></el-table-column>
              <el-table-column :show-overflow-tooltip="true"  min-width="60" prop="status" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.status==0?'正常':'停用' }}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser"  min-width="80"  label="更新者"></el-table-column>
              <el-table-column prop="createTime" sortable  min-width="120"  label="创建时间">
                <template slot-scope="scope">
                  {{dateFormat(scope.row.createTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateTime"  min-width="120"  sortable label="更新时间">
                <template slot-scope="scope">
                  {{dateFormat(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="remark" :show-overflow-tooltip="true" min-width="80" label="备注"></el-table-column>
              <el-table-column prop="" label="操作" min-width="225">
                <template slot-scope="scope">
                  <el-button opt-type="DETAIL" plain
                             type="success" id='dicDataShow'
                             size="mini" @click="changeStatus($event,scope.row)">
                    详情
                  </el-button>
                  <el-button opt-type="UPDATE" plain
                             type="primary" id='dicDataEdit'
                             size="mini" @click="changeStatus($event,scope.row)">
                    编辑
                  </el-button>
                  <el-button opt-type="DELETE" plain
                             type="danger"
                             size="mini" @click="dicDataDel(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination align="right" name="dicDataPage"
                           style="margin-top: 30px;"
                           background
                           @size-change="handleSizeChange(dicData,$event)"
                           @current-change="pageHandleCurrentChange(dicData,$event)"
                           :current-page="dicDataPageInfo.page"
                           :page-sizes="[5, 10, 15, 20]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="dicDataTotal">
            </el-pagination>
          </div>
          <div class="dic-data-dialogs-div">
            <el-dialog
              :close-on-click-modal="false"
              :title="dialogTextMap[dialogStatus]"
              width="40%"
              :visible.sync="dialogFormVisible">
              <el-form v-if="dialogStatus === 'dicDataAdd'||dialogStatus === 'dicDataEdit'||dialogStatus === 'dicDataShow'"
                       :rules="dicRules"
                       ref="dictDataOne"
                       :model="dictDataOne" label-position="right" label-width="100px">
                <el-form-item label="字典标签：" :prop="getProp('dictLabel')">
                  <template v-if="detailShow">
                    {{dictDataOne.dictLabel}}
                  </template>
                  <el-input v-else v-model="dictDataOne.dictLabel" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="字典键值：" :prop="getProp('dictValue')">
                  <template v-if="detailShow">
                    {{dictDataOne.dictValue}}
                  </template>
                  <el-input v-else v-model="dictDataOne.dictValue" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="字典类型：" :prop="getProp('dictType')">
                  <template v-if="detailShow">
                    {{getDicTypeName(dictDataOne.dictType)}}
                  </template>
                  <el-select v-else v-model="dictDataOne.dictType" placeholder="请选择字典类型" :disabled='isDisabled'>
                    <el-option
                      v-for="item in allDicType"
                      :label="item.dictName"
                      :value="item.dictType"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字典排序：" :prop="getProp('dictSort')">
                  <template v-if="detailShow">
                    {{dictDataOne.dictSort}}
                  </template>
                  <el-input v-else v-model="dictDataOne.dictSort" :disabled='isDisabled'></el-input>
                </el-form-item>
                <el-form-item label="状态：" :prop="getProp('status')">
                  <template v-if="detailShow">
                    {{dictDataOne.status == 0 ? '正常' : '停用'}}
                  </template>
                  <el-select v-else v-model="dictDataOne.status" placeholder="请选择字典状态" :disabled='isDisabled'>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注：" :prop="getProp('remark')">
                  <template v-if="detailShow">
                    <div style="width: 80%; text-overflow:ellipsis; overflow: hidden">
                      <el-popover placement="bottom" width="400" trigger="hover" :content="dictDataOne.remark">
                        <div class="title-ellipsis" slot="reference">{{ dictDataOne.remark }}</div>
                      </el-popover>
                    </div>
                  </template>
                  <el-input v-else type="textarea" v-model="dictDataOne.remark" :disabled='isDisabled'></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm" plain type="danger" size="medium">取 消</el-button>
                <el-button v-if="dialogStatus === 'dicDataAdd'" type="primary" id="dicDataAddSubmit"
                           @click="dicDataAdd" plain size="medium">确 定
                </el-button>
                <el-button v-if="dialogStatus === 'dicDataEdit'" type="primary" id="dicDataEditSubmit"
                           @click="dicDataEdit" plain size="medium">确 定
                </el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
  </base-container>
  <!--</div>-->
</template>

<script>
  /**
   * 字典管理
   * @desc 字典管理js
   * @author wy
   * @date 20180728
   */
  import API from '../../../rest-api/restApi';
  import qs from 'qs';
  import BaseContainer from '../../../component/base-container';
  import dateFormat from '../../../util/dataFormat'
  import manaUtil from '../management-util'
  import BreadNav from '../../../mixins/bread-nav';

  export default {
    name: 'dic-data',
    mixins: [BreadNav],
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      dialogFormVisible: function () {
        if (!this.dialogFormVisible) {
          this.resetForm();
        }
      },
      dicTypeTotal: function () {
        if (this.dicTypeTotal) {
          this.getAllDicType(this.dicTypeTotal);
        }
      }
    },
    data() {
      var checkRepetition = (rule, value, callback) => {
        var vue = this;
        if (vue.dialogStatus === 'dicDataEdit') {
          if (this.dictDataOne.dictLabel == this.dictDataOne_.dictLabel) {
            callback();
            return;
          }
        }
        manaUtil.debounce(function () {
          if (vue.dialogFormVisible)
            manaUtil.checkRepetition(vue, {
              dictLabel: value,
              dictType: vue.dictDataOne.dictType
            }, API.DICT_DATA_GET_PINPOINT, callback, '此字典数据已存在!');
        },200)
      }
      return {
        dictType: '',
        dictLabel: '',
        dictData: [],
        dictDataOne: {
          dictLabel: '',
          dictValue: '',
          dictType: '',
          dictSort: 999,
          status: '',
          remark: ''
        },
        dictDataOne_: {},
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
          field: 'id',
          dir: 'asc'
        },
        dicDataPageInfo: {
          page: 1,
          pageSize: 10,
          field: 'updateTime',
          dir: 'desc'
        },
        /*dicTypeCurrentPage: 1,
        dicDataCurrentPage: 1,*/
        dicTypeTotal: 0,
        dicDataTotal: 0,

        allDicType: [],   //存储所有dicType

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
            {required: true, message: '字典名称不能为空', trigger: 'blur'},
            {validator: checkRepetition, trigger: 'blur'}
          ],
          dictSort: [{required: true, message: '字典排序不能为空', trigger: 'blur'}],
          dictLabel: [
            {required: true, message: '字典标签不能为空', trigger: 'blur'},
            {validator: checkRepetition, trigger: 'blur'}
          ],
          dictValue: [{required: true, message: '字典键值不能为空', trigger: 'blur'}],
          dictType: [{required: true, message: '请选择字典类型', trigger: 'blur'}],
          isDefault: [{required: true, message: '请选择是否默认', trigger: 'blur'}],
          status: [{required: true, message: '请选择字典状态', trigger: 'blur'}],
          /*remark: [{required: true, message: '备注不能为空', trigger: 'blur'}]*/
        }
      };
    },
    components: {BaseContainer},
    mounted() {
      //this.getDicTypeTree();
      this.dictType = this.$route.params['dictType'];
      console.log(this.dictType)
      this.getDicData();
      this.getAllDicType();
    },
    methods: {
      getAllDicType: function () {
        var _that = this;
        manaUtil.queryBaseInfoByURL(_that, API.DICT_TYPE_GET, 'post', function (response) {
          _that.allDicType = response.data.data.data;
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      dateFormat: function (date) {
        return dateFormat.dateFormat(date)
      },

      // 获取字典数据
      getDicData() {
        var _that = this;
        var param = this.$qs.stringify(this.dicDataPageInfo);
        var param_ = {
          dictLabel: _that.dictLabel,
          dictType: _that.dictType
        }
        this.$http({
          method: 'post',
          url: API.DICT_DATA_GET + '?' + param,
          data: JSON.stringify(param_)
        }).then((res) => {
          console.log('dicData api test success');
          _that.dictData = res.data.data.data;
          this.dicDataTotal = res.data.data.total;
        }).catch((res) => {
          console.log(res);
        });
      },

      // 新增、详情、编辑按钮点击状态
      changeStatus(e, row) {
        let id = e.currentTarget.id;
        row = JSON.parse(JSON.stringify(row || {}));
        if (id === 'dicDataAdd') {
          this.dictDataOne = {
            dictLabel: '',
            dictValue: '',
            dictType: '',
            dictSort: 999,
            status: '',
            remark: ''
          };
          this.dictDataOne.dictType = this.dictType;
          this.isDisabled = false;
          this.dialogStatus = 'dicDataAdd';
        } else if (id === 'dicDataShow') {
          this.dictDataOne = row;
          this.isDisabled = true;
          this.dialogStatus = 'dicDataShow';
        } else if (id === 'dicDataEdit') {
          this.dictDataOne = row;
          this.dictDataOne_ = JSON.parse(JSON.stringify(row));
          this.isDisabled = false;
          this.dialogStatus = 'dicDataEdit';
        }
        this.dialogFormVisible = true;

      },

      // 校验表单
      dicTypeVerify(form) {
        let _that = this;
        var res = true;
        _that.$refs[form].validate((valid) => {
          res = valid;
        });
        return res;
      },

      // 新增字典数据
      dicDataAdd() {
        var _that = this;
        if (_that.dicTypeVerify('dictDataOne')) {
          _that.dicDataInsert(this.dictDataOne, function (response) {
            _that.dialogFormVisible = false;
            _that.$notify({
              message: response.data.message,
              type: 'success',
              offset: 120
            });
            _that.getDicData();
          })
        }
        // 新增接口 数据：this.dictDataOne
        // this.dialogFormVisible = false;

      },
      dicDataInsert: function (data, callback) {
        console.log(data)
        //data.dictSort = 1;
        this.$http({
          method: 'post',
          url: API.DICT_DATA_INSERT,
          data: JSON.stringify(data)
        }).then((response) => {
          if (response.data.code == 1) {
            callback(response);
          }
        }).catch((response) => {

        })
      },

      // 修改字典数据
      dicDataEdit() {
        var _that = this;
        if (_that.dicTypeVerify('dictDataOne')) {
          _that.dicDataUpdate(this.dictDataOne, function (response) {
            _that.dialogFormVisible = false;
            _that.$notify({
              message: response.data.message,
              type: 'success',
              offset: 120
            });
            _that.getDicData();
          })
        }
        // 修改接口 数据：this.dictDataOne
        // this.dialogFormVisible = false;

      },
      dicDataUpdate: function (data, callback) {
        this.$http({
          method: 'patch',
          url: API.DICT_DATA_UPDATE,
          data: JSON.stringify(data)
        }).then((response) => {
          console.log(response)
          if (response.data.code == 1) {
            callback(response);
          }
        }).catch((response) => {

        })
      },

      // 表单取消按钮
      resetForm() {
        this.dialogFormVisible = false;
        if (this.dialogStatus === 'dicTypeAdd' || this.dialogStatus === 'dicTypeEdit') {
          this.$refs['dictTypeOne'].resetFields();
        } else if (this.dialogStatus === 'dicDataAdd' || this.dialogStatus === 'dicDataEdit') {
          this.$refs['dictDataOne'].resetFields();

        }
      },

      // 批量删除
      removeBatch(multipleSelection) {
        console.log(multipleSelection)
        var url = '';
        let _that = this;
        var ids = multipleSelection.data.map(element => element.id);
        if (multipleSelection.name === 'dicTypeMultipleSelection') {
          url = API.DICT_TYPE_DEL;
        } else if (multipleSelection.name === 'dicDataMultipleSelection') {
          url = API.DICT_DATA_DEL;
        }
        if (ids.length === 0) {
          this.$notify({
            message: '请先选择要删除的数据',
            type: 'warning',
            offset: 120
          });
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

      // 字典数据每行点击事件
      dicDataHandleCurrentChange(row, event, column) {
        if (!manaUtil.isClickButton(event))
          this.$refs.multipleTable.toggleRowSelection(row);
      },

      // 字典数据选中变化事件
      dicDatahHandleSelectionChange(val) {
        this.dicDataMultipleSelection.data = val;
      },

      handleDetail(row) {

      },

      // 类型、数据每页显示数据change
      handleSizeChange(type, val) {
        console.log(`每页 ${val} 条`);
        if (type === 'dicType') {
          this.dicTypePageInfo.pageSize = val;
          this.getDicTypeTree();
        } else if (type === 'dicData') {
          this.dicDataPageInfo.pageSize = val;
          this.getDicData();
        }
      },

      // 类型、数据分页切换
      pageHandleCurrentChange(type, val) {
        console.log(`当前页: ${val}`);
        if (type === 'dicType') {
          this.dicTypePageInfo.page = val;
          this.getDicTypeTree();
        } else if (type === 'dicData') {
          this.dicDataPageInfo.page = val;
          this.getDicData();
        }
      },
      dicDataDel: function (row) {
        var _that = this;
        var ids = [row.id];
        _that.deleteDic('确定删除当前字典数据？', API.DICT_DATA_DEL, ids, function () {
          _that.dicDataPageInfo.page = 1;
          _that.getDicData();
        })
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

      getRowStyle: function ({row, rowIndex}) {
        return (rowIndex % 2 == 1) ? {
          background: '#F0F2F5'
        } : {};
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5'
        }
      },
      dictLabelInput: function () {
        var _that = this;
        manaUtil.debounce(function () {
          _that.dicDataPageInfo.page = 1;
          _that.getDicData();
        }, 500);
      },
      getProp: function (prop) {
        var p = this.detailShow ? '' : prop;
        return p;
      },
      getDicTypeName: function (dicType_) {
        for (var index in this.allDicType) {
          var dicType = this.allDicType[index];
          if (dicType.dictType == dicType_) {
            return dicType.dictName;
          }
        }
      },
      dialogClose: function (done) {
        this.$refs['dictDataOne'].resetFields();
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
        _that.dicDataPageInfo.dir = dir;
        _that.dicDataPageInfo.field = sort.prop;
        _that.dicDataPageInfo.page = 1;
        _that.getDicData();
      }
    },
    computed: {},
    watch: {
      dialogStatus: function (value) {
        this.detailShow = (value == 'dicDataShow');
      },
      dialogFormVisible: function (value) {
        if (!value) {
          this.$refs['dictDataOne'].resetFields();
        }
      }
    }

  };

</script>

<style scoped>
  .search {
    padding: 20px 0px;
    /*text-align: center*/
    /*padding: 20px auto;*/
  }

  .el-dialog .el-form-item {
    width: 100%;
    white-space: nowrap;
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
  .dic-data-dialogs-div .el-dialog .el-dialog__body {
    padding: 20px 40px;
  }
</style>
