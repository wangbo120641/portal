/**
 * 存储各个菜单的按钮权限
 * @author ljj-17773
 * @date 2018/8/22
 */
function _savePermission (state, routes) {// 把菜单权限存储进去
  routes.forEach(route => {
    if (route.meta.permission) {
      state.permission[route.name] = route.meta.permission;
    }
    if (route.children) {
      _savePermission(state, route.children);
    }
  });
}

// 判断路由名字是否在菜单里面，有就是有权限，没有就是没有权限
function isInMenus (menus, name) {
  var result = null;

  for (var i in menus) {
    if (menus[i].name === name) {
      return menus[i];
    } else if (menus[i].children) {
      result = isInMenus(menus[i].children, name);
      if (result) {
        return result;
      }
    } else {

    }
  }
}

const state = {
  menus: [],
  permission: {}
};

const mutations = {
  SET_PERM: (state, data) => {
    if (!state.permission[data.name]) {
      state.permission[data.name] = data.value;
    }
  },
  // 根据菜单设置权限信息
  SET_PERM_BY_ROUTES: (state, routes) => {
    state.menus = routes;
    _savePermission(state, routes);
  },
  CLEAR_CACHE: (state, data) => {
    state.permission = {};
    state.menus = [];
  }
};

const actions = {};
const getters = {
  hasPermission: (state, getters) => {
    return (compName, opt) => {
      var permissions = state.permission[compName];

      if (!permissions) {
        console.log('vuex.permission', compName, '没有该组件的权限信息！');
        permissions = [];
      }
      return permissions.indexOf(opt) >= 0;
    };
  },
  hasMenu: (state, getters) => {
    return (routeName) => {
      return isInMenus(state.menus, routeName);
    };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
