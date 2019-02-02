import API from 'src/rest-api/restApi';
import CropperImg from 'src/component/cropper-img';
import formRules from './formRules.js';

export default {
  name: 'applications-details',
  data () {
    return {
      applications: [],
      paging: {
        currentPage: 1,
        pageSize: 10,
        currentPages: [10],
        total: 0,
        tableParams: {
          'page': 1,
          'pageSize': 10,
          'dir': 'asc',
          'field': 'id'
        }
      },
      applicationTypes: [],
      applicationsWindow: false,
      appForm: {
        id: '',
        applicationName: '',
        applicationUrl: '',
        developerName: '',
        customerName: '',
        contactPhone: '',
        contactEmail: '',
        photo: '',
        applicationType: ''
      },
      photoAreaVisible: false,
      cropShow: false,
      rules: {
        applicationName: [
          {max: 50, message: '长度不能大于50个字符', trigger: 'blur'},
          {required: true, message: '请填写应用名称', trigger: 'blur'}
        ],
        applicationUrl: [
          {min: 3, message: '长度不能少于3个字符', trigger: 'blur'},
          {max: 255, message: '长度不能大于255个字符', trigger: 'blur'},
          {required: true, validator: formRules.checkUrl, trigger: 'blur'}
        ],
        developerName: [
          {required: true, message: '请填写开发单位', trigger: 'blur'},
          {min: 2, message: '长度不能少于3个字符', trigger: 'blur'},
          {max: 50, message: '长度不能大于50个字符', trigger: 'blur'}
        ],
        customerName: [
          {required: true, message: '请填写联系人姓名', trigger: 'blur'},
          {min: 2, message: '长度不能少于2个字符', trigger: 'blur'},
          {max: 10, message: '长度不能大于10个字符', trigger: 'blur'}
        ],
        contactPhone: [
          {required: true, validator: formRules.checkPhone, trigger: 'blur'}
        ],
        contactEmail: [
          // {required: false, validator: formRules.checkEmail, trigger: 'blur'}
          {required: false, message: '请填写邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        photo: [
          {required: true, message: '请填写图片路径', trigger: 'change'}
        ],
        applicationType: [
          {required: true, message: '请选择应用类型', trigger: 'blur'}
        ]
      }

    };
  },
  methods: {
    dataQuery: function (param) {
      var _this = this;
      var _param = Object.assign({}, _this.paging.tableParams, param);

      this.$http.post(globals.serverUrl + API.APP_MY_APPLICATIONS, _param).then(res => {
        _this.applications = res.data.data.data;
        _this.paging.total = res.data.data.total;
      });
    },
    openApplicationLink (item) {
      window.open(item.applicationUrl, 'newwindow');
    },
    handleSizeChange (val) {
      this.paging.pageSize = val;
      this.paging.tableParams.pageSize = val;
      this.paging.currentPage = 1;
      this.dataQuery(this.paging.tableParams);
    },
    handleCurrentChange (val) {
      this.paging.currentPage = val;
      this.paging.tableParams.page = val;
      this.dataQuery(this.paging.tableParams);
    },
    openApplicationWindow (item) {
      this.applicationsWindow = true;
      this.appForm = Object.assign({}, item);
      this.appForm.applicationType = this._switchApplicationType(this.appForm.applicationType);
    },
    applicationWindowClose () {
      this.$refs.appForm.resetFields();
    },
    applicationSubmit () {
      var _this = this;

      _this.$refs['appForm'].validate((valid) => {
        if (valid) {
          // _this.appForm.applicationType = this._switchApplicationType(this.appForm.applicationType);
          console.log(_this.appForm);
          _this.$http.post(globals.serverUrl + API.APP_UPDATE_POST, JSON.stringify(_this.appForm)).then(res => {
            _this.applicationsWindow = false;
            _this.dataQuery();
            _this.$notify({
              message: res.data.message,
              type: 'success',
              offset: 120
            });
          });
        }
      });
    },
    applicationReset () {
      this.$refs['appForm'].resetFields();
      Object.keys(this.appForm).forEach(item => {
        if (item !== 'id') {
          this.appForm[item] = '';
        }
      });
    },
    deleteApplication: function (item) {
      let _this = this;

      _this.$http.post(globals.serverUrl + API.APP_DELETE_POST, JSON.stringify({apps: [item.id]})).then(res => {
        _this.applicationsWindow = false;
        _this.dataQuery();
        _this.$notify({
          message: res.data.message,
          type: 'success',
          offset: 120
        });
      });
    },
    updateAppPhoto () {
      this.cropShow = true;
      this.photoAreaVisible = true;
    },
    handleCrop (crop) {
      console.log(crop);
      this.cropShow = false;
      this.photoAreaVisible = false;
      this.appForm.photo = crop.crop;
    },
    handleCropperClose () {
      this.$refs['cropper'].clearCropper();
      this.cropShow = false;
      this.photoAreaVisible = false;
    },
    _switchApplicationType (label) {
      var value = '';

      this.applicationTypes.forEach(item => {
        if (label === item.dictLabel) {
          value = item.dictValue;
        }
      });
      return value;
    },
    handleClick (app) {
      this.$http.post(API.APP_FLUX, JSON.stringify({id: app.id})).then(resp => {
        window.open(app.applicationUrl);
      });
    }
  },
  mounted () {
    this.dataQuery({});
  },
  created () {
    this.$http.post(API.APP_TYPE_LIST_POST).then(resp => {
      this.applicationTypes = resp.data.data;
    });
  },
  components: {
    CropperImg
  }
};
