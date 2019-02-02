import Mock from 'mockjs';
import roles from '../role/index'

console.log(roles)

/*const roles = Mock.mock({'data': [
    {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '系统管理员',
      'role_detail': '系统管理员',
      'status': 0,
      'insert_time': '2018-07-01 08:02:12',
      'update_time': null
    }, {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '数据管理员',
      'role_detail': '数据管理员',
      'status': 0,
      'insert_time': '2018-07-02 11:12:12',
      'update_time': null
    }, {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '大数据员工',
      'role_detail': '大数据员工',
      'status': 0,
      'insert_time': '2018-07-22 08:43:12',
      'update_time': null
    }
  ]});*/

Mock.mock(globals.serverUrl + '/query-role-info', 'post', function (request) {
  return {
    code: 1,
    message: '角色信息查询成功',
    data: roles
  }
});

const rolesInfo = {
  roles: roles,
  findRoleById: function (id) {
    for (var index in roles.data){
      if (roles.data[index].role_id == id){
        return roles.data[index];
      } 
    } 
    return null;
  }
}

export default rolesInfo

