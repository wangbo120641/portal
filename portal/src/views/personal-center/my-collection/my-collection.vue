<template>
  <el-container>
    <div class="content-com">
      <el-tabs v-model="selectTab" @tab-click="handleClick">
        <el-tab-pane label="数据目录" name="directory">
          <!--<data-directory :child-tab="selectTab"></data-directory>-->
          <data-directory-card :child-tab="selectTab"></data-directory-card>
        </el-tab-pane>
        <el-tab-pane label="数据接口" name="interface">
          <data-interface :child-tab="selectTab"></data-interface>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-container>
</template>

<script>
  // import directory from './data-directory';
  import dInterface from './data-interface';
  import dataDirectoryCard from './data-directory-card.vue';

  export default {
    name: "my-collection",
    data() {
      return {
        isPage:true,
        selectTab: 'directory',
        childtab: 'collection'
      }
    },
    methods: {
      handleClick(tab, event) {

      }
    },
    components: {
      // dataDirectory: directory,
      dataInterface: dInterface,
      dataDirectoryCard
    }
  }
</script>

<style scoped lang="stylus">
  .content-com {
    width 100%;
    padding 0px 20px
    /*padding: 2%;*/
  }
</style>
