/**
 * 判断浏览器支持
 * @author ljj-17773
 * @date 2018/9/28
 */
var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串

if (userAgent.indexOf('Chrome') > -1) {
  var browser = 'Chrome';
} else if (userAgent.indexOf('Firefox') > -1) {
// 火狐提示
  if (confirm('您当前使用的浏览器不支持本系统的部分功能，请使用Chrome浏览器访问以获得最佳体验。\n 您是否要跳转到Chrome浏览器下载页面？')) {
    window.location.href = 'https://pc.qq.com/search.html#!keyword=chrome';
  }
} else {
  var link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = '../../static/css/nosupport.css';
  document.getElementsByTagName('HEAD').item(0).appendChild(link);
  alert('很抱歉，本系统暂不支持该浏览器，请您使用Chrome浏览器（V59及以上版本）访问本系统！');
  // 效果1
  document.getElementsByClassName('noSupportBrowser').item(0).style.display = 'block';
  // 效果2
  // document.getElementsByClassName('noSupportBrowserBlack').item(0).style.display = 'block';
}
