import Mock from 'mockjs';
Mock.mock(/\/menu$/, 'get',
  {'code': 1, // simulation error code, 1/5 probability of error code 1.
    'message': 'success',
    'data': [
      {
        path: '/home', /* 首页 */
        component: 'home',
        name: 'home', /* this.$route.matched.filter(item => item.name) */
        meta: {
          keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
          auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
          title: '首页' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
        }
      },

      {
        path: '/dataIntelligenceEngine', /* 数据智能引擎 */
        component: 'dataIntelligenceEngine',
        name: 'dataIntelligenceEngine', /* this.$route.matched.filter(item => item.name) */
        meta: {
          keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
          auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
          title: '数据智能引擎' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
        }
      },
      {
        path: '/systemManagement', /* 系统设置 */
        component: 'systemManagement',
        name: 'systemManagement',
        // redirect: '/projectAnalyze/amountOfMoney',
        meta: {
          keepAlive: false,
          auth: true,
          title: '系统设置' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
        },
        children: [
          {
            path: '/roleManagement', /* 金额分析 */
            component: 'roleManagement',
            name: 'roleManagement',
            meta: {
              des: '角色管理',
              keepAlive: false,
              auth: true
            }
          },
          {
            path: 'rightManagement',
            component: 'rightManagement',
            name: 'rightManagement',
            meta: {
              title: '权限管理',
              keepAlive: false,
              auth: true
            }
          }]
      }
    ]}
);
