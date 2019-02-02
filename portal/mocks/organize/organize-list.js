import Mock from 'mockjs';

var departments = Mock.mock({
  'data': [{
    'id': '@guid',
    'departmentId':1,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区统计局',
    'status': /^[0-1]/,
    'superDepartmentCode': '',
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':2,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区规划局',
    'status': /^[0-1]/,
    'superDepartmentCode': '',
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':3,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区监察审计局',
    'status': /^[0-1]/,
    'superDepartmentCode': '',
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':4,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区财政局',
    'status': /^[0-1]/,
    'superDepartmentCode': '',
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':5,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区商务局',
    'status': /^[0-1]/,
    'superDepartmentCode': '',
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':6,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区统计局1',
    'status': /^[0-1]/,
    'superDepartmentCode': 1,
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':7,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区规划局1',
    'status': /^[0-1]/,
    'superDepartmentCode': 2,
    'departmentDetail': '描述'
  },{
    'id': '@guid',
    'departmentId':8,
    'insertTime': '@date(yyyy-MM-dd)',
    'updateTime': '@date(yyyy-MM-dd)',
    'departmentName': '区监察审计局1',
    'status': /^[0-1]/,
    'superDepartmentCode': 3,
    'departmentDetail': '描述'
  }]
});
var setted = false;
var departmentCodes = [];
Mock.mock(globals.serverUrl + '/organize-list', 'post',
  function (request) {
    /*if (!setted) {
      departments.data.map( (department) => {
        departmentCodes.push(department.departmentId);
      });
      departments.data.map( (department) => {
        department.superDepartmentCode = departmentCodes[department.superDepartmentCode/1];
      });
      setted = true;
    }*/
    return {
      'code': 1, // simulation error code, 1/5 probability of error code 1.
      'message': 'success',
      'total': 10,
      'data' : departments
    }
  }
);
