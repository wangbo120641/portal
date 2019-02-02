/**
 * mock 资源详情
 * @author ljj-17773
 * @date 2018/7/31
 */
import Mock from 'mockjs';
import qs from 'qs';

var baseInfo = {
  collection: false,
  baseInfo: [{label: '数据目录名称', value: '山东省危险废物跨省转移情况汇总表'},
    {label: '共享状态', value: '无条件开放'}, {label: '所属主题', value: '经济建设'},
    {label: '来源部门', value: '省环保厅'}, {label: '行业领域', value: '生态环境'},
    {label: '标签', value: '生态环境'}, {label: '更新频率', value: '每年'},
    {label: '发布时间', value: '2017-03-04 09:13:12'}, {label: '最后更新', value: '2017-03-05 09:13:12'}],
  contentInfo: [{label: '描述', value: '山东省危险废物跨省转移情况汇总表'}],
  useInfo: [{label: '下载次数', value: '31'}, {label: '浏览次数', value: '80'},
    {label: '评分人数', value: '31'}, {label: '评价次数', value: '0'}, {label: '评分总数', value: '31'}, {
      label: '平均评分',
      value: '0.0'
    }]
};

var baseData = [{
  'name': 'ND',
  'cname': '年度',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '年度'
},
{
  'name': 'CSQY',
  'cname': '产生企业',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '产生企业'
},
{
  'name': 'JSQY',
  'cname': '接收企业',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '接收企业'
},
{
  'name': 'WXFWZLMC',
  'cname': '危险废物种类名称',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '危险废物种类名称'
},
{
  'name': 'WXFWZLDLDM',
  'cname': '危险废物种类大类代码',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '危险废物种类大类代码'
},
{
  'name': 'WXFWZLXLDM',
  'cname': '危险废物种类小类代码',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '危险废物种类小类代码'
},
{
  'name': 'WXFWZLSL',
  'cname': '危险废物种类数量（吨）',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '危险废物种类数量（吨）'
},
{
  'name': 'LX',
  'cname': '类型',
  'type': '字符串型C	',
  statics: false,
  isShow: 'true',
  isSearch: false,
  isSort: false,
  bak: '类型'
}];
var resDetail = {
  'code': '1',
  'message': '',
  'data': {
    'dataCatalogInfoEntity': {
      'id': '1',
      'resourceName': 'whl测试',
      'themeType': '经济发展',
      'dataSource': '发改委',
      'industryType': '服务业',
      'openLevel': '普遍开放',
      'dataUpdateTime': '2018-07-30T09:15:00.000+0000',
      'dataUpdatePeriod': 3,
      'remark': '解决方案我们是领导者',
      'status': '0',
      'createUser': null,
      'createTime': '2018-07-30T09:15:22.000+0000',
      'updateUser': null,
      'updateTime': '2018-07-30T09:15:24.000+0000',
      'interfaceCount': 8,
      baseInfo: baseInfo.baseInfo,
      useInfo: baseInfo.useInfo,
      contentInfo: baseInfo.contentInfo
    },
    'tagNameList': [
      '经济支出',
      '公用',
      '预算'
    ]
  }
};
var resApiDetail = {
  'code': '1',
  'message': '',
  'data': {
    'total': 3,
    'data': [
      {
        'apiName': 'test1',
        'id': '1',
        'applyId': '是',
        'collectId': '是'
      },
      {
        'apiName': 'test2',
        'id': '2',
        'applyId': '否',
        'collectId': '否'
      },
      {
        'apiName': 'test3',
        'id': '3',
        'applyId': '否',
        'collectId': '否'
      }
    ]
  }
};
var resDataItem = {
  'code': '1',
  'message': '',
  'data': {
    'total': 2,
    'data': [
      {
        'tableName': 'test',
        'tableId': '1',
        'columnName': 'ND',
        'columnType': 'int',
        'columnLength': '0',
        'columnComment': '年度'
      },
      {
        'tableName': 'test',
        'tableId': '1',
        'columnName': 'CSQY',
        'columnType': 'varchar',
        'columnLength': '20',
        'columnComment': '产生企业'
      },
      {
        'tableName': 'test',
        'tableId': '1',
        'columnName': 'JSQY',
        'columnType': 'varchar',
        'columnLength': '20',
        'columnComment': '接收企业'
      }
    ]
  }
};
var statistics = {
  'code': '1',
  'message': '',
  'data': {
    'seriesData': [
      {
        'name': '目录访问量',
        'data': [
          '9',
          '2',
          '1',
          '11',
          '10',
          '9',
          '14'
        ],
        'description': ''
      }
    ],
    'legendData': [
      '目录访问量'
    ],
    'category': [
      '20180006',
      '20180005',
      '20180004',
      '20180003',
      '20180002',
      '20180001',
      '20180031'
    ]
  }
};

Mock.mock(/\/dataCatalog\/queryDataCatalogDetail/, 'post', resDetail);

Mock.mock(/\/resDetail\/baseData/, 'get', {
  code: '1',
  message: '',
  data: baseData
});

Mock.mock(/\/se\/apiInfo/, 'post', resApiDetail);

Mock.mock(/\/se\/dataItem/, 'post', resDataItem);
Mock.mock(/\/se\/collection/, 'post', function (option) {
  var params = qs.parse(option.body);
  var result = {
    'code': '1',
    'message': '收藏成功!',
    'data': null
  };

  if (params.collectStatus === '1') {
    result.message = '已经取消收藏！';
  }
  return result;
});

Mock.mock(/\/se\/statistic/, 'post', statistics);
