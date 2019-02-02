
let state = {
  applyType: '',
  applyContent: {},
  msgCount: 0
};

let mutations = {
  SET_APPLY_CONTENT (state, payload){
    state.applyType = payload.applyType;
    state.applyContent = payload.applyContent;
  },
  SET_UN_READ_MESSAGE_COUNT (state, payload) {
    state.msgCount = payload.msgCount;
  }
};

let actions = {
  getMsgCount ({commit}, data) {
   commit('SET_UN_READ_MESSAGE_COUNT', data);
  }
};

export default {
  namespaced: true,
  state: state,
  getters: {},
  mutations: mutations,
  actions: actions
};
