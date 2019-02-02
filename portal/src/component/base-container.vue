<!--
     /**
      * 页面基本容器
      * @desc 页面内容的基础容器，包含了面包屑导航栏和基础样式
      *       可以引入mixins里面的bread-nav.js ，使用mixins混入面包屑数据返回功能，
      *        2018:08:14 添加侧边栏功能:aside-width默认为300(px),aside-side默认为left
      * @author ljj-17773
      * @date 2018年07月25日17:22:43
      * @example 调用示例
      *  <base-container :nav-items="navItems" aside-side="left/right" :aside-width="300">
      * <div slot="aside">your content</div>
      * </base-container>
      */
       -->
<template>
  <div :class="['baseContainer',{withBanner:$slots.banner}]">
    <!--没有banner时用该布局-->
    <template v-if="!$slots.banner">
      <div class="containerNav" v-if="nav">
        <el-row :gutter="20">
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="22">
            <el-breadcrumb separator="/" class="breadcrumb">
              <span class="fl back" @click="back" style="padding-right: 10px;font-weight: bolder">返回上一级</span>
              <span class="fl" style="padding-right: 5px;padding-left: 5px;">|</span>
              <span class="fl" style="padding-right: 10px;">
            <i class="iconfont icons-home" style="width:32px;height:32px;margin-top: -10px;margin-left: 5px"></i>
          </span>
              <!--<el-breadcrumb-item  v-for="item in navItems" :to="{name:item.pathName}" :key="item.label">{{ item.label }}</el-breadcrumb-item>-->
              <el-breadcrumb-item v-for="item in navItems" :key="item.label">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
        </el-row>
      </div>
      <div v-if="$slots.aside" v-bind:class="{'aside':true,  'left': asideSide=='left','right':asideSide=='right'}"
           v-bind:style="asideStyle">
        <slot name="aside"></slot>
      </div>
      <div class="container"
           v-bind:style="containerStyle">
        <slot></slot>
      </div>
    </template>

    <!--有banner时用该布局-->
    <template v-if="$slots.banner">
      <div class="baner">
        <slot name="banner"></slot>
      </div>
      <div class="containerNav" v-if="nav">
        <el-row :gutter="20">
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="22">
            <el-breadcrumb separator="/" class="breadcrumb">
              <span class="fl back" @click="back" style="padding-right: 10px;font-weight: bolder">返回上一级</span>
              <span class="fl" style="padding-right: 5px;padding-left: 5px;">|</span>
              <span class="fl" style="padding-right: 10px;">
                 <i class="iconfont icons-home" style="width:32px;height:32px;margin-top: -10px;margin-left: 5px"></i>
          </span>
              <el-breadcrumb-item v-for="item in navItems" :key="item.label">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
        </el-row>
      </div>
      <!--flex布局，兼容ie10+-->
      <!-- flex 布局 在 1440 * 900屏幕下 api接口和应用展示显示不全 -->
      <!-- <div :style="{position: 'relative',display: 'flex','flex-direction':asideSide=='left'? 'row':'row-reverse'}"> -->
      <div :style="{position: 'relative'}">
        <div v-if="$slots.aside" :style="{'flex-basis':asideWidth+'px'}">
          <slot name="aside"></slot>
        </div>
        <div style="flex-grow: 1;flex-basis: 800px">
          <slot></slot>
        </div>
      </div>
      <!--table布局，兼容ie，至少到ie7-->
      <!--<table style="width: 100%;" cellpadding="0" cellspacing="0">-->
      <!--<tr>-->
      <!--<td  v-if="$slots.aside && asideSide=='left'" :style="{'width':asideWidth+'px'}">-->
      <!--<slot name="aside"></slot>-->
      <!--</td>-->
      <!--<td>-->
      <!--<div style="display: block;position: relative">-->
      <!--<slot></slot>-->
      <!--</div>-->
      <!--</td>-->
      <!--<td  v-if="$slots.aside && asideSide=='right'" :style="{'width':asideWidth+'px'}">-->
      <!--<slot name="aside"></slot>-->
      <!--</td>-->
      <!--</tr>-->
      <!--</table>-->
    </template>


    <el-tooltip placement="top" content="置顶">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="100"
                   :backPosition="0"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
  import BackToTop from '../component/BackToTop/index';

  export default {
    name: 'base-container',
    props: {
      nav: {
        type: Boolean,
        default () {
          return true;
        }
      },
      navItems: {
        type: Array,
        default () {
          return [];
        }
      },
      asideSide: {
        type: String,
        default () {
          return 'left';
        }
      },
      asideWidth: {
        type: Number,
        default () {
          return 300;
        }
      },
      bannerHeight: {
        type: Number
      }
    },
    components: {
      BackToTop
    },
    data () {
      return {
        // 侧边栏的样式
        asideStyle: {
          'top': this.nav ? '40px' : '0px',
          'width': this.asideWidth + 'px'
        },
        containerStyle: {
          'padding': this.nav ? '40px 20px 10px 20px' : '0px 20px 10px 20px',
          'padding-left': (this.asideSide === 'left' && this.$slots.aside) ? (this.asideWidth) + 'px' : 20 + 'px',
          'padding-right': (this.asideSide === 'right' && this.$slots.aside) ? (this.asideWidth) + 'px' : 20 + 'px'
        },
        myBackToTopStyle: {
          right: '50px',
          bottom: '70px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#369bf1'// 按钮的背景颜色 The background color of the button
        }
      };
    },
    created () {
    },
    methods: {
      back () {
        this.$router.history.go(-1);
      }
    }
  };
</script>

<style scoped>
  .baseContainer {
    position: absolute;
    /*padding: 10px;*/
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .withBanner {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .baseContainer .containerNav {
    position: absolute;
    z-index: 100;
    padding: 10px;
    padding-left: 20px;
    height: 20px;
    top: 0;
    left: 0;
    right: 16px;
    background-color: #ffffff;
  }

  .baseContainer.withBanner .containerNav {
    position: static;
    margin-top: 5px;
  }

  .baseContainer .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .baseContainer .aside {
    overflow-x: hidden;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
  }

  .baseContainer.withBanner .container {
    padding: 0px 20px 10px 20px;
  }

  .baseContainer.withBanner .aside {
    top: 0px;
  }

  .baseContainer .left {
    left: 0;
  }

  .baseContainer .right {
    right: 0;
  }

  .back {
    cursor: pointer;

  }

  .back:hover {
    font-weight: bolder;
    color: #42a4f5;
  }
</style>
