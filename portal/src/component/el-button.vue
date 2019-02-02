<!--
     /**
      * 组件名称
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/9/14
      * @example 调用示例
      *  <el-button></el-button>
      */
       -->
<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  import findParentPage from 'src/util/findParentPage';
  import store from 'src/vuex/store';
  import kebab2camel from 'src/util/kebab2camel';
  import Auth from 'src/util/auth';

  export default {
    name: 'ElButton',
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    props: {
      optType: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },
    computed: {
      _elFormItemSize () {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize () {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      buttonDisabled () {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },
    methods: {
      handleClick (evt) {
        // 判断该页面有没有对应的按钮权限，没有就弹出登录框，有就触发回调
        if (process.env.NODE_ENV === 'development' && !globals.permission) {
          this.$emit('click', evt);
          return;
        }
  
        if (this.optType.length > 0) {
          // 登录就判断有无权限，没登录就弹出登录框
          if (Auth.isLogin()) {
            var pageName = findParentPage(this).$options.name;
            var name = kebab2camel(pageName);
            var hasPermission = store.getters['permission/hasPermission'](name, this.optType);

          if (hasPermission) {
              this.$emit('click', evt);
            } else {
              this.$alert('您没有该操作权限，如有需要，请联系管理员！', '权限错误', {type: 'error'});
            }
          } else {
            // 打开登录窗口
            this.$login({});
          }
        } else {
          this.$emit('click', evt);
        }
      }
    }
  };
</script>
