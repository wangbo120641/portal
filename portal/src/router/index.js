/**
 * 路由配置模块
 * 配置说明：1、默认情况，路由的path中的名称、component和name应一致。
 *           2、如果是多个路径对应一个组件页面，path中的名称应该和name一致，component可以不一致。
 *           3、实际平行的页面，但在逻辑上是层级结构的，可以把逻辑子页面的path中添加逻辑父页面的路径(path)，面包屑会自动显示为层级结构
 *           4、希望页面显示名称和路由配置中的title不一样，跳转时使用router.push({name:'component',params:{navLabel:'newTitle'}})
 *           5、如果跳转页面的逻辑层级（面包屑显示的层级）和目标页的path层级不一致，可以使用router.push({name:'component',params:{navLabel:'newTitle',parentNavItems:navItems}})
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'src/vuex/store.js';
import Auth from '../util/auth';

import routes from './staticRoutes';

import matchRoutes from './matchRoutes';
// import treeTable from '../views/system-management/tree-table-demo';// 树组件demo

Vue.use(VueRouter);

// 把完整路由存储到vuex中，登录后有权限的路由要和这个比对
store.commit('router/SET_FULL_ROUTES', routes);

const router = new VueRouter({
// mode: 'history', // Demo is living in initRouteGitHub.io, so required!
// linkActiveClass: 'active',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {// returns 期望滚动到哪个的位置,第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0};
    }
  }
});

// 登录后刷新页面的情况下从vuex中获取菜单
// vuex得从缓存中读取数据
if (Auth.isLogin()) {
  var userMenus = store.getters['auth/getMenu'];
  // 重写读取缓存中的登录信息到vuex中

  store.commit('auth/FRESH');
  store.commit('message/FLASH_CACHE');

  // 显示全部菜单就不用做这一步
  if (userMenus) {
    matchRoutes(routes, userMenus);
  }
  router.options.routes = routes;
  // 把按钮权限存储到vuex中
  store.commit('permission/SET_PERM_BY_ROUTES', userMenus);// vuex中存储各个页面的按钮权限
}

router.beforeEach((to, from, next) => {// 注册一个全局前置守卫
  Vue.prototype.$Progress.start();

  // 不需要权限的页面直接访问
  if (!to.meta.auth) {
    next();
  } else {
    // 没登录的先登录
    if (!Auth.isLogin()) {
      //  清空登录用户信息和菜单数据
      store.commit('user/SET_NAME');
      store.commit('router/REMOVE_MENU');
      // 校验失败，  弹出登录页面
      Vue.prototype.$login({routeTarget: {to: to, from: from, next: next}});
    } else {
      //  已经的登录的判断有没有该菜单权限
      var toRoute = matchRouteName(store.state.permission.menus, to.name);

      if (!toRoute) {
        var message = '您没有该页面的访问权限!';

        message += from.name == null ? '您将跳转到首页。' : '';
        Vue.prototype.$alert(message, '权限错误',
          {
            type: 'error',
            callback: action => {
              if (from.name == null) {
                next({name: 'home'});
              }
            }
          });
      } else {
        next();
      }
    }
  }
  //
  // if (!toRoute && Auth.isLogin()) {
  //   //  跳转的页面没有在路由里面，调到提示页：您访问的页面不存在或你没有访问权限。
  //   // next({name: 'noRight'});
  //   Vue.prototype.$msgbox({
  //     type: 'error',
  //     title: '权限错误',
  //     message: '您没有该页面的访问权限!'
  //   });
  //   return;// 必须添加return，不然后面代码执行会跳转到无权限访问的页面
  // }
  //
  // if (to.matched.some(m => m.meta.auth)) {// 判断是否需要校验
  //   if (Auth.isLogin()) {// 获取
  //     next();// 校验通过，正常跳转到你设置好的页面
  //   } else {
  //     //  清空登录用户信息和菜单数据
  //     store.commit('user/SET_NAME');
  //     store.commit('router/REMOVE_MENU');
  //     // 校验失败，  弹出登录页面
  //     Vue.prototype.$login({routeTarget: {to: to, from: from, next: next}});
  //   }
  // } else if (to.path === '/login' && Auth.isLogin()) {
  //   next({path: '/home', replace: true});
  // } else {
  //   next();// 不需要校验，直接跳转
  // }
});

router.afterEach((to, from) => {
  //  finish the progress bar
  Vue.prototype.$Progress.finish();
});

/**
 * 根据路由的name找出对应的路由
 * @param routes
 * @param name
 * @returns {*}
 */
function matchRouteName (routes, name) {
  var result = null;

  for (let route of routes) {
    if (route.name === name) {
      result = {
        label: route.meta.title ? route.meta.title : route.meta.tip,
        pathName: name,
        params: {},
        showInMenu: route.meta.showInMenu
      };
      return result;
    } else if (route.children) {
      result = matchRouteName(route.children, name);
      if (result) {
        return result;
      }
    }
  }
  return result;
}

export default router;

/*
$route.path 字符串，等于当前路由对象的路径，会被解析为绝对路径，如 "/home/news" 。
$route.params 对象，包含路由中的动态片段和全匹配片段的键值对
$route.query 对象，包含路由中查询参数的键值对。例如，对于 /home/news/detail/01?favorite=yes ，会得到$route.query.favorite == 'yes' 。
$route.router 路由规则所属的路由器（以及其所属的组件）。
$route.matched 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。它会将嵌套它的父路由都匹配出来。
$route.name  当前路径的名字，如果没有使用具名路径，则名字为空。
*/
