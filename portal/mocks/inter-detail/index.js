/**
 * 接口详情
 * @author ljj-17773
 * @date 2018/8/6
 */
import Mock from 'mockjs';

var detail = {
  'code': '1',
  'message': 'success',
  'data': {
    'id': '22',
    'apiName': '残疾人补贴信息查询',
    'dataSource': '国资委',
    'themeType': '城市建设',
    'industryType': '卫生保障',
    'keyword': '公用,教育',
    'updateTime': '2018-07-30 17:19:31',
    'remark': '开发我们是认真地',
    'viewCount': 1,
    'callCount': 2,
    'subsCount': 1
  }
};
var subscription = {
  code: '1',
  'message': '接口订阅成功'
};

var apiParams = {
  'code': '1',
  'message': 'success',
  'data': {
    'visitAddress': '1.1.1.1',
    'paramList': [
      {
        'id': '3',
        'apiId': '1',
        'columnLength': null,
        'columnComment': 'whl入参测试2',
        'columnName': 'reqest2',
        'columnType': 'date',
        'isRequired': '0',
        'parameterType': '0',
        'logicType': '0'
      },
      {
        'id': '4',
        'apiId': '1',
        'columnLength': '3',
        'columnComment': 'whl出参测试2',
        'columnName': 'response',
        'columnType': 'char',
        'isRequired': '0',
        'parameterType': '1',
        'logicType': '0'
      }
    ]
  }
}

//Mock.mock(/\/apiInfo\/queryApiInfoDetailById/, 'post', detail);
//Mock.mock(/\/apiInfo\/subscription/, 'post', subscription);

// Mock.mock(/\/ds\/apiInfo\/queryApiParamInfoById/, 'post', apiParams);
