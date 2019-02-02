/**
 * 递归对比静态路由和客户有权限的路由，返回当前可用的路由
 * 注释掉可以返回所有路由
 * @author ljj-17773
 * @date menu
 * @returns {*}
 */
// function matchRoutes (routes, menu) {
//   return routes.filter(route => {
//     // 如果路由需要验证，则跟后端返回的数据进行比对，如果无需验证，就直接返回
//     if (route.meta && route.meta.auth) {
//       var matched = menu.find(d => d.name === route.name);
//
//       if (matched) {
//         if (route.children && matched.children && matched.children.length > 0) {
//           route.children = matchRoutes(route.children, matched.children);
//         } else route.children = null;
//         return route;
//       } else {}
//     } else {
//       return route;
//     }
//   });
//   // return routes;
// }
// 判断menu中有没有传递进来的组件
function isInMenus(menus, name) {
  var result = null;

  for (var i in menus) {
    if (menus[i].name === name) {
      return menus[i];
    } else if (menus[i].children) {
      result = isInMenus(menus[i].children, name);
      if (result) {
        return result;
      }
    } else {

    }
  }
}

function matchRoutes(routes, menu) {
  // 如果时测试开发环境且权限验证为false，才跳过验证，  发布环境不会跳过
  if (process.env.NODE_ENV === 'development' && !globals.permission) return;

  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];

    if (route.meta && route.meta.auth) {
      var matched = isInMenus(menu, route.name);

      if (!matched) {
        routes.splice(i, 1);
        i--;
      } else {
        var perm = matched.meta.permission ? (matched.meta.permission.sort ? matched.meta.permission : matched.meta.permission.split(',')) : [];

        route.meta.permission = perm;
        if (route.children) {
          matchRoutes(route.children, menu);
        }
      }
    } else {
      var matched = isInMenus(menu, route.name);
      if (matched) {
        var perm = matched.meta.permission ? (matched.meta.permission.sort ? matched.meta.permission : matched.meta.permission.split(',')) : [];
        route.meta.permission = perm;
      }
      if (route.children){
        matchRoutes(route.children, menu);
      }
    }
  }
}

export default matchRoutes;
