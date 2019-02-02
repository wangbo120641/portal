
// 将标准格式的时间转换为YY-MM-DD
function dateFormat (format) {
  var d = new Date(format);
  var month = d.getMonth() + 1;
  var day = d.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  var val = d.getFullYear() + '-' + month + '-' + day;

  return val;
}
  // 获取今年年初标准时间
function getStartYearTime () {
  var date = new Date();
  var y = date.getFullYear();

  return new Date(y, 0, 1);
}
// 获取当前时间点标准时间
function getPresentTime () {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth();
  var d = date.getDate();

  return new Date(y, m, d);
}

/**
 * 自定义日期时间转换格式
 * @param {*} date
 * @param {*} fmt yyyy-MM-dd hh:mm:ss
 */
function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) { // 年份
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';

      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : _pageLeftZero(str));
    }
  }
  return fmt;
}

function _pageLeftZero (str) {
  return ('00' + str).substr(str.length);
}

let dataFormatFnList = {
  dateFormat,
  getStartYearTime,
  getPresentTime,
  formatDate
};

export default dataFormatFnList;
