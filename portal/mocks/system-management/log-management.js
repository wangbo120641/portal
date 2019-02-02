import Mock from 'mockjs';



Mock.mock(/\/sys-management\/login-log-details-query/, 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        "id": "1",
        "loginName": "j16898",
        "ipAddress": "127.0.0.1",
        "loginLocation": "郑州",
        "browser": null,
        "os": null,
        "status": "1",
        "msg": null,
        "loginTime": "2018-08-03T09:02:43.000+0000"
      }
    ]
  });
});

Mock.mock(/\/sys-management\/operation-log-details-query/, 'get', function (option) {
  return  Mock.mock({
    'code': 1,
    'message': '',
    'data|1-20': [
      {
        "id": "1518132021192051987",
        "moduleName": "字典数据Test",
        "action": "1",
        "method": "com.h3c.bigdata.zhgx.function.system.controller.DictDataController.addSave()",
        "operateUserId": null,
        "deptName": null,
        "operateUrl": null,
        "operateIp": "127.0.0.1",
        "status": "0",
        "errorMsg": null,
        "operateTime": "2018-08-03T08:00:49.000+0000"
      }
    ]
  });;
});
