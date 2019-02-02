<template>
  <el-container class="history-steps">
    <el-steps style="display: contents" align-center>
      <template v-for="(step,index) in childSteps">
      <el-step :title="'审批人 : '+step.approveNodeName"
               :description="'审批组织：' + step.departmentName"
               :comment="'审批意见：' + step.approveOption"
               :status="step.status === '1' ? 'success': (step.status === '0' ? 'error' : 'wait')">
      </el-step>
      </template>
    </el-steps>
  </el-container>
</template>

<script>
  import Vue from 'vue';
  import ELStep from './components/step/index';

  Vue.use(ELStep);

  export default {
    name: 'process-steps',
    data() {
      return {};
    },
    props: ['childSteps']
  };
</script>

<style scoped>
  /** chrome 65以下 display: contents 不支持 */
  .el-steps {
    display: flex;
    width: 100%;
  }
</style>
