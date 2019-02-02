import ComBanner from 'src/component/com-banner/com-banner';
import BaseContainer from 'src/component/base-container';
import AnimateLine from 'src/component/animate-line';
import InterfaceDetail from './components/interface-detail.vue';
import RectBadge from 'src/component/rect-badge';
import breadNav from 'src/mixins/bread-nav';
import RESTAPI from 'src/rest-api/restApi.js';

let data = {
  name: 'interface-service',
  mixins: [breadNav],
  data () {
    var checkType = (rule, value, callback) => {
      var re = /^[1-9]+[0-9]*$/;// 判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/

      if (!re.test(value) || Number(value) > 365 || Number(value) <= 0) {
        this.subscForm.applyDay = ''; // 错误后直接清空该表单项
        callback(new Error('使用期限请输入1~365的整数！')
        );
      } else {
        callback();
      }
    };

    return {
      category: this.$route.meta.category,
      treeData: [],
      treeNodeSelected: {},
      pagging: {
        total: 0,
        currentPage: 1,
        pageSize: 5
      },
      tableParams: {
        'page': 1,
        'pageSize': 5,
        'dir': 'desc',
        'field': 'createTime'
      },
      searchContent: '',
      interfaceData: [],
      newDirectoryData: [],
      newApplicationData: [],
      dialogFormVisible: false,
      subscForm: {
        apiId: '',
        apiName: '',
        useType: '',
        effectInfo: '',
        applyReason: '',
        applyDay: '',
        applyType: '2',
        applyName: ''
      },
      subscriptOrder: false, // true 升序;false 降序
      collectOrder: false,
      subscRules: {
        useType: [
          {required: true, message: '请选择用户类型', trigger: 'change'}
        ],
        effectInfo: [
          {required: true, message: '请选择用途', trigger: 'change'}
        ],
        applyReason: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ],
        applyDay: [
          {required: true, message: '请输入使用期限！', trigger: 'blur'},
          {validator: checkType, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    filterNode: function (value) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 左侧菜单树选择时查询对应接口
    nodeClick: function (data, node) {
      this._setNode(this.treeData);
      data.selected = true;
      this.treeNodeSelected = {nodeTree: data.id};
      this.pagging.currentPage = 1;
      this.interfaceDataQuery({page: 1});
    },
        // renderContent: function (h, {node, data, store}) {
        // },
    _setNode: function (arr) {
      if (arr && arr.length > 0) {
        arr.forEach(item => {
          item.selected = false;
          if (item.children && item.children.length > 0) {
            this._setNode(item.children);
          }
        });
      }
    },
    handleSizeChange (val) {
      this.pagging.pageSize = val;
      this.tableParams.pageSize = val;
      this.pagging.currentPage = 1;
      this.interfaceDataQuery({
        page: this.pagging.currentPage,
        pageSize: this.pagging.pageSize
      });
    },
    handleCurrentChange (val) {
      this.pagging.currentPage = val;
      this.tableParams.page = val;
      this.interfaceDataQuery({
        'page': val
      });
    },
    treeDataQuery (theme) {
      let _this = this;

      _this.$http.post(globals.serverUrl + RESTAPI.INTERFACE_CATEGORY_TREE_DATA_QUERY + '?' + _this.$qs.stringify({themeId: theme, type: 'interface'})).then(res => {
        _this._setNode(res.data.data);
        _this.treeData = res.data.data;

        // 初始化查询一级分类下所有接口
        _this.$nextTick(res => {
          // if (_this.treeData && _this.treeData.length > 0) {
          _this.treeNodeSelected = {nodeTree: _this.category}; // 选择的菜单节点
          _this.nodeClick({id: _this.treeNodeSelected.nodeTree});
          // }
        });
      }).catch(res => {
        _this.$notify({
          type: 'error',
          message: res.data.message,
          offset: 120
        });
      });
    },
    // todo 接口数据查询
    interfaceDataQuery (paggingParams) {
      var _this = this,
        data = {nodeTree: _this.treeNodeSelected.nodeTree, searchContent: _this.searchContent},
        params = Object.assign({}, _this.tableParams, paggingParams);

      _this.$http.post(globals.serverUrl + RESTAPI.INTERFACE_DATA_QUERY + '?' + this.$qs.stringify(params), data).then(res => {
        res.data.data.data.forEach(item => {
          item.subsText = _this._switchSubs(item.isSubs);
        });
        _this.interfaceData = res.data.data.data;
        _this.pagging.total = res.data.data.total;
      }).catch(res => {
        _this.$notify({
          type: 'error',
          message: '接口获取失败',
          offset: 120
        });
      });
    },
    // 最新目录查询
    newDirectoryDataQuery () {
      var _this = this;

      _this.$http.post(globals.serverUrl + '/ae/PlatDatalogVisitTQry' + '?' + this.$qs.stringify({topN: 10})).then(res => {
        _this.newDirectoryData = res.data.data;
      }).catch(res => {
        _this.$notify({
          type: 'error',
          message: res.data.message,
          offset: 120
        });
      });
    },
    // 最新应用查询
    newApplicationDataQuery () {
      var _this = this;

      _this.$http.post(globals.serverUrl + RESTAPI.INTERFACE_NEW_APPLICATION).then(res => {
        _this.newApplicationData = res.data.data;
      }).catch(res => {
        _this.$notify({
          type: 'error',
          message: res.data.message,
          offset: 120
        });
      });
    },
    skipDirectoryDetail (item) {
      this.$router.push({name: 'catalogDetail', params: {id: item.typeId}});
    },
    skipInterfaceDetail (item) {
      this.$router.push({name: 'interfaceDetail', params: {id: item.id, parentNavItems: this.navItems}});
    },
    collect (item) {
      if (!this.$store.state.auth.isLogin) {
        this.$login({});
        return;
      }
      var _this = this, status = item.isCollect === '0' ? '1' : '0';

      _this.$http.post(globals.serverUrl + RESTAPI.CATALOG_COLLECT, JSON.stringify({id: item.id, status: status, collectType: '2'})).then(res => {
        // _this.$nextTick(function () {
        //   item.isCollect === '0' ? '1' : '0';
        // });
        item.isCollect = status;
        _this.interfaceDataQuery();
        _this.$notify({
          type: 'success',
          message: res.data.message,
          offset: 120
        });
      }).catch(res => {
        _this.$notify({
          type: 'error',
          message: '收藏失败!',
          offset: 120
        });
      });
    },
    subscript (item) {
      var _this = this;

      // todo 本部门用户不能订阅相同部门数据
      if (item.dataSource === this.$store.state.user.department.departmentName) {
        return _this.$confirm('本部门用户不能订阅本部门数据', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          center: true
        });
      }
      if (!_this.$store.state.auth.isLogin) {
        this.$login({});
        return;
      }

      if (item.isSubs === '0') {
        _this.dialogFormVisible = true;
        _this.subscForm.apiId = item.id;
        _this.subscForm.apiName = item.apiName;
      }
      if (item.isSubs === '1') {
        _this._subscribeCancel(item.id);
      }
      if (item.isSubs === '2') {
        // _this.dialogFormVisible = true;
        // _this.$refs['subscForm'].resetFields();
        // _this.subscForm.apiId = item.id;
        // _this.subscForm.apiName = item.resourceName;
      }
    },
    handleClose (done) {
      this.$refs['subscForm'].resetFields();
      done();
    },
    subscSubmitForm (formName) {
      let _that = this;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let datas = Object.assign({}, _that.subscForm); // TODO待后续接口对接时注释需打开

          _that.$http({
            method: 'post',
            url: globals.serverUrl + RESTAPI.INTERFACE_SUBSCRIPTION,
            data: JSON.stringify(datas)
          }).then((res) => {
            _that.dialogFormVisible = false;
            _that.$notify({
              title: '订阅申请成功',
              message: res.data.message,
              type: 'success',
              offset: 120
            });
            _that.interfaceDataQuery();
            _that.$refs['subscForm'].resetFields();
          }).catch((response) => {
            console.log(response);
          });
        }
      });
    },
    resetSubscribeFields () {
      this.dialogFormVisible = false;
      this.$refs['subscForm'].resetFields();
    },
    // 取消订阅
    _subscribeCancel (id) {
      let _that = this;

      this.$confirm('是否取消订阅?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        // todo applyTYpe =2 接口取消订阅
        let data = {apiId: id, applyType: '2'};

        this.$http({
          method: 'post',
          url: globals.serverUrl + RESTAPI.INTERFACE_SUBSCRIPTION_CANCEL,
          data: JSON.stringify(data)
        }).then((res) => {
          _that.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success',
            offset: 120
          });
          _that.interfaceDataQuery();
        }).catch((response) => {
          console.log(response);
        });
      }).catch(() => {
      });
    },
    troggleCollectOrder (orderType) {
      this.subscriptOrder = false;
      this.collectOrder = !this.collectOrder;
      // this.tableParams.field = orderType;
      // this.tableParams.dir = this.collectOrder ? 'asc' : 'desc';
      this.pagging.currentPage = 1;
      this.interfaceDataQuery({field: orderType, dir: this.collectOrder ? 'asc' : 'desc', page: 1});
    },
    troggleSubscriptOrder (orderType) {
      this.collectOrder = false;
      this.subscriptOrder = !this.subscriptOrder;
      // this.tableParams.field = orderType;
      // this.tableParams.dir = this.collectOrder ? 'asc' : 'desc';
      this.pagging.currentPage = 1;
      this.interfaceDataQuery({field: orderType, dir: this.subscriptOrder ? 'asc' : 'desc', page: 1});
    },
    skipApplicationDetail (item) {
      this.$http.post('/se/application/insertFlux', JSON.stringify({id: item.id})).then(resp => {
        window.open(item.applicationUrl);
      });
    },
    _switchSubs: function (value) {
      var text = '';

      if (!this.$store.state.auth.isLogin) {
        text = '订阅';
        return text;
      }

      switch (value) {
        case '0': text = '订阅';
          break;
        case '1': text = '已订阅';
          break;
        case '2': text = '订阅中';
          break;
        case '3': text = '订阅';
          break;
        default: text = '';
      }
      return text;
    },

    /**
     * 按主题/基础/部门 分类查询
     */
    categoryQuery () {
      this.treeNodeSelected = {nodeTree: this.category}; // 选择的菜单节点
      this.nodeClick({id: this.treeNodeSelected.nodeTree});
    },
    // 搜索框延迟加载
    debounceSearch () {
      this.tableParams.page = 1;
      _.debounce(this.interfaceDataQuery, 500)();
    },
    // 页面初始化加载
    init (category) {
      this.treeDataQuery(category || 1);
      this.newDirectoryDataQuery();
      this.newApplicationDataQuery();
    }

  },
  filters: {

  },
  computed: {

  },
  create () {
    this.category = this.$route.meta.category;
  },
  watch: {
    '$route.meta': {
      handler () {
        this.category = this.$route.meta.category;
        this.init(this.$route.meta.category);
      },
      deep: true
    },
    '$store.state.auth.isLogin': {
      handler () {
        this.interfaceData.map(item => {
          item.subsText = this._switchSubs(item.isSubs);
        });
      }
    }
  },
  mounted () {
    // 判断是否带值从首页跳进来
    if (this.$route.params.nameSearch) {
      this.searchContent = this.$route.params.nameSearch;
    }
    this.init(this.$route.meta.category);
  },
  components: {
    ComBanner, InterfaceDetail, AnimateLine, BaseContainer, RectBadge
  }
};

export default data;
