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
        <img src="/static/image/4041.png" alt="">
      </div>
      <div>
        <img src="/static/image/404.png" alt="">
      </div>
      <span class="alertText">很抱歉，没有找到您要的内容！</span>
      <br>
      <span class="minText">可能原因：网站可能在维护或程序异常。</span>
      <br>
      <el-button type="primary"  @click=" $router.history.go(-1)" style="margin-top: 20px;margin-bottom: 50px">返回上一级</el-button>
      <!--<span class="back" @click=" $router.history.go(-1)">返回上一级</span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  };
</script>

<style scoped>
  .noRightContainer{
    height: 100%;
    display: flex;
    align-items: center;/*垂直居中*/
    justify-content: center;/*水平居中*/
    flex-direction: column;
    text-align: center;
  }
  .alertText{
    display: inline-block;
    font-size: 18px;
  }
  .minText{
    display: inline-block;
    margin-top: 10px;
    font-size: 12px;
    color:#999999;
  }
</style>
