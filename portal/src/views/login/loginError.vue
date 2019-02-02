<!--
     /**
      * 组件名称
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/8/16
      * @example 调用示例
      *  <loginError></loginError>
      */
       -->
<template>
    <div></div>
</template>

<script>
    export default {
      name: 'loginError',
      created () {
        window.top.loginError('登录错误！');
      }
    };
</script>

<style scoped>

</style>
