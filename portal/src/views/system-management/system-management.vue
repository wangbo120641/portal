<!--
     /**
      * 系统管理
      * @desc 组件描述
      * @author 组件作者
      * @date 2017年12月05日17:22:43
      * @example 调用示例
      *  <system-management></system-management>
      */
       -->
<template>
  <base-container :nav-items="navItems">
    <el-row :gutter="20" style="height: 100%">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22" style="height: 100%;position: relative">
        <el-row style="height: 100%;">
          <el-col :span="5">
            <el-card :class="['box-card','systemLeftTree']" box-shadow="never">
              <div slot="header" class="clearfix">
                <span>系统管理</span>
              </div>
              <div v-if="hasMenu(child.name)"
                   v-bind:class="['text', 'item', $route.name == child.name ? 'active' : 'con-item']"
                   v-for="child in menuItems" @click="$router.push({name: child.name})">
                <i :class="[child.icon,'item-icon']"></i>
                <el-button type="text" class="item-btn" v-show="child.name != 'myMessage'"> {{child.title}}</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="19" style="position: relative;height: 100%">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
  </base-container>
</template>

<script>
  import '../../common/ali-iconfont/iconfont.css';
  import BaseContainer from '@/component/base-container';
  import BreadNavMixin from 'src/mixins/bread-nav';
  import store from 'src/vuex/store';

  const menuItems = [{
    icon: 'icon iconfont icons-subscription',
    title: '组织管理',
    name: 'companyManagement'
  }, {
    icon: 'icon iconfont icons-subscription',
    title: '日志管理',
    name: 'logManagement'
  }, {
    icon: 'icon iconfont icons-collection-empty',
    title: '字典管理',
    name: 'dicType'
  }, {
    icon: 'icon iconfont icons-applications',
    title: '角色管理',
    name: 'roleManagement'
  }, {
    icon: 'icon iconfont icons-apply',
    title: '菜单管理',
    name: 'rightManagement'
  }, {
    icon: 'icon iconfont icons-handle',
    title: '用户管理',
    name: 'userManagement'
  }];

  export default {
    name: 'system-management',
    mixins: [BreadNavMixin],
    components: {BaseContainer},
    data () {
      return {
        collapsed: false,
        menuItems: menuItems,
        firstMenuName: 'companyManagement'
      };
    },
    // 无权限的菜单被隐藏了，所以取第一个具有权限的菜单作为默认选中的，避免没有默认选中菜单导致右侧空白
    beforeRouteEnter (to, from, next) {
      if (to.name === 'systemManagement') {
        next(vm => {
          var name = vm.redirect(to.name);
          vm.$router.replace({name: name});
        });
      } else {
        next();
      }
    },
    computed: {},
    methods: {
      hasMenu (menuName) {
        var hasMenu = this.$store.getters['permission/hasMenu'](menuName);
        return hasMenu;
      },
      redirect (pageName) {
        if (pageName === 'systemManagement') {
          // 方法1
          var hasRightMenu = menuItems.find(menu => store.getters['permission/hasMenu'](menu.name) != undefined);
          if (hasRightMenu) {
            return hasRightMenu.name;
          } else {
            return pageName;
          }
        } else {
          return pageName;
        }
      },
      handleRouteChange (to, from, next) {
        var name = this.redirect(to.name);
        this.$router.replace({name: name});
      }
    },
    watch: {
      '$route': 'handleRouteChange'
    }
  };
</script>

<style lang="stylus" src="./system-management.styl" scoped>

</style>
