<!--
     /**
      * 数据目录的详情-》基本信息里的table框
      * @desc 有title和table的信息框
      *       title属性和slot=name只设置一个即可
      * @author ljj-17773
      * @date 2018/7/31
      * @example 调用示例
      *  <info-list title="title">
      *    <span slot="header">header</span>
      *    <info-item label="label" :value="value"></info-item>
      *  </info-list>
      */
       -->
<template>
  <div class="detail-base-list">
    <div class="content-title" v-if="title.length>0">
      <i class="iconfont icons-dian mr5 titleIcon"></i>{{title}}</div>
    <div class="content-title" v-if="title.length==0">
      <slot name="header"></slot>
    </div>
    <div class="info-list">
      <ul>
        <!--<li v-for="(item,index) in list" v-bind:style="{width:fullWidth(index)}">-->
          <!--<div class="info-header">{{item.label}}</div>-->
          <!--<div class="info-body">{{item.value}}</div>-->
        <!--</li>-->
        <info-item  v-for="(item,index) in list"  :label="item.label" :value="item.value" :key="index"></info-item>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
  import InfoItem from './info-item';
  export default {
    name: 'info-list',
    components: {InfoItem},
    props: {
      title: {
        type: String,
        default () {
          return '';
        }
      },
      list: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {};
    },
    methods: {
      fullWidth (index) {
        if (this.list.length == 1) {
          return '100%';
        } else if (this.list.length == (index + 1) && index % 2 == 0) {
          return '100%';
        } else {
          return '50%';
        }
      }
    },
    watch: {}
  };
</script>

<style>
  .detail-base-list {
    position: relative;
    /*padding-left:20px;*/
  }
  .titleIcon{
    color: rgb(64, 158, 255); font-size: 20px;
  }

  .detail-base-list > .content-title {
    font-family: "Microsoft Yahei";
    color: #333333;
    margin-top: 10px;
    display: block;
    font-size: 16px;
    font-weight: bolder;
  }

  .detail-base-list > .info-list {
    margin: 10px 0px;
    display: block;
  }

  .detail-base-list > .info-list ul {
    width: 100%;
    display: inline-block;
  }
  /*.detail-base-list > .info-list ul>li:nth-child(2n+1):last-child {*/
    /*width: 100%;*/
    /*display: inline-block;*/
  /*}*/
  .detail-base-list > .info-list ul>li:nth-child(4n+3)>div.info-body ,.detail-base-list > .info-list ul>li:nth-child(4n+4)>div.info-body{
    background-color: white;
  }
  .detail-base-list > .info-list ul > li {
    width: 50%;
    float: left;
    overflow: hidden;
    margin-bottom: 1px;
    line-height: 38px;
  }

  .detail-base-list > .info-list ul > li > div.info-header {
    padding: 0px 10px;
    width: 150px;
    height: 38px;
    float: left;
    /*background-color: #f7f7f7;*/
    background-color: #EAEDF2;
    text-align: center;
    color: #666666;
    box-sizing:border-box;
  }

  .detail-base-list > .info-list ul > li > div.info-body {
    padding: 0px 20px;
    height: 38px;
    margin-left: 151px;
    /*background-color: #fbfbfb;*/
    background-color: #f8f8f9;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    color: #333333;
    text-align: left;
    box-sizing:border-box;

  }
</style>
