import Mock from 'mockjs';

Mock.mock(globals.serverUrl + '/se/dataCatalog/queryDataTypeList', 'post', function () {
  return {
    'code': '1',
    'message': 'success',
    'data': {
      'DIC_INDUSTRY': [
        {
          'dictValue': '1',
          'dictLabel': '服务业'
        },
        {
          'dictValue': '2',
          'dictLabel': '卫生保障',
          'imagePath': 'DIC_INDUSTRY_weishengbaozhang',
          'count': 1
        },
        {
          'dictValue': '3',
          'dictLabel': '文化娱乐',
          'imagePath': 'DIC_INDUSTRY_wenhuayule',
          'count': 3
        },
        {
          'dictValue': '4',
          'dictLabel': '教育',
          'imagePath': 'DIC_INDUSTRY_jiaoyu',
          'count': 0
        },
        {
          'dictValue': '5',
          'dictLabel': '水利交通',
          'imagePath': 'DIC_INDUSTRY_shuilijiaotong',
          'count': 0
        },
        {
          'dictValue': '6',
          'dictLabel': '建筑业',
          'imagePath': 'DIC_INDUSTRY_jianzhuye',
          'count': 0
        },
        {
          'dictValue': '7',
          'dictLabel': '金融业',
          'imagePath': 'DIC_INDUSTRY_jinrongye',
          'count': 0
        },
        {
          'dictValue': '8',
          'dictLabel': '批发零售',
          'imagePath': 'DIC_INDUSTRY_pifalingshou',
          'count': 0
        },
        {
          'dictValue': '9',
          'dictLabel': '房地产业',
          'imagePath': 'DIC_INDUSTRY_fangdichanye',
          'count': 0
        },
        {
          'dictValue': '10',
          'dictLabel': '信息传输',
          'imagePath': 'DIC_INDUSTRY_xinxichuanshu',
          'count': 0
        },
        {
          'dictValue': '11',
          'dictLabel': '制造业',
          'imagePath': 'DIC_INDUSTRY_zhizaoye',
          'count': 0
        },
        {
          'dictValue': '12',
          'dictLabel': '电力燃气',
          'imagePath': 'DIC_INDUSTRY_dianliranqi',
          'count': 0
        },
        {
          'dictValue': '13',
          'dictLabel': '农业',
          'imagePath': 'DIC_INDUSTRY_nongye',
          'count': 0
        },
        {
          'dictValue': '14',
          'dictLabel': '计算机服务',
          'imagePath': 'DIC_INDUSTRY_jisuanjifuwu',
          'count': 0
        },
        {
          'dictValue': '15',
          'dictLabel': '住宿餐饮',
          'imagePath': 'DIC_INDUSTRY_zhusucanyin',
          'count': 0
        },
        {
          'dictValue': '16',
          'dictLabel': '林业',
          'imagePath': 'DIC_INDUSTRY_linye',
          'count': 0
        },
        {
          'dictValue': '17',
          'dictLabel': '软件业',
          'imagePath': 'DIC_INDUSTRY_ruanjianye',
          'count': 0
        }
      ],
      'DIC_DATA_SOURCE': [
        {
          'dictValue': '1',
          'dictLabel': '发改委',
          'imagePath': 'DIC_DATA_SOURCE_fagaiwei',
          'count': 1
        },
        {
          'dictValue': '2',
          'dictLabel': '国资委',
          'imagePath': 'DIC_DATA_SOURCE_guoziwei',
          'count': 1
        },
        {
          'dictValue': '3',
          'dictLabel': '纪检委',
          'imagePath': 'DIC_DATA_SOURCE_jijianwei',
          'count': 3
        },
        {
          'dictValue': '4',
          'dictLabel': '政法委',
          'imagePath': 'DIC_DATA_SOURCE_zhengfawei',
          'count': 0
        },
        {
          'dictValue': '5',
          'dictLabel': '国监委',
          'imagePath': 'DIC_DATA_SOURCE_guojianwei',
          'count': 0
        },
        {
          'dictValue': '6',
          'dictLabel': '财政局',
          'imagePath': 'DIC_DATA_SOURCE_caizhengju',
          'count': 0
        },
        {
          'dictValue': '7',
          'dictLabel': '公安局',
          'imagePath': 'DIC_DATA_SOURCE_gonganju',
          'count': 0
        },
        {
          'dictValue': '8',
          'dictLabel': '交通局',
          'imagePath': 'DIC_DATA_SOURCE_jiaotongju',
          'count': 0
        },
        {
          'dictValue': '9',
          'dictLabel': '卫生局',
          'imagePath': 'DIC_DATA_SOURCE_weishengju',
          'count': 0
        }
      ],
      'DIC_THEME_TYPE': [
        {
          'dictValue': '8',
          'dictLabel': '资源环境',
          'imagePath': 'DIC_THEME_TYPE_ziyuanhuanjing',
          'count': 0
        },
        {
          'dictValue': '9',
          'dictLabel': '文体娱乐',
          'imagePath': 'DIC_THEME_TYPE_wentiyule',
          'count': 0
        },
        {
          'dictValue': '10',
          'dictLabel': '机构团体',
          'imagePath': 'DIC_THEME_TYPE_jigoutuanti',
          'count': 0
        },
        {
          'dictValue': '11',
          'dictLabel': '公共安全',
          'imagePath': 'DIC_THEME_TYPE_gonggonganquan',
          'count': 0
        },
        {
          'dictValue': '12',
          'dictLabel': '农业农村',
          'imagePath': 'DIC_THEME_TYPE_nongyenongcun',
          'count': 0
        },
        {
          'dictValue': '13',
          'dictLabel': '财税金融',
          'imagePath': 'DIC_THEME_TYPE_caishuijinrong',
          'count': 0
        },
        {
          'dictValue': '1',
          'dictLabel': '经济发展',
          'imagePath': 'DIC_THEME_TYPE_jingjifazhan',
          'count': 1
        },
        {
          'dictValue': '2',
          'dictLabel': '城市建设',
          'imagePath': 'DIC_THEME_TYPE_chengshijianshe',
          'count': 1
        },
        {
          'dictValue': '3',
          'dictLabel': '道路交通',
          'imagePath': 'DIC_THEME_TYPE_daolujiaotong',
          'count': 3
        },
        {
          'dictValue': '4',
          'dictLabel': '教育科技',
          'imagePath': 'DIC_THEME_TYPE_jiaoyukeji',
          'count': 0
        },
        {
          'dictValue': '5',
          'dictLabel': '民生服务',
          'imagePath': 'DIC_THEME_TYPE_minshengfuwu',
          'count': 0
        },
        {
          'dictValue': '6',
          'dictLabel': '企业服务',
          'imagePath': 'DIC_THEME_TYPE_qiyefuwu',
          'count': 0
        },
        {
          'dictValue': '7',
          'dictLabel': '健康卫生',
          'imagePath': 'DIC_THEME_TYPE_jiankangweisheng',
          'count': 0
        }
      ],
      'DIC_TAG': [
        {
          'dictValue': '1',
          'dictLabel': '经济支出',
          'imagePath': 'DIC_TAG_jingjizhichu',
          'count': 1
        },
        {
          'dictValue': '2',
          'dictLabel': '公用',
          'imagePath': 'DIC_TAG_gongyong',
          'count': 1
        },
        {
          'dictValue': '3',
          'dictLabel': '预算',
          'imagePath': 'DIC_TAG_yusuan',
          'count': 3
        },
        {
          'dictValue': '4',
          'dictLabel': '教育',
          'imagePath': 'DIC_TAG_jiaoyu',
          'count': 0
        },
        {
          'dictValue': '5',
          'dictLabel': '增长',
          'imagePath': 'DIC_TAG_zengzhang',
          'count': 0
        },
        {
          'dictValue': '6',
          'dictLabel': '公共财政',
          'imagePath': 'DIC_TAG_gonggongcaizheng',
          'count': 0
        }
      ]
    }
  };
});

Mock.mock(globals.serverUrl + '/se/dataCatalog/queryDataCatalogList', 'get', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data|10': [
      {
        'id': '1',
        'resourceName': 'whl测试',
        'themeType': '经济发展',
        'dataSource': '发改委',
        'industryType': '服务业',
        'openLevel': '普遍开放',
        'dataUpdateTime': '2018-07-30T09:15:00.000+0000',
        'dataUpdatePeriod': 3,
        'remark': '解决方案我们是领导者',
        'status': '启用',
        'cataStatus|1': ['0', '1'],
        'createUser': null,
        'createTime': '2018-07-30T09:15:22.000+0000',
        'updateUser': null,
        'updateTime': '2018-07-30T09:15:24.000+0000',
        'interfaceCount': 8
      }
    ]
  });
});

Mock.mock(globals.serverUrl + '/se/dataCatalog/insertDataCatalog', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': {}
  });
});

Mock.mock(globals.serverUrl + '/se/dataCatalog/queryDataSourceList', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': [
      {
        'dsName': 'mysql32',
        'dsId': '3'
      },
      {
        'dsName': 'pgsql',
        'dsId': '2'
      }
    ]
  });
});
Mock.mock(globals.serverUrl + '/se/dataCatalog/queryDataBaseList', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': [
      'information_schema',
      'gzhmt',
      'hanghai_test',
      'hpms',
      'mysql',
      'performance_schema',
      'sys',
      'zhgx'
    ]
  });
});
Mock.mock(globals.serverUrl + '/se/dataCatalog/queryDataTableList', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': [
      'ae_company_data',
      'ae_company_help_fund',
      'ae_company_invest',
      'ae_company_profit',
      'ae_economy_finance'
    ]
  });
});
Mock.mock(globals.serverUrl + '/se/dataCatalog/queryDataSchemaList', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': []
  });
});
Mock.mock(globals.serverUrl + '/se/dataCatalog/queryNotUseApiList', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': [
      {
        'serviceType': 'restful',
        'apiName': 'whl测试接口',
        'requestList': [
          {
            'parameterType': '入参',
            'columnType': 'VARCHAR',
            'isRequired': '否',
            'columnLength': '12',
            'logicType': '不过滤',
            'columnComment': 'whl测试1',
            'columnName': 'test1'
          }
        ],
        'remark': null,
        'responseList': [
          {
            'parameterType': '出参',
            'columnType': 'int',
            'isRequired': '否',
            'columnLength': '12',
            'logicType': '不过滤',
            'columnComment': 'whl测试2',
            'columnName': 'test2'
          }
        ],
        'apiId': '33'
      }
    ]
  });
});
Mock.mock(globals.serverUrl + '/api/user/register', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data|3': [
      {
        'serviceType': 'restful',
        'apiName': 'whl测试接口',
        'remark': 'aaaaa',
        'apiId': '33',
        'requestList': [
          {
            'parameterType': '入参',
            'columnType': 'VARCHAR',
            'isRequired': '否',
            'columnLength': '12',
            'logicType': '不过滤',
            'columnComment': 'whl测试1',
            'columnName': 'test1'
          }
        ],
        'responseList': [
          {
            'parameterType': '出参',
            'columnType': 'int',
            'isRequired': '否',
            'columnLength': '12',
            'logicType': '不过滤',
            'columnComment': 'whl测试2',
            'columnName': 'test2'
          }
        ]
      }
    ]
  });
});
Mock.mock(globals.serverUrl + '/api/user/aaa', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': 'success',
    'data': {
      themeType: 'aaa',
      apiIdList: 'aaa',
      dataSource: 'aaa',
      dataUpdatePeriod: 'aaa',
      industryType: 'aaa',
      remark: 'aaa',
      resourceName: 'aaa',
      tagList: 'aaa'
    }
  });
});
Mock.mock(globals.serverUrl + '/api/user/bbb', 'post', function (option) {
  return Mock.mock({
    'code': '1',
    'message': '新增成功',
    'data': null
  });
});
