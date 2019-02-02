import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';

import vuexModules from './modules/index';

Vue.use(Vuex);

let state = {
  lang: 'zh',
  financeYearParam: '', // 专题分析-经济-地方财政预算收入和支出点击传参
  interfaceSkin: 'dark', // 是否显示全部列表标志位
  sysSetting: {
    homeCurrentTab: 'none',
    currentTab: {},
    tabIndex: 0,
    homeTabs: []
  },
  userCenter: {
    homeCurrentTab: 'none',
    currentTab: {},
    tabIndex: 0,
    homeTabs: []
  }
};

let mutations = {
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: vuexModules
});
