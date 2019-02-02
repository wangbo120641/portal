/**
 * 组件描述
 * @author ljj-17773
 * @date 2018/8/22
 */

const state = {
  fullRoutes: []
};

const mutations = {
  SET_MENU: (state, data) => {
    localStorage.setItem('userMenu', JSON.stringify(data));
  },
  SET_FULL_ROUTES: (state, data) => {
    // state.fullRoutes = data;
    localStorage.setItem('fullRoutes', JSON.stringify(data));
  },
  REMOVE_MENU: (state, data) => {
    localStorage.removeItem('userMenu');
  }
};

const actions = {};
const getters = {
  // 从localstory中取出菜单，每次登录都把从后端获取的菜单放入localstory中,如果没有就跳转到登录页面
  getMenu () {
    return JSON.parse(localStorage.getItem('userMenu'));
  },
  getFullRoutes: state => {
    // return state.fullRoutes;
    return JSON.parse(localStorage.getItem('fullRoutes'));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
