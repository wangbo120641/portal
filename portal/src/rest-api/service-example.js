/* 接口请求方法示例文件 */

// get请求方法不带参数
this.$http.get(api.APITEST).then((response) => {
  console.log('api test success' + response.data);
}).catch((response) => {
  console.log(response);
});

// 表格接口传参示例
let data = {
  'aa': 'string'
}
let param = {
  // 'language':'zh_CN',
  'page': 1,
  'pageSize': 10,
  'dir': 'asc',
  'field': 'ip'
}
param = this.$qs.stringify(param);
this.$http({
  method: 'post',
  url: api.API_ALL_TABLE_LIST + '?' + param,
  data: JSON.stringify(data)
}).then((response) => {
  console.log('api API_POST_TEST success' + response.data);
}).catch((response) => {
  console.log(response);
});

// get请求方法带参数
let param = {
  'id': 1
};
this.$http.get(api.API_GET_TEST, {params: param}).then((response) => {
  console.log('api API_GET_TEST success' + response.data);
}).catch((response) => {
  console.log(response);
});

// post请求方法带参数
this.$http.post(api.API_POST_TEST + '?' + this.$qs.stringify(param)).then((response) => {
  console.log('api API_POST_TEST success' + response.data);
}).catch((response) => {
  console.log(response);
});

// 直接写入url
let param = {
  id: 1
}
this.$http.post('/api/empty/test/getEmpoyeeById' + '?' + this.$qs.stringify(param)).then((response) => {
  let data = response.data;
  this.getList = response.data.data;
  console.log(data);
  console.log(this.getList);
}).catch((response) => {
  console.log(response);
})
