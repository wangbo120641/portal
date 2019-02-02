<template>
  <div class="app">
    <template>
      <c-header></c-header>
      <!-- <keep-alive> 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM -->
      <div class="router-wrapper zhgx-light">
        <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </template>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import cHeader from 'views/header/header';
import store from 'src/vuex/store.js';
import LoginWindow from "./views/login/login-window";
export default {
  name: 'app',
  components: {
    LoginWindow,
    cHeader
  },
  methods: {
    isLogin () {
      console.log(this.$store.getters['auth/isLogin'])
      return this.$store.getters['auth/isLogin'];
    }
  }
};
</script>

<style lang="stylus" scoped>
  .app{
    width: 100%;
    height: 100%;
    .router-wrapper {
      /*position : absolute;*/
      /*overflow-y auto;*/
      /*top: 60px;*/
      //bottom:-5px;
      //left:0;
      //right:0;
    }
  }
  .secondMenuBg{
    height:50px;
    width:100%;
    top:60px;
    position :fixed;
    background-color :#495c6a;
  }
</style>
