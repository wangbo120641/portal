/**
 * 配置静态路由表
 * 配置说明：1、默认情况，路由的path中的名称、component和name应一致。
 *           2、如果是多个路径对应一个组件页面，path中的名称应该和name一致，component可以不一致。
 *           3、实际平行的页面，但在逻辑上是层级结构的，可以把逻辑子页面的path中添加逻辑父页面的路径(path)，面包屑会自动显示为层级结构
 *           4、希望页面显示名称和路由配置中的title不一样，跳转时使用router.push({name:'component',params:{navLabel:'newTitle'}})
 *           5、如果跳转页面的逻辑层级（面包屑显示的层级）和目标页的path层级不一致，可以使用router.push({name:'component',params:{navLabel:'newTitle',parentNavItems:navItems}})

 */
import NotFound from '../views/404.vue';
import home from '../views/home/home.vue';
import dataIntelligenceEngine from '../views/data-intelligence-engine/data-intelligence-engine.vue';
import systemManagement from '../views/system-management/system-management.vue';
import roleManagement from '../views/system-management/role-management/role-management';
import rightManagement from '../views/system-management/author-management/right-management.vue';
import userManagement from '../views/system-management/user-management';
import companyManagement from '../views/system-management/company-management';
import dicType from '../views/system-management/dic-management/dic-type';
import dicData from '../views/system-management/dic-management/dic-data';
import logManagement from '../views/system-management/log-management/log-management';
import appManagement from '../views/data-service-engine/apply-show/app-management';
import interfaceService from '../views/data-service-engine/interface-service/interface-service.vue'; // 接口服务
import dataCatalog from '../views/data-service-engine/data-catalog/data-catalog.vue'; // 数据目录
import applyShow from '../views/data-service-engine/apply-show/apply-show.vue'; // 应用展示
import policiesRegulations from '../views/policies-regulations/policies-regulations.vue'; // 政策法规
import regulationDetail from '../views/policies-regulations/regulation-detail.vue';// 法规详情
import interfaceDetail from '../views/data-service-engine/interface-service/components/interface-detail.vue'; // 接口详情
import catalogDetail from '../views/data-service-engine/data-catalog/catalog-detail.vue'; // 数据目录详情

import {
  accountModifyPassword,
  accountPersonalInfo,
  myApplications,
  myApply,
  myCollection,
  myHandle,
  myMessage,
  mySubscription,
  personalCenter
} from '../views/personal-center';
// 共享指数——大屏1
import operatingIndex from '../views/data-intelligence-engine/operating-index/operating-index';
import shareExchange from '../views/data-intelligence-engine/share-exchange/share-exchange';

const noRight = () => import('../views/no-right');// 接口详情

/**
 * 定义静态路由
 * @author ljj-17773
 * @date 2018/9/18
 */
var routes = [
  // {
  //   path: '/login', /* 登录界面 */
  //   name: 'login',
  //   component: login, /* ,hidden: true, // 自定义属性，在组件中可以通过 this.$route.hidden 获取值 */
  //   meta: {
  //     auth: false,
  //     showInMenu: false
  //   }
  // },

  {
    path: '/home', /* 首页 */
    component: home,
    name: 'home', /* this.$route.matched.filter(item => item.name) */
    iconName: 'icons-shouye',
    meta: {
      keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
      auth: false, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
      title: '首页', /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      showInMenu: true
    }
  },
  {
    path: '/dataCatalog',
    component: dataCatalog,
    name: 'dataCatalog',
    iconName: 'icons-zongjieguanli',
    meta: {
      title: '数据目录',
      showInMenu: true,
      keepAlive: false,
      auth: false
    },
    children: [
      {
        path: '/dataCatalog/department',
        name: 'department',
        component: dataCatalog,
        iconName: 'icons-ziyuanku',
        meta: {
          keepAlive: false,
          auth: false,
          title: '部门',
          showInMenu: true
        }
      },
      {
        path: '/dataCatalog/basic',
        name: 'basic',
        component: dataCatalog,
        iconName: 'icons-ziyuanku',
        meta: {
          keepAlive: false,
          auth: false,
          title: '基础',
          showInMenu: true
        }
      },
      {
        path: '/dataCatalog/theme',
        name: 'theme',
        component: dataCatalog,
        iconName: 'icons-ziyuanku',
        meta: {
          keepAlive: false,
          auth: false,
          title: '主题',
          showInMenu: true
        }
      }
    ]
  },
  {
    path: '/interfaceService',
    component: interfaceService,
    name: 'interfaceService',
    iconName: 'icons-ziyuanku',
    meta: {
      title: 'API接口',
      showInMenu: true,
      keepAlive: false,
      auth: false
    },
    children: [

      {
        path: '/interfaceService/interfaceServiceDepartment',
        name: 'interfaceServiceDepartment',
        component: interfaceService,
        iconName: 'icons-ziyuanku',
        meta: {
          keepAlive: false,
          auth: false,
          title: '部门',
          showInMenu: true,
          category: 3
        }
      },
      {
        path: '/interfaceService/interfaceServiceBasic',
        name: 'interfaceServiceBasic',
        component: interfaceService,
        iconName: 'icons-ziyuanku',
        meta: {
          keepAlive: false,
          auth: false,
          title: '基础',
          showInMenu: true,
          category: 1
        }
      },
      {
        path: '/interfaceService/interfaceServiceTheme',
        name: 'interfaceServiceTheme',
        component: interfaceService,
        iconName: 'icons-ziyuanku',
        meta: {
          keepAlive: false,
          auth: false,
          title: '主题',
          showInMenu: true,
          category: 2
        }
      }
    ]
  },
  {
    path: '/applyShow',
    component: applyShow,
    name: 'applyShow',
    iconName: 'icons-yingyong1',
    meta: {
      title: '应用中心',
      showInMenu: true,
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '/dataIntelligenceEngine', /* 共享指数 */
    component: dataIntelligenceEngine,
    name: 'dataIntelligenceEngine', /* this.$route.matched.filter(item => item.name) */
    iconName: 'icons-gongxiang',
    redirect: '/dataIntelligenceEngine/operatingIndex', // 重定向，设置改模块默认选中的子模块
    meta: {
      keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
      auth: false, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
      title: '共享指数', /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      showInMenu: true
    },
    children: [
      {
        path: 'operatingIndex', /* 共享分析展示平台 */
        component: operatingIndex,
        name: 'operatingIndex',
        iconName: 'icons-msnui-report',
        meta: {
          title: '共享分析展示平台',
          showInMenu: true,
          keepAlive: false,
          auth: false
        }
      },
      {
        path: 'shareExchange', /* 共享交换体系展示平台 */
        component: shareExchange,
        name: 'shareExchange',
        iconName: 'icons-msnui-report',
        meta: {
          title: '共享交换体系展示平台',
          showInMenu: true,
          keepAlive: false,
          auth: false
        }
      }
    ]
  },
  {
    path: '/policiesRegulations',
    component: policiesRegulations,
    name: 'policiesRegulations',
    iconName: 'icons-iconfontfalvfagui',
    meta: {
      title: '政策法规',
      showInMenu: true,
      keepAlive: false,
      auth: false
    }
  },
  {
    path: '/policiesRegulations/regulationDetail', /* 测试的 */
    component: regulationDetail,
    name: 'regulationDetail',
    meta: {
      keepAlive: false,
      auth: false,
      title: '法规详情',
      showInMenu: false
    }
  },
  {
    path: '/dataCatalog/catalogDetail', /* 资源目录详情 */
    component: catalogDetail,
    name: 'catalogDetail', /* this.$route.matched.filter(item => item.name) */
    meta: {
      keepAlive: false,
      auth: false,
      title: '数据目录详情',
      showInMenu: false
    }
  },
  // 特殊情况组件名称可以和name不一样，但是路径得和name一致
  {
    path: '/dataCatalog/resDetail/cateInterfaceDetail', /* 资源详情里面的接口详情 */
    component: interfaceDetail,
    name: 'cateInterfaceDetail', /* this.$route.matched.filter(item => item.name) */
    meta: {
      keepAlive: false,
      auth: false,
      title: '接口详情',
      showInMenu: false
    }
  },
  {
    path: '/interfaceService/interfaceDetail', /* 接口服务里面的接口详情 */
    component: interfaceDetail,
    name: 'interfaceDetail', /* this.$route.matched.filter(item => item.name) */
    meta: {
      keepAlive: false,
      auth: false,
      title: '接口详情',
      showInMenu: false
    }
  },
  {
    path: '/systemManagement', /* 系统设置 */
    component: systemManagement,
    name: 'systemManagement',
    iconName: 'icons-shezhi',
    // redirect: '/systemManagement/companyManagement', // 重定向，设置改模块默认选中的子模块
    meta: {
      keepAlive: false,
      auth: true,
      title: '系统设置',
      showInMenu: false
    },
    children: [
      {
        path: 'companyManagement',
        component: companyManagement,
        name: 'companyManagement',
        meta: {
          title: '组织管理',
          showInMenu: false,
          keepAlive: false,
          auth: true
        }
      },
      {
        path: 'logManagement',
        component: logManagement,
        name: 'logManagement',
        meta: {
          title: '日志管理',
          showInMenu: false,
          keepAlive: false,
          auth: true
        },
        children: [
          {
            path: 'logManagementLogin',
            component: companyManagement,
            name: 'logManagementLogin',
            meta: {
              title: '登录日志',
              showInMenu: false,
              keepAlive: false,
              auth: true
            }
          },
          {
            path: 'logManagementOperation',
            component: companyManagement,
            name: 'logManagementOperation',
            meta: {
              title: '操作日志',
              showInMenu: false,
              keepAlive: false,
              auth: true
            }
          }
        ]
      },
      {
        path: 'dicType',
        component: dicType,
        name: 'dicType',
        meta: {
          title: '字典类型',
          showInMenu: false,
          keepAlive: false,
          auth: true
        }
      },
      {
        path: 'rightManagement',
        component: rightManagement,
        name: 'rightManagement',
        meta: {
          title: '菜单管理',
          showInMenu: false,
          keepAlive: false,
          auth: true
        }
      },
      {
        path: 'roleManagement',
        component: roleManagement,
        name: 'roleManagement',
        meta: {
          title: '角色管理',
          showInMenu: false,
          keepAlive: false,
          auth: true
        }
      },
      {
        path: 'userManagement',
        component: userManagement,
        name: 'userManagement',
        meta: {
          title: '用户管理',
          showInMenu: false,
          keepAlive: false,
          auth: true
        }
      }
    ]
  },
  {
    path: '/applyShow/appManagement',
    component: appManagement,
    name: 'appManagement',
    meta: {
      title: '应用管理',
      showInMenu: false,
      keepAlive: false,
      auth: true
    }
  },
  {
    path: '/systemManagement/dicType/dicData',
    name: 'dicData',
    component: dicData,
    meta: {
      title: '字典数据',
      keepAlive: false,
      auth: true,
      showInMenu: false
    }
  },
  {
    path: '/personalCenter',
    component: personalCenter,
    name: 'personalCenter',
    redirect: '/personalCenter/accountPersonalInfo', // 重定向，设置改模块默认选中的子模块
    meta: {
      title: '个人中心',
      showInMenu: false,
      keepAlive: false,
      auth: true
    },
    children: [
      {
        path: 'mySubscription',
        name: 'mySubscription',
        component: mySubscription,
        meta: {
          title: '我的订阅',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      },
      {
        path: 'myCollection',
        component: myCollection,
        name: 'myCollection',
        meta: {
          title: '我的收藏',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }, {
        path: 'myApply',
        component: myApply,
        name: 'myApply',
        meta: {
          title: '我的申请',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }, {
        path: 'myHandle',
        component: myHandle,
        name: 'myHandle',
        meta: {
          title: '我的审批',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }, {
        path: 'myMessage',
        component: myMessage,
        name: 'myMessage',
        meta: {
          title: '我的消息',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }, {
        path: 'myApplications',
        component: myApplications,
        name: 'myApplications',
        meta: {
          title: '我的应用',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }, {
        path: 'accountPersonalInfo',
        component: accountPersonalInfo,
        name: 'accountPersonalInfo',
        meta: {
          title: '个人资料',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }, {
        path: 'accountModifyPassword',
        component: accountModifyPassword,
        name: 'accountModifyPassword',
        meta: {
          title: '修改密码',
          keepAlive: false,
          auth: true,
          showInMenu: false
        }
      }
    ]
  },
  {
    path: '/', /* 防止已进入系统就跳到404页面 */
    redirect: {path: '/home'},
    meta: {
      showInMenu: false
    }
  },
  {
    path: '/web404', /* 404页面 */
    component: NotFound,
    name: 'web404',
    meta: {
      showInMenu: false
    }
  },
  {
    path: '/noRight',
    component: noRight,
    name: 'noRight',
    meta: {
      title: '访问错误',
      showInMenu: false,
      auth: false
    }
  },
  {
    path: '*', /* 路由匹配不到的就跳转到404页面 */
    redirect: {path: '/web404'},
    meta: {
      auth: false,
      showInMenu: false
    }
  }
];

export default routes;
