<template>
  <el-container class="content apply-details-content">
    <div>
      <info-list>
        <li class="ac-title">
          <div class="info-header">{{ applyDetail.applyType == '1' ? '目录名称' : '接口名称' }}</div>
          <div class="info-body" :title="applyDetail.applyApiName">
            <a @click="toApiDetails">{{applyDetail.applyApiName}}</a>
          </div>
        </li>
        <info-item label="用户类型" :value="applyDetail.applyContent.useType"></info-item>
        <info-item label="用途" :value="applyDetail.applyContent.effectInfo"></info-item>
        <info-item label="申请理由" :value="applyDetail.applyContent.applyReason"></info-item>
        <info-item label="使用期限(天)" :value="applyDetail.applyContent.applyDay"></info-item>
        <info-item label="是否失效" :value="applyDetail.applyContent.whetherFailure"></info-item>
        <info-item label="申请人" :value="applyDetail.applyContent.createUser"></info-item>
        <info-item label="创建时间" :value="applyDetail.applyContent.createTime"></info-item>
        <info-item label="过期时间"
                   :value="applyDetail.applyContent.expireTime !=='1970-01-01 08:00:00'?applyDetail.applyContent.expireTime:'订阅通过后显示'">
        </info-item>
      </info-list>
    </div>
  </el-container>
</template>

<script>
  import infoList from '@/component/info-list.vue';
  import infoItem from '@/component/info-item.vue';

  export default {
    name: 'apply-details-content',
    data() {
      return {
        applyContent: {}
      };
    },
    methods: {
      toApiDetails() {
        var name = this.applyDetail.applyType === '1' ? 'catalogDetail' : 'interfaceDetail';
        this.$router.push({name: name, params: {id: this.applyDetail.applyApiId }});
      }
    },
    mounted() {
    },
    props: ['applyDetail'],
    components: {infoList, infoItem}
  };
</script>

<style scoped>
  .info-list ul li.ac-title {
    width: 100%;
  }
</style>
