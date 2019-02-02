import RESTAPI from 'src/rest-api/restApi.js';

var componentMix = {
  data () {
    var checkType = (rule, value, callback) => {
      var re = /^[1-9]+[0-9]*$/;// 判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/;

      if (!re.test(value) || Number(value) > 365 || Number(value) < 0) {
        this.subscForm.applyDay = ''; // 错误后直接清空该表单项
        callback(new Error('使用期限请输大于0~365的整数！')
        );
      } else {
        callback();
      }
    };

    return {
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
        _this._getBasicInfo();
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
            _that._getBasicInfo();
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
          _that._getBasicInfo();
        }).catch((response) => {
          console.log(response);
        });
      }).catch(() => {
      });
    }
  }

};

export default componentMix;
