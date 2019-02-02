/**
 * @author yyl 59288
 * @type {{arrayToTree: managementUtil.arrayToTree, treeToArray: (function(*=, *, *=, *=): Array), queryBaseInfoByURL: managementUtil.queryBaseInfoByURL, isOperationClick: managementUtil.isOperationClick, isClickButton: managementUtil.isClickButton, forEachRight: managementUtil.forEachRight, formatFunctionType2Array: (function(*=): null), formatFunctionType2String: managementUtil.formatFunctionType2String, numPattern: (function(*, *, *=): number), phonePattern: (function(*): number), emailPattern: (function(*): number), identityNumberPattern: (function(*): number), checkRepetition: managementUtil.checkRepetition, debounce: managementUtil.debounce}}
 */
const managementUtil = {
  /**
   * 将一维数组array转换为tree形式
   * @author yyl 59288
   * @param array   所需转换的数组
   * @param selfParam   本身的Id(属性名)
   * @param parentParam   父级的Id(属性名)
   * @returns {Array}   所生成的tree
   */
  arrayToTree: function (array, selfParam, parentParam, setParent) {
    var tree = JSON.parse(JSON.stringify(array));

    /***
     * 一般为根据id在数组array中查找数据
     * @param array   原数组
     * @param value   查找值
     * @param param   查找依据的属性名
     * @returns {*}   查找到的数据对象
     */
    var findByParam = function (array, value, param) {
      if (!array) {
        return null;
      }
      try {
        for (var index in array) {
          var item_ = array[index];

          if (item_) {
            if (item_[param] == value) {
              return item_;
            }
            var res = findByParam(item_.children, value, param);

            if (res) {
              return res;
            }
          }
        }
      } catch (e) {
        return null;
      }
      return null;
    };

    /**
     * 为obj添加子节点
     * @param obj
     * @param child
     */
    var pushChild = function (obj, child) {
      if (!obj.children) {
        obj.children = [];
      }
      obj.children.push(child);
    };

    try {
      for (var index in tree) {
        var item = tree[index];

        if (!item) {
          continue;
        }
        var parentParamValue = item[parentParam];
        var res = findByParam(tree, parentParamValue, selfParam);

        if (!res) {
          continue;
          tree.push(item);
        } else {
          if (setParent) {item.parentObj = res;}
          pushChild(res, item);
          tree[index] = null;
        }
      }
      tree = tree.filter(item => item);
    } catch (e) {
      tree = array;
    } finally {
      return tree;
    }
  },
  // arrayToTree: function (array, selfParam, parentParam, setParent, beforeReturn) {
  //   var tree = [];
  //   /***
  //    * 一般为根据id在数组array中查找数据
  //    * @param array   原数组
  //    * @param value   查找值
  //    * @param param   查找依据的属性名
  //    * @returns {*}   查找到的数据对象
  //    */
  //   var findByParam = function (array, value, param) {
  //     try {
  //       for (var index in array) {
  //         var item_ = array[index];
  //         if (item_[param] == value) {
  //           return item_;
  //         }
  //         var res = findByParam(item_.children, value, param);
  //         if (res) {
  //           return res;
  //         }
  //       }
  //     }catch (e) {
  //       return null;
  //     }
  //   };
  //   /**
  //    * 为obj添加子节点
  //    * @param obj
  //    * @param child
  //    */
  //   var pushChild = function (obj, child) {
  //     if (!obj.children) {
  //       obj.children = [];
  //     }
  //     obj.children.push(child);
  //   };
  //   try {
  //     for (var index in array) {
  //       var item = array[index];
  //       var parentParamValue = item[parentParam];
  //       var res = findByParam(tree, parentParamValue, selfParam);
  //       if( !res ){
  //         tree.push(item);
  //       }else {
  //         if (setParent)
  //           item.parentObj = res;
  //         pushChild(res, item);
  //       }
  //     }
  //   }catch (e) {
  //     tree = array;
  //   }finally {
  //     if (!beforeReturn)
  //       tree = this.arrayToTree(tree,selfParam,parentParam,setParent,true)
  //     return tree;
  //   }
  // },
  /**
   * 树结构转化数组
   * @param tree  树
   * @param childrenParam   子属性名
   * @param split
   * @param param
   * @returns {Array}
   */
  treeToArray: function (tree, childrenParam, split, param) {
    var array = [];

    split = !split ? '' : ' ';
    var forChildren = function (array, tree) {
      for (let index in tree) {
        if (param) {
          tree[index][param] = split + tree[index][param];
        }
        array.push(tree[index]);
        var temp = split;

        split = split + split;
        forChildren(array, tree[index][childrenParam]);
        split = temp;
      }
    };

    forChildren(array, tree);
    return array;
  },

  /**
   * 查询全量信息（有分页的情况），依赖vue对象
   * @param vueObj
   * @param url
   * @param method  请求方式
   * @param callback  回调函数
   * @param data  异步数据
   */
  queryBaseInfoByURL: function (vueObj, url, method, callback, data) {
    var _that = vueObj;
    var pageInfo = {
      page: '1',
      pageSize: '10000',
      dir: 'asc',
      field: 'id'
    };
    var firstCallback = function () {
      _that.$http({
        method: method,
        url: url + '?' + _that.$qs.stringify(pageInfo),
        data: JSON.stringify(data || {})
      }).then((response) => {
        callback(response);
      }).catch();
    };

    _that.$http({
      method: method,
      url: url + '?' + _that.$qs.stringify(pageInfo),
      data: JSON.stringify(data || {})
    }).then((response) => {
      if (response.data.code == 1) {
        callback(response);
      }
    }).catch();
  },

  /**
   * 判断当前点击事件是否发生在operations所指明的DOM上
   * @param event
   * @param operations
   * @returns {boolean}
   */
  isOperationClick: function (event, operations) {
    var paths = event.path;

    for (var index in paths) {
      var item = paths[index];

      if (operations.indexOf(item.nodeName) >= 0) {
        return true;
      } else if (item.nodeName == 'TD') {
        return false;
      }
    }
    return false;
  },

  /**
   * 判断当前点击事件是否发生在button上
   * @param event
   * @returns {boolean}
   */
  isClickButton: function (event) {
    var paths = event.path;

    for (var index in paths) {
      var item = paths[index];

      if (item.nodeName == 'BUTTON') {
        return true;
      } else if (item.nodeName == 'TD') {
        return false;
      }
    }
    return false;
  },
  forEachRight: function (rights, param, rightsParam) {
    if (!rights) {
      return;
    }
    rights.forEach((item) => {
      if (item) {
        item[param] = this.formatFunctionType2Array(item.functionType || '');
        var children = item.children;

        if (!children) {
          children = item.childMenus;
        }
        if (rightsParam) {
          children = item[rightsParam];
        }
        this.forEachRight(children, param, rightsParam);
      }
    });
  },
  formatFunctionType2Array: function (functionType) {
    return !functionType ? null : functionType.split(',');
  },
  formatFunctionType2String: function (functionType) {
    if (!functionType) {
      return null;
    }
    var res = '';

    functionType.forEach((item) => {
      res = res + (res == '' ? '' : ',') + item;
    });
    return res;
  },

  /**
   * 正则匹配数字
   * @param value 匹配对象
   * @param plusOrMinus 是否正负（字符串匹配）
   * @param notDouble 是否小数
   * @returns {number}
   */
  numPattern: function (value, plusOrMinus, notDouble) { // 匹配全数字
    var flag = 1; // 1:匹配成功，0:匹配失败
    var pattern = /^[0-9]+(\.)?[0-9]*$/;

    if (plusOrMinus == 'minus') {
      pattern = /^(-)?[0-9]+(\.)?[0-9]*$/;
    }
    if (notDouble) {
      if (plusOrMinus == 'minus') {
        pattern = /^(-)?[0-9]+[0-9]*$/;
      } else {
        pattern = /^[0-9]+[0-9]*$/;
      }
    }
    var matchRes = value.toString().match(pattern);

    if (!matchRes || matchRes.length <= 0) {
      flag = 0;
    } else {
      var matchStr = matchRes[0];

      if (!matchStr || matchStr.length < value.toString().length) {
        flag = 0;
      }
    }
    return flag;
  },

  /**
   * 匹配电话号码---手机、座机
   * @param value 匹配对象
   * @returns {number}
   */
  phonePattern: function (value) { // 匹配电话
    var flag = 1;
    var phone = /^[1][3,4,5,7,8][0-9]{9}$/;   // 手机
    var mob = /^((0\d{2,3})-?)(\d{7,8})$/;     // 座机

    value.toString().match(phone) || value.toString().match(mob) ? flag = 1 : flag = 0;
    return flag;
  },

  /**
   * 匹配eMail
   * @param value
   * @returns {number}
   */
  emailPattern: function (value) { // 匹配email
    var flag = 1;
    var pattern = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

    value.toString().match(pattern) ? flag = 1 : flag = 0;
    return flag;
  },

  /**
   * 匹配身份证
   * @param value
   * @returns {number}
   */
  identityNumberPattern: function (value) {
    var str = value.toString();
    const pattern = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; // 18位身份证校验
    const pattern2 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/i; // 15位身份证校验

    if (str.length === 15) {
      return str.match(pattern2) && this.identityNumberDaysPattern('19'.concat(str.substr(6, 6))); // 15位身份证号验证和身份证日期校验
    }
    return str.match(pattern) && this.identityNumberDaysPattern(str.substr(6, 8));

    // flag = str.match(pattern) || str.match(pattern2) ? 1 : 0;
    // return flag;
  },

  /**
   * 判断年月日是否合法
   * @param {*} yyyyMMdd
   */
  identityNumberDaysPattern: function (value) {
    let days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      year = Number(value.substr(0, 4)),
      month = Number(value.substr(4, 2)),
      day = Number(value.substr(6, 2));

    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      days[2] ++;
    }
    return day <= days[month];
  },

  /**
   * 使用vue对象执行异步请求，用于跟vue的form数据后台校验
   * @param vue
   * @param data  异步参数
   * @param url   请求地址
   * @param callback  回调
   * @param errorMessage  错误信息
   */
  checkRepetition: function (vue, data, url, callback, errorMessage) {
    vue.$http({
      method: 'post',
      url: url + '?' + vue.$qs.stringify({page: 1, pageSize: 1, field: 'id', dir: 'asc'}),
      data: JSON.stringify(data)
    }).then((res) => {
      if (res.data.data.total != 0) {
        callback(new Error(errorMessage));
      } else {
        callback();
      }
    }).catch(() => {
      callback();
    });
  },
  // debounce_init: 0,
  // debounce_count: 0,
  /**
   * 延迟函数-----只执行最后一次回调函数--针对某一函数的频繁调用，最后一次有效
   * @param fun 回调函数
   * @param time  时间间隔
   */
  debounce: function (fun, time) {
    var _that = this;

    /**
     * 初始化函数属性
     * 舍弃对象属性，防止外部修改属性值
     * debounce_init: 0,debounce_count: 0,
     */
    var init = function () {
      _that.debounce.init = true;
      _that.debounce.debounce_init = 0;
      _that.debounce.debounce_count = 0;
    };

    if (!_that.debounce.init) {
      init();
    }
    _that.debounce.debounce_count = _that.debounce.debounce_count + 1;  // 模拟进栈
    setTimeout(function () {
      _that.debounce.debounce_count = _that.debounce.debounce_count - 1;  // 模拟出栈
      if (_that.debounce.debounce_count == _that.debounce.debounce_init) {
        fun();
        _that.debounce.init = false;
      }
    }, time);
  }
};

export default managementUtil;
