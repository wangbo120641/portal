/**
 * @description {为title赋值项目名称}
 * @author {z17219}
 */
(function () {
  window.onload = function () {
    document.title = globals.projectName || '政务信息共享门户';
    document.getElementById('unique-pro-name').textContent = globals.projectName || '政务信息共享门户';
  };
})();
