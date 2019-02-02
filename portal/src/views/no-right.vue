<!--
     /**
      * 点击没有权限的页面链接会跳转过来
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/8/21
      * @example 调用示例
      *  <no-right></no-right>
      */
       -->
<template>
  <div class="noRightContainer">
    <div>
      <div>
        <img src="/static/image/noright.png" alt="">
      </div>
      <span class="alertText">您没有该页面的访问权限！</span>
      <br>
      <span class="minText">{{seconds}}秒后将自动跳转到上一页</span>
      <br>
      <el-button type="primary" @click=" $router.history.go(-1)" style="margin-top: 20px;margin-bottom: 50px">返回上一级
      </el-button>
      <!--<span class="back" @click=" $router.history.go(-1)">返回上一级</span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'no-right',
    data () {
      return {
        seconds: 5,
        interval: null
      };
    },
    mounted () {
      this.interval = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.interval);
          this.$router.history.go(-1);
        }
      }, 1000);
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(this.interval);
      next();
    },
    beforeDestroy () {
      clearInterval(this.interval);
    }
  };
</script>

<style scoped>
  .noRightContainer {
    height: 100%;
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: center; /*水平居中*/
    flex-direction: column;
    text-align: center;
  }

  .alertText {
    display: inline-block;
    font-size: 18px;
  }

  .minText {
    display: inline-block;
    margin-top: 10px;
    font-size: 12px;
    color: #999999;
  }
</style>
