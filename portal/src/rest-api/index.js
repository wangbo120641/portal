// import axios from 'axios';
import store from '../vuex/store';
import Auth from '../util/auth';
// import Vue from 'vue';
import {Loading, MessageBox, Notification} from 'element-ui';

const axios = require('axios');
const Vue = require('vue');

let CancelToken = axios.CancelToken;
// create an axios instance
const Axios = axios.create({
  // baseURL: '/api', // api的测试接口
  baseURL: globals.serverUrl, // api的base_url
  timeout: 20000, // request timeout
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

var loadinginstace;
// // request interceptor

Axios.interceptors.request.use(config => {
// 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
  if (Auth.hasToken()) {// 在这个地方如果使用store.getters获取不到token
    config.headers['Authorization'] = 'Bearer ' + Auth.hasToken();
  }
  // element ui Loading方法
  loadinginstace = Loading.service({
    fullscreen: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: store.state.interfaceSkin === 'dark' ? 'rgba(0, 0, 0, 0.7)' : ''
  });
  return config;
}, error => {
  // Do something with request error
  loadinginstace.close();
  Notification({
    showClose: true,
    duration: 2000,  // 弹框显示时间，毫秒
    message: '加载超时!',  // 返回 response 里的错误信息
    type: 'error',
    offset: 120
  });
  console.log(error); // for debug
  Promise.reject(error);
});

// respone interceptor 返回状态判断(添加响应拦截器)
// todo: 如果成功就把token的到期时间顺延
Axios.interceptors.response.use(
  response => {
    loadinginstace.close();
    // 对响应数据做些事
    if (response.data && response.data.code.toString() === '1000') {

    } else if (response.data && response.data.code.toString() !== '1') {
      // 接口请求不成功消息弹窗组件
      Notification({
        showClose: true, // 是否显示关闭按钮
        duration: 2000,  // 弹框显示时间，毫秒
        message: (!response.data.message || response.data.message.length === 0) ? '请求失败，缺少状态码，请联系管理员！' : response.data.message,
        type: 'error',
        offset: 120
      });
      return Promise.reject(response.data.message);
    }
    // 请求成功后延长token的过期时间
    store.dispatch('auth/freshTokenExpires');
    return response;
  },
  error => {
    loadinginstace.close();
    if (typeof error.response === 'undefined') {
      // session失效，请求302重定向时，页面跳转到登录页面
      store.state.isLogin = false;
      // window.location.href = globals.serverUrl + '/toLogout';
      return;
    } else if (error && error.response) {
      switch (error.response.status) {
        case 1000:
          error.message = '用户名或密码错误！';
          break;
        case 400:
          error.message = '错误请求';
          break;
        case 1000:
          error.message = '用户名或密码错误!';
          break;
        case 401:
          // token失效 跳转到登录页  先清除本地登录状态
          if (!window.loginConfirmDialog) {
            window.loginConfirmDialog = true;
            if (!Vue.prototype.$login.loginShow) {
              MessageBox.alert('您的登录信息已超时，请重新登录!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                showClose: false
              }).then(() => {
                store.commit('permission/CLEAR_CACHE');
                store.commit('message/CLEAR_CACHE');
                store.dispatch('auth/logout').then(() => {
                });
                Vue.prototype.$login({});
                window.loginConfirmDialog = false;
              });
            }
          }
          return;
        case 403:
          error.message = '您没有访问权限！';
          break;
        case 404:
          error.message = '请求错误,未找到该资源！';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错，请联系管理员！';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      Promise.reject(error.message);
      error.message = '连接到服务器失败';
    }
    // 接口报错消息弹窗组件
    Notification({
      title: '警告',
      message: error.message,
      type: 'warning',
      offset: 120
    });
    return Promise.reject(error);
  });

Vue.$http = Axios;
// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {value: Axios});
  }
};
