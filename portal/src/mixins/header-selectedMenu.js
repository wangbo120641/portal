
import matchRouteName from './matchRouteName';

export default {
  name: 'header-selectedMenu',
  data () {},

  /**
   * @description 根据路由截取匹配组件name,筛选选中的menu
   * @example {'/dataCatalog/catalogDetail' => ['dataCatalog', 'catalogDetail']}
   */
  beforeCreate () {
    // 用当前路由取匹配menu中的项目，找到对应的并把name存入vuex中，解决menu无选中效果的问题。
    var componentNames = null;

    if (this.$route.params.parentNavItems) {
      componentNames = this.$route.params.parentNavItems.map(nt => nt.pathName);
      componentNames.push(this.$route.name);
    } else {
      componentNames = this.$route.fullPath.split('/').slice(1);
    }
    // componentNames = componentNames.reverse();
    // console.log('bn', this);
    var matchName = [];

    for (var i in componentNames) {
      var mMenu = matchRouteName(this.$router.options.routes, componentNames[i]);

      if (mMenu && mMenu.showInMenu) {
        matchName.push(componentNames[i]);
        // break;
      }
    }
    this.$store.commit('menu/SET_SELECTED_MENU', matchName);
  }

};
