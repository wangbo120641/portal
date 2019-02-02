<!--
     /**
      *  数据目录的详情-》基本信息里的table框
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/8/6
      * @example 调用示例
      *  <info-item label='label' value='value'></info-item>
      */
       -->
<template>
  <li>
    <div class="info-header">{{label}}</div>
    <div class="info-body" :title="value">{{value}}</div>
  </li>
</template>

<script>
    export default {
      name: 'info-item',
      props: {
        label: {
          requireed: true,
          default () {return '';}
        },
        value: {
          required: true,
          default () {return '';}
        }
      }
    };
</script>

<style scoped>

</style>
