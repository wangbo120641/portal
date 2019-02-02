/**
 * 按钮权限控制自定义
 * @author ljj-17773
 * @date 2018/8/22
 */
import store from 'src/vuex/store';
import kebab2camel from 'src/util/kebab2camel';
import Vue from 'vue';
// function initPermission (Vue) {
  Vue.prototype.$_has = (compName, opt) => {
    // console.log('p', compName, opt);
    return store.getters['permission/hasPermission'](compName, opt);
  };

  Vue.directive('has', {
    bind: function (el, binding) {
      if (!Vue.prototype.$_has(binding.value.name, binding.value.opt)) {
        el.parentNode.removeChild(el);
      }
    }
  });
// }

export default {
  install (Vue) {
    Vue.prototype.$hasRight = function (opt, compName) {
      var cpName = compName || this.$options.name;

      if (!cpName) {
        console.error('该组件缺少name属性！');
        return false;
      }
      var name = kebab2camel(cpName);
      // 如果时测试开发环境且权限验证为false，才跳过验证，  发布环境不会跳过

      if (process.env.NODE_ENV === 'development' && !globals.permission) {
        return true;
      } else {
        return store.getters['permission/hasPermission'](name, opt);
      }
    };
  }
};
