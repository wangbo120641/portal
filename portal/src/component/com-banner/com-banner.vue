<template>
  <div class="com-banner" :style="{'height': cbHeight + 'px'}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'com-banner',
    props: {
      cbHeight: {
        type: Number,
        default: () => 100
      }
    },
    data() {
      return {
        num: 0,
        pageback: '#d3dce6'
      };
    },
    methods: {
      cardChange: function (curr, prev) {
        this.pageback = ++this.num % 2 == 0 ? '#d3dce6' : '#99a9bf';
      }
    },
    computed: {}

  }
</script>
<style lang="stylus">
  .com-banner {
    width 100%;
    height 100px;

    .el-carousel__container {
      height 80px;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      // line-height: 200px;
      text-align center;
      margin: 0;
    }

    // .el-carousel__item:nth-child(2n), .el-carousel__indicators--outside {
    //     background-color: #99a9bf;
    // }

    // .el-carousel__item:nth-child(2n+1), {
    //     background-color: #d3dce6;
    // }    
  }
</style>
