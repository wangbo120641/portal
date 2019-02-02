/**
 * 根据路由的name找出对应的路由
 * @param routes
 * @param name
 * @returns {*}
 */
function matchRouteName (routes, name) {
  var result = null;

  for (let route of routes) {
    if (route.name === name) {
        result = {
          label: route.meta.title ? route.meta.title : route.meta.tip,
          pathName: name,
          params: {},
          showInMenu: route.meta.showInMenu
        };
        return result;
      } else if (route.children) {
        result = matchRouteName(route.children, name);
        if (result) {
          return result;
        }
      }
  }
  return result;
}

export default matchRouteName;
