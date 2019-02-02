<template>
    <!--<div :class="this.$store.state.interfaceSkin == 'dark'? 'web-home home-dark' : 'web-home'">-->
    <router-view></router-view>
</template>

<script type="text/ecmascript-6">
  // import webMain from './data-service-engine.js';
  import '../../common/ali-iconfont/iconfont.css';

  export default {
    // ...webMain
  };
</script>

<style lang="stylus" src="./data-service-engine.styl" scoped></style>
