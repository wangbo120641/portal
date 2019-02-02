<!--
 /**
  * 数据智能引擎-专题分析-经济
  * @desc 组件描述
  * @author l16076 
  * @date 2018/8/1 13:06
  * @example 调用示例
  */
-->
<template>
  <base-container :nav="false">
    <div class="share-exchange-container">
      <div style="position: relative;">
        <animate-line containerClass="share-exchange-container" style="position: absolute;width:100%;height:100%"></animate-line>
        <div class="se-head">
          <img src="/static/image/share-index2/se-head.png">
        </div>
        <div class="se-all-content">
          <div class="se-content" style="padding-top: 0px;">
            <div class="se-card mt40">
              <share-system-show></share-system-show>
            </div>
          </div>
          <div class="se-content">
            <div class="se-card">
              <applicatiosn-process></applicatiosn-process>
            </div>
          </div>
          <div class="se-content">
            <div class="se-card">
              <dataMounteAnalysis></dataMounteAnalysis>
            </div>
          </div>
          <div class="se-content">
            <div class="se-card">
              <interface-category></interface-category>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-container>
</template>

<script>
  import BaseContainer from '../../../component/base-container';
  import shareSystemShow from './se-components/share-system-show.vue';
  import applicatiosnProcess from './se-components/application-process.vue';
  import interfaceCategory from './se-components/interface-category.vue';
  import dataMounteAnalysis from './se-components/data-mounte-analysis';
  import BreadNav from '../../../mixins/bread-nav';
  import AnimateLine from 'src/component/animate-line';

  export default {
    name: 'economic',
    components: {
      BaseContainer,
      shareSystemShow,
      applicatiosnProcess,
      dataMounteAnalysis,
      interfaceCategory,
      AnimateLine
    },
    mixins: [BreadNav],
    data () {
      return {};
    },
    watch: {},
    methods: {},
    mounted () {
    },
    computed: {}
  };
</script>
<style lang="stylus" src="./share-exchange.styl" scoped></style>
<style lang="stylus">
  .share-exchange-container::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
</style>
