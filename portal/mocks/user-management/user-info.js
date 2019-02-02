import Mock from 'mockjs';
import qs from 'qs';
import departmentsInfo from './department-info'
import rolesInfo from './role-info'
var users = Mock.mock({'array|15':[{
    'userId': /^[1-9]{8}/,
    'userName': '@cname',
    'sex': /^[0-1]/,
    'age|20-50': 0,
    'departmentId': /^[0-9]/,
    'roleId': /^[0-2]/,
    'right': '@ctitle(5)',
    'phoneNum':  /^1[385][1-9]\d{8}/,
    'credentialsNum': /^[1-9]{18}/
  }]});
var setUser = false;
var departments = departmentsInfo.departments;
var roles = rolesInfo.roles;
Mock.mock(globals.serverUrl + '/auth/userInfo_query', 'post', function (request) {
  if (!setUser) {
    users.array.map( (user) => {
      var department = departments.array[user.departmentId/1];
      if (!department){
        department = departmentsInfo.findDepartmentById(user.departmentId);
      } 
      var role = roles.data[user.roleId/1];
      if (!role) {
        role = rolesInfo.findRoleById(user.roleId);
      }
      user.departmentId = department.departmentId;
      user.departmentName = department.departmentName;
      user.roleId = role.role_id;
      user.roleName = role.role_name;
    });
    setUser = true;
  }
  var request_ = qs.parse(request.body);
  var condition = request_;
  var conditionUsers = users.array.map( (user) => {
    if(user.departmentId.indexOf(condition.departmentId) > -1 
      && user.userId.indexOf(condition.userId) > -1
      && user.userName.indexOf(condition.userName) > -1){
      return user;
    }
  });
  conditionUsers = conditionUsers.filter(item => item);
  var total = conditionUsers.length;
  var res = conditionUsers.map( (user, index) => {
    if (index >= (condition.currentPage/1 - 1) * condition.pageSize/1 
      && index <= (condition.currentPage/1) * condition.pageSize/1 - 1 ) {
      return user;
    }
  });
  res = res.filter(item => item);
  return {
    code: 1,
    message: '用户基本信息查询成功',
    data: {
      total: total,
      users: res
    }
  }
});

Mock.mock(globals.serverUrl + '/auth/userInfo_update', 'patch', function (request) {
  var request_ = qs.parse(request.body);
  for ( let index in users.array){
    let user = users.array[index];
    if(user.userId == request_.userId){
      user = Object.assign(user, request_);
      setUser = false;
      break;
    }
  }
  return {
    code: 1,
    message: '用户信息修改成功',
    data: {}
  }
});

Mock.mock(globals.serverUrl + '/auth/userInfo_insert', 'post', function (request) {
  var request_ = qs.parse(request.body);
  console.log(request_);
  var info = Mock.mock({
    'userId': /^[1-9]{8}/,
    'right': '@ctitle(5)',
  });
  request_.userId = info.userId;
  request_.right = info.right;
  users.array.push(request_);
  setUser = false;
  return {
    code: 1,
    message: '用户信息添加成功',
    data: {}
  }
});

Mock.mock(globals.serverUrl + '/delete-user-batch', 'post', function (request) {
  var request_ = qs.parse(request.body);
  for (let index in users.array){
    var user = users.array[index];
    if (find(request_, user.userId) > -1) {
      users.array[index] = undefined;
    }
  }
  users.array = users.array.filter(item => item);
  return {
    code: 1,
    message: '用户信息删除成功',
    data: {}
  }
});

Mock.mock(globals.serverUrl + '/delete-user-by-id', 'post', function (request) {
  var request_ = qs.parse(request.body);
  for (let index in users.array){
    var user = users.array[index];
    if (user.userId == request_.userId) {
      users.array[index] = undefined;
      break;
    }
  }
  users.array = users.array.filter(item => item);
  return {
    code: 1,
    message: '用户信息删除成功',
    data: {}
  }
});

var find = function (array , item) {
  for (let index in array){
    if (array[index] == item){
      return index;
    } 
  } 
  return -1;
}
