/**
 * 菜单状态，存储当前路由匹配到的菜单名称
 * @author ljj-17773
 * @date 2018/8/15
 */

const state = {
  selectedMenu: []
};

const mutations = {
  SET_SELECTED_MENU: (state, data) => {
    state.selectedMenu = data;
  }
};

const actions = {
};
const getters = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
