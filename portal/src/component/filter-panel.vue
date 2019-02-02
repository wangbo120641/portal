<!--
     /**
      * 条件过滤组件
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018/8/14
      * @example 调用示例
      *  <filter-panel :filterTypes="[{dictLabel:'',dictValue:''}]"></filter-panel>
      */
       -->
<template>
  <div slot="header" class="clearfix">
    <div style="display: inline-block;width:50px;height:32px;line-height:32px;overflow: hidden">类别：</div>
    <template v-for="filterType in filterTypes">
      <div class="typeDiv">
        <transition name="fade">
          <span v-if="!tagSelected(filterType)" class="typeClass" @click="handleSelectTag(filterType,true)">{{filterType.dictLabel}}</span>
          <el-tag v-else closable :disable-transitions="false" type="success" @close="handleSelectTag(filterType,false)">
            {{filterType.dictLabel}}
          </el-tag>
        </transition>
      </div>
    </template>
    <el-button v-show="selectedAppTypes.length>0" @click="selectedAppTypes=[]" plain round type="danger" size="mini"
               style="float:right;margin-top: 4px;">清空
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'filter-panel',
    props: {
      filterTypes: {
        type: Array,
        required: true,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        selectedAppTypes: []

      };
    },
    methods: {
      tagSelected(tag) {
        return this.selectedAppTypes.indexOf(tag) >= 0;
      },
      handleSelectTag (tag, select) {
        if (select) {
          this.selectedAppTypes.push(tag);
        } else {
          this.selectedAppTypes.forEach((stype, index) => {
            if (stype.dictValue == tag.dictValue) {
              this.selectedAppTypes.splice(index, 1);
            }
          });
        }
      }
    },
    watch: {
      selectedAppTypes (newValue, oldValue) {
        this.$emit('change', JSON.parse(JSON.stringify(this.selectedAppTypes)));
      }
    }
  };
</script>

<style scoped>
  div.typeDiv {
    display: inline-block;
    /*width: 90px;*/
    height: 32px;
    overflow: hidden;
    margin-right: 5px;
  }

  span.typeClass {
  / / margin-left: 30 px;
    color: #2f6589;
    padding: 0 10px;
    padding-right: 23px;
    height: 32px;
    line-height: 32px;
  / / box-sizing: border-box;
    display: inline-block;
    cursor: pointer;
  }

  span.typeClass:hover {
    color: #409EFF;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
