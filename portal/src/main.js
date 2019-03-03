import Vue from 'vue';
import qs from 'qs';
import router from './router'; // 路由相关配置
import VueProgressBar from 'vue-progressbar'; // 进度条
import i18n from 'src/lang'; // 国际化
import Element from 'element-ui'; // 引入element-ui组件
import 'element-ui/lib/theme-chalk/index.css'; // 引入element-ui的样式
import store from 'src/vuex/store.js';
import axiosPlugin from './rest-api/index';

import directive from 'src/directive'; // 引入自定义指令
import permission from 'src/component/permission'; // 引入按钮权限控制模块
import loginWindow from 'src/views/login/loginWindow'; // 引入登录对话框,可以在任意页面弹出
import elButton from 'src/component/el-button'; // 复写elbutton组件
import browser from 'src/util/browser';
import App from './App';

import 'common/stylus/index.styl';
// import VueAwesomeSwiper from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css';
import messageBoxCustomer from 'src/component/message-box-customer';

// 在测试环境中引入mock引入并启动mock，
// process.env.NODE_ENV === 'development' && require('../mocks/index');
if (browser === 'Chrome' || browser === 'FF') {
  // Vue.use(VueAwesomeSwiper);
  Vue.use(axiosPlugin);
  Vue.prototype.$qs = qs;
  Vue.config.productionTip = false;  // 关闭生产模式下给出的提示

  Vue.use(VueProgressBar, { // 进度条
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  });
  Vue.use(directive);
  Vue.use(Element, {// 注册Element组件
    i18n: (key, value) => i18n.t(key, value)
  });

  Vue.use(permission);
  Vue.use(loginWindow);
  Vue.use(messageBoxCustomer);
  Vue.component(elButton.name, elButton);
  /* eslint-disable no-new */
  import('../mocks/index').then(() => {
    new Vue({
      router,
      i18n,
      store,
      el: '#app', //  相当于 new Vue({}).$mount('#app');
      template: '<App/>', // 1、可以通过在 #app 内加入<app></app>替代 2、或者 通过 render: h => h(App) 渲染一个视图，然后提供给el挂载
      components: { // vue2中可以通过 render: h => h(App) 渲染一个视图，然后提供给el挂载
        App
      }
    });
  });
}
