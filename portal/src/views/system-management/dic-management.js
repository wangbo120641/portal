/**
 * 字典管理
 * @desc 字典管理js
 * @author wy
 * @date 20180728
 */
import API from '../../rest-api/restApi';
import qs from 'qs';
import BaseContainer from '../../component/base-container';
import dateFormat from '../../util/dataFormat'
import manaUtil from './management-util'

export default {
  name: 'dic-management',

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
      if(this.dicTypeTotal){
        this.getAllDicType(this.dicTypeTotal);
      }
    }
  },
  data() {
    return {
      dictType: [],
      dictTypeOne: {},
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
        field: 'id',
        dir: 'asc'
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
        dictName: [{required: true, message: '字典名称不能为空', trigger: 'blur'}],
        dictSort: [{required: true, message: '字典排序不能为空', trigger: 'blur'}],
        dictLabel: [{required: true, message: '字典标签不能为空', trigger: 'blur'}],
        dictValue: [{required: true, message: '字典键值不能为空', trigger: 'blur'}],
        dictType: [{required: true, message: '请选择字典类型', trigger: 'blur'}],
        isDefault: [{required: true, message: '请选择是否默认', trigger: 'blur'}],
        status: [{required: true, message: '请选择字典状态', trigger: 'blur'}],
        remark: [{required: true, message: '备注不能为空', trigger: 'blur'}]
      }
    };
  },
  components: {BaseContainer},
  mounted() {
    /*this.getDicTypeTree();
    this.getDicData();*/
    console.log(this.$router)
    this.$router.push({name: 'dicType'})
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    dateFormat: function(date){
      return dateFormat.dateFormat(date)
    },
    // 获取字典类型树
    getDicTypeTree() {
      var param = this.$qs.stringify(this.dicTypePageInfo);
      this.$http({
        method: 'post',
        url: API.DICT_TYPE_GET + '?' + param,
        data: JSON.stringify({})
      }).then((res) => {
        console.log('dicTypeTree api test success');
        this.dictType = res.data.data.data;
        this.dicTypeTotal = res.data.data.total;
      }).catch((res) => {
        console.log(res);
      });
    },

    // 获取字典数据
    getDicData() {
      var _that = this;
      var param = this.$qs.stringify(this.dicDataPageInfo);
      this.$http({
        method: 'post',
        url: API.DICT_DATA_GET + '?' + param,
        data: JSON.stringify({})
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
      row = Object.assign({},row);
      if (id === 'dicTypeAdd') {
        this.dictTypeOne = {};
        this.isDisabled = false;
        this.dialogStatus = 'dicTypeAdd';
      } else if (id === 'dicTypeShow') {
        this.dictTypeOne = row;
        this.isDisabled = true;
        this.dialogStatus = 'dicTypeShow';
      } else if (id === 'dicTypeEdit') {
        this.dictTypeOne = row;
        this.isDisabled = false;
        this.dialogStatus = 'dicTypeEdit';
      } else if (id === 'dicDataAdd') {
        this.dictDataOne = {};
        this.isDisabled = false;
        this.dialogStatus = 'dicDataAdd';
      } else if (id === 'dicDataShow') {
        this.dictDataOne = row;
        this.isDisabled = true;
        this.dialogStatus = 'dicDataShow';
      } else if (id === 'dicDataEdit') {
        this.dictDataOne = row;
        this.isDisabled = false;
        this.dialogStatus = 'dicDataEdit';
      }
      this.dialogFormVisible = true;

    },

    // 校验表单
    dicTypeVerify(form) {
      console.log(form)
      let _that = this;
      var res = true;
      _that.$refs[form].validate((valid) => {
        res = valid;
      });
      return res;
    },

    // 新增字典类型
    dicTypeAdd() {
      var _that = this;
      if (_that.dicTypeVerify('dictTypeOne')){
        _that.dicTypeInsert(this.dictTypeOne, function (response) {
          _that.dialogFormVisible = false;
          _that.$message({
            message: response.data.message,
            type: 'success'
          });
          _that.getDicTypeTree();
        })
      }
      // 新增接口 数据：this.dictTypeOne
      // this.dialogFormVisible = false;

    },
    dicTypeInsert: function(data, callback) {
      this.$http({
        method: 'post',
        url: API.DICT_TYPE_INSERT,
        data: JSON.stringify(data)
      }).then( (response) => {
        if (response.data.code == 1){
          callback(response);
        }
      }).catch( (response) => {

      })
    },

    // 修改字典类型
    dicTypeEdit() {
      var _that = this;
      if (_that.dicTypeVerify('dictTypeOne')){
        _that.dicTypeUpdate(this.dictTypeOne, function (response) {
          _that.dialogFormVisible = false;
          _that.$message({
            message: response.data.message,
            type: 'success'
          });
          _that.getDicTypeTree();
        })
      }
      // 修改接口 数据：this.dictTypeOne
      // this.dialogFormVisible = false;
    },
    dicTypeUpdate: function(data, callback) {
      this.$http({
        method: 'patch',
        url: API.DICT_TYPE_UPDATE,
        data: JSON.stringify(data)
      }).then( (response) => {
        if (response.data.code == 1){
          callback(response);
        } 
      }).catch( (response) => {
        
      })
    },

    // 新增字典数据
    dicDataAdd() {
      var _that = this;
      if (_that.dicTypeVerify('dictDataOne')){
        _that.dicDataInsert(this.dictDataOne, function (response) {
          _that.dialogFormVisible = false;
          _that.$message({
            message: response.data.message,
            type: 'success'
          });
          _that.getDicData();
        })
      }
      // 新增接口 数据：this.dictDataOne
      // this.dialogFormVisible = false;

    },
    dicDataInsert: function(data, callback) {
      this.$http({
        method: 'post',
        url: API.DICT_DATA_INSERT,
        data: JSON.stringify(data)
      }).then( (response) => {
        if (response.data.code == 1){
          callback(response);
        }
      }).catch( (response) => {

      })
    },

    // 修改字典数据
    dicDataEdit() {
      var _that = this;
      if (_that.dicTypeVerify('dictDataOne')){
        _that.dicDataUpdate(this.dictDataOne, function (response) {
          _that.dialogFormVisible = false;
          _that.$message({
            message: response.data.message,
            type: 'success'
          });
          _that.getDicData();
        })
      }
      // 修改接口 数据：this.dictDataOne
      // this.dialogFormVisible = false;

    },
    dicDataUpdate: function(data, callback) {
      this.$http({
        method: 'patch',
        url: API.DICT_DATA_UPDATE,
        data: JSON.stringify(data)
      }).then( (response) => {
        console.log(response)
        if (response.data.code == 1){
          callback(response);
        }
      }).catch( (response) => {

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
        this.$message('请先选择要删除的数据');
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
    dicTypeHandleCurrentChange(row, event, column) {
      if (!manaUtil.isClickButton(event)) 
        this.$refs.dictTypeTable.toggleRowSelection(row);
    },

    // 字典数据每行点击事件
    dicDataHandleCurrentChange(row, event, column) {
      if (!manaUtil.isClickButton(event))
        this.$refs.multipleTable.toggleRowSelection(row);
    },

    // 字典类型选中变化事件
    dicTypeHandleSelectionChange(val) {
      this.dicTypeMultipleSelection.data = val;
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
        if(res.data.code == 1){
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
        _that.getDicTypeTree();
      })
    },
    dicDataDel: function (row) {
      var _that = this;
      var ids = [row.id];
      _that.deleteDic('确定删除当前字典数据？', API.DICT_DATA_DEL, ids, function () {
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
          if (res.data.code == 1){
            _that.$message({
              message: res.data.message,
              type: 'success'
            });
            callback();
          }
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  computed: {
    navItems() {// 从route中返回当前路径信息
      return this.$route.matched.map((route) => {
        return {label: route.meta.title ? route.meta.title : route.meta.tip, pathName: route.name};
      });
    }
  }

};
