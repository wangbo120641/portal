/**
 *
 * @autthor
 * @date
 */
import BreadNavMixin from '../../../mixins/bread-nav';
import BaseContainer from '../../../component/base-container';
import rectBadge from 'src/component/rect-badge';
import CropperImg from '../../../component/cropper-img';
import FilterPanel from 'src/component/filter-panel';
import AnimateLine from 'src/component/animate-line';
import API from '../../../rest-api/restApi';
import formRules from 'src/common/js/regexpRules';
import Vue from 'vue';

function isvalidPhone (str) {
  const regPhone = /^1[3|4|5|7|8][0-9]\d{8}$/;
  const regTel = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;

  return regPhone.test(str) || regTel.test(str);
}

var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入固话或手机号码'));
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的固话或手机号码'));
  } else {
    callback();
  }
};
var checkDuplicateUrl = function (rule, value, callback) {
  if (!formRules.url(value)) {
    return callback(new Error('请输入正确的应用访问链接格式'));
  }
  Vue.$http.post(API.APP_DUPLICATE_URL, JSON.stringify({url: value})).then(res => {
    if (res.data.data) {
      return callback(new Error('应用访问链接不能重复！'));
    }
    return callback();
  });
};
var rules = {
  'applicationName': [
    {max: 50, message: '长度不能大于50个字符', trigger: 'blur'},
    {required: true, message: '请填写应用名称', trigger: 'blur'}
  ],
  'applicationUrl': [
    {required: true, message: '请填写应用访问链接', trigger: 'blur'},
    {min: 3, message: '长度不能少于3个字符', trigger: 'blur'},
    {max: 255, message: '长度不能大于255个字符', trigger: 'blur'},
    {required: true, validator: checkDuplicateUrl, trigger: 'change'}
  ],
  'developerName': [
    {required: true, message: '请填写开发单位', trigger: 'blur'},
    {min: 2, message: '长度不能少于3个字符', trigger: 'blur'},
    {max: 50, message: '长度不能大于50个字符', trigger: 'blur'}
  ],
  'customerName': [
    {required: true, message: '请填写联系人姓名', trigger: 'blur'},
    {min: 2, message: '长度不能少于2个字符', trigger: 'blur'},
    {max: 10, message: '长度不能大于10个字符', trigger: 'blur'}
  ],
  'contactPhone': [
    {required: true, trigger: 'blur', validator: validPhone}
  ],
  'contactEmail': [
    {required: false, message: '请填写邮箱地址', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
  ],
  'photo': [
    {type: 'string', required: true, message: '请填写图片路径', trigger: 'change'}
  ],
  'recommendType': [
    {required: true, message: '请选择是否推荐', trigger: 'blur'}
  ],
  'applicationType': [
    {required: true, message: '请选择应用类型', trigger: 'change'}
  ]
};
var applyAppModel = function () {
  return {recommendType: '0', photo: '', contactEmail: '', applicationType: ''};
};

export default {
  name: 'apply-show',
  mixins: [BreadNavMixin],
  components: {BaseContainer, CropperImg, FilterPanel, rectBadge, AnimateLine},
  data () {
    return {
      dialogVisible: false,
      cropperVisible: false,
      cropShow: false,
      rules: rules,
      apps: [],
      appTotal: 0,
      adviceApps: [], // 推荐应用
      visitSortApps: [], // 访问排行
      appTypes: [], // 应用程序类型列表，用于筛选的
      selectedAppTypes: [], // 选中的apptypes
      applyApp: applyAppModel(),
      filter: {
        applicationName: '',
        dir: 'asc',
        total: 0,
        orderBy: 'application_name',
        pageNum: 1,
        pageSize: 20
      },
      sort: {
        sortType: 'visit',
        asc: false// true:asc false:desc
      }
    };
  },
  created () {
    this.getApps();
    this.$http.post(API.APP_ADVICE_SORT_POST).then(resp => {
      this.adviceApps = resp.data.data.data;
    });
    // this.$http.post(API.APP_VISIT_SORT_POST).then(resp => {
    //   this.visitSortApps = resp.data.data.data;
    // });
    this.getAccessRankApps();
    this.$http.post(API.APP_TYPE_LIST_POST).then(resp => {
      this.appTypes = resp.data.data;
    });
  },
  methods: {
    handleAppClick (app) {
      // console.log(app);
      this.$http.post(API.APP_FLUX, JSON.stringify({id: app.id})).then(resp => {
        window.open(app.applicationUrl);
        this.getAccessRankApps();
      });
    },
    handleAddApp () {
      this.applyApp = applyAppModel();
      this.dialogVisible = true;
    },
    getAccessRankApps () {
      this.$http.post(API.APP_VISIT_SORT_POST).then(resp => {
        this.visitSortApps = resp.data.data.data;
      });
    },
    tagSelected (tag) {
      return this.selectedAppTypes.indexOf(tag) >= 0;
    },
    handleSelectTag (tag, select) {
      if (select) {
        this.selectedAppTypes.push(tag);
      } else {
        this.selectedAppTypes.forEach((stype, index) => {
          if (stype.dictValue === tag.dictValue) {
            this.selectedAppTypes.splice(index, 1);
          }
        });
      }
    },
    handleFilterChange (selectedTypes) {
      console.log(selectedTypes);
    },
    handleCrop (crop) {
      console.log(crop.crop);
      this.applyApp.photo = crop.crop;
      this.$refs.addForm.clearValidate('photo');
      this.cropperVisible = false;
    },
    handleCropShow () {
      this.cropperVisible = true;
      this.cropShow = true;
    },
    handleCropperClose () {
      this.$refs['cropper'].clearCropper();
      this.cropShow = false;
    },
    handleSizeChange (val) {
      this.filter.pageSize = val;
      this.getApps();
    },
    handleCurrentChange (val) {
      this.filter.pageNum = val;
      this.getApps();
    },
    handleCancel () {
      this.dialogVisible = false;
    },
    handleSubmit () {
      var _this = this;
      _this.$refs['addForm'].validate((valid, object) => {
        if (valid) {
          _this.submitApply();
        } else {
          console.log('error submit!!');
        }
      });
    },
    toggleSort (type) {
      if (type === this.sort.sortType) {
        this.sort.asc = !this.sort.asc;
      } else {
        this.sort.sortType = type;
        this.sort.asc = false;
      }
      //  根据排序规则重新获取数据
      // application_name   visit_count
      this.getApps();
    },

    getApps () {// 获取app数据
      var param = {
        dir: this.filter.dir,
        orderBy: this.filter.orderBy,
        pageNum: this.filter.pageNum,
        pageSize: this.filter.pageSize
      };

      if (this.filter.applicationName.length > 0) {
        param.applicationName = this.filter.applicationName;
      }
      if (this.selectedAppTypes.length > 0) {
        param.applicationTypeList = this.selectedAppTypes.map(atype => atype.dictValue);
      }
      var sortType = this.sort.sortType === 'visit' ? 'visitCount' : 'applicationName';
      var dir = this.sort.asc ? 'asc' : 'desc';

      param.orderBy = sortType;
      param.dir = dir;
      this.$http.post(API.APP_SHOW_POST, JSON.stringify(param)).then(resp => {
        this.apps = resp.data.data.data;
        this.appTotal = resp.data.data.total;
        this.filter.total = resp.data.data.total;
      });
    },
    submitApply () {
      this.$http.post(API.APP_ADD_POST, JSON.stringify(this.applyApp)).then(resp => {
        // 如果添加的应用是推荐应用，就刷新推荐应用，否则不刷新
        if (this.applyApp.recommendType == '1') {
          this.$http.post(API.APP_ADVICE_SORT_POST).then(resp => {
            this.adviceApps = resp.data.data.data;
          });
        }
        this.applyApp = applyAppModel();
        // console.log(resp.data.message);

        // this.$confirm('应用添加成功, 是否继续添加?', '提示', {
        //   confirmButtonText: '确 定',
        //   cancelButtonText: '取 消',
        //   type: 'success'
        // }).then(() => {

        // }).catch(() => {
        this.dialogVisible = false;
        // });

        this.getApps();
      });
    },
    appManagementShow: function () {
      console.log(this.$parent.$router.push({name: 'appManagement'}));
    },
    applicationWindowClose: function () {
      this.$refs.addForm.resetFields();
      this.dialogVisible = false;
    }
  },
  watch: {
    selectedAppTypes (newValue, oldValue) {
      this.filter.pageNum = 1;
      this.getApps();
    },
    applicationName (newValue, oldValue) {
      this.filter.pageNum = 1;
      this.getApps();
    }
  },
  computed: {
    rightPanelHeight () {
      var windowWidth = document.body.clientWidth;

      if (windowWidth >= 1910) {
        return 900;
      } else if (windowWidth >= 1590) {
        return 800;
      } else if (windowWidth >= 1430) {
        return 700;
      } else {
        return 600;
      }
    },
    minPanelStyle () {
      return {
        'box-sizing': 'border-box',
        'padding': '0px 20px 10px 20px',
        'height': this.rightPanelHeight + 'px'
      };
    }
  }
};
