/**
 数据智能引擎-专题分析-企业专栏
 * @author lj l16076
 * @date 2018.08.03
 * @example 调用示例
 */
import Mock from 'mockjs';
import qs from 'qs';
var data = {
  type: 'company'
};
// 金额用途占比
Mock.mock(globals.serverUrl + '/amount-source-proportion-pie', 'post', function (option) {
  var list = qs.parse(option.body);
  var type = data.type === list.type;
  if (type) {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        seriesData: [{
          name: '金额用途占比',
          description: null,
          data: [
            {
              value: 29,
              name: '扩张企业规模'
            },
            {
              value: 71,
              name: '采购尖端设备'
            },
            {
              value: 29,
              name: '高科技人才'
            },
            {
              value: 71,
              name: '扩大营业范围'
            },
            {
              value: 71,
              name: '其他'
            }
          ]
        }],
        legendData: ['扩张企业规模', '采购尖端设备', '高科技人才', '扩大营业范围', '其他'],
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
// 企业投入总额TOP10
Mock.mock(globals.serverUrl + '/company-input-top10-bar', 'post', function (option) {
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
