let array = Array.from([
  {
    icon: 'icon iconfont el-icon-setting',
    title: '个人中心',
    children: [{
      icon: 'icon iconfont icons-subscription',
      title: '我的订阅',
      name: 'mySubscription'
    },{
      icon: 'icon iconfont icons-collection-empty',
      title: '我的收藏',
      name: 'myCollection'
    },{
      icon: 'icon iconfont icons-applications',
      title: '我的应用',
      name: 'myApplications'
    },{
      icon: 'icon iconfont icons-apply',
      title: '我的申请',
      name: 'myApply'
    },{
      icon: 'icon iconfont icons-handle',
      title: '我的审批',
      name: 'myHandle'
    },{
      icon: 'icon iconfont icons-messages',
      title: '我的消息',
      name: 'myMessage'
    }]
  },{
    icon: 'icon iconfont el-icon-setting',
    title: '账号设置',
    children: [{
      icon: 'icon iconfont icons-denglu',
      title: '个人资料',
      name: 'accountPersonalInfo'
    },{
      icon: 'icon iconfont icons-update-password',
      title: '修改密码',
      name: 'accountModifyPassword'
    }]
  }
]);
export default array;
