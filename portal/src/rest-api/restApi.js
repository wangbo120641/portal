/* 以下四个是测试接口，仅供参考 */
export const APITEST = '/empty/test/getAllEmployee'; // 测试
var TEST_IP = '';

/* 结束 */

/* 以下接口为真实接口，请在下边定义接口 */
var API_ALL_TABLE_LIST = '/pms/project-query';  // 全部列表

// 登录接口,接受登录名和密码，判断是否可以登录并返回token
var LOGIN_POST = '/login';
var LOGOUT_POST = '/logout';

// 未读消息和警告
var NO_READ_MESSAGE = '/system/messageInfo/cout-noRead-warnMessage';

// 获取用户信息
var USER_INFO = '/auth/userWithRoleList_query_for_person';
var USER_INFO_UPDATE = '/auth/userInfo_update';

// 菜单权限接口,登录后可以通过改接口返回用户可访问的菜单列表
var MENU_GET = '/menu';
var MENU_BY_USERID_POST = '/auth/menuTreeByUserId_query';
var MENU_DETAIL_GET = 'auth/menuDetailById_query';

// 角色管理接口
var ROLE_GET_PINPOINT = TEST_IP + '/auth/roleInfo_query';
var ROLE_GET = TEST_IP + '/auth/roleWithMenuList_query';
var ROLE_INSERT = TEST_IP + '/auth/roleWithMenuList_insert';
var ROLE_UPDATE = TEST_IP + '/auth/roleWithMenuList_update';
var ROLE_DELETE = TEST_IP + '/auth/roles_delete';
var ROLE_INIT_PASSWORD = TEST_IP + '/auth/initialPassword_update';

// 系统设置-组织管理-树接口
var ORGANIZE_TREE_GET = '/organize-tree';

// 系统设置-组织管理-列表
var ORGANIZE_LIST_POST = '/organize-list';

// 系统设置-字典类型get
var DICT_TYPE_GET_PINPOINT = TEST_IP + '/system/dictType/listPinpoint';
var DICT_TYPE_GET = TEST_IP + '/system/dictType/list';

// 系统设置-字典类型DEL
var DICT_TYPE_DEL = TEST_IP + '/system/dictType/delete';
// 字典类型insert
var DICT_TYPE_INSERT = TEST_IP + '/system/dictType/add';
// 字典类型update
var DICT_TYPE_UPDATE = TEST_IP + '/system/dictType/update';
// 系统设置-字典数据get
var DICT_DATA_GET = TEST_IP + '/system/dictData/list';
var DICT_DATA_GET_PINPOINT = TEST_IP + '/system/dictData/listPinpoint';
// 系统设置-字典数据del
var DICT_DATA_DEL = '/system/dictData/delete';
// 字典数据update
var DICT_DATA_UPDATE = TEST_IP + '/system/dictData/update';
// 字典数据insert
var DICT_DATA_INSERT = TEST_IP + '/system/dictData/add';

// 数据目录：类别，标签
var CATALOG_TYPE = '/se/dataCatalog/queryDataTypeList';
var CATALOG_LIST = '/se/dataCatalog/queryDataCatalogList';// 列表
var CATALOG_COLLECT = '/se/collection'; // 数据目录收藏
var CATALOG_EDIT_SHOW = '/se/dataCatalog/updateDataCatalogShow'; // 编辑页面展示信息
var CATALOG_API_LIST = '/se/dataCatalog/queryNotUseApiList';  // 新建测试
var CATALOG_ADD = '/se/dataCatalog/insertDataCatalog';  // 新建目录
var CATALOG_EDIT = '/se/dataCatalog/updateDataCatalog';  // 修改目录
var CATALOG_DEL = '/se/deleteCatalog';  // 删除目录
var CATALOG_SUBS_STATUS_CHECK = '/ds/apiInfo/check';

// DSG
var DSG_SHOW = '/se/dataCatalog/renderApiForm';  // 新增接口数据展示
var DSG_ADD = '/ds/apiInfo/insertApi';  // 新增dsg接口
var DSG_API_NAME_VERIFY = '/ds/apiInfo/invalidateApiName';  // 校验APIname
var DSG_SERVICE_VERIFY = '/ds/apiInfo/invalidateServiceName';  // 校验serviceName
var DSG_DEL = '/ds/apiInfo/deleteApi';  // 删除未被dsg发布的接口

// 获取数据源、库、表
var QUERY_SOURCE_LIST = '/se/dataCatalog/queryDataSourceList';
var QUERY_DB_LIST = '/se/dataCatalog/queryDataBaseList';
var QUERY_DT_LIST = '/se/dataCatalog/queryDataTableList';
var QUERY_SM_LIST = '/se/dataCatalog/queryDataSchemaList';
var QUERY_REGISTER = '/api/user/register';
var API_PARAM = '/ds/apiInfo/queryApiParamInfoById';

// 数据详情接口
var RES_DETAIL = '/se/dataCatalog/queryDataCatalogDetail';
var RES_APIS_POST = '/se/dataCatalog/apiInfo';
var RES_DATA_ITEM_POST = '/se/dataCatalog/dataItem';
var RES_COLL_POST = '/se/collection';
var RES_STAICS_POST = '/se/statistic';// 统计接口
var INTER_INFO_POST = '/ds/apiInfo/queryApiInfoDetailById';// 接口详情
var INTER_PARAMS_POST = '/ds/apiInfo/queryApiParamInfoById';// 接口参数详情

// 应用展示
var APP_SHOW_POST = '/se/application/queryApplicationList';
var APP_VISIT_SORT_POST = '/se/application/queryApplicationVisitList';// 应用程序访问排行
var APP_ADVICE_SORT_POST = '/se/application/queryApplicationRecommendList';// 应用程序推荐排行
var APP_TYPE_LIST_POST = '/se/application/queryApplicationTypeList';// 应用程序类别列表
var APP_ADD_POST = '/se/application/saveApplication';// 添加应用程序
var APP_FLUX = 'se/application/insertFlux';// 新增访问次数
var APP_DELETE_POST = '/se/application/deleteApp';
var APP_SET_RECOMMEND_VALUE = '/se/application/setRecommendValue';
var APP_MY_APPLICATIONS = '/se/application/getMyApplication';
var APP_UPDATE_POST = '/se/application/updateApp';
var APP_DUPLICATE_URL = '/se/application/isReduplicateUrl';

// 数据申请
var DATA_APPLY_INFO_POST = '/se/getDataApplyInfo';// 获取表单预填写信息，如：用户姓名，邮箱，电话等
var DATA_APPLY_POST = 'se/dataApply';

// 系统设置-用户管理
var USER_QUERY_BY_ROLE_ID = TEST_IP + '/auth/queryUserByRoleId';
var USER_QUERY_PINPOINT = TEST_IP + '/auth/queryUserId';
var USER_QUERY = TEST_IP + '/auth/userWithRoleList_query';
var USER_INSERT = TEST_IP + '/auth/userWithRoleList_insert';
var USER_UPDATE = TEST_IP + '/auth/userWithRoleList_update';
var USER_DELETE = TEST_IP + '/auth/usersStatus_update';

// 系统设置-权限管理
var RIGHT_QUERY_PINPOINT = TEST_IP + '/auth/menuInfo_queryPinpoint';
var RIGHT_QUERY = TEST_IP + '/auth/menuInfo_query';
var RIGHT_INSERT = TEST_IP + '/auth/menuInfo_insert';
var RIGHT_UPDATE = TEST_IP + '/auth/menuInfo_update';
var RIGHT_DELETE = TEST_IP + '/auth/menuInfo_delete';
var MENU_TREE = TEST_IP + '/auth/menuTree_query';

// 系统设置-组织/部门管理
var COMPANY_QUERY_PINPOINT = TEST_IP + '/auth/dptInfo_queryPinpoint';
var COMPANY_QUERY = TEST_IP + '/auth/dptInfo_query_for_user';
var COMPANY_INSERT = TEST_IP + '/auth/dptInfo_insert';
var COMPANY_UPDATE = TEST_IP + '/auth/dptInfo_update';
var COMPANY_DELETE = TEST_IP + '/auth/dptsStatus_update';

// 日志
var LOGIN_LOG_LIST = TEST_IP + '/system/loginLog/list';
var LOGIN_LOG_DEL = TEST_IP + '/system/loginLog/delete';
var LOGIN_LOG_DEL_MULTI = TEST_IP + '/system/loginLog/batch/delete';
var OPERATE_LOG_LIST = TEST_IP + '/system/operateLog/list';
var OPERATE_LOG_DEL = TEST_IP + '/system/operateLog/delete';
var OPERATE_LOG_DEL_MULTI = TEST_IP + '/system/operateLog/batch/delete';

// 个人中心
var COLLECT_INFO = '/system/collectInfo/list'; // 我的收藏
var ORDER_LIST = '/system/orderInfo/list';   // 我的订阅

var APPLY_LIST = '/system/applyInfo/list';  // 我的申请-查询
var APPLY_DELETE = '/system/applyInfo/list';  // 我的申请-删除
var APPLY_DETAIL = '/system/applyInfo/list';  // 我的申请-详情
var APPLY_HISTORY = '/system/applyInfo/list';  // 我的申请-审批历史查询
var APPLY_WARN = '/system/applyInfo/list';  // 我的申请-催办

var APPROVE_INFO = '/system/approveInfo/list';  // 我的审批-分页查询
var APPROVE_DETAIL = '/system/applyInfo/detail';  // 我的审批-详情
var APPROVE_APPROVE = '/system/approveInfo/approve';  // 我的审批-通过
var APPROVE_REJECT = '/system/approveInfo/reject';  // 我的审批-驳回

var MESSAGE_LIST = '/system/messageInfo/list';  // 我的消息-查询
var DOWNLOAD = '/system/download/downloadFile';  // 文件下载
// 共享指数-大屏1
var KEY_INDEX = '/shareIndex/shareAnalyze/keyIndex'; // 关键指标
var DATALOG_VISIT = '/shareIndex/shareAnalyze/PlatDatalogVisitTQry'; // 数据目录访问量Top10
var DATALOG_SUBSCRIBE = '/shareIndex/shareAnalyze/datalogSubscribe'; // 数据目录订阅量Top10
var INTERFACE_VISIT = '/shareIndex/shareAnalyze/interfaceVisitTQry'; // 接口访问量Top10
var INTERFACE_SUBSCRIBE = '/shareIndex/shareAnalyze/interfaceSubscribe'; // 接口订阅量Top10
var OPEN_COUNT = '/shareIndex/shareAnalyze/platOpenCountQry'; // 数据开放量（分部门/主题/基础）
var CENTER = '/shareIndex/shareAnalyze/center';  // 累计交换数据

// 政策法规
var REGULATION_LIST = '/file/queryFiles'; // 法规列表
var TYPE_LIST = '/file/types'; // 法规类型
var GET_DETAIL = '/file/queryFileInfo'; // 法规详情
var PREVIEW_FILE = '/file/previewFile'; // 文件预览
var SAVE_FILE = 'file/saveFileInfo'; // 文件上传
var DELETE_FILE = 'file/deleteFile'; // 文件删除

// 最新数据
var NEW_DATSALOG = '/ae/PlatDatalogNewTQry'; // 最新目录
var NEW_INTERFACE = '/ae/PlatApiNewTQry'; // 最新接口

// 接口服务
var INTERFACE_CATEGORY_TREE_DATA_QUERY = '/se/dataCatalog/queryCategoryList';
var INTERFACE_DATA_QUERY = '/ds/apiInfo/queryApiInfo';
var INTERFACE_DATA_DETAIILS_QUERY = '/ds/apiInfo/queryApiParamInfoById';
var INTERFACE_DATA_UPDATE = '';
// var INTERFACE_NEW_DIRECTORY = '/ae/PlatDatalogNewTQry';
var INTERFACE_NEW_APPLICATION = '/se/application/queryApplicationNewestList';
var INTERFACE_SUBSCRIPTION = '/ds/apiInfo/subscription';
var INTERFACE_SUBSCRIPTION_CANCEL = '/ds/apiInfo/cancelsubs';

const API = {
  APITEST, // 测试

  API_ALL_TABLE_LIST, // 全部列表
  // 登录接口
  LOGIN_POST,
  LOGOUT_POST,

  NO_READ_MESSAGE, // 未读消息和警告

  USER_INFO,
  USER_INFO_UPDATE,

  MENU_GET,
  MENU_BY_USERID_POST,
  MENU_DETAIL_GET,
  // 日志接口
  LOGIN_LOG_LIST,
  LOGIN_LOG_DEL,
  LOGIN_LOG_DEL_MULTI,
  OPERATE_LOG_LIST,
  OPERATE_LOG_DEL,
  OPERATE_LOG_DEL_MULTI,
  // 角色管理
  ROLE_GET_PINPOINT,
  ROLE_GET,
  ROLE_INSERT,
  ROLE_UPDATE,
  ROLE_DELETE,
  ROLE_INIT_PASSWORD,

  // 字典管理
  DICT_TYPE_GET_PINPOINT,
  DICT_TYPE_GET,
  DICT_TYPE_DEL,
  DICT_TYPE_INSERT,
  DICT_TYPE_UPDATE,
  DICT_DATA_GET_PINPOINT,
  DICT_DATA_GET,
  DICT_DATA_DEL,
  DICT_DATA_UPDATE,
  DICT_DATA_INSERT,

  // 数据目录
  CATALOG_TYPE,
  CATALOG_LIST,
  CATALOG_COLLECT,
  CATALOG_EDIT_SHOW,
  CATALOG_API_LIST,
  CATALOG_ADD,
  CATALOG_EDIT,
  CATALOG_DEL,
  CATALOG_SUBS_STATUS_CHECK,

  // DSG
  DSG_SHOW,
  DSG_ADD,
  DSG_API_NAME_VERIFY,
  DSG_SERVICE_VERIFY,
  DSG_DEL,

  // 应用程序显示，访问排行，推荐应用
  APP_SHOW_POST,
  APP_VISIT_SORT_POST,
  APP_ADVICE_SORT_POST,

  APP_TYPE_LIST_POST, // 应用程序类型列表
  DATA_APPLY_INFO_POST,
  APP_ADD_POST,
  APP_FLUX,
  APP_DELETE_POST,
  APP_SET_RECOMMEND_VALUE,
  APP_MY_APPLICATIONS,
  APP_UPDATE_POST,
  APP_DUPLICATE_URL,

//  数据申请
  DATA_APPLY_POST,

// 获取数据源、库、表
  QUERY_SOURCE_LIST,
  QUERY_DB_LIST,
  QUERY_DT_LIST,
  QUERY_SM_LIST,
  QUERY_REGISTER,
  API_PARAM,

  RES_DETAIL,
  RES_APIS_POST,
  RES_DATA_ITEM_POST,
  RES_COLL_POST,
  RES_STAICS_POST,
  INTER_INFO_POST,
  INTER_PARAMS_POST,

  // 用户管理
  USER_QUERY_BY_ROLE_ID,
  USER_QUERY_PINPOINT,
  USER_QUERY,
  USER_UPDATE,
  USER_INSERT,
  USER_DELETE,

  // 权限管理
  RIGHT_QUERY_PINPOINT,
  RIGHT_QUERY,
  RIGHT_INSERT,
  RIGHT_UPDATE,
  RIGHT_DELETE,
  MENU_TREE,

  // 组织/部门管理
  COMPANY_QUERY_PINPOINT,
  COMPANY_QUERY,
  COMPANY_INSERT,
  COMPANY_UPDATE,
  COMPANY_DELETE,

  ORGANIZE_TREE_GET,
  ORGANIZE_LIST_POST,

// 个人中心
  COLLECT_INFO,
  ORDER_LIST,
  APPLY_LIST,
  APPLY_DELETE,
  APPLY_DETAIL,
  APPLY_HISTORY,
  APPLY_WARN,
// 个人中心-审批
  APPROVE_INFO,
  APPROVE_DETAIL,
  APPROVE_APPROVE,
  APPROVE_REJECT,
// 个人中心-消息
  MESSAGE_LIST,
  DOWNLOAD,

  // 共享指数-大屏1
  KEY_INDEX,
  DATALOG_VISIT,
  DATALOG_SUBSCRIBE,
  INTERFACE_VISIT,
  INTERFACE_SUBSCRIBE,
  OPEN_COUNT,
  CENTER,

  // 政策法规
  REGULATION_LIST,
  TYPE_LIST,
  GET_DETAIL,
  PREVIEW_FILE,
  SAVE_FILE,
  DELETE_FILE,

  // 最新数据
  NEW_DATSALOG,
  NEW_INTERFACE,

  // 接口服务
  INTERFACE_CATEGORY_TREE_DATA_QUERY,
  INTERFACE_DATA_QUERY,
  INTERFACE_DATA_DETAIILS_QUERY,
  INTERFACE_DATA_UPDATE,
  INTERFACE_NEW_APPLICATION,
  INTERFACE_SUBSCRIPTION,
  INTERFACE_SUBSCRIPTION_CANCEL
};

export default API;
