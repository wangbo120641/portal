/**
 数据智能引擎-专题分析-经济专栏
 * @author lj l16076
 * @date 2018.08.02
 * @example 调用示例
 */
import Mock from 'mockjs';
import qs from 'qs';
var data = {
  type: 'economic'
};
// 产业占比
Mock.mock(globals.serverUrl + '/industry-proportion-line', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '第一产业',
          description: null,
          data: [70, 50, 21, 34, 25, 10, 50]
        },
        {
          name: '第二产业',
          description: null,
          data: [10, 20, 39, 28, 43, 60, 20]
        },
        {
          name: '第三产业',
          description: null,
          data: [10, 20, 19, 48, 23, 30, 30]
        }],
        legendData: ['第一产业', '第二产业', '第三产业'],
        category: ['2013', '2014', '2015', '2016', '2017', '2018']
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
// 地方财政收入趋势
Mock.mock(globals.serverUrl + '/local-finace-trend-line', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '财政收入',
          description: null,
          data: [80, 100, 121, 104, 105, 90, 100]
        },
        {
          name: '财政支出',
          description: null,
          data: [120, 90, 100, 138, 142, 130, 130]
        }],
        legendData: ['财政收入', '财政支出'],
        category: ['2013', '2014', '2015', '2016', '2017', '2018']
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
// 地方财政收入占比
Mock.mock(globals.serverUrl + '/local-finance-pie', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  var year = list.year;
  if (type) {
    if (year === '2017') {
      return {
        'code': '1',
        'message': 'success',
        'data': {
          seriesData: [
            {
              name: '财政收支占比',
              data: [
                {name: '财政收入', value: 335},
                {name: '财政支出', value: 310}
              ]
            }
          ],
          legendData: ['财政收入', '财政支出'],
          category: null
        }
      };
    } else if (year === '2016') {
      return {
        'code': '1',
        'message': 'success',
        'data': {
          seriesData: [
            {
              name: '财政收支占比',
              data: [
                {name: '财政收入', value: 335},
                {name: '财政支出', value: 310},
                {name: '人均收入', value: 310}
              ]
            }
          ],
          legendData: ['财政收入', '财政支出', '人均收入'],
          category: null
        }
      };
    } else {
      return {
        'code': '1',
        'message': 'success',
        'data': {
          seriesData: [
            {
              name: '财政收支占比',
              data: [
                {name: '财政收入', value: 335},
                {name: '财政支出', value: 900}
              ]
            }
          ],
          legendData: ['财政收入', '财政支出'],
          category: null
        }
      };
    }
  } else {
    return {
      code: '0',
      message: '請求失敗',
      data: {}
    };
  }
});
// 人均支出
Mock.mock(globals.serverUrl + '/per-capita-expenditure-line', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '可支配收入',
          description: null,
          data: [200, 192, 120, 144, 160, 130]
        },
        {
          name: '生活消费支出',
          description: null,
          data: [180, 160, 151, 106, 145, 130]
        },
        {
          name: '支出上涨',
          description: null,
          data: [100, 60, 51, 116, 125, 160]
        }],
        legendData: ['可支配收入', '生活消费支出', '支出上涨'],
        category: ['2013', '2014', '2015', '2016', '2017', '2018']
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
// 人均生产和收支情况
Mock.mock(globals.serverUrl + '/product-input-bar-line', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '人均生产总值',
          type: 'bar',
          description: null,
          data: [5.0, 6.9, 7.6, 6.4, 8.3, 10]
        },
        {
          name: '人均可支配收入',
          type: 'bar',
          description: null,
          data: [5.9, 9.0, 8.8, 6.0, 7.3, 8.8]
        },
        {
          name: '生活消费支出',
          type: 'bar',
          description: null,
          data: [2.9, 4.0, 3.8, 5.0, 6.3, 6.8]
        },
        {
          name: '收入上涨',
          type: 'line',
          description: null,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
        },
        {
          name: '支出上涨',
          type: 'line',
          description: null,
          data: [3.0, 3.2, 3.8, 4.4, 7.3, 8.2]
        },
        {
          name: '恩格尔系数',
          type: 'line',
          description: null,
          data: [2.4, 2.8, 3.0, 4.2, 6.9, 7.2]
        }],
        legendData: ['人均生产总值', '人均可支配收入', '生活消费支出', '收入上涨', '支出上涨', '恩格尔系数'],
        category: ['2013', '2014', '2015', '2016', '2017', '2018']
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
// 生产总值
Mock.mock(globals.serverUrl + '/total-output-bar', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '第一产业',
          description: null,
          data: [79, 52, 200, 334, 390, 330, 220]
        },
        {
          name: '第二产业',
          description: null,
          data: [80, 52, 200, 334, 390, 330, 220]
        },
        {
          name: '第三产业',
          description: null,
          data: [30, 52, 200, 334, 390, 330, 220]
        }],
        legendData: ['第一产业', '第二产业', '第三产业'],
        category: ['2013', '2014', '2015', '2016', '2017', '2018']
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
