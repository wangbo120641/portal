import Mock from 'mockjs';
import qs from 'qs';

var dicType = Mock.mock({
  'data|11': [{
    "id": "1",
    "dictName": "用户性别",
    "dictType": "DICT_USER_SEX",
    "status": "0",
    "createUser": null,
    "createTime": "2018-07-27T03:21:47.000+0000",
    "updateUser": null,
    "updateTime": "2018-07-27T03:18:07.000+0000",
    "remark": null
  }],
  'total': 11
});

var dicTypeTree = Mock.mock({
  'dicTypeTree|3': [{
    'id|+1': 1,
    label: '一级 1',
    children: [{
      'id|+1': 11,
      label: '二级 1-1',
      children: [{
        'id|+1': 21,
        label: '三级 1-1-1'
      }, {
        'id|+1': 31,
        label: '三级 1-1-2'
      }]
    }]
  }]
});

var dicData = Mock.mock({
  'data|23': [ {
    "id": "1",
    "dictSort": 1,
    "dictLabel": "男",
    "dictValue": "0",
    "dictType": "DIC_SEX",
    "status": "0",
    "createUser": null,
    "createTime": "2018-07-26T16:00:00.000+0000",
    "updateUser": null,
    "updateTime": "2018-07-26T16:00:00.000+0000",
    "remark": null
  }],
  'total': 23
});

Mock.mock(globals.serverUrl + '/dicType/list', 'get', function () {
  return {
    'code': '1',
    'message': 'success',
    'data': dicType
  };
});

Mock.mock(globals.serverUrl + '/dicType/del', 'post', function (option) {
  return {
    'code': '1',
    'message': 'success',
    'data': dicType
  };
});

Mock.mock(globals.serverUrl + '/dicData/list', 'get', function (option) {
  return {
    'code': '1',
    'message': 'success',
    'data': dicData
  };
});

Mock.mock(globals.serverUrl + '/dicData/del', 'post', function (option) {
  return {
    'code': '1',
    'message': 'success',
    'data': dicData
  };
});

// Mock.mock(/\/sys-management\/emergency-details-query/, 'get', function (option) {
//   return Mock.mock({
//     'code': '1',
//     'message': 'success',
//     'data': dicData
//   });
// });
