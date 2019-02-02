import Auth from '../../..//util/auth';

const state = {
  token: '',
  isLogin: false
};

const mutations = {
  SET_TOKEN: (state, data) => {
    if (data && data.length > 0) {
      Auth.setToken(data);
      Auth.setLoginStatus();
      state.isLogin = true;
    } else {
      Auth.removeToken();
      Auth.removeLoginStatus();
      state.isLogin = false;
    }
    state.token = data;
  },
  SET_MENU: (state, data) => {
    localStorage.setItem('userMenu', JSON.stringify(data));
  },
  FRESH: (state) => {
    if (Auth.isLogin()) {
      state.isLogin = true;
    } else {
      state.isLogin = false;
    }
  }
};

const actions = {
  // 登出
  logout ({commit}) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');
      commit('user/SET_NAME', '', {root: true});
      commit('user/SET_DEPARTMENT', {});
      localStorage.removeItem('userMenu');
      resolve();
    });
  },
  setToken ({commit}, data) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', data);
      resolve();
    });
  },
  freshTokenExpires ({commit}, data) {
    Auth.freshTokenExpires();
  }

};
const getters = {
  isLogin () {
    return Auth.isLogin();
  },
  // 从localstory中取出菜单，每次登录都把从后端获取的菜单放入localstory中,如果没有就跳转到登录页面
  getMenu () {
    return JSON.parse(localStorage.getItem('userMenu'));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
