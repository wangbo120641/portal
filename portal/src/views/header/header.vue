<!--
     /**
      * 首页头部和菜单栏
      * @desc 组件描述
      * @author 
      * @date 2018年07月30日17:22:43
      * @example 调用示例
      *  <header></header>
      * 根据当前路由信息设置menu的选中项，三级路由下没有选中效果
      */
       -->
<template> <!--  -->
  <header class="header">
    <span class="logo-content">
      <img class="logo" src="../../common/image/logo.png" alt="logo">
      <span class="headline">{{projectName}}</span>
    </span>

    <el-menu ref="navmenu" :default-active="selectedMenuName" class="sys-menu fr"
             mode="horizontal"
             router=""
             @select="handleSelect"
             background-color="#161827"
             active-text-color="rgb(94, 227, 236)"
             text-color="#eeeeee">
      <template v-for="(route, index) in routes">

        <el-menu-item v-if="!(route.children && route.children.length > 0)" :index="route.name" :key="route.name">
          <span :style="{'color': route.selected ? 'rgb(94, 227, 236)' : '#eeeeee'}">
          <i :class="['icon iconfont', route.iconName]" :style="{'color': route.selected ? 'rgb(94, 227, 236)' : '#eeeeee'}"></i>
          {{route.meta.title}}</span>
        </el-menu-item>

        <el-submenu v-if="route.children && route.children.length > 0" :index="route.name" :key="route.name" popper-class="submenu">
          <template slot="title">
            <span :style="{'color':  route.selected ? 'rgb(94, 227, 236)' : '#eeeeee'}">
            <i :class="'icon iconfont '+ route.iconName" :style="{'color': route.selected ? 'rgb(94, 227, 236)' : '#eeeeee'}"></i>
            {{route.meta.title}}</span>
          </template>
          <div class="hello">
            <el-menu-item v-if="child.meta.showInMenu" v-for="child  in route.children" :index="child.name"
                          :key="child.name" class="menu-sub">
              <span :style="{'color': child.selected ? 'rgb(94, 227, 236)' : '#eeeeee'}">{{child.meta.title}}</span>
            </el-menu-item>
          </div>

        </el-submenu>

      </template>
    </el-menu>

    <!--显示用户姓名-->
    <div style="right: 160px;top:0;position: absolute;width:50px; ">
      <el-badge v-if="$store.state.message.noReadMessage>0" class="noReadMessage"
                :value="$store.state.message.noReadMessage">
        <el-button type="text" class="badge" @click="toMessage">
          <i class="iconfont icons-message1 messageIcon" style="font-size:24px;color:#ccc;"></i>
        </el-button>
      </el-badge>
      <el-button v-else type="text" class="badge" @click="toMessage" style="margin-top:10px">
        <i class="iconfont icons-message1 messageIcon" style="font-size:22px;color:#fff;"></i>
      </el-button>
    </div>

    <el-button type="text" style="color:#fff;max-width: 125px;" class="button title-ellipsis"
               @click="enterPersonalCenter">
      {{userName==''?'未登录':userName}}
    </el-button>
    <div class="user">
      <circle-menu></circle-menu>
    </div>
    <!--<el-dropdown @command="userOperationFn" class="user">-->
    <!--<i class="user-icon"></i>-->
    <!--<el-dropdown-menu slot="dropdown">-->
    <!--<el-dropdown-item command="logout">{{$t('header.logout')}}</el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->

  </header>
</template>

<script type="text/ecmascript-6">
  import store from 'src/vuex/store.js';
  import API from 'src/rest-api/restApi';
  import circleMenu from './circle-menu';
  import matchRouteName from 'src/mixins/matchRouteName.js';

  export default {
    components: {circleMenu},
    data () {
      return {
        projectName: globals.projectName,
        showMenuFlag: true,
        projectManageMenu: '共享门户',
        selectedMenuName: '',
        routes: []
      };
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to);
    },
    created: function () {
      // todo:语言选项也需要放到vuex中去，不能直接操作
      let lang = localStorage.getItem('langulage') || 'zh';

      this.$i18n.locale = lang;
      store.state.lang = lang;
      // 根据当前路由设置菜单的当前选择项，保证菜单显示的选中项和当前路由一直
      this.selectedMenuName = this.$route.path && this.$route.path.length > 1 ? this.$route.name : 'home';
      this.routeChange();
    },
    computed: {
      // routes () {
      //   return this.$router.options.routes.filter(route => route.meta.showInMenu === true);
      // }, // 只返回有meta.showInMenu==true的route，这些才是菜单
      userName () {
        if (this.$store.state.user.name === '') {
          this.$store.dispatch('user/flashUser');
        }
        // debugger
        return this.$store.state.user.cname;
      }
    },
    methods: {
      // handleMenuChange (newValue, oldValue) {
      //   // 设置菜单选中项
      //   this.selectedMenuName = newValue;
      // },
      handleSelect (key, keyPath) {
        this.selectedMenuName = key;
        this.$router.push({name: key, params: {name: key, noParams: true}});
      },
      enterPersonalCenter () {
        // this.$router.push({name: 'personalCenter'});
        // console.log('username')
        if (!this.$store.state.auth.isLogin) {
          this.$login({});
        } else {
          this.$router.push({name: 'personalCenter'});
        }
      },
      userOperationFn (command) {
        switch (command) {
          case 'dark-skin':
            store.state.interfaceSkin = 'dark'; // 切换深色皮肤
            break;
          case 'light-skin':
            store.state.interfaceSkin = 'light'; // 切换浅色皮肤
            break;
          case 'help':
            this._helpFn();
            break;
          case 'setting':
            this._settingFn();
            break;
          case 'logout':
            this._logoutFn();
            break;
          case 'zh':
            localStorage.setItem('langulage', 'zh');
            store.state.lang = 'zh';
            this.$router.go(0);
            break;
          case 'en':
            localStorage.setItem('langulage', 'en');
            store.state.lang = 'en';
            this.$router.go(0);
            break;
        }
      },
      _settingFn () {
        console.log('setting');
      },
      _helpFn () {
        console.log('help');
      },
      _logoutFn () {
        this.$http.post(API.LOGOUT_POST).then(() => {
          this.$store.commit('permission/CLEAR_CACHE');
          this.$store.dispatch('auth/logout').then(() => {
            this.$router.push('/login');
          });
        });
      },
      toMessage () {
        this.$router.push({name: 'myMessage'});
      },

      /**
       *  @description route变化menuSelected随着变化
       */
      selectedMenuChange () {
        // 用当前路由取匹配menu中的项目，找到对应的并把name存入vuex中，解决menu无选中效果的问题。
        var componentNames = null;

        if (this.$route.params.parentNavItems) {
          componentNames = this.$route.params.parentNavItems.map(nt => nt.pathName);
          componentNames.push(this.$route.name);
        } else {
          componentNames = this.$route.fullPath.split('/').slice(1);
        }
       // componentNames = componentNames.reverse();
       // console.log('bn', this);
        var matchName = [];

        for (var i in componentNames) {
          var mMenu = matchRouteName(this.$router.options.routes, componentNames[i]);

          if (mMenu && mMenu.showInMenu) {
            matchName.push(componentNames[i]);
        // break;
          }
        }
        this.$store.commit('menu/SET_SELECTED_MENU', matchName);
      },

     /**
       * @description header menu 路由跳转不变色问题, routes重新赋值
       * @param
       */
      routeChange () {
        this.selectedMenuChange();
        var routes = this.$router.options.routes.filter(route => route.meta.showInMenu === true);
        var matched = this.$store.state.menu.selectedMenu;
        // var matched = this.$route.matched.map(r => {return r.name;}); // 匹配的路由包含父路由和子路由
  
        routes.map(route => {
          route.selected = matched.some(i => {return i === route.name;});
          if (route.children) {
            route.children.map(item => {
              item.selected = matched.some(i => {return i === item.name;});
            });
          }
        });
        this.routes = routes;
      }
    },
    mounted () {
    },
    watch: {
      // '$store.state.menu.selectedMenu': 'handleMenuChange',
      '$route': {
        handler: 'routeChange',
        deep: true
      }
    }
  };
</script>
<style lang="stylus" scoped src="./head.styl">

  .badge {
    color: white;
    font-size: 22px;
    position: relative;
    top: -8px;
    margin-left: 5px;
  }
</style>

