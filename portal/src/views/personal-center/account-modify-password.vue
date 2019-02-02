<!--
 /**
  * 个人中心-修改密码
  */
-->
<template>
  <el-container class="home-wrapper">
    <div class="content-all">
      <div class="info-con">
        <el-form :model="personalInfo" ref="personalInfo" :rules="rules" label-width="20%">
          <el-row>
            <el-col :span="16">
              <el-form-item prop="curPassword" label="原密码：" class="info-form-item">
                <el-input :type="passview ? 'text' : 'password'" v-model="personalInfo.curPassword" size="small" style="width: 80%">
                  <i :class="['icon iconfont mr10', passview ? 'icons-password-view clb' : 'icons-password-unview']" @mousedown="passview = !passview" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item prop="newPassword" label="新密码：" class="info-form-item">
                <el-input :type="newPassview ? 'text' : 'password'" v-model="personalInfo.newPassword" size="small" style="width: 80%">
                  <i :class="['icon iconfont mr10', newPassview ? 'icons-password-view clb' : 'icons-password-unview']" @mousedown="newPassview = !newPassview" slot="suffix"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item prop="newPasswordAgain" label="确认密码：" class="info-form-item">
                <el-input :type="newPassAgainview ? 'text' : 'password'" v-model="personalInfo.newPasswordAgain" size="small"
                          style="width: 80%">
                   <i :class="['icon iconfont mr10', newPassAgainview ? 'icons-password-view clb' : 'icons-password-unview']" @mousedown="newPassAgainview = !newPassAgainview" slot="suffix"></i>       
                          </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin: 2%;">
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="8">
              <el-button size="small" plain type="primary" @click="onSubmit" opt-type="SUBMIT">提交</el-button>
              <el-button size="small" plain type="primary" style="margin-left: 30%;" @click="resetForm">
                重置
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="bgImage">
        <i class="iconfont icons-gerenziliao2"></i>
      </div>
    </div>
  </el-container>
</template>

<script>
  import API from '../../rest-api/restApi';
  export default {
    name: 'account-modify-password',
    data () {
      var checkNewPassword = (rule, value, callback) => {
        let regexp = new RegExp(/([a-zA-Z0-9]){1,}([`~!@#$%^&*()_+<>?:"{},.\/;'[\]]){1,}/im);

        if (value === '') {
          callback(new Error('请输入您的新密码'));
        } else if (!regexp.test(value) || !(value.length > 5 < 16)) {
          callback(new Error('请输入您的新密码，由6-15位的字母、数字和至少一个特殊符号组成'));
        } else if (value === this.personalInfo.curPassword) {
          callback(new Error('新密码与原密码相同'));
        } else {
          callback();
        }
      };
      var checkConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入您设置的新密码'));
        } else if (value !== this.personalInfo.newPassword) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

      return {
        isPage: true,
        personalInfo: {
          curPassword: '',
          newPassword: '',
          newPasswordAgain: '',
          userId: localStorage.userId
        },
        rules: {
          curPassword: [
            {required: true, message: '请输入您当前的登录密码', trigger: 'blur'}
          ],
          newPassword: [
            // { required: true, message: '请输入您的新密码，由6-15位的字母、数字和至少一个特殊符号组成', trigger: 'blur' }
            {required: true, validator: checkNewPassword, trigger: 'blur'}
          ],
          newPasswordAgain: [
            // { required: true, message: '请再次输入您设置的新密码', trigger: 'blur' }
            {required: true, validator: checkConfirmPassword, trigger: 'blur'}
          ]
        },
        passview: false,
        newPassview: false,
        newPassAgainview: false
      };
    },
    methods: {
      onSubmit () {
        this.$refs['personalInfo'].validate(valid => {
          if (valid) {
            this.$confirm('确认修改密码?', '修改密码', {
              confirmButtonText: '确 定',
              cancelButtonText: '取 消',
              type: 'warning'
            }).then(() => {
              this._updateUserPassword(this.personalInfo);
            });
          }
        });
      },
      _updateUserPassword (personalInfo) {
        // personalInfo.userId = 'ceshi5';
        this.$http({
          method: 'post',
          url: '/auth/password_update',
          data: JSON.stringify(personalInfo)
        }).then(res => {
          // console.log(res.data);
          this.$message({
            type: 'success',
            message: res.data.message,
            delay: 300,
            duration: 1000,
            offset: 120
          });
          this._logout();
        }).catch(res => {
          this.$notify({
            type: 'error',
            message: '修改密码失败',
            delay: 300,
            duration: 1000,
            offset: 120
          });
        });
      },
      resetForm () {
        this.$refs['personalInfo'].resetFields();
      },
      _logout () {
        this.$http.post(API.LOGOUT_POST).then(res => {
          this.$store.commit('permission/CLEAR_CACHE');
          this.$store.commit('message/CLEAR_CACHE');
          this.$store.dispatch('auth/logout').then(res => {
            this.$router.push({name: 'home'});
            this.$login({});
          });
        });
      }
    }
  };
</script>

<style scoped lang="stylus">
  .home-wrapper {

    .content-all {
      position relative
      width: 95%;
      margin: 0% 2% 0 4%;

      .info-con {
        position relative
        z-index 1
        margin 5% 10%;

        .info-form-item {
          margin-bottom 30px;
        }
        .msg {
          display block;
          width 80%;
          color red;
        }

      }
      .bgImage{
        position absolute
        top 50px
        right  10%
        i{
          font-size 200px
          color #FAFAFA
        }
      }
    }
    .clb {
      color: #42a4f5
    }
  }
</style>
