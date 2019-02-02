/**
 数据智能引擎-专题分析-环境专栏
 * @author lj l16076
 * @date 2018.08.06
 * @example 调用示例
 */
import Mock from 'mockjs';
import qs from 'qs';
var data = {
  type: 'environment'
};
// 绿化面积
Mock.mock(globals.serverUrl + '/greening-pie', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [
          {
            name: '绿化面积',
            description: null,
            data: [
              {
                value: 2341,
                name: '绿化面积'
              }
            ]
          },
          {
            name: '人均绿化面积',
            description: null,
            data: [
              {
                value: 9.4,
                name: '人均绿化面积'
              }
            ]
          },
          {
            name: '绿化覆盖率',
            description: null,
            data: [
              {
                value: 82,
                name: '绿化覆盖率'
              }
            ]
          }
        ],
        legendData: null,
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
// 环境处理地图
Mock.mock(globals.serverUrl + '/environment-map', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '企业投入',
          description: null,
          data: [60, 100, 150, 180, 200, 250, 300, 380]
        }],
        legendData: ['企业投入'],
        category: ['企业1', '企业2', '企业3', '企业4', '企业5', '企业6', '企业7', '企业8']
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
