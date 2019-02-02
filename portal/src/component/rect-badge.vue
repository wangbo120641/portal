<!--
     /**
      * 方形标记
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/9/16
      * @example 调用示例
      *  <rect-badge></rect-badge>
      */
       -->
<template>
  <span class="rectBadge">
    <div class="textContent">
      <slot></slot>
      <div class="arrow"></div>
    </div>
  </span>
</template>

<script>
  export default {
    name: 'rect-badge',
  }
</script>

<style scoped lang="stylus">
  .rectBadge{
    display inline-block
    position relative
    margin-left 15px
    .textContent{
      background-color #ff3c00
      height 20px
      font-size 12px
      line-height 20px
      color #ffffff
      padding 0 5px
      div.arrow{
        position absolute
        width 0px
        height 0px
        top 4px
        left -13px
        border 0px
        
        border-right 15px solid #ff3c00
        border-top 6px solid transparent
        border-bottom 6px solid transparent
      }
    }
    
  }
</style>
