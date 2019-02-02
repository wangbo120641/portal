<!--
     /**
      * 组件名称
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/8/16
      * @example 调用示例
      *  <loginOk></loginOk>
      */
       -->
<template>
    <div>
      
    </div>
</template>

<script>
    export default {
      name: 'loginOk',
      created () {
        window.top.doLogin({userId: this.$route.params.userid, name: this.$route.params.username, cname: this.$route.params.usercname});
          // window.top.alert(this.$route.params.usercname)
          // window.top.alert(this.$route.params.userid)
        // this.$http.post('/auth/menuTreeByUserId_query?userId=admin').then((resp) => {
        //   console.log('loginok',resp);
        //   var routes = this.matchMenu(this.$router.options.routes, resp.data.data);
        //
        //   this.$router.options.routes = routes;// 设置新的route
        //   this.$store.commit('auth/SET_MENU', routes);// 存储menu，防止登录后刷新页面导致无权限的menu出现
        //
        //   if (this.$route.query.redirect) { // 跳转到指定链接
        //     this.$router.push({path: this.$route.query.redirect});
        //   } else {
        //     this.$router.push({path: '/home'});
        //   }
        // });
        // window.location.href=window.location.href;
      }
    };
</script>

<style scoped>

</style>
