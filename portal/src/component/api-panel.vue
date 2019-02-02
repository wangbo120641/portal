<!--
     /**
      * 展示api的基础样式容器
      * @desc 有标题和内容区域
      * @author ljj-17773
      * @date 2018/8/2
      * @example 调用示例
      *  <api-panel :show-icon="false/true"><span slot="header"> </span></api-panel>
      */
       -->
<template>
    <div class="apiPanel">
      <div class="api-title">
        <i class="iconfont icons-dian" style="color:#409EFF; font-size: 20px;" v-if="isShowIcon"></i><slot name="header"></slot>
      </div>
      <div class="api-detail">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'api-panel',
      props: {
        showIcon: {
          type: Boolean,
          default () {return true;}
        }},
      created () {
        // console.log(this.$slots);
      },
      mounted () {
      },
      computed: {
        isShowIcon () {
          if (this.$slots.header && this.showIcon) {
            return true;
          }else {
            return false;
          }
        }
      }
    };
</script>

<style scoped>
.apiPanel{
  margin-bottom:20px;
}
  .apiPanel .api-title{
    margin-bottom:10px;
    color:#333333;
    box-sizing: border-box;
    padding-left: 10px;
    font-size: 16px;
  }
.apiPanel .api-title span,.apiPanel .api-title div{
  font-size: 16px;
  font-weight: bolder;
 }
  .apiPanel .api-title .icon{
    display: inline-block;
    width:6px;
    height:17px;
    margin-right: 8px;
    background-image: url("../../static/image/list_title_icon.png");
  }
  .apiPanel .api-detail{
    /*line-height: 25px;*/
    /*text-indent:20px;*/
    box-sizing: border-box;
    padding-left: 30px;
  }
.apiPanel .api-detail span{
  line-height: 25px;
}
</style>
