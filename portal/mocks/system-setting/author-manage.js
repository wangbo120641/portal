/**
 权限管理mock接口
 * @author lj 16076
 * @date 2018.7.26
 * @example 调用示例
 */
import Mock from 'mockjs';
import qs from 'qs';
var params = {
  'page': 1,
  'pageSize': 10,
  'dir': 'asc',
  'field': 'name'
};
var dataList = [
  {
    "id": "1",
    "menuCode": "100",
    "parentMenuCode": "0",
    "status": "0",
    "url": null,
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": "2018-07-31T02:38:57.000+0000",
    "remark": null,
    "menuName": "根权限节点"
  },
  {
    "id": "20180731104159491",
    "menuCode": "100001",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104202411",
    "menuCode": "100002",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104204286",
    "menuCode": "100003",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104204902",
    "menuCode": "100004",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104205273",
    "menuCode": "100005",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104205582",
    "menuCode": "100006",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104205874",
    "menuCode": "100007",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "2",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104206111",
    "menuCode": "100008",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "1",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  },
  {
    "id": "20180731104206349",
    "menuCode": "100009",
    "parentMenuCode": "100",
    "status": "0",
    "url": "string",
    "menuType": "2",
    "orderNumber": 1,
    "createUser": null,
    "createTime": null,
    "updateUser": null,
    "updateTime": null,
    "remark": "string",
    "menuName": "1菜单"
  }];
// 列表接口
Mock.mock(globals.serverUrl + '/author-manage', 'post', function (option) {
  var list = qs.parse(option.body);
  let mockList = dataList.filter(item => {
    return (list.queryData === '' || item.name.indexOf(list.queryData) !== -1 || item.id.indexOf(list.queryData) !== -1 || item.value.indexOf(list.queryData) !== -1
      || item.parentName.indexOf(list.queryData) !== -1);
  });
  if (mockList) {
    return {
      'code': '1',
      'message': 'success',
      'total': mockList.length,
      'data': mockList
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: []
    };
  }
});
// 新增接口
Mock.mock(globals.serverUrl + '/add', 'post', function (option) {
  var obj = qs.parse(option.body);
  dataList.push(obj);
  if (obj) {
    return {
      'code': '1',
      'message': 'success',
      'data': []
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: []
    };
  }
});
// 修改接口
Mock.mock(globals.serverUrl + '/update', 'post', function (option) {
  var obj = qs.parse(option.body);
  if (obj) {
    let mockList = dataList.filter(item => {
      if(item.id === obj.id) {
        item = obj;
      }
      return true;
    });
    return {
      'code': '1',
      'message': 'success',
      'total': mockList.length,
      'data': mockList
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: []
    };
  }
});
// 刪除接口
Mock.mock(globals.serverUrl + '/delete', 'post', function (option) {
  var obj = qs.parse(option.body);
  if (obj) {
    dataList = dataList.filter(item => {
      if(item.id === obj.id) return false;
      return true;
    });
    return {
      'code': '1',
      'message': '删除成功',
      'data': []
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: []
    };
  }
});
// 批量删除
Mock.mock(globals.serverUrl + '/multipleDelete', 'post', function (option) {
  var obj = qs.parse(option.body);
  dataList = dataList.filter(item => {
    if(obj.indexOf(item) >= 0) return false;
    return true;
  });
  if (obj) {
    return {
      'code': '1',
      'message': '删除成功',
      'data': []
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: []
    };
  }
});
// if (data.find((obj) => obj.name || obj.value || obj.parentName === obj.queryData)) {
//   return {
//     'code|1': [1, 1, 1, 1, 0],
//     'message|1': ['success', 'success', 'success', 'success', 'fail'],
//     'total': 13,
//     'data': [
//       {
//         id: '13456224',
//         name: '项目1',
//         parentName: '钟小明',
//         type: '1',
//         value: 'fffffff',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '35234262',
//         'name': '项目2',
//         'parentName': '小林',
//         type: '2',
//         value: 'assadafa',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '1',
//         operate: '1'
//       }, {
//         'id': '3',
//         'name': '嘉应学院',
//         'parentName': '钟小明',
//         type: '2',
//         value: '誰是誰的誰',
//         remark: '图片的格式，默认\'.png\'',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '4',
//         'name': '中山大学',
//         'parentName': '钟小明',
//         type: '1',
//         value: '奧迪',
//         remark: '图片的文字前景色，默认#FFFFFF',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '5',
//         'name': '惠州学院',
//         'manager': '钟小明',
//         type: '2',
//         value: '啊是電大風歌',
//         remark: '图片的背景色，默认值#000000',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '6',
//         'name': '深圳大学',
//         'manager': '钟小明',
//         type: '2',
//         value: '啊啊啊',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '7',
//         'name': '广州医学院',
//         'parentName': '钟小明',
//         type: '1',
//         value: '是是是',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '8',
//         'name': '广东医学院',
//         'parentName': '钟小明',
//         type: '2',
//         value: '嗷嗷嗷',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '9',
//         'name': '华南理工',
//         'parentName': '钟小明',
//         type: '1',
//         value: '嗷嗷嗷',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '2',
//         operate: '1'
//       }, {
//         'id': '10',
//         'name': '项目10',
//         'parentName': '小李子',
//         type: '2',
//         value: '哎哎哎',
//         remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//         status: '2',
//         operate: '1'
//     },
//     {
//       name: 'aaa',
//       id: '11',
//       parentName: 'cc',
//       type: '0',
//       value: 'asdfsdg',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '0',
//       operate: '0'
//     },
//     {
//       name: '系统管理',
//       id: '12',
//       parentName: '阿萨德',
//       type: '1',
//       value: 'ascd',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '2'
//     },
//     {
//       name: '系统管理',
//       id: '13',
//       parentName: '阿萨德',
//       type: '2',
//       value: 'ascd',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }]
//   };
// } else {
//   return {
//     code: '0',
//     message: '請求失敗',
//     data: { }
//   };
//   }
// });
// Mock.mock(globals.serverUrl + '/author-manage', 'post', {
//   'code|1': [1, 1, 1, 1, 0],
//   'message|1': ['success', 'success', 'success', 'success', 'fail'],
//   'total': 13,
//   'data': [
//     {
//       id: '13456224',
//       name: '项目1',
//       parentName: '钟小明',
//       type: '1',
//       value: 'fffffff',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '35234262',
//       'name': '项目2',
//       'parentName': '小林',
//       type: '2',
//       value: 'assadafa',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '1',
//       operate: '1'
//     }, {
//       'id': '3',
//       'name': '嘉应学院',
//       'parentName': '钟小明',
//       type: '2',
//       value: '誰是誰的誰',
//       remark: '图片的格式，默认\'.png\'',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '4',
//       'name': '中山大学',
//       'parentName': '钟小明',
//       type: '1',
//       value: '奧迪',
//       remark: '图片的文字前景色，默认#FFFFFF',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '5',
//       'name': '惠州学院',
//       'manager': '钟小明',
//       type: '2',
//       value: '啊是電大風歌',
//       remark: '图片的背景色，默认值#000000',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '6',
//       'name': '深圳大学',
//       'manager': '钟小明',
//       type: '2',
//       value: '啊啊啊',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '7',
//       'name': '广州医学院',
//       'parentName': '钟小明',
//       type: '1',
//       value: '是是是',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '8',
//       'name': '广东医学院',
//       'parentName': '钟小明',
//       type: '2',
//       value: '嗷嗷嗷',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '9',
//       'name': '华南理工',
//       'parentName': '钟小明',
//       type: '1',
//       value: '嗷嗷嗷',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }, {
//       'id': '10',
//       'name': '项目10',
//       'parentName': '小李子',
//       type: '2',
//       value: '哎哎哎',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//   },
//     {
//       name: 'aaa',
//       id: '11',
//       parentName: 'cc',
//       type: '0',
//       value: 'asdfsdg',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '0',
//       operate: '0'
//     },
//     {
//       name: '系统管理',
//       id: '12',
//       parentName: '阿萨德',
//       type: '1',
//       value: 'ascd',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '2'
//     },
//     {
//       name: '系统管理',
//       id: '13',
//       parentName: '阿萨德',
//       type: '2',
//       value: 'ascd',
//       remark: '最是那一低头的温柔，像一朵水莲花不胜凉风的娇羞。',
//       status: '2',
//       operate: '1'
//     }]
// })
;
