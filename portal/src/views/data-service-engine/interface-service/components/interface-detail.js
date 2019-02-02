 import RESTAPI from 'src/rest-api/restApi';
 import breadNav from 'src/mixins/bread-nav';
 import BaseContainer from 'src/component/base-container';
 import InfoList from 'src/component/info-list';
 import InfoItem from 'src/component/info-item';
 import ApiPanel from 'src/component/api-panel';
 import componentMix from './component-mix.js';

 let data = {
   name: 'interface-detail',
   components: {ApiPanel, BaseContainer, InfoList, InfoItem},
   mixins: [breadNav, componentMix],
   props: {},
   data () {
     return {
       dialogFormVisible: false,
       dialogApproveFormVisible: false,
       interId: '', // 接口id
       baseInfo: {},
       testData: [],
       interParams: [],
       metadata: [], // 元数据
       baseData: [],
      //  dialogShow: false,
      //  subscForm: {
      //    apiId: '',
      //    useType: '',
      //    effectInfo: '',
      //    applyReason: '',
      //    applyDay: ''
      //  },
      //  subscRules: {
      //    useType: [
      //       {required: true, message: '请选择用户类型', trigger: 'change'}
      //    ],
      //    effectInfo: [
      //       {required: true, message: '请选择用途', trigger: 'change'}
      //    ],
      //    applyReason: [
      //       {required: true, message: '请填写活动形式', trigger: 'blur'}
      //    ],
      //    applyDay: [
      //       {required: true, message: '请输入使用期限'}
      //    ]
      //  },
      //  approveForm: {}, // 订阅审批中的信息
       errorData: [{
         name: '10001',
         content: '错误的请求KEY'
       }, {
         name: '10002',
         content: '该KEY无请求权限'
       }, {
         name: '10003',
         content: 'KEY过期'
       }, {
         name: '10004',
         content: '错误的openid'
       }]
     };
   },
   beforeCreate () {
   },
   created () {
     this.interId = this.$route.params.id;
     this._getBasicInfo();
     this._getApiInfo();
   },
   mounted () {
   },
   filters: {
     formatDate: function (value) {
       if (!value) return '';
       value = value.slice(0, 19).replace('T', '');
       return value;
     }
   },
   methods: {
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
     _getBasicInfo () {
       let param = {id: this.interId};

       this.$http({
         method: 'post',
         url: globals.serverUrl + '/ds/apiInfo/queryApiInfoDetailById',
         data: JSON.stringify(param)
       }).then(resp => {
         resp.data.data.subsText = this._switchSubs(resp.data.data.isSubs);
         this.baseInfo = resp.data.data;
       });
     },
     _getApiInfo () {
       let param = {id: this.interId};
       // 获取接口说明

       this.$http({
         method: 'post',
         url: globals.serverUrl + '/ds/apiInfo/queryApiParamInfoById',
         data: JSON.stringify(param)
       }).then(resp => {
         this.interParams = resp.data.data;
       });
     }
    //   // 订阅按钮
    //  subscClick (item, isSub) {
    //    let _that = this;

    //    this.subscForm.apiId = item.id;
    //    if (isSub === '0') {// 已订阅
    //      this.unsubscribeClick(item.applyId);
    //    } else if (isSub === '2') {// 审批中
    //      let data = {id: item.applyId};

    //      this.$http({
    //        method: 'post',
    //        url: globals.serverUrl + '/ds/apiInfo/querySubsApplyById',
    //        data: JSON.stringify(data)
    //      }).then((res) => {
    //        _that.approveForm = res.data.data;
    //        _that.dialogApproveFormVisible = true;
    //      }).catch((response) => {
    //        console.log(response);
    //      });
    //    } else {
    //      this.dialogFormVisible = true;
    //    }
    //  },
    //   // 收藏按钮
    //  collectClick (id, isCol) {
    //    let _that = this;
    //    let data = {
    //      id: id,
    //      status: '',
    //      collectType: '1'
    //    };

    //    if (isCol === '0') {// 未收藏
    //      data.status = '1';
    //      this.postCollect(data);
    //    } else {
    //      data.status = '0';
    //      _that.$confirm('确定取消收藏该接口吗?', '提示', {
    //        confirmButtonText: '确 定',
    //        cancelButtonText: '取 消',
    //        type: 'warning'
    //      }).then(() => {
    //        this.postCollect(data);
    //      });
    //    }
    //  },
    //   // 收藏接口
    //  postCollect (data) {
    //    this.$http({
    //      method: 'post',
    //      url: globals.serverUrl + '/se/collection',
    //      data: JSON.stringify(data)
    //    }).then((res) => {
    //      this.$notify({
    //        title: '成功',
    //        message: res.data.message,
    //        type: 'success',
    //        offset: 120
    //      });
    //      this.queryInfoDetail({incr: '0'});
    //    }).catch((response) => {
    //      console.log(response);
    //    });
    //  },
    //   // 订阅表单提交
    //  subscSubmitForm (formName) {
    //    let _that = this;

    //    this.$refs[formName].validate((valid) => {
    //      if (valid) {
    //        let data = {};

    //        data = Object.assign({}, this.subscForm); // TODO待后续接口对接时注释需打开
    //        this.$http({
    //          method: 'post',
    //          url: globals.serverUrl + '/ds/apiInfo/subscription',
    //          data: JSON.stringify(data)
    //        }).then((res) => {
    //          this.dialogFormVisible = false;
    //          _that.$notify({
    //            title: '成功',
    //            message: res.data.message,
    //            type: 'success',
    //            offset: 120
    //          });
    //          _that.queryInfoDetail({incr: '0'});
    //        }).catch((response) => {
    //          console.log(response);
    //        });
    //      } else {
    //        console.log('error submit!!');
    //        return false;
    //      }
    //    });
    //  },
    //   // 取消订阅
    //  unsubscribeClick (id) {
    //    let _that = this;

    //    this.$confirm('是否取消订阅?', '提示', {
    //      confirmButtonText: '确 定',
    //      cancelButtonText: '取 消',
    //      type: 'warning'
    //    }).then(() => {
    //      let data = {id: id};

    //      this.$http({
    //        method: 'post',
    //        url: globals.serverUrl + '/ds/apiInfo/cancelsubs',
    //        data: JSON.stringify(data)
    //      }).then((res) => {
    //        _that.$notify({
    //          title: '成功',
    //          message: res.data.message,
    //          type: 'success',
    //          offset: 120
    //        });
    //        _that.queryInfoDetail({incr: '0'});
    //      }).catch((response) => {
    //        console.log(response);
    //      });
    //    }).catch(() => {
    //    });
    //  },
    //  queryInfoDetail (value) {
    //    let param = {id: this.interId};

    //    param = Object.assign({}, param, value);
    //    this.$http({
    //      method: 'post',
    //      url: globals.serverUrl + '/ds/apiInfo/queryApiInfoDetailById',
    //      data: JSON.stringify(param)
    //    }).then(resp => {// API.INTER_INFO_POST
    //      this.baseInfo = resp.data.data;
    //    });
    //  }
   },
   computed: {
   },
   watch: {
     '$store.state.auth.isLogin': {
       handler () {
         this.baseInfo.subsText = this._switchSubs(this.baseInfo.isSubs);
       }
     }
   }
 };

 export default data;
