import Mock from 'mockjs';

let Random = Mock.Random;
// todo my subscription query dataSource
Mock.mock(globals.serverUrl + '/personal-center/my-subscription/dataSource-query', 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        'resourceName': Random.title(5, 10),
        'dataSource|1': Random.title(1, 3),
        'themeType|1': ['政府', '医疗', '教育'],
        'IndustryType|1': ['金融行业', '医疗行业', '农业', '教育行业', '政务行业'],
        'openLevel|1': ['1级', '2级', '3级'],
        'dataUpdate': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'dataCount|1-100': 200,
        'description': Random.paragraph(1, 5)
      }
    ]
  });
});

// todo my subscription query dataInterface
Mock.mock(globals.serverUrl + '/personal-center/my-subscription/dataInterface-query', 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        'resourceName': Random.title(5, 10),
        'dataSource|1': Random.title(1, 3),
        'themeType|1': ['政府', '医疗', '教育'],
        'IndustryType|1': ['金融行业', '医疗行业', '农业', '教育行业', '政务行业'],
        'dataUpdate': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'invokeCount|1': 200,
        'browseCount|1-100': 200,
        'subscribeCount|1-100': 200,
        'description': Random.paragraph(1, 5)
      }
    ]
  });
});

// todo my apply query apply records
Mock.mock(globals.serverUrl + '/personal-center/my-apply/apply-records-query', 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        'type|1': ['应用发布', '数据申请', '资源发布', '接口订阅'],
        'state|1': ['审批中', '创建中', '已通过', '已驳回'],
        'content|1': Random.title(1, 3),
        'approvePerson': '@LAST',
        'applyDate': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'applyContent': {
          'title': Random.title(3, 5),
          'details': Random.paragraph(),
          'name': '@NAME',
          'email': '@EMAIL',
          'phone': /^1[385][1-9]\d{8}$/,
          'department|1': ['发改委', '国资委', '纪检委', '政法委']
        }
      }
    ]
  });
});

// todo my apply query process steps
Mock.mock(globals.serverUrl + '/personal-center/my-apply/apply-process-steps-query', 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data': {
      'active|1-2': 1,
      'steps|4-7': [
        {
          'title|1': ['高新区教育局', '郑州市教育局', '河南省教育厅','教育厅'],
          'personName': Random.name(),
          'description': /^1[385][1-9]\d{8}$/,
          'status|1': ['wait','finish','success']
        }
      ]
    }
  });
});

// todo my handle query approve records
Mock.mock(globals.serverUrl + '/personal-center/my-handle/approve-records-query', 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        'type|1': ['应用发布', '数据申请', '资源发布', '接口订阅'],
        'state|1': [ '待处理', '已通过', '已驳回'],
        'content|1': Random.title(3, 5),
        'approvePerson': '@LAST',
        'applyDate': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'applyContent': {
          'title': Random.title(3, 5),
          'details': Random.paragraph(),
          'name': '@NAME',
          'email': '@EMAIL',
          'phone': /^1[385][1-9]\d{8}$/,
          'department|1': ['发改委', '国资委', '纪检委', '政法委']
        }
      }
    ]
  });
});

// todo my handle query account-personal-info
Mock.mock(globals.serverUrl + '/personal-center/account-personal-info/personal-info-query', 'get', function (option) {
  return Mock.mock({
    'code': 1,
    'message': 'success',
    'data': {
      'loginName': '@NAME',
      'name': '@NAME',
      'birthDay': '@DATE("yyyy-MM-dd")',
      'sex|1': ['0','1'],
      'phone': /^1[385][1-9]\d{8}$/,
      'telPhone': /^1[385][1-9]\d{8}$/,
      'address': Random.region(),
      'roles|1': ['管理员','区域经理','总经理','总裁','主管'],
      'department|1': ['0','1','2','3','4'],
      'createDate': '@DATE("yyyy-MM-dd")',
      'expiryDate': '@DATE("yyyy-MM-dd")'
    }
  });
});

// todo my-messages query data
Mock.mock(globals.serverUrl + '/personal-center/my-message-query', 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        'state|1': ['未读', '已读'],
        'type|1': ['告警消息', '通知消息'],
        'acceptTime': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        'sendPerson': '@NAME',
        'title': Random.title(3, 5),
        'detail': Random.paragraph(1, 3)
      }
    ]
  });
});
