import Auth from '../../..//util/auth';

const state = {
  // 用户名
  cname: '',
  name: '',
  id: '',
  avatar: '',
  department: {}
};

const getters = {
};

const mutations = {
  SET_NAME: (state, data) => {
    if (data) {
      if (data.cname) {
        localStorage.setItem('userCName', data.cname);
        state.cname = data.cname;
      }
      if (data.name) {
        localStorage.setItem('userName', data.name);
        state.name = data.name;
      }
      if (data.name) {
        localStorage.setItem('userId', data.userId);
        state.id = data.userId;
      }
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem('userCName');
      localStorage.removeItem('userId');
      state.name = '';
      state.cname = '';
      state.id = '';
    }
  },
  SET_AVATAR: (state, data) => {
    if (data) {
      localStorage.setItem('userAvatar', data);
      state.avatar = data;
    } else {
      localStorage.removeItem('userAvatar');
      state.avatar = '';
    }
  },
  SET_DEPARTMENT: function (state, data) {
    if (data) {
      state.department = data;
      window.localStorage.setItem('userDepartment', JSON.stringify(data));
    } else {
      state.department = {};
      window.localStorage.removeItem('userDepartment');
    }
  }

};

const actions = {
  // 刷新页面时从localstory里面取出用户名，赋值给state.name
  flashUser({commit}) {
    if (Auth.isLogin()) {
      state.name = localStorage.getItem('userName');
      state.cname = localStorage.getItem('userCName');
      state.id = localStorage.getItem('userId');
      state.avatar = localStorage.getItem('userAvatar');
      state.department = JSON.parse(localStorage.getItem('userDepartment'));
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem('userCName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('userDepartment');
      state.name = '';
      state.cname = '';
      state.id = '';
      state.avatar = '';
      state.department = '';
    }
  },
  logout({commit}) {
    return new Promise((resolve) => {
      commit('SET_NAME');
      commit('SET_AVATAR');
      commit('SET_DEPARTMENT');
      localStorage.removeItem('avatar');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userCName');
      localStorage.removeItem('userDepartment');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
