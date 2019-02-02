<!--
     /**
      * 登录弹出框
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/9/12
      * @example 调用示例
      *  <login-window></login-window>
      */
       -->
<template>
  <div class="loginModal">
    <div ref="loginWindow" class="loginWindow" @keydown.stop="keydownFn">
      <button class="closeBtn" @click="cancel"><i class="icon el-icon-close"></i></button>

      <div class="loginTitle">
        用户登录
      </div>
      <div class="errorContent">
        <el-alert v-if="errMessage.length>0"
                  :title="errMessage"
                  :closable="false"
                  type="error" show-icon>
        </el-alert>
      </div>
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <div class="inputStyle">
            <div class="fl iconStyle"><i class="iconfont icons-denglu"></i></div>
            <div class="fl">
              <input type="text" class="loginInput" name="username" v-model="userName" @focus="focusInput"
                     @blur="blurInput" placeholder="用户名">
            </div>
            <div style="width: 0px;height: 0px;clear: both"></div>
            <div class="borderLine"></div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 40px">
        <el-col :span="24">
          <div class="inputStyle">
            <div class="fl iconStyle"><i class="icon-uniF13EF9 icon-size"></i></div>
            <div class="fl">
              <input class="loginInput" type="password" name="password" v-model="password" @focus="focusInput"
                     @blur="blurInput" placeholder="密码">
            </div>
            <div style="width: 0px;height: 0px;clear: both"></div>
            <div class="borderLine"></div>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 40px;text-align: right">
        <el-col :span="24">
          <!--<el-button @click="cancel" type="danger" plain>取 消</el-button>-->
          <el-button class="loginBtn" @click="login" type="primary">登&nbsp;&nbsp;录</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24">
          <el-checkbox v-model="rememberFlag" class="login-reme fr" @change="rememberFn" label="记住密码">
          </el-checkbox>
        </el-col>
      </el-row>
      <span class="loginInfo">如遗忘密码，请联系系统管理员</span>
    </div>
  </div>
</template>

<script>
  import API from 'src/rest-api/restApi';
  import axios from 'axios';
  import store from 'src/vuex/store';
  import router from 'src/router';
  import Vue from 'vue';
  import matchRoutes from '../../router/matchRoutes';

  export default {
    name: 'login-window',
    data () {
      return {
        errMessage: '',
        rememberFlag: localStorage.getItem('rememberFlag') === 'true',
        userName: localStorage.getItem('loginName'),
        password: localStorage.getItem('passwd'),
        loginUrl: API.LOGIN_POST
      };
    },
    beforeCreate () {
    },
    created () {
      var appDom = document.querySelector('.app');

      if (appDom) {// 如果直接从地址栏访问需要登录的页面，可能这是app尚未初始化完成
        document.querySelector('.app').className = 'app gussModal';
      } else {
        setTimeout(() => {
        document.querySelector('.app').className = 'app gussModal';
      }, 100);
      }
    },
    mounted () {
      this.$refs.loginWindow.className = this.$refs.loginWindow.className + ' animate bounceIn bounceInLeft';
    },
    beforeDestroy () {
      document.querySelector('.app').className = 'app';
    },
    methods: {
      focusInput (event) {
        var target = event.target ? event.target : event.srcElement;
        var bootDiv = target.closest('div.inputStyle');

        if (bootDiv.className.indexOf('inputing') < 0) {
          bootDiv.className = bootDiv.className + ' inputing';
        }
      },
      blurInput (event) {
        var target = event.target ? event.target : event.srcElement;
        var bootDiv = target.closest('div.inputStyle');

        bootDiv.className = bootDiv.className.replace(' inputing', '');
      },
      keydownFn (event) {
        if (event.keyCode === 13) {
          this.login();
        }
      },
      // 关闭登录对话框
      closeWindow () {
        this.$refs.loginWindow.className = this.$refs.loginWindow.className.replace(' animate bounceIn bounceInLeft', '') + ' animate bounceOut bounceOutRight';
        setTimeout(() => {
          this.$options.caller.close();
          this.$destroy();
        }, 300);
      },
      // 取消登录
      cancel () {
        // 直接输入地址打开没有权限的页面，或者刷新页面的情况，不登录就跳转到首页
        if (this.$options.routeTarget && this.$options.routeTarget.from.name == null) {
          this.$options.routeTarget.next({name: 'home'});
        } else if (this.$options.routeTarget && (!store.getters['permission/hasMenu'](this.$options.routeTarget.from.name))) {
          this.$options.routeTarget.next({name: 'home'});
        }
        this.closeWindow();
      },
      login () {
        const formHttp = axios.create({
          baseURL: globals.serverUrl, // 'http://192.168.76.96:8084',
          timeout: 20000,
          responseType: 'json',
          withCredentials: false, // 是否允许带cookie这些
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (this.rememberFlag) { // 是否记住用户名
          localStorage.setItem('loginName', this.userName);
          localStorage.setItem('passwd', this.password);
        } else {
          localStorage.removeItem('loginName');
          localStorage.removeItem('passwd');
        }

        if (!this.userName || !this.password) {
          this.errMessage = '用户名和密码不能为空！';
        } else { // 判断用户名密码是否为空
          this.errMessage = '';
          // form请求的时候参数必须是qs格式化的，json格式请求的格式为JSON格式化的
          var data = this.$qs.stringify({username: this.userName, password: this.password});

          formHttp({url: API.LOGIN_POST, method: 'post', data: data}).then(resp => {
            if (resp.data.code == '1000') {
              this.errMessage = '用户名或密码错误！';
              return;
            }

            var token = resp.data.token;

            store.commit('user/SET_NAME', {
              userId: resp.data.id,
              name: resp.data.userId,
              cname: resp.data.userName
            });// 存储登录用户的用户名

            store.dispatch('auth/setToken', token).then(() => {
              // console.log(store.state.user.name);
              Vue.prototype.$http.post(API.MENU_BY_USERID_POST + '?userId=' + store.state.user.name, JSON.stringify({})).then((resp) => {
                var menus = resp.data.data.childMenus;

                if (!menus) {
                  menus = [];
                }
                this.structMenu(menus);
                var fullRoutes = store.getters['router/getFullRoutes'];
                var routes = this.matchMenu(fullRoutes, menus);// 拿后端返回的routes和前端routes匹配，获取用户有权限的routes。
                var menus = routes;

                store.commit('permission/SET_PERM_BY_ROUTES', menus);// vuex中存储各个页面的按钮权限
                store.commit('auth/SET_MENU', menus);// 存储menu，防止登录后刷新页面导致无权限的menu出现

                this.$notify({
                  title: '成功',
                  message: '登录成功！',
                  type: 'success',
                  duration: 1000,
                  offset: 120
                });

                this.closeWindow();
                // 如果是打开新页面时弹出的登录框，登录后就跳转到目标页面
                setTimeout(() => {
                  if (this.$options.routeTarget) {
                    // this.$options.routeTarget.next(this.$options.routeTarget.to);
                    // 使用push可以重新走到路由拦截器，方便其统一判断有无该页面访问权限
                    router.push({name: this.$options.routeTarget.to.name});
                  }
                }, 300);
              });
            });// 存储token到cookie中

            // 获取未读消息
            Vue.prototype.$http({
              url: API.MESSAGE_LIST,
              method: 'post',
              data: {messageStatus: 0}
            }).then(resp => {
              var noReadMessage = resp.data.data.total;

              store.commit('message/SET_NO_READ_MESSAGE', noReadMessage);
            });

            // 获取用户头像
            this.$http({
              url: API.USER_INFO,
              method: 'post',
              data: JSON.stringify({})
            }).then(res => {
              // this.personalInfo = res.data.data.data[0];
              // console.log(res.data.data.data[0].avatar);
              store.commit('user/SET_AVATAR', res.data.data.data[0].avatar);
              store.commit('user/SET_DEPARTMENT', {departmentId: res.data.data.data[0].departmentId, departmentName: res.data.data.data[0].departmentName});
            }).catch(res => {
              this.$notify({
                type: 'error',
                message: '用户信息获取失败！',
                offset: 120,
                duration: 2000,
                position: 'top-right'
              });
            });
          }).catch(error => {
            // 登录用户名或密码错误
            if (error.response && error.response.status == 1000) {
              this.errMessage = '用户名或密码错误！';
            }
          });
        }
      },
      rememberFn (val) { // 是否记住用户
        // todo:改为通过dispatch或者commit
        localStorage.setItem('rememberFlag', val);
      },
      structMenu (menus) {// 后端返回的菜单格式不满足要求，重新构建菜单格式
        menus.forEach(menu => {
          menu.meta = {title: menu.menuName, permission: menu.functionType, name: menu.remark};
          menu.name = menu.remark;
          if (menu.childMenus) {
            menu.children = menu.childMenus;
            this.structMenu(menu.children);
          }
        });
      },
      matchMenu (routes, menu) {
        var r = JSON.parse(JSON.stringify(routes));

        matchRoutes(r, menu);
        return r;
      }
    },
    watch: {
      userName (newValue, oldValue) {
        this.errMessage = '';
      },
      password (newValue, oldValue) {
        this.errMessage = '';
      }
    }
  };
</script>

<style lang="stylus">
  .loginModal {
    position fixed
    z-index 100000
    top 0px
    left 0px
    right 0px
    bottom 0px
    background-color rgba(9, 9, 18, 0.56)
    background-repeat repeat
    .loginWindow {
      position absolute
      left 0px
      right 0px
      top 0px
      bottom 0px
      margin auto
      box-sizing border-box
      padding 0px 35px
      width 404px
      height 484px
      border-radius 5px
      background-color white
      background-image url("/static/image/login/login_bg.png")
      background-position top left
      background-repeat no-repeat
      text-align center
      /*opacity 0*/
      .loginTitle {
        text-align center
        margin-top 80px
        font-size 22px
        height 30px
        line-height 30px
      }
      div.inputStyle {
        position relative
        padding-bottom 8px
        div.iconStyle {
          width 30px
          height 30px
          line-height 30px
          margin-left 10px
          color #d1dae9
          .icon-size {
            font-size 16px
          }
        }
        div.iconStyle + div {
          width 250px
          height 30px
        }
        input.loginInput {
          width 250px
          border none
          outline none
          padding 5px
        }
        .borderLine {
          position absolute
          bottom -1px
          height 0px
          left 0px
          right 0px
          border-bottom 1px solid #F0F3F6
          transition: all .2s ease-in-out;
          -webkit-transition: all .2s ease-in-out;
          -moz-transition: all .2s ease-in-out;
          -o-transition: all .2s ease-in-out;
          -ms-transition: all .2s ease-in-out
        }
      }
      div.inputStyle.inputing .borderLine {
        border-bottom 2px solid #0E8CFE
        box-shadow 0px 1px 3px #0E8CFE
      }
    }
    span.loginInfo {
      display inline-block
      color #CCD6E6
      margin 30px 5px
      font-size 12px
    }
    .el-checkbox__label {
      font-size 14px
      color #8DA0BF
    }
    .loginBtn {
      height 52px
      width 333px
      font-size 24px
      color white
      background-color #5f9df5
      border-radius 4px
      border none
      outline none
      cursor pointer
      box-shadow 2px 5px 5px #5f9df5 75
    }
    .loginBtn:hover {
      background-color #2d65d1
      box-shadow 2px 5px 5px #5f9df5 85
    }
    .closeBtn {
      border none
      background transparent
      outline none
      float right
      padding 3px
      margin-top 5px
      font-size 20px
      cursor pointer
      margin-right -28px
      color #5c5c5c
    }
    .closeBtn:hover {
      background-color #efefef
      border-radius 3px
      color palevioletred
    }
    .errorContent {
      height 40px
      margin-top 10px
    }
  }

  .gussModal {
    filter: blur(3px);
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -ms-filter: blur(3px);
    -o-filter: blur(3px);
  }

</style>
