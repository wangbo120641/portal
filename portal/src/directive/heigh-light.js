/**
 * 高亮代码段内容
 */
import 'highlight.js/styles/googlecode.css';
const hljs = () => import('highlight.js'); // 样式文件

function initHighLight (Vue) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');

    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
}

export default initHighLight;
