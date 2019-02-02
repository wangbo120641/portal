import Mock from 'mockjs';

const departments = Mock.mock({'array|10': [{
  'departmentId': /^[1-9]{8}/,
  'departmentName': '@ctitle(5)',
  'status': /^[01]/,
  'departmentCode': /^[1-9]{5}/,
  'superDepartmentCode': /^[1-9]{5}/
}]});

Mock.mock(globals.serverUrl + '/query-department-info', 'post', function (request) {
  return {
    code: 1,
    message: '组织信息查询成功',
    data: departments
  }
});

const departmentsInfo = {
  departments: departments,
  findDepartmentById: function (id) {
    for (var index in departments.array){
      if(departments.array[index].departmentId == id){
        return departments.array[index];
      }
    } 
    return null;
  }
}

export default departmentsInfo

