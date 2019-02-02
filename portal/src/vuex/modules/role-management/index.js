
// noinspection JSAnnotator
const state = {
  roleRights: []// 当前编辑或添加的角色 对应的角色权限（包括菜单和菜单的操作权限）
};

const mutations = {
  SET_ROLE_RIGHTS: (state, data) => {
    state.roleRights = JSON.parse(JSON.stringify(data));
  },
  GET_ROLE_RIGHTS: (state, data) => {
    return JSON.parse(JSON.stringify(state.roleRights));
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
