/**
 * 消息状态，已读未读条数
 * @author ljj-17773
 * @date 2018/9/5
 */

const state = {
  noReadMessage: 0,
  noReadAlert: 0
};

const mutations = {
  SET_NO_READ_MESSAGE: (state, data) => {
    state.noReadMessage = data;
    localStorage.setItem('noReadMessage', data);
  },
  SET_NO_READ_ALERT: (state, data) => {
    state.noReadAlert = data;
    localStorage.setItem('noReadAlert', data);
  },
  CLEAR_CACHE: (state) => {
    state.noReadAlert = 0;
    state.noReadMessage = 0;
    localStorage.removeItem('noReadMessage');
    localStorage.removeItem('noReadAlert');
  },
  FLASH_CACHE: (state) => {
    if (localStorage.getItem('noReadMessage')) {
      state.noReadMessage = parseInt(localStorage.getItem('noReadMessage'));
    }
    if (localStorage.getItem('noReadAlert')) {
      state.noReadAlert = parseInt(localStorage.getItem('noReadAlert'));
    }
  }
};

const actions = {
  logout ({commit}) {
    return new Promise((resolve) => {
      commit('CLEAR_CACHE');
      resolve();
    });
  }
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
