/**
 Auth: lujuan l16076
 Created: 2018/7/25-15:05
 */
import authorDetailDialog from './author-detail-dialog.vue';
import {Message} from 'element-ui';
import BaseContainer from '../../../component/base-container';
import BreadNav from '../../../mixins/bread-nav';
import API from '../../../rest-api/restApi';
import manaUtile from '../management-util';
import customerPagination from '../user-management/customer-pagination';
import treeTable from '../../../component/TreeTable';

export default {
  name: 'right-management',
  mixins: [BreadNav],
  data () {
    var checkRepetition = (rule, value, callback) => {
      var vue = this;

      if (vue.dialogStatus === 'edit') {
        callback();
        return;
      }
      manaUtile.debounce(function () {
        if (vue.dialogFormVisible)
          manaUtile.checkRepetition(vue, {menuName: value}, API.RIGHT_QUERY_PINPOINT, callback, '此菜单已存在!');
      },200)
      
    };

    return {
      authManagementList: [],
      formInline: {
        menuName: ''
      },
      operatingAuthorizations: [],
      columns: [
        /* {
          text: 'ID',
          value: 'id',
          width: '240px'
        }, */
        {
          text: '菜单名称',
          value: 'menuName'
        },
        {
          text: '菜单ID',
          value: 'menuCode'
        },
        {
          text: '父级菜单',
          value: 'parentMenuName'
        },
        {
          text: '菜单类型',
          value: 'menuType'
        },
        {
          text: '菜单描述',
          value: 'remark',
          showOverflow: true
        },
        {
          text: '操作',
          width: '260'
        }
      ],
      allMenu: [],
      parentMenuCode: '', // 暂存所选择的parentMenuCode
      loading: false,  // 表格数据没加载前的loading
      currentPage: 1,
      pageSize: 10,
      // currentPages: 5,
      total: 0,
      tableParams: {
        'page': 1,
        'pageSize': 5,
        'dir': 'asc',
        'field': 'id'
      },
      authorityData: {
        name: '',
        id: '',
        parentMenuCode: '',
        menuOperations: '',
        type: '',
        value: '',
        remark: '',
        status: ''
      },
      authTypeOptions: [{
        id: '1',
        name: '菜单权限'
      },
      {
        id: '2',
        name: '按钮权限'
      }],
      statusOptions: [{
        id: '0',
        name: '启用'
      },
      {
        id: '1',
        name: '停用'
      }],
      dialogFormVisible: false,
      dialogStatus: '',
      dialogTextMap: {
        edit: '编辑菜单',
        add: '新增菜单'
      },
      multipleSelection: [],
      rules: {
        menuName: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 2, message: '菜单名称不能少于2个字符', trigger: 'blur'},
          {max: 10, message: '菜单名称不能大于10个字符', trigger: 'blur'},
          {validator: checkRepetition, trigger: 'blur'}
        ],
        id: [
          {required: true, message: '请输入菜单ID', trigger: 'blur'}
        ],
        parentMenuCode: [
          {required: true, message: '请选择父级菜单', trigger: 'blur'}
        ],

        /* value: [
          {required: true, message: '请输入权限值', trigger: 'blur'}
        ], */
        /* menuType: [{required: true, message: '请选择权限类型', trigger: 'change'}], */
        status: [{required: true, message: '请选择菜单状态', trigger: 'change'}],
        remark:[
          {required: false, message: '请选择菜单状态', trigger: 'change'},
          {max: 255, message: '描述信息不能超过255个字符', trigger: 'change'},
        ]
      },
      menuButtonList: [], // 菜单选择的按钮和其对应的URL{'buttonName':'ADD','url':'/system/operateLog/add'}
      menuButtonListAlready: []// 编辑时已选择的权限和操作URL，新选择的从这里遍历看有没有对应的URL，没有的话为空，有的话填进去，每次编辑或添加都清空
    };
  },
  methods: {
    // 待处理列表真实接口数据
    getTableData (value) {
      var _that = this;
      var data = Object.assign({}, this.formInline);
      let param = Object.assign({}, this.tableParams, value);

      param = this.$qs.stringify(param);
      this.$http({
        method: 'post',
        url: API.MENU_TREE,
        data: JSON.stringify(data)
      }).then((res) => {
        _that.loading = false;
        var menuList = manaUtile.treeToArray(res.data.data, 'childMenus');

        _that.setParentName(menuList, menuList);
        // if (!_that.allMenu || _that.allMenu.length == 0){
        //   _that.allMenu = menuList;
        // }
        _that.allMenu = menuList;
        _that.changeChildrenName(res.data.data);    // 适应treeTable
        _that.authManagementList = (res.data.data.length == 0 ? [] : (res.data.data[0].id == 1 ? res.data.data[0].children : res.data.data));
        manaUtile.forEachRight(_that.authManagementList, 'menuOperations');
        _that.authManagementList.forEach((item) => {
          item.operability = false;
        });
        _that.total = res.data.total;
        _that.$Progress.finish();
      }).catch((response) => {
        _that.loading = false;
        _that.$Progress.finish();
      });
    },

    changeChildrenName: function (array) {
      for (var index in array) {
        var item = array[index];

        if (item.childMenus) {
          this.changeChildrenName(item.childMenus);
          item.children = item.childMenus;
        }
      }
    },

    // 页码大小
    handleSizeChange (val) {
      this.pageSize = val;
      this.tableParams.pageSize = val;
      this.currentPage = 1;
      this.getTableData({
        page: this.currentPage,
        pageSize: this.pageSize
      });
    },
    // 当前页变动时候触发的事件
    handleCurrentChange (val) {
      this.currentPage = val;
      this.tableParams.page = val;
      this.getTableData({
        'page': val
      });
    },
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange (val) {
      if (!val.prop) {
        return;
      }
      var order = 'asc';

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
      this.multipleSelection = val;
    },
    // 清空模态框的数据
    resetAuthorityData () {
      this.authorityData = {
        name: '',
        id: '',
        parentMenuCode: '',
        menuOperations: [],
        type: '',
        value: '',
        remark: '',
        status: ''
      };
    },
    // 新增权限模态框
    handleCreate () {
      this.resetAuthorityData();
      this.dialogStatus = 'add';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    // 新增权限保存数据
    createData () {
      var _that = this;

      console.log('addmenu', this.authorityData);
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          _that.addAuthInfoData(_that.authorityData);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 存储数据-新增项目信息
    addAuthInfoData (data) {
      var postData = {authMenuInfoEntity: data};
      // 菜单按钮权限对应的URL

      postData.menuButtonBeanList = this.menuButtonList;
      // return;
      data.menuType = '1';
      data.functionType = manaUtile.formatFunctionType2String(data.menuOperations);
      let _that = this;

      this.$http({
        method: 'post',
        url: API.RIGHT_INSERT,
        data: JSON.stringify(postData)
      }).then((response) => {
        _that.dialogFormVisible = false;
        _that.resetForm('dataForm');
        _that.getTableData();
        // _that.getAllMenus();
        _that.$notify({
          showClose: true, // 是否显示关闭按钮
          duration: 2000,  // 弹框显示时间，毫秒
          message: response.data.message,
          type: 'success',
          offset: 120
        });
      }).catch((response) => {
        console.log(response);
      });
    },
    // 更新权限模态框
    handleUpdate (row) {
      // todo 请求详情
      this.$http.get(API.MENU_DETAIL_GET + '?id=' + row.id).then(resp => {
        // console.log('hello', resp);
        this.menuButtonList = [];
        var mbl = resp.data.data.menuButtonBeanList;

        var ft = resp.data.data.authMenuInfoEntity.functionType;
        // 对menuButtonBeanList进行排序
        if (ft) {
          ft.split(',').forEach(funType => {
            var fd = mbl.find(mblItem => mblItem.buttonName == funType);

            if (fd) {
              this.menuButtonList.push(fd);
            }else{
              this.menuButtonList.push({buttonName:funType,url:''});
            }
          });
        }
      });
      this.authorityData = Object.assign({}, this.authorityData, row); // copy obj
      if (!this.authorityData.menuOperations) {
        this.authorityData.menuOperations = [];
      }
      this.dialogStatus = 'edit';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    // 更新数据保存
    updateData () {
      var _that = this;

      _that.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var tempData = Object.assign({}, _that.authorityData);

          tempData.children = [];
          tempData.childMenus = [];
          tempData.parent = undefined;
          tempData.functionType = manaUtile.formatFunctionType2String(tempData.menuOperations);
          var postData = {authMenuInfoEntity: tempData};

          postData.menuButtonBeanList = this.menuButtonList;

          _that.$http({
            method: 'patch',
            url: API.RIGHT_UPDATE,
            data: JSON.stringify(postData)
          }).then((response) => {
            if (response.data.code) {
              _that.$notify({
                message: response.data.message,
                type: 'success',
                offset: 120
              });
              this.$refs['dataForm'].clearValidate();
              _that.dialogFormVisible = false;
              _that.getTableData();
              // _that.getAllMenus();
            }
          }).catch((response) => {

          });
        }
      });
    },
    // 删除数据提示
    handleDelect (row) {
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        this._deleteRow(row);
      });
    },
    // 删除操作
    _deleteRow (row) {
      let _that = this;
      var param = {id: row.id, menuCode: row.menuCode};

      this.$http({
        method: 'delete',
        // url: '/delete',
        url: API.RIGHT_DELETE,
        data: JSON.stringify(param)
      }).then((response) => {
        this.$notify({
          showClose: true, // 是否显示关闭按钮
          duration: 2000,  // 弹框显示时间，毫秒
          message: '删除成功！',
          type: 'success',
          ooffset: 120
        });
        _that.getTableData();
      }).catch((response) => {
        console.log(response);
      });
    },
    // 批量删除
    multipleDelete (rowList) {
      let _that = this;

      /* this.$http({
        method: 'post',
        url: '/multipleDelete',
        data: this.$qs.stringify(rowList)
      }).then((response) => {
        Message({
          showClose: true, // 是否显示关闭按钮
          duration: 2000,  // 弹框显示时间，毫秒
          message: response.data.message,
          type: 'success'
        });
        _that.getTableData();
      }).catch((response) => {
        console.log(response);
      }); */
    },
    // 权限详情
    handleDetail (row) {
      // 显示弹窗
      this.$refs.authorityDetail.showProjectDetail(row);
    },
    // 表单重置
    resetForm (form) {
      this.$refs[form].resetFields();
    },
    // 模糊查询
    onSubmit () {
      this.getTableData();
    },
    pageChange: function (pageInfo) {
      /* var param = {
        page: pageInfo.currentPage,
        pageSize: pageInfo.pageSize
      } */
      this.tableParams.page = pageInfo.currentPage;
      this.tableParams.pageSize = pageInfo.pageSize;
      this.getTableData();
    },
    setParentName: function (allMenu, authManagementList) {
      for (let i in authManagementList) {
        for (let j in allMenu) {
          if (allMenu[j].menuCode == authManagementList[i].parentMenuCode) {
            authManagementList[i].parentMenuName = allMenu[j].menuName;
            break;
          }
        }
      }
    },
    getAllMenus: function () {
      var _that = this;

      manaUtile.queryBaseInfoByURL(_that, API.RIGHT_QUERY, 'post', function (response) {
        if (response.data.code == 1) {
          _that.allMenu = response.data.data.data;
          _that.setParentName(_that.allMenu, _that.authManagementList);
        }
      });
    },
    inputMenuName: function (value) {
      var _that = this;

      manaUtile.debounce(function () {
        _that.getTableData();
      }, 500);
    },
    // 根据opt获取其对应的label
    optLabel (opt) {
      var dict = this.operatingAuthorizations.find(optValue => optValue.dictValue === opt);
      return dict?dict.dictLabel:'';
    }
  },
  components: {
    BaseContainer,
    authorDetailDialog,
    customerPagination,
    treeTable
  },
  computed: {
    /* navItems () {// 从route中返回当前路径信息
      return this.$route.matched.map((route) => {
        return {label: route.meta.title ? route.meta.title : route.meta.tip, pathName: route.name};
      });
    }, */
    computeAllMenu: function () {
      var children = manaUtile.treeToArray([this.authorityData], 'children');

      this.allMenu.forEach((data) => {
        data.disabled = false;
        if (data.id == this.authorityData.id) {
          data.disabled = true;
        }
        for (var index in children) {
          var item = children[index];

          if (item.id == data.id) {
            data.disabled = true;
            break;
          }
        }
      });
      return this.allMenu;
    }

  },
  mounted () {
    var _that = this;

    _that.$Progress.start(); // 显示进度条 http://hilongjw.github.io/vue-progressbar/index.html
    _that.getTableData();    // 参数挂载完成不必查询，自定义分页组件会在mounted触发afterPageDataChange事件，在事件中执行即可
    // _that.getAllMenus();
    manaUtile.queryBaseInfoByURL(_that, API.DICT_DATA_GET, 'post', function (response) {
      _that.operatingAuthorizations = response.data.data.data;
    }, {dictType: 'OPERATION_AUTHORIZATION'});
  },
  watch: {
    parentMenuCode: function () {

    },
    dialogFormVisible: function () {
      if (!this.dialogFormVisible) {
        this.authorityData.menuOperations = [];
      }
    },
    'authorityData.menuOperations': function (data) {
      // console.log('selectedmenuOperate', data);
      // console.log('selectedmenuOperate', this.menuButtonList);
      // console.log('selectedmenuOperate', this.operatingAuthorizations);
      // 没有的添加进去
      data.forEach(opt => {
        var find = this.menuButtonList.find(m => m.buttonName === opt);

        if (!find) {
          this.menuButtonList.push({buttonName: opt, url: ''});
        }
      });
      //  多出来的删除掉
      this.menuButtonList.forEach((mb, index) => {
        var find = data.find(opt => mb.buttonName === opt);

        if (!find) {
          this.menuButtonList.splice(index, 1);
          index--;
        }
      });
    }
  }
};
