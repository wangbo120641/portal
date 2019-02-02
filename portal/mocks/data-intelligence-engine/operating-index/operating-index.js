/**
 共享大屏1
 * @author wangyan
 * @date 2018.09.07
 * @example 调用示例
 */
import Mock from 'mockjs';
import qs from 'qs';

var data = {
  type: 'operating'
};

if (globals.isMcok) {
  // 首页
  Mock.mock(globals.serverUrl + '/ae/platKeyCountQuery', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': [
        {
          'typeName': '目录浏览总量',
          'typeCount': 64,
          'typeUnit': '次',
        },
        {
          'typeName': '接口浏览总量',
          'typeCount': 110,
          'typeUnit': '次',
        },
        {
          'typeName': '接口订阅总量',
          'typeCount': 0,
          'typeUnit': '次'
        },
        {
          'typeName': '开放组织总数',
          'typeCount': 5,
          'typeUnit': '个',
        },
        {
          'typeName': '开放资源目录总数',
          'typeCount': 36,
          'typeUnit': '个',
        },
        {
          'typeName': '开放接口总数',
          'typeCount': 13,
          'typeUnit': '个',
        }
      ]
    }
  });
// 关键指标
  Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/keyIndex', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'resVisit': 64,  // 目录浏览总量
        'ifVisit': 110,  // 接口浏览总量
        'ifSub': 0,  // 接口订阅量
        'dptOpen': 5,  // 开放组织数
        'resOpen': 35,  // 开放目录数
        'ifOpen': 13,  // 开放接口数
        'resVisit_w': 64,  // 本周目录浏览量
        'ifVisit_w': 110,  // 本周接口浏览量
        'ifSub_w': 0,  // 本周接口订阅量
        'dptOpen_w': 5,  // 本周开放组织数
        'resOpen_w': 35,  // 本周开放目录数
        'ifOpen_w': 13,  // 本周开放接口数
      }
    }
  });
// 数据目录访问量top5
  Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/PlatDatalogVisitTQry?top=5', 'post', function (option) {
    // Mock.mock(globals.serverUrl + '/sftDatalogVisitTQry?top=5', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'category': ['楼盘表', '租赁备案', '抵押权交易', '建设工程规划许可', '个人公积金贷款信息'],
        'legendData': ['资源目录访问量Top5'],
        'seriesData': [{'data': [26, 20, 16, 13, 10]}]
      }
    }
  });
// 数据目录订阅量top5
  Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/datalogSubscribe', 'post', function (option) {
    // Mock.mock(globals.serverUrl + '/shareIndex/datalogSubscribe?top=5', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'chartName': '资源目录订阅量Top10',
        'category': ['楼盘表', '租赁备案', '抵押权交易', '建设工程规划许可', '个人公积金贷款信息'],
        'legendData': ['资源目录订阅量Top10'],
        'seriesData': [{
          'name': '资源目录订阅量Top10',
          'type': null,
          'description': null,
          'data': [
            {'name': '楼盘表', 'value': 26},
            {'name': '租赁备案', 'value': 13},
            {'name': '抵押权交易', 'value': 16},
            {'name': '建设工程规划许可', 'value': 10},
            {'name': '个人公积金贷款信息', 'value': 20}
          ]
        }]
      }
    }
  });

// 接口访问量top5
  Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/interfaceVisitTQry?top=5', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'category': ['建设用地规划许可', '临时建设规划许可', '建设工程设计方案审查', '乡村建设规划许可', '建设项目选址审批'],
        'legendData': ['资源目录访问量Top5'],
        'seriesData': [{'data': [6, 5, 3, 2, 1]}]
      }
    }
  });
  // 接口订阅量top5
  Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/interfaceSubscribe?top=9', 'post', function (option) {
    // Mock.mock(globals.serverUrl + '/shareIndex/datalogSubscribe?top=5', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'chartName': '接口订阅量Top9',
        'category': ['乡村建设规划许可', '临时建设规划许可', '建设用地规划许可', '建设项目选址审批', '建设工程设计方案审查'],
        'legendData': ['接口订阅量Top9'],
        'seriesData': [{
          'name': '接口订阅量Top9', 'type': null, 'description': null, 'data': [{'name': '乡村建设规划许可', 'value': 1},
            {'name': '临时建设规划许可', 'value': 1},
            {'name': '建设用地规划许可', 'value': 2},
            {'name': '建设项目选址审批', 'value': 1},
            {'name': '建设工程设计方案审查', 'value': 3}]
        }]
      }
    }
  });


// 中间交换数据
  Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/center', 'post', function (option) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'total': 379893
      }
    }
  });
// 下方数据
    Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/platOpenCountQry', 'post', function (option) {
      return {
        'code': '1',
        'message': '开放总量查询成功',
        'data': {
          'theme': {
            'chartName': '开放总量',
            'category': ['城建住房', '政务服务', '房产信息', '交通运输', '公共服务事项', '信用服务'],
            'legendData': ['数据目录', '文件', '接口', '总量'],
            'seriesData': [{
              'name': '数据目录',
              'type': 'bar',
              'description': null,
              'extraData': [],
              'data': [10, 7, 9, 4, 2, 1]
            }, {
              'name': '文件',
              'type': 'bar',
              'description': null,
              'extraData': [],
              'data': [0, 0, 0, 0, 0, 0]
            }, {
              'name': '接口',
              'type': 'bar',
              'description': null,
              'extraData': [],
              'data': [7, 3, 0, 2, 0, 0]
            }, {
              'name': '总量',
              'type': 'line',
              'description': null,
              'extraData': [],
              'data': [17, 10, 9, 6, 2, 1]
            }]
          },
          'dept': {
            'chartName': '开放总量',
            'category': ['住建局', '政务中心', '房管局', '交通局', '公积金中心'],
            'legendData': ['数据目录', '文件', '接口', '总量'],
            'seriesData': [{
              'name': '数据目录',
              'type': 'bar',
              'label': {
                normal: {
                  show: true,
                  position: 'top',
                  formatter: '{c}%',
                  textStyle: {
                    color: '#fff',
                    // color: '#70DDA7',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    textAlign: 'left',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {
                color: '#d48265'
              },
              'barWidth': 16,
              'description': null,
              'extraData': [],
              'data': [98.6, 87.2, 77.6, 68.9, 59.3]
            }]
          },
          'basic': {
            'chartName': '开放总量',
            'category': ['人口库信息'],
            'legendData': ['数据目录', '文件', '接口', '总量'],
            'seriesData': [{
              'name': '数据目录',
              'type': 'bar',
              'description': null,
              'extraData': [],
              'data': [1]
            }, {
              'name': '文件',
              'type': 'bar',
              'description': null,
              'extraData': [],
              'data': [0]
            }, {
              'name': '接口',
              'type': 'bar',
              'description': null,
              'extraData': [],
              'data': [1]
            }, {
              'name': '总量',
              'type': 'line',
              'description': null,
              'extraData': [],
              'data': [2]
            }]
          }
        }
      }
    });
  /*Mock.mock(globals.serverUrl + '/shareIndex/shareAnalyze/platOpenCountQry', 'post', function (option) {
    return {
      'code': '1',
      'message': '开放总量查询成功',
      'data': {
        'theme': {
          'chartName': '开放总量',
          'category': ['交通运输', '公共服务事项', '商贸流通'],
          'legendData': ['数据目录', '文件', '接口', '总量'],
          'seriesData': [{'name': '数据目录', 'type': 'bar', 'description': null, 'data': [4, 1, 1]}, {
            'name': '文件',
            'type': 'bar',
            'description': null,
            'data': [1, 0, 0]
          }, {'name': '接口', 'type': 'bar', 'description': null, 'data': [0, 0, 0]}, {
            'name': '总量',
            'type': 'line',
            'description': null,
            'data': [5, 1, 1]
          }]
        },
        'dept': {
          'chartName': '开放总量',
          'category': ['交通局', '公积金中心', '房管局', '政务中心'],
          'legendData': ['数据目录', '文件', '接口', '总量'],
          'seriesData': [{'name': '数据目录', 'type': 'bar', 'description': null, 'data': [4, 3, 1, 1]}, {
            'name': '文件',
            'type': 'bar',
            'description': null,
            'data': [1, 0, 0, 0]
          }, {'name': '接口', 'type': 'bar', 'description': null, 'data': [0, 0, 0, 0]}, {
            'name': '总量',
            'type': 'line',
            'description': null,
            'data': [5, 3, 1, 1]
          }]
        },
        'basic': {
          'chartName': '开放总量',
          'category': [],
          'legendData': ['数据目录', '文件', '接口', '总量'],
          'seriesData': [{'name': '数据目录', 'type': 'bar', 'description': null, 'data': []}, {
            'name': '文件',
            'type': 'bar',
            'description': null,
            'data': []
          }, {'name': '接口', 'type': 'bar', 'description': null, 'data': []}, {
            'name': '总量',
            'type': 'line',
            'description': null,
            'data': []
          }]
        }
      }
    }
  });*/
}
