/**
 *
 * @autthor  wufan
 * @date  20180916
 */
import BaseContainer from '../../../component/base-container';
import ComBanner from 'src/component/com-banner/com-banner';
import BreadNav from '../../../mixins/bread-nav';
import API from '../../../rest-api/restApi';
import rectBadge from 'src/component/rect-badge';
import AnimateLine from 'src/component/animate-line';
import dataFormatFnList from '../../../util/dataFormat';
import sharingTypes from './catalog-list-sharingTypes';

export default {
  name: 'data-catalog',
  components: {
    BaseContainer,
    ComBanner,
    rectBadge,
    AnimateLine,
    dataFormatFnList
  },
  mixins: [BreadNav],
  data () {
    var dayCheck = (rule, value, callback) => {
      if (!/^[1-9]+[0-9]*$/.test(value) || Number(value) > 365 || Number(value) <= 0) {
        this.subscForm.applyDay = '';
        return callback(new Error('使用期限请输大于0~365的整数!'));
      }
      callback();
    };

    return {
      routeName: this.$route.params.name,
      treeData: [], // 树
      interfaceNewTable: [], // 热门接口
      policiesTopTable: [], // 政策法规
      nameSearch: '', // 搜索框
      searchSharingType: '',
      approveForm: {}, // 弹框
      dialogFormVisible: false,
      dialogApproveFormVisible: false, // 弹框判断
      treeTitle: '', // 树标题
      // defaultTreeOpen: [],
      defaultTreeSelect: [],
      rankRadio: 'dataUpdateTime',
      evTimeStamp: 0,
      dataCatalog: [], // 数据目录
      total: null,
      typeSelect: '',
      // 分页数据
      currentPage: 1,
      pageSize: 5,
      // 查询参数
      param: {
        'orderBy': 'publishTime',
        'dir': 'desc',
        'page': 1,
        'pageSize': 5
      },
      queryData: {
        'searchContent': '',
        'nodeTree': '',
        'sharingType': ''
      },
      brandFold: true,
      subscForm: {
        applyType: '1',
        apiId: '',
        apiName: '',
        useType: '',
        effectInfo: '',
        applyReason: '',
        applyDay: ''
      },
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
          {required: true, message: '请输入使用期限', trigger: 'blur'},
          {required: true, validator: dayCheck, trigger: 'blur'}
        ]
      },
      sharingTypes: sharingTypes
    };
  },
  watch: {
    // 监听二级目录选择的分类
    '$route.params': {
      handler () {
        // 目录查询
        let name = this.$route.params.name;

        if (name === 'department') {// 部门
          this.getTypeData('3');
          this.queryData.nodeTree = '3';
          this.treeTitle = '3';
          this.typeSelect = '部门';
        } else if (name === 'basic') {// 基础
          this.getTypeData('1');
          this.queryData.nodeTree = '1';
          this.typeSelect = '基础';
          this.treeTitle = '1';
        } else if (name === 'theme') {// 主题
          this.getTypeData('2');
          this.queryData.nodeTree = '2';
          this.treeTitle = '2';
          this.typeSelect = '主题';
        }
        this.getList();
      }
    },
    // 监听搜索框-实时搜索
    nameSearch: function (newQuestion, oldQuestion) {
      this.debouncedGetAnswer();
    }
  },
  created () {
    this.debouncedGetAnswer = _.debounce(this.getList, 500);
    // 判断二级菜单类别
    let name = this.$route.params.name;

    if (name === 'department') {// 部门
      this.getTypeData('3');
      this.queryData.nodeTree = '3';
      this.treeTitle = '3';
      this.typeSelect = '部门';
      this.getList();
    } else if (name === 'basic') {// 基础
      this.getTypeData('1');
      this.queryData.nodeTree = '1';
      this.typeSelect = '基础';
      this.treeTitle = '1';
      this.getList();
    } else if (name === 'theme') {// 主题
      this.getTypeData('2');
      this.queryData.nodeTree = '2';
      this.treeTitle = '2';
      this.typeSelect = '主题';
      this.getList();
    } else { // 从首页搜索框进来
      this.getTypeData('0');
      this.queryData.nodeTree = '';
      this.treeTitle = '0';
      this.getList();
    }
    // 判断是否带值从首页跳进来
    if (this.$route.params.nameSearch) {
      this.nameSearch = this.$route.params.nameSearch;
      this.queryData.searchContent = this.$route.params.nameSearch;
    }
  },
  mounted () {
    // 接口最新
    this.postInterfaceTNew();
    // 政策法规
    this.postPoliciesTop();
    // 首页2选择目录项，左侧菜单被选中
    let treeItem = this.$route.params.treeItem;

    if (treeItem) {
      let _that = this;

      setTimeout(function () {
        // 首页带过来的treeItem.id和treeData.id相同时，设置树的某个节点被选中
        _that.treeData = _that._setNodeFormHome(_that.treeData, treeItem);
        _that.queryData.nodeTree = treeItem.id;
        _that.getList();
      }, 600);
      _that.typeSelect = treeItem.categoryName;
    }
  },
  methods: {
    // 日期格式转换
    dateFormat (str) {
      return dataFormatFnList.dateFormat(str);
    },
    // 分类、标签数据获取
    getTypeData (typeName) {
      let _that = this;
      let param = Object.assign({
        type: 'catalog',
        themeId: typeName
      });

      param = this.$qs.stringify(param);
      this.$http({
        method: 'post',
        url: globals.serverUrl + '/se/dataCatalog/queryCategoryList' + '?' + param
      }).then(resp => {
        // _that.treeData = resp.data.data;
        _that.treeData = this._setNode(resp.data.data);
      });
    },
    // 树选中事件
    treeNodeClick: function (data, node) {
      this.treeData = this._setNode(this.treeData);
      data.selected = true;
      this.queryData.nodeTree = data.id;
      this.typeSelect = data.categoryName;
      this.resetPage();
      this.getList();
    },
    // 树选中图标处理
    _setNode: function (arr) {
      if (arr && arr.length > 0) {
        arr.forEach(item => {
          item.selected = false;
          if (item.children && item.children.length > 0) {
            this._setNode(item.children);
          }
        });
        return arr;
      }
    },
    // 从首页2、首页3树选中处理
    _setNodeFormHome: function (arr, params) {
      if (arr && arr.length > 0) {
        arr.forEach(item => {
          if (item.id === params.id) {
            item.selected = true;
            return;
          }
          if (item.children && item.children.length > 0) {
            this._setNodeFormHome(item.children, params);
          }
        });
        return arr;
      }
    },
    // 热门接口
    postInterfaceTNew () {
      let _that = this;

      this.$http({
        method: 'post',
        url: globals.serverUrl + '/ae/PlatApiVisitTQry?topN=10'
      }).then((res) => {
        _that.interfaceNewTable = res.data.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    // 政策法规
    postPoliciesTop () {
      let _that = this;

      this.$http({
        method: 'post',
        url: globals.serverUrl + '/ae/queryLawsNewTopN?topN=10'
      }).then((res) => {
        _that.policiesTopTable = res.data.data;
      }).catch((response) => {
        console.log(response);
      });
    },
    // 树标题点击事件
    treeTitleClick (treeTitle) {
      if (treeTitle === '0') {
        treeTitle = '';
      }
      this.typeSelect = '';
      if (treeTitle === '1') {
        this.typeSelect = '基础';
      }
      if (treeTitle === '2') {
        this.typeSelect = '主题';
      }
      if (treeTitle === '3') {
        this.typeSelect = '部门';
      }
      this.queryData.nodeTree = treeTitle;
      this.resetPage();
      this.getList();
      this.treeData = this._setNode(this.treeData);
    },
    // 鼠标悬浮事件
    test ($event, path) {
      let newPath = '/static/image/data-catalog/' + path;
      let nowPath = $event.currentTarget.src.slice(-6);

      nowPath === 'on.png' ? $event.currentTarget.src = newPath + '.png' : $event.currentTarget.src = newPath + '_on.png';
    },
    // 获取目录列表
    getList () {
      let _that = this;
      let param = this.$qs.stringify(_that.param);

      this.$http({
        method: 'post',
        url: API.CATALOG_LIST + '?' + param,
        data: JSON.stringify(_that.queryData)
      }).then(res => {
        _that.dataCatalog = res.data.data.data;
        _that.total = res.data.data.total;
      });
    },
    // 排序事件
    rankChange (val) {
      this.resetPage();
      let now = +new Date();

      if (now - this.evTimeStamp < 50) {
        return;
      }
      this.evTimeStamp = now;
      if (this.param.orderBy === val) {
        this.param.dir = this.param.dir === 'desc' ? 'asc' : 'desc';
      } else {
        this.param.dir = 'desc';
      }
      this.param.orderBy = val;
      this.getList();
    },
    // 搜索按钮
    searchButton () {
      this.queryData.searchContent = this.nameSearch;
      this.resetPage();
    },
    resetPage () {
      this.currentPage = 1;
      this.param.page = 1;
    },
    searchTypeChange () {
      this.queryData.sharingType = this.searchSharingType;
      this.resetPage();
      this.getList();
    },
    // 分页事件
    handleSizeChange (val) {
      this.pageSize = val;
      this.param.pageSize = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.param.page = val;
      this.getList();
    },
    // 点击跳转详情页-带参数
    sendDetail (id) {
      this.$router.push({
        name: 'resDetail',
        params: {
          dataCatalogId: id
        }
      });
    },
    // 收藏
    cataCollect (id, cataStatus) {
      let status = cataStatus === '0' ? '1' : '0';

      if (cataStatus === '1') {
        this.$confirm('确定取消收藏该数据目录吗?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.collect(id, status);
        });
      } else if (cataStatus === '0') {
        this.collect(id, status);
      }
    },
    // 收藏请求
    collect (id, status) {
      let param = {
        'id': id,
        'status': status,
        'collectType': '1'
      };

      this.$http.post(API.CATALOG_COLLECT, param).then((res) => {
        this.getList();
        this.$notify({
          title: '成功',
          message: res.data.message,
          type: 'success',
          offset: 120
        });
      }).catch((res) => {
        console.log(res);
      });
    },
    _promptApi () {
      this.$alert('请到API接口模块中订阅', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      });
    },
    /**
     * @description 用户所在部门该目录已订阅过，该目录不能重复订阅
     * @param catalog
     * @returns {Promise<any>}
     * @private
     */
    _checkUserDepSubsStatus (catalog) {
      var _this = this;
      return new Promise((resolve, reject) => {
        _this.$http.get(API.CATALOG_SUBS_STATUS_CHECK + '?' + this.$qs.stringify({apiId: catalog.id})).then(res => {
          if (!res.data.data) {
            _this.$confirm('您所在的部门已经有人订阅过该目录了，请不要重复订阅！', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning',
              center: true
            });
            return reject(res.data);
          }
          resolve(res.data);
        }).catch(err => {
          console.log(err);
        });
      });
    },
    // 订阅按钮
    subscClick (item, isSub) {
      let _that = this;
      // todo 审批中
      if (isSub === '2') return;
      // todo 未订阅
      // todo 本部门用户不能订阅本部门数据
      if (item.dataSource === this.$store.state.user.department.departmentName) {
        return _that.$confirm('本部门用户不能订阅本部门数据', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          center: true
        });
      }
      // todo 目录类型是api时到api接口订阅
      if (item.sharingType === 'api') {
        return _that._promptApi();
      }
      this.subscForm.apiId = item.id;
      this.subscForm.apiName = item.resourceName;
      
      // todo file&DB类型 本部门中已订阅的数据不能重复订阅
      if (item.sharingType === 'file' || item.sharingType === 'DB') {
        return _that._checkUserDepSubsStatus(item).then(res => {
          // todo 未订阅 校验通过
          this.dialogFormVisible = true;
        });
      }
      // todo 其他类型未订阅
      this.dialogFormVisible = true;
    },
    // 订阅表单提交
    subscSubmitForm (formName) {
      let _that = this;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = Object.assign(this.subscForm); // TODO待后续接口对接时注释需打开

          this.$http({
            method: 'post',
            url: globals.serverUrl + '/ds/apiInfo/subscription',
            data: JSON.stringify(data)
          }).then((res) => {
            this.dialogFormVisible = false;
            _that.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success',
              offset: 120
            });
            _that.getList();
            _that.$refs['subscForm'].resetFields();
          }).catch((response) => {
            console.log(response);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消订阅
    unsubscribeClick (item) {
      let _that = this;

      if (item.sharingType === 'api') { // 目录类型是api时到api接口订阅
        return _that._promptApi();
      }
      this.$confirm('是否取消订阅?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        let data = {apiId: item.id, applyType: '1'};

        this.$http({
          method: 'post',
          url: API.INTERFACE_SUBSCRIPTION_CANCEL,
          data: JSON.stringify(data)
        }).then((res) => {
          _that.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success',
            offset: 120
          });
          _that.getList();
        }).catch((response) => {
          console.log(response);
        });
      }).catch(() => {
      });
    }

  },
  computed: {},
  filters: {
    transformSharingType: function (value) {
      var resu = sharingTypes.filter(item => {return item.value === value;});

      return resu && resu.length > 0 ? resu[0].label : '无';
    }
  }
};
