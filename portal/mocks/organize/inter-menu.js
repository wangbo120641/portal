import Mock from 'mockjs';

Mock.mock(globals.serverUrl + '/interface-menu', 'get', function () {
  return {
    'code': '1',
    'message': 'success',
    'data': {
      'DIC_INDUSTRY': [
        {
          'dictValue': '1',
          'dictLabel': '服务业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '2',
          'dictLabel': '卫生保障',
          'imagePath': 'DIC_THEME_TYPE_8',
          'count': 32
        },
        {
          'dictValue': '3',
          'dictLabel': '文化娱乐',
          'imagePath': 'DIC_DATA_SOURCE_1',
          'count': 24
        },
        {
          'dictValue': '4',
          'dictLabel': '教育',
          'imagePath': 'DIC_TAG_1',
          'count': 202
        },
        {
          'dictValue': '5',
          'dictLabel': '水利交通',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 292
        },
        {
          'dictValue': '6',
          'dictLabel': '建筑业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 225
        },
        {
          'dictValue': '7',
          'dictLabel': '金融业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '8',
          'dictLabel': '批发零售',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '9',
          'dictLabel': '房地产业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '10',
          'dictLabel': '信息传输',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '11',
          'dictLabel': '制造业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '12',
          'dictLabel': '电力燃气',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '13',
          'dictLabel': '农业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '14',
          'dictLabel': '计算机服务',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '15',
          'dictLabel': '住宿餐饮',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '16',
          'dictLabel': '林业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '17',
          'dictLabel': '软件业',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        }
      ],
      'DIC_DATA_SOURCE': [
        {
          'dictValue': '1',
          'dictLabel': '发改委',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '2',
          'dictLabel': '国资委',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '3',
          'dictLabel': '纪检委',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '4',
          'dictLabel': '政法委',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '5',
          'dictLabel': '国监委',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '6',
          'dictLabel': '财政局',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '7',
          'dictLabel': '公安局',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '8',
          'dictLabel': '交通局',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '9',
          'dictLabel': '卫生局',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        }
      ],
      'DIC_THEME_TYPE': [
        {
          'dictValue': '8',
          'dictLabel': '资源环境',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '9',
          'dictLabel': '文体娱乐',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '10',
          'dictLabel': '机构团体',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '11',
          'dictLabel': '公共安全',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '12',
          'dictLabel': '农业农村',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '13',
          'dictLabel': '财税金融',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '1',
          'dictLabel': '经济发展',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '2',
          'dictLabel': '城市建设',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '3',
          'dictLabel': '道路交通',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '4',
          'dictLabel': '教育科技',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '5',
          'dictLabel': '民生服务',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '6',
          'dictLabel': '企业服务',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '7',
          'dictLabel': '健康卫生',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        }
      ],
      'DIC_TAG': [
        {
          'dictValue': '1',
          'dictLabel': '经济支出',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '2',
          'dictLabel': '公用',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '3',
          'dictLabel': '预算',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '4',
          'dictLabel': '教育',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '5',
          'dictLabel': '增长',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        },
        {
          'dictValue': '6',
          'dictLabel': '公共财政',
          'imagePath': 'DIC_INDUSTRY_1',
          'count': 22
        }
      ]
    }
  };
});

Mock.mock(globals.serverUrl + '/dataCatalog/list', 'get', function (option) {
  return Mock.mock({
    'code': '1',
    'message': '',
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
        'createUser': null,
        'createTime': '2018-07-30T09:15:22.000+0000',
        'updateUser': null,
        'updateTime': '2018-07-30T09:15:24.000+0000',
        'interfaceCount': 8
      }
    ]
  });
});
