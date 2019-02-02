<!--
 /**
  * 个人中心-个人资料
  */
-->
<template>
  <el-container class="home-wrapper account-personal-info">
    <div class="content-img">
      <img v-bind:src="cropImgDataChange" style="height: 150px;width: 150px;" alt="#"/>
      <div class="tc pt30">
        <el-button type="primary" plain size="small" style="margin: 5px 15%;" @click="updatePersonalPhoto"
                   opt-type="CHANGE_HEAD_PORTRAIT">更换头像
        </el-button>
      </div>
    </div>
    <div class="content-all">
      <div class="info-con">
        <el-form :model="personalInfo" ref="personalInfo" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="22">
              <el-form-item prop="loginName" label="用户名：" class="info-form-item">{{personalInfo.userId }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="userName" label="姓名：" class="info-form-item">
                <el-input v-model="personalInfo.userName" size="small" style="width: 50%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row>-->
          <!--<el-col :span="15">-->
          <!--<el-form-item prop="birthDay" label="出生日期：" class="info-form-item">-->
          <!--<el-date-picker-->
          <!--v-model="personalInfo.birthDay"-->
          <!--type="date"-->
          <!--placeholder="选择日期"-->
          <!--clearable-->
          <!--size="small"-->
          <!--style="width: 80%"-->
          <!--align="left">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <el-row>
            <el-col :span="22">
              <el-form-item prop="sex" label="性别：" class="info-form-item">
                <el-radio-group v-model="personalInfo.sex" style="width: 53%;padding: 2% 5px;float: left;">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="age" label="年龄：" class="info-form-item">
                <el-input v-model="personalInfo.age" size="small" style="width: 50%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="phoneNumber" label="手机：" class="info-form-item">
                <el-input v-model="personalInfo.phoneNumber" size="small" style="width: 50%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-row>-->
          <!--<el-col :span="15">-->
          <!--<el-form-item prop="telPhone" label="联系电话：" class="info-form-item">-->
          <!--<el-input v-model="personalInfo.phoneNumber" size="small" style="width: 80%"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <el-row>
            <el-col :span="22">
              <el-form-item prop="emailAddress" label="email：" class="info-form-item">
                <el-input v-model="personalInfo.emailAddress" size="small" style="width: 50%"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="departmentName" label="所属组织：" class="info-form-item">
                <!--<el-select v-model="personalInfo.department" placeholder="请选择" style="width: 80%;">-->
                <!--<el-option-->
                <!--v-for="item in departments"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                {{personalInfo.departmentName}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="roles" label="所属角色：" class="info-form-item">{{personalInfo.roleName }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="createDate" label="创建日期：" class="info-form-item">{{personalInfo.createTime }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item prop="expiryDate" label="状态：" class="info-form-item">{{personalInfo.status == '0' ?
                '启用':'停用'}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin: 2%;" v-if="formPropertyChange">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="8">
              <el-button size="small" plain type="primary" @click="onsubmit" opt-type="SUBMIT">提交</el-button>
              <el-button size="small" plain type="danger" style="margin-left: 30%;" @click="resetForm('personalInfo')">重置
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="bgImage">
        <i class="iconfont icons-gerenziliao"></i>
      </div>
    </div>
    <el-dialog v-bind:visible.sync="personalPhotoAreaVisible" title="图片选择" width="910px" height="300px"
               @close="handleCropperClose">
      <cropper-img v-if="cropShow" ref="cropper" :crop-width="100" :crop-height="100" @crop="handleCrop"></cropper-img>
    </el-dialog>
  </el-container>
</template>

<script>
  import API from 'src/rest-api/restApi';
  import regexpRules from '@/common/js/regexpRules.js';
  import CropperImg from '../../component/cropper-img';
  import defaultPersonalImg from '../../../static/image/personalInfo.png';
  import {formatDate} from 'src/common/js/date';

  export default {
    name: 'account-personal-info',
    components: {CropperImg},
    data () {
      var checkAge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入您的年龄'));
        } else if (!regexpRules.age(value)) {
          callback(new Error('请输入正确的年龄，范围在1-120之间'));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入您的手机号'));
        } else if (!regexpRules.phone(value)) {
          callback(new Error('请输入11位的手机号码'));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入您的email'));
        } else if (!regexpRules.email(value)) {
          callback(new Error('请输入正确的邮箱格式：example@h3c.com'));
        } else {
          callback();
        }
      };

      return {
        isPage: true,
        personalInfo: {
          id: '',
          userId: '',
          userName: '',
          birthDay: '',
          age: '',
          sex: '',
          phoneNumber: '',
          emailAddress: '',
          // telPhone: '',
          // address: '',
          roles: '',
          createTime: '',
          departmentName: '',
          // expiryDate: '',
          status: '',
          avatar: '',
          cropImgData: ''
        },
        personalInfoBackup: {},
        rules: {
          userName: [
            {required: true, message: '请输入您的用户名', trigger: 'blur'}
          ],
          age: [
            {required: true, validator: checkAge, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入您的性别', trigger: 'blur'}
          ],
          phoneNumber: [
            // { required: true, message: '请输入您的手机号', trigger: 'blur' },
            {required: true, validator: checkPhone, trigger: 'blur'}
          ],
          emailAddress: [
            // { required: true, message: '请输入您当前的登录密码', trigger: 'blur' },
            {required: true, validator: checkEmail, trigger: 'blur'}
          ]
        },
        departments: [],
        personalPhotoAreaVisible: false,
        cropShow: false
        // cropImgData: ''
      };
    },
    methods: {
      getPersonalInfo () {
        var that = this;

        that.$http({
          url: API.USER_INFO,
          method: 'post',
          data: JSON.stringify({})
        }).then(res => {
          that.personalInfo = res.data.data.data[0];
          that.personalInfo.createTime = that.personalInfo.createTime ? formatDate(new Date(that.personalInfo.createTime), 'yyyy-MM-dd hh:mm:ss') : '无';
          that.personalInfoBackup = Object.assign({}, that.personalInfo);
        });
      },
      onsubmit () {
        var that = this;

        this.$refs['personalInfo'].validate(validate => {
          if (validate) {
            // this.personalInfo.avatar = this.cropImgData;
            this._upatePersonalInfo(this.personalInfo);
          }
        });
      },
      _upatePersonalInfo (personalInfo) {
        let params = {
          id: personalInfo.id,
          userName: personalInfo.userName,
          age: personalInfo.age,
          sex: personalInfo.sex,
          phoneNumber: personalInfo.phoneNumber,
          emailAddress: personalInfo.emailAddress,
          avatar: personalInfo.avatar
        };

        this.$http({
          method: 'PATCH',
          url: API.USER_INFO_UPDATE,
          data: JSON.stringify(params)
        }).then(res => {
          this.personalInfoBackup = Object.assign({}, params);
          this.$store.commit('user/SET_AVATAR', personalInfo.avatar);
          this.$store.commit('user/SET_NAME', {cname: personalInfo.userName});
          this.getPersonalInfo();
          this.$notify({
            title: '成功',
            type: 'success',
            message: '用户个人资料更新成功！',
            duration: 2000,
            offset: 120
          });
        });
      },
      resetForm (form) {
        // this.$refs[form].resetFields();
        this.personalInfo.userName = '';
        this.personalInfo.age = '';
        this.personalInfo.sex = '';
        this.personalInfo.phoneNumber = '';
        this.personalInfo.emailAddress = '';
        this.$refs[form].resetFields();
      },
      updatePersonalPhoto () {
        this.personalPhotoAreaVisible = true;
        this.cropShow = true;
      },
      handleCrop (crop) {
        // console.log(crop);
        this.cropShow = false;
        this.personalPhotoAreaVisible = false;
        this.personalInfo.avatar = crop.crop;
      },
      handleCropperClose () {
        this.$refs['cropper'].clearCropper();
        this.cropShow = false;
        this.personalPhotoAreaVisible = false;
      }
    },
    computed: {
      formPropertyChange: function () {
        return Object.keys(this.personalInfo).some(key => {
          return this.personalInfo[key] !== this.personalInfoBackup[key];
        });
      },
      cropImgDataChange: function () {
        // '../../../static/image/personalInfo.png'
        // if (!this.personalInfo.avatar){
        //   this.personalInfo.avatar = defaultPersonalImg;
        // }
        this.personalInfo.avatar = this.personalInfo.avatar ? this.personalInfo.avatar : defaultPersonalImg;
        return this.personalInfo.avatar;
      }
    },
    mounted () {
      this.getPersonalInfo();
      this.cropImgData = '../../common/img/personalInfo.png';
    }
  };
</script>

<style lang="stylus" scoped>
  .content-img {
    padding 6% 0 0 6%;
  }

  .content-all {
    position relative
    width: 95%;
    margin: 0 2%;

    .info-con {
      position relative
      z-index 1
      margin 2% 5% 2% 4%;

      .info-form-item {
        margin-bottom 0px;
      }
    }
    .bgImage{
      position absolute
      top 30px
      right  9%
      i{
        font-size 250px
        color #FAFAFA
      }
    }
  }

</style>
