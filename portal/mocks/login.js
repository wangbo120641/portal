import Mock from 'mockjs';
import qs from 'qs';

var users = [{name: 'admin', password: '123456', cname: '管理员', id: 1},
  {name: 'lujiajia', password: '123456', cname: '卢佳佳', id: 2},
  {name: 'wangyan', password: '123456', cname: '王岩', id: 3},
  {name: 'wufan', password: '123456', cname: '吴凡', id: 4},
  {name: 'liuwei', password: '123456', cname: '柳卫', id: 5}];

Mock.mock(/login$/, 'post', function (option) {
  var loginUser = qs.parse(option.body);

  var user = users.find((user) => user.name === loginUser.name && user.password === loginUser.password);

  if (user) {
    return {
      code: '1',
      message: 'success1',
      data: {token: 'qweou122opoa;lskdfj', cname: user.cname, name: user.name}
    };
  } else {
    return {
      code: '0',
      message: '用户名或密码错误',
      data: { }
    };
  }
});
// Mock.mock(globals.serverUrl + '/login', 'post',
//   {
//     code: '1',
//     message: 'success',
//     data: {token: 'qweou122opoa;lskdfj', cname: '管理员', name: 'hello'}
//   }
// );
