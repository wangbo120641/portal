/**
 * 为面包屑导航栏提供数据接口
 * @author ljj-17773
 * @date 2018/8/1
 */
// import selectedMenu from './header-selectedMenu';
import matchRouteName from './matchRouteName';

export default {
  // mixins: [selectedMenu],
  data () {
    return {
      isPage: true// 指示该组件是否为页面，用于按钮自动寻找其父页面（父组件不是父页面）
    };
  },
  beforeRouteEnter (to, from, next) {
    // 从localstory中取出参数数据，放入route.params中，防止刷新页面没有参数的情况
    var params = localStorage.getItem(to.name);

    if (Object.keys(to.params).length > 0) {
      // 跳转目标路由带参数，就更新缓存中的参数
      localStorage.setItem(to.name, JSON.stringify(to.params));
    } else if (Object.keys(to.params).length == 0 && params) {
      Object.assign(to.params, JSON.parse(params));
    }
    next();
  },
  beforeRouteLeave (to, from, next) {
    next();
  },
  methods: {
    goto (route) {
      // route = {name: 'interfaceDetail', params: {title: '接口详情'}};
      if (route.params.title) {
        route.params.parentNavItems = JSON.parse(JSON.stringify(this.navItems));
      } else {
      }
      this.$router.push(route);
    }
  },
  computed: {
    navItems () {// 从route中返回当前路径信息
      var route = this.$route;

      if (route.params.parentNavItems) {
        var navItems = JSON.parse(JSON.stringify(route.params.parentNavItems));

        navItems.push({
          label: route.params.navLabel ? route.params.navLabel : route.meta.title,
          pathName: route.name,
          params: JSON.parse(JSON.stringify(route.params))
        });
        return navItems;
      } else {
        var formatPath = this.$route.fullPath;
        // 判断路由的路径配置是否合法

        if (formatPath[0] !== '/' || formatPath.indexOf('//') >= 0) {
          console.error('路由配置错误！', this.$route.fullPath);
          console.log('一级路由开头必须为/，二级路由开头不可以加/。');
          formatPath = formatPath.replace('//', '/');
        }
        if (formatPath[0] !== '/') {
          formatPath += '/';
        }
        var navItems = formatPath.split('/').slice(1).map(name => {
          return matchRouteName(this.$router.options.routes, name);
        });

        // 如果路径中有的找不到模块，就提示错误并把错误的移除
        if (navItems.filter(item => item != null).length < navItems.length) {
          console.error('路由配置错误:' + this.$route.fullPath, '路径中有未找到的模块。');
          navItems = navItems.filter(item => item != null);
        }

        navItems[navItems.length - 1].params = route.params;
        if (route.params.navLabel) {
          navItems[navItems.length - 1].label = route.params.navLabel;
        }
        return navItems;
      }
    }
  }
};
