import Mock from 'mockjs';
import qs from 'qs';

let roles = Mock.mock({
  code: '1',
  message: '成功',
  currentPage: 1,
  total: 34,
  pageSize: 20,
  'data': [
    {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '系统管理员',
      'role_detail': '系统管理员',
      'default': true,
      'status': 0,
      'insert_time': '2018-07-01 08:02:12',
      'update_time': null,
      'rights': [{menuName: 'roleManagement', rights: ['subscribe', 'cancelSubscribe', 'collection', 'publish']},
        {menuName: 'dataIntelligenceEngine', rights: ['add', 'edit', 'subscribe', 'cancelSubscribe', 'collection', 'publish']}]
    }, {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '数据管理员',
      'role_detail': '数据管理员',
      'status': 0,
      'insert_time': '2018-07-02 11:12:12',
      'update_time': null,
      'rights': [{menuName: 'roleManagement', rights: ['subscribe', 'cancelSubscribe', 'collection', 'publish']}]

    }, {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '大数据员工',
      'role_detail': '大数据员工',
      'status': 0,
      'insert_time': '2018-07-22 08:43:12',
      'update_time': null,
      'rights': [{menuName: 'rightManagement', rights: ['add', 'edit', 'del']}]
    }, {
      'id': '@guid',
      'role_id': '@guid',
      'role_name': '解决方案部经理',
      'role_detail': '解决方案部经理',
      'status': 0,
      'insert_time': '2018-07-22 08:43:12',
      'update_time': null,
      'rights': [{menuName: 'dataIntelligenceEngine', rights: ['add', 'edit', 'del']}, {menuName: 'rightManagement', rights: ['add', 'edit', 'del', 'subscribe']}]
    }
  ]
  // rights: [{name: '添加', value: 'add'}, {name: '添加', value: 'edit'}, {name: '删除', value: 'del'}, {name: '订阅', value: 'subscribe'}, {name: '取消订阅', value: 'cancelSubscribe'}]
});
var url = globals.serverUrl + '/auth/roleInfo_query';

Mock.mock(globals.serverUrl + '/auth/roleInfo_query', 'post', roles);
// 更新
Mock.mock(globals.serverUrl + '/auth/roleInfo_update', 'patch', function (option) {
  var role = qs.parse(option.body);

  roles.data.forEach((b, index) => {
    if (b.id === role.id) roles.data.splice(index, 1, role);
  });
  role.status = parseInt(role.status);

  return {code: '1', data: role};
});
// 新增
Mock.mock(globals.serverUrl + '/auth/roleInfo_insert', 'post', function (option) {
  var role = qs.parse(option.body);

  role.id = Mock.mock('@guid');
  role.role_id = Mock.mock('@guid');
  role.status = parseInt(role.status);
  roles.data.push(role);
  return roles;
});
// 删除
Mock.mock(globals.serverUrl + '/auth/roleInfo_delete', 'delete', function (option) {
  var r = qs.parse(option.body);

  if (r.id.indexOf(',') < 0) {
    roles.data = roles.data.filter((role) => role.id !== r.id);
    return roles;
  } else {
    var ids = r.id.split(',');

    roles.data = roles.data.filter((role) => !ids.includes(role.id));
    return roles;
  }
});

// 当前登录用户的菜单权限（智能给别人分配自己拥有的权限，权限或超级管理员可以分配所有的权限）
var menu = [
  {
    path: '/dataIntelligenceEngine', /* 数据智能引擎 */
    component: 'dataIntelligenceEngine',
    name: 'dataIntelligenceEngine', /* this.$route.matched.filter(item => item.name) */
    meta: {
      keepAlive: false, /* 用于在 <keep-alive> 中使用，判断是否需要进行缓存 */
      auth: true, /* 自定义属性，用于判断是否进行校验,在router.beforeEach中使用 */
      title: '数据智能引擎', /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
      permission: [{name: '添加', value: 'add'}, {name: '添加', value: 'edit'}, {name: '删除', value: 'del'}, {name: '订阅', value: 'subscribe'}, {name: '取消订阅', value: 'cancelSubscribe'}]
    }
  },
  {
    path: '/systemManagement', /* 系统设置 */
    component: 'systemManagement',
    name: 'systemManagement',
    meta: {
      keepAlive: false,
      auth: true,
      title: '系统设置' /* 可以通过$route.meta.title 后取当前的描述信息、菜单信息 */
    },
    children: [
      {
        path: '/roleManagement', /* 金额分析 */
        component: 'roleManagement',
        name: 'roleManagement',
        meta: {
          title: '角色管理',
          keepAlive: false,
          auth: true,
          permission: [{name: '添加', value: 'add'}, {name: '编辑', value: 'edit'}, {name: '删除', value: 'del'}, {name: '订阅', value: 'subscribe'}, {name: '取消订阅', value: 'cancelSubscribe'}, {name: '收藏', value: 'collection'}, {name: '发布', value: 'publish'}]
        }
      },
      {
        path: 'rightManagement',
        component: 'rightManagement',
        name: 'rightManagement',
        meta: {
          title: '权限管理',
          keepAlive: false,
          auth: true,
          permission: [{name: '添加', value: 'add'}, {name: '编辑', value: 'edit'}, {name: '删除', value: 'del'}, {name: '订阅', value: 'subscribe'}, {name: '取消订阅', value: 'cancelSubscribe'}, {name: '收藏', value: 'collection'}, {name: '发布', value: 'publish'}]
        }
      }]
  }
];

Mock.mock(/\/menurights/, 'get', {
  code: '1',
  message: '',
  data: menu
});

Mock.mock(globals.serverUrl + '/roleRelUsers', 'get', {
  code: '1',
  message: '',
  'data|3-10': [{
    user_id: /010[0-9]{4}/,
    user_name: '@cname',
    phone_number: /^1[385][1-9]\d{8}/,
    email: '@email',
    'age|20-38': 12,
    identity_number: '@id',
    'department_id': '@guid',
    'department_name|1': ['商务部', '人力资源部', '研发部', '大数据产品线', '法务部', '财务部', '总裁办'],
    'create_time': '@DATETIME("yyyy-MM-dd HH")'
  }]
});

export default roles;
