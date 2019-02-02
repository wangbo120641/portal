<template>
  <el-container>
    <div class="content-com">
      <div class="subs-tabs1">
        <el-tabs v-model="selectTab" @tab-click="handleClick">
          <el-tab-pane label="数据目录" name="directory">
            <div slot="label" class=" ">
              <span>数据目录</span>
            </div>
            <data-catalog :child-tab="selectTab"></data-catalog>
            <!--<data-interface :child-tab="selectTab"></data-interface>-->
          </el-tab-pane>
          <el-tab-pane label="数据接口" name="interface">
            <div slot="label" class=" ">
              <span>接口服务</span>
            </div>
            <data-interface :child-tab="selectTab"></data-interface>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-container>
</template>

<script>
  import dataCatalog from './data-catalog';
  import dataInterface from './data-interface';

  export default {
    name: 'my-subscription',
    data () {
      return {
        isPage: true,
        selectTab: 'directory',
        childtab: 'collection'
      };
    },
    methods: {
      handleClick (tab, event) {

      }
    },
    components: {
      // dataDirectory: directory,
      dataCatalog: dataCatalog,
      dataInterface: dataInterface
    }
  };
</script>

<style scoped lang="stylus">
  .content-com {
    width 100%;
    /*margin 0 2%;*/

    .subs-tabs1 {
      padding: 6px 15px 5px 15px
    }
  }
</style>
<style lang="stylus">
  .container.directory .el-card__header {
    padding: 10px 20px 3px 20px;
    //background: linear-gradient(to right, #a0b0e8, #ecf5ff, #fff);
    background-color: #f2f5ff;
  }
</style>
