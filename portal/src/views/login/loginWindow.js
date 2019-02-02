/**
 * 组件描述
 * @author ljj-17773
 * @date 2018/9/12
 */
import Vue from 'vue';
import LoginWindow from 'src/views/login/login-window';
// 生成loginwindow组件的构造函数，然后就可以使用函数方式去调用组件
var LoginWindowConstructor = Vue.extend(LoginWindow);
var hasLoginWindow = null;
var DoLogin = function (options) {
  if (!hasLoginWindow) {
    options.caller = DoLogin;

    hasLoginWindow = new LoginWindowConstructor(options);

    var div = document.createElement('div');

    div.setAttribute('id', 'login');
    document.body.appendChild(div);

    hasLoginWindow.$mount('#login');
    DoLogin.loginShow = true;
  }
};

DoLogin.close = function () {
  var loginDiv = document.querySelector('.loginModal');

  document.body.removeChild(loginDiv);
  hasLoginWindow = null;
  DoLogin.loginShow = false;
};
DoLogin.loginShow = false;

export default {
  install(Vue) {
    Vue.prototype.$login = DoLogin;
  }
};
