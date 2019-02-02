<!--
 /**
  * 共享大屏1-关键指标
  * @desc 组件描述
  * @author wangyan 
  * @date 2018/8/7 09:30
  * @example 调用示例
  */
-->
<template>
  <div class="chart key-index-container pb10">
    <el-row :gutter="1">
      <el-col :span="4">
        <div class=" key-index-div">
          <div class="key-index-title">开放目录展示</div>
          <p class="pd20"> 开放目录总数：<span class="key-index-num pl5">{{keyIndex.resOpen}}</span></p>
          <p> 本周开放目录总数：<span class="key-index-num pl5">{{keyIndex.resOpen_w}}</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="key-index-div">
          <div class="key-index-title">历史目录浏览展示</div>
          <p class="pd20">目录浏览总量：<span class="key-index-num pl5">{{keyIndex.resVisit}}</span></p>
          <p>本周目录浏览总量：<span class="key-index-num pl5">{{keyIndex.resVisit_w}}</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="key-index-div">
          <div class="key-index-title">开放接口展示</div>
          <p class="pd20">开放接口总数： <span class="key-index-num pl5">{{keyIndex.ifOpen}}</span></p>
          <p>本周开放接口总数： <span class="key-index-num pl5">{{keyIndex.ifOpen_w}}</span></p>

        </div>
      </el-col>
      <el-col :span="4">
        <div class="key-index-div">
          <div class="key-index-title">历史接口浏览展示</div>
          <p class="pd20">接口浏览总量：<span class="key-index-num pl5">{{keyIndex.ifVisit}}</span></p>
          <p>本周接口浏览总量：<span class="key-index-num pl5">{{keyIndex.ifVisit_w}}</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="key-index-div">
          <div class="key-index-title">接口订阅展示</div>
          <p class="pd20">接口订阅总量：<span class="key-index-num pl5">{{keyIndex.ifSub}}</span></p>
          <p>本周接口订阅总量：<span class="key-index-num pl5">{{keyIndex.ifSub_w}}</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="key-index-div">
          <div class="key-index-title">开放组织展示</div>
          <p class="pd20"> 开放组织总数：<span class="key-index-num pl5">{{keyIndex.dptOpen}}</span></p>
          <p> 本周开放组织总数：<span class="key-index-num pl5">{{keyIndex.dptOpen_w}}</span></p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import resize from '@/mixins/resize';
  import API from '../../../../rest-api/restApi';

  export default {
    name: 'key-index',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        keyIndex: [],
        // rawHtml: null
      };
    },
    mounted() {
      this.getOptionData();
    },
    methods: {
      getOptionData() {
        var _that = this;
        this.$http({
          method: 'post',
          url: API.KEY_INDEX
        }).then((res) => {
          _that.keyIndex = res.data.data;
        }).catch((response) => {
          console.log(response);
        });
      }
    }
  };
</script>

