<!--
 /**
  * 个人中心-我的应用
  */
-->
<template>
  <el-container>
    <div class="content-com">
      <div class="subs-tabs">
        <div slot="header" class="clearfix w-100">
          <i class="iconfont icons-application-title" style="color: grey;"></i>
          <span style="color: black;font-size: 16px;margin-left: 10px; ">我的应用</span>
          <hr style="border-top: 1px solid #e4e7ed;">
        </div>
        <applications-details></applications-details>
      </div>
    </div>
  </el-container>
</template>

<script>
  import applicationsDetails from './applications-details.vue';

  export default {
    name: "my-applications",
    data() {
      return {
        isPage: true
      }
    },
    components: {applicationsDetails}
  }
</script>

<style scoped lang="stylus">
  .content-com {
    width 100%;
    .subs-tabs {
      padding: 10px 20px;
    }
  }
</style>
<style lang="stylus">
  .content-com .subs-tabs .el-card__header {
    padding: 10px 15px;
    background: #f5f7fa;
  }
</style>
