<template>
  <!--<base-container :nav-items="navItems" >-->
  <div class="pr20 pl20 mb10 system-containt" >
    <el-tabs>
      <el-tab-pane label="登录日志" class="log-tab">
        <div>
          <log-management-login></log-management-login>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作日志" class="log-tab">
        <div>
          <log-management-operation></log-management-operation>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!--</base-container>-->
</template>

<script>
  import baseContainer from '../../../component/base-container';
  import BreadNav from '../../../mixins/bread-nav';
  import logManagementLogin from './log-management-login';
  import logManagementOperation from './log-management-operation';

  export default {
    name: 'log-management',
    mixins: [BreadNav],
    data () {
      return {};
    },
    components: {
      baseContainer,
      logManagementLogin,
      logManagementOperation
    }
  };
</script>

<style scoped lang="stylus">
  .aside-menu {
    position: relative;
    width: 200px;
    max-height: calc(100vh - 55px);
    overflow-y: auto;
    background-color: #0d1021;
  }

  .tabs-detail {
    max-height: 635px;
    overflow-y: auto;
  }

  .log-tab {
    padding: 10px 10px
  }

  /*.el-menu-item.is-active {
    background-color: #734ffb !important;
  }*/
</style>
