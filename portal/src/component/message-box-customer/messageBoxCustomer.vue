<template>
    <transition name="slide" enter-active-class="animated slideInUpCustomer" leave-active-class="animated slideInDownCustomer">
        <div class="msg-box-customer" v-if="visible">
          <div class="msg-box-header">
           <i :class="['icon iconfont', iconHead]"></i>
            <div class="msg-title">
              <span slot="title">{{title}}</span>
            </div>
            <i class="closed icon iconfont icons-close" @click="close"></i>
          </div>
          <div class="msg-box-body">
            <i :class="['icon icon-font', iconBody]"></i>
            <p>
              <span slot="content">{{message}}</span>
            </p>
            <slot></slot>
          </div>
          <div class="btn">
            <el-button @click="confirm" size="small" >{{confirmText}}</el-button>
          </div>
        </div>
    </transition>
</template>
<script>
export default {
  name: 'MessageBoxCustomer',
  data () {
    return {
      visible: false,
      iconHead: '' || 'icons-notice',
      title: '',
      iconBody: '',
      message: '',
      confirmText: '' || '确定',
      onClose: null,
      onConfirm: null
    }
  },
  methods: {
    close () {
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    confirm () {
      if (typeof this.onConfirm === 'function') {
        this.onConfirm();
      }
    },
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  watch: {
    close(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  }
}
</script>
<style scope lang="stylus">
  .msg-box-customer {
    border: solid grey 1px;
    width: 350px;
    height: 200px;
    position: fixed;
    bottom: 3px;
    right: 3px;
    /*display flex;*/
    background: #238cc8;
    color: white;
  }
  .msg-box-customer .msg-box-header{
    display flex;
    /*width 100%;*/
    padding 10px;
    background-color #2183bb;
    text-align center;
  }
  .msg-box-customer .msg-title {
    width 300px;
  }
  .msg-box-customer .msg-box-body {
    /*width 100%;*/
    padding 10px;
    min-height 90px;
  }
  .msg-box-customer .btn button{
    float right;
    margin-right 20px;
    background-color: #186c9c;
    color: white;
    border-color: white;
  }
</style>
<style>
  /* todo animate.css slideInDown style overWrite **/
  @-webkit-keyframes slideInDownCustomer {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
      opacity: 1;
    }
    to {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      opacity: 0.5;
    }
  }

  @keyframes slideInDownCustomer {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
      opacity: 1;
    }
    to {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      opacity: 0.5;
    }
  }
  @-webkit-keyframes slideInUpCustomer {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
      opacity: 0.5;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes slideInUpCustomer {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
      opacity: 0.5;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .slideInUpCustomer {
    -webkit-animation-name: slideInUpCustomer;
    animation-name: slideInUpCustomer;
  }
  .slideInDownCustomer {
    -webkit-animation-name: slideInDownCustomer;
    animation-name: slideInDownCustomer;
  }
</style>
