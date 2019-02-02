/**
 数据智能引擎-专题分析-医疗专栏
 * @author lj l16076
 * @date 2018.08.02
 * @example 调用示例
 */
import Mock from 'mockjs';
import qs from 'qs';
var data = {
  type: 'medical'
};
// 医疗人员占比
Mock.mock(globals.serverUrl + '/people-proportion-pie', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '2016',
          description: null,
          data: [
            {
              value: 29,
              name: '医护人员'
            },
            {
              value: 71,
              name: '科研教育人员'
            },
            {
              value: 29,
              name: '管理人员'
            },
            {
              value: 71,
              name: '维护人员'
            },
            {
              value: 71,
              name: '其他'
            }
          ]
        },
        {
          name: '2017',
          description: null,
          data: [
            {
              value: 39,
              name: '医护人员'
            },
            {
              value: 56,
              name: '科研教育人员'
            },
            {
              value: 34,
              name: '管理人员'
            },
            {
              value: 32,
              name: '维护人员'
            },
            {
              value: 26,
              name: '其他'
            }
          ]
        },
        {
          name: '2018',
          description: null,
          data: [
            {
              value: 20,
              name: '医护人员'
            },
            {
              value: 25,
              name: '科研教育人员'
            },
            {
              value: 46,
              name: '管理人员'
            },
            {
              value: 76,
              name: '维护人员'
            },
            {
              value: 32,
              name: '其他'
            }
          ]
        }],
        legendData: ['医护人员', '科研教育人员', '管理人员', '维护人员', '其他'],
        category: null
      }
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
// 医疗人员数量变化
Mock.mock(globals.serverUrl + '/people-num-bar', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '2016',
          description: null,
          data: [80, 100, 121, 104, 105]
        },
        {
          name: '2017',
          description: null,
          data: [120, 90, 100, 138, 142]
        },
        {
          name: '2018',
          description: null,
          data: [30, 52, 200, 334, 390]
        }],
        legendData: ['2016', '2017', '2018'],
        category: ['医护人员', '科研教育人员', '管理人员', '维护人员', '其他']
      }
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
// 医疗投入变化
Mock.mock(globals.serverUrl + '/medical-input-line', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '2016',
          description: null,
          data: [100, 60, 30, 186, 125]
        },
        {
          name: '2017',
          description: null,
          data: [180, 160, 151, 106, 145]
        },
        {
          name: '2018',
          description: null,
          data: [200, 192, 120, 144, 160]
        }],
        legendData: ['2016', '2017', '2018'],
        category: ['基础医疗建设', '计划生育费', '医疗教育科研', '药品器械补贴', '卫生事业费']
      }
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
// 卫生服务项目投入占比
Mock.mock(globals.serverUrl + '/service-input-pie', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '2016',
          description: null,
          data: [
            {
              value: 29,
              name: '居民健康档案管理'
            },
            {
              value: 71,
              name: '健康管理'
            },
            {
              value: 29,
              name: '预防接种'
            },
            {
              value: 71,
              name: '患者健康管理'
            },
            {
              value: 71,
              name: '传染病及突发公共卫生事件'
            },
            {
              value: 45,
              name: '卫生计生监督协管服务'
            }
          ]
        },
        {
          name: '2017',
          description: null,
          data: [
            {
              value: 39,
              name: '居民健康档案管理'
            },
            {
              value: 56,
              name: '健康管理'
            },
            {
              value: 34,
              name: '预防接种'
            },
            {
              value: 32,
              name: '患者健康管理'
            },
            {
              value: 26,
              name: '传染病及突发公共卫生事件'
            },
            {
              value: 56,
              name: '卫生计生监督协管服务'
            }
          ]
        },
        {
          name: '2018',
          description: null,
          data: [
            {
              value: 20,
              name: '居民健康档案管理'
            },
            {
              value: 25,
              name: '健康管理'
            },
            {
              value: 46,
              name: '预防接种'
            },
            {
              value: 76,
              name: '患者健康管理'
            },
            {
              value: 32,
              name: '传染病及突发公共卫生事件'
            },
            {
              value: 55,
              name: '卫生计生监督协管服务'
            }
          ]
        }],
        legendData: ['居民健康档案管理', '健康管理', '预防接种', '患者健康管理', '传染病及突发公共卫生事件', '卫生计生监督协管服务'],
        category: null
      }
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
// 患者年龄分布
Mock.mock(globals.serverUrl + '/patient-age-proportion-radar', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [
          {
            value: [4, 4, 5, 6, 1, 8],
            name: '2016'
          },
          {
            value: [6, 3, 2, 4, 6, 9],
            name: '2017'
          },
          {
            value: [8, 6, 10, 2, 7, 4],
            name: '2018'
          }
        ],
        legendData: ['2016', '2017', '2018'],
        indicatorData: [
          {text: '0-10', max: 10},
          {text: '10-25', max: 10},
          {text: '25-40', max: 10},
          {text: '40-55', max: 10},
          {text: '55-70', max: 10},
          {text: '70-', max: 10}
        ]
      }
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
// 患者疾病种类分布
Mock.mock(globals.serverUrl + '/patient-variety-proportion-radar', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [
          {
            value: [4000, 4000, 5000, 2000, 3000, 8000, 3000, 8000],
            name: '2016'
          },
          {
            value: [6000, 2000, 4000, 3000, 6000, 9000, 3000, 6000],
            name: '2017'
          },
          {
            value: [8000, 6000, 10000, 2000, 7000, 4000, 6000, 10000],
            name: '2018'
          }
        ],
        legendData: ['2016', '2017', '2018'],
        indicatorData: [
          {text: '消化系统', max: 8000},
          {text: '泌尿系统', max: 8000},
          {text: '生殖系统', max: 8000},
          {text: '循环系统', max: 8000},
          {text: '内分泌系统', max: 8000},
          {text: '运动系统', max: 8000},
          {text: '呼吸系统', max: 8000},
          {text: '神经系统', max: 8000}
        ]
      }
    };
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
