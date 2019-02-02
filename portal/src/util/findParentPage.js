/**
 * 一个自动寻找父亲页面的方法
 * @author ljj-17773
 * @date 2018/9/14
 */
var findParentPage = (firstVueParent) => {
  let found = false;

  while (!found) {
    if (firstVueParent.$data.isPage == undefined) {
      firstVueParent = firstVueParent.$parent;
    } else {
      found = true;
    }
  }
  return firstVueParent;
};

export default findParentPage;
