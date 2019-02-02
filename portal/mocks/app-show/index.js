/**
 * 应用展示mock
 * @author ljj-17773
 * @date 2018/8/10
 */
import Mock from 'mockjs';
var apps = {
  'code': '1',
  'message': '',
  'data': {
    'total': 2,
    'data': [
      {
        'id': '1',
        'applicationName': 'whl测试1',
        'applicationUrl': 'https://www.baidu.com/',
        'photoPath': null,
        'applicationType': '气象服务'
      },
      {
        'id': '2',
        'applicationName': 'whl测试2',
        'applicationUrl': 'http://www.qq.com/',
        'photoPath': null,
        'applicationType': '道路交通'
      }
    ]
  }
};

Mock.mock(/se\/application\/queryApplicationList/, 'post', apps);
