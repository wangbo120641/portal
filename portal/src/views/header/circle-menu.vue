<!--
     /**
      * 圆形菜单
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/9/12
      * @example 调用示例
      *  <circle-menu></circle-menu>
      */
       -->
<template>
  <div ref="content" class="cicleMenu" v-on:mouseleave="mouseLeaveContent">
    <i class="user-icon" v-on:mouseenter="mouseEnterIcon">
      <img :src="$store.state.user.avatar" alt="" style="width:30px;height:30px;position: absolute;border-radius: 50%">
    </i>
    <el-tooltip content="系统设置" :disabled="!showTips" placement="left" effect="light">
      <button class="item item1" @click="menuClick('system',$event)" v-on:mouseenter="mouseEnterItem"
              v-on:mouseleave="mouseLeaveItem">
        <i class="icon iconfont icons-shezhi"></i>
      </button>
    </el-tooltip>
    <el-tooltip content="个人中心" :disabled="!showTips" placement="left" effect="light">
      <button class="item item2" @click="menuClick('personal',$event)" v-on:mouseenter="mouseEnterItem"
              v-on:mouseleave="mouseLeaveItem">
        <i class="icon iconfont icons-denglu item-icon"></i>
      </button>
    </el-tooltip>
    <el-tooltip :content="login?'退出登录':'登录'" :disabled="!showTips" placement="bottom" effect="light">
      <button class="item item3" @click="menuClick('logout',$event)" v-on:mouseenter="mouseEnterItem"
              v-on:mouseleave="mouseLeaveItem">
        <i v-if="!login" class="icon iconfont icons-login item-icon" style="font-weight:bolder"></i>
        <i v-if="login" class="icon iconfont icons-tuichudenglu item-icon"></i>
      </button>
    </el-tooltip>
    <svg>
      <defs>
        <filter id="filt">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="filt"/>
          <feBlend in2="filt" in="SourceGraphic" result="mix"/>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
  import API from 'src/rest-api/restApi';

  export default {
    name: 'circle-menu',
    data () {
      return {
        showTips: false
      };
    },
    created () {
    },
    methods: {
      // 鼠标进入菜单按钮
      mouseEnterItem (event) {
        var target = event.target ? event.target : event.srcElement;

        if (target.className.indexOf('bounce') >= 0) {
          target.className.replace(' animated  bounce', '');
        }
        target.className = target.className + ' animated  bounce';
      },
      // 鼠标离开菜单按钮
      mouseLeaveItem (event) {
        var target = event.target ? event.target : event.srcElement;

        target.className = target.className.replace(' animated  bounce', '');
      },
      // 鼠标移入头像，弹出菜单
      mouseEnterIcon (event) {
        this.$refs.content.style.width = '130px';
        this.$refs.content.style.height = '130px';
        if (this.$refs.content.className.indexOf('show') < 0) {
          this.$refs.content.className = this.$refs.content.className + ' show';
        }
        // 不加timeout会出现tooltip在页面左下角冒出来的情况
        setTimeout(() => {
          this.showTips = true;
        }, 200);
      },
      // 鼠标移出菜单范围，隐藏菜单
      mouseLeaveContent (event) {
        var target = event.target ? event.target : event.srcElement;

        this.$refs.content.className = this.$refs.content.className.replace(' show', '');
        setTimeout(() => {
          this.showTips = false;
          this.$refs.content.style.width = '30px';
          this.$refs.content.style.height = '30px';
        }, 200);
      },
      menuClick (menuType, event) {
        var circleMenu = document.getElementsByClassName('cicleMenu').item(0);

        if (circleMenu.className.indexOf('show') < 0) {
          return;
        }
        switch (menuType) {
          case 'system':
            this.$router.push({name: 'systemManagement'});
            break;
          case 'personal':
            this.$router.push({name: 'personalCenter'});
            break;
          case 'logout':
            this.handleLogin();
            break;
          default:
            console.log('未知的菜单ID');
            break;
        }
      },
      handleLogin () {
        if (this.login) {
          this._logout();
        } else {
          this._login();
        }
      },
      _logout () {
        this.$confirm('您确定要退出系统登录么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(API.LOGOUT_POST).then(() => {
            this.$store.commit('permission/CLEAR_CACHE');
            this.$store.commit('message/CLEAR_CACHE');
            this.$store.dispatch('auth/logout').then(() => {
              this.$notify({
                title: '成功',
                message: '您已退出登录！',
                type: 'success',
                delay: 300,
                duration: 1000,
                offset: 120
              });
              this.$router.push('/home');
            });
          });
        }).catch(() => {
        });
      },
      _login () {
        this.$login({});
      }
    },
    computed: {
      login () {
        return this.$store.state.auth.isLogin;
      }
    }
  };
</script>

<style scoped lang="stylus">
  .cicleMenu {
    width 30px
    height 30px
    position absolute
    top 0px
    right 0px
    /*border 1px solid black*/
    border-bottom-left-radius 100%
    filter: url('/index.html/#filt')
    -webkit-filter: url('#filt')
    .user-icon {
      position absolute
      display block
      z-index 1000
      top 5px
      right 0px
    }
    button.item {
      /*visibility hidden*/
      opacity 0
      width 45px
      height 45px
      border-radius 50%
      border none
      outline none
      cursor pointer
      background-color white
      box-shadow 1px 1px 4px #e5eae0
      transition: all .5s ease-in-out;
      -webkit-transition: all .5s ease-in-out;
      -moz-transition: all .5s ease-in-out;
      -o-transition: all .5s ease-in-out;
      -ms-transition: all .5s ease-in-out
      i {
        font-size 22px
        color #716e6e
      }
    }
    .item1 {
      position absolute
      top 0px
      right 0px
    }
    .item2 {
      position absolute
      top 0px
      right 0px

    }
    .item3 {
      position absolute
      top 0px
      right 0px
    }
    .user-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-image: url('./login.png');
      background-repeat: no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
  }

  .cicleMenu.show {
    button.item {
      /*visibility visible*/
      opacity 1
      display block
    }
    button.item:hover {
      /*visibility visible*/
      opacity 1
      color #318FF3
      i {
        color #cd5d38
      }
    }
    .item1 {
      position absolute
      top 2px
      right 77px
      /*margin-top 10px*/
      /*margin-right 65px*/
    }
    .item2 {
      position absolute
      top 52px
      right 50px
    }
    .item3 {
      position absolute
      top 78px
      right -2px
      box-shadow -1px -1px 4px #e5eae0

    }
  }


</style>
