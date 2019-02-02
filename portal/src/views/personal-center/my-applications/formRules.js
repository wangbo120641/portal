import regexpRules from 'src/common/js/regexpRules.js';

var checkPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入固话或手机号码'));
  } else if (!regexpRules.phone(value) && !regexpRules.telPhone(value)) {
    callback(new Error('请输入正确的固话或手机号码'));
  } else {
    callback();
  }
};

var checkEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入您的email'));
  } else if (!regexpRules.email(value)) {
    callback(new Error('请输入正确的邮箱格式：example@h3c.com'));
  } else {
    callback();
  }
};

var checkUrl = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写应用链接'));
  } else if (!regexpRules.url(value)) {
    callback(new Error('请输入正确的应用链接格式'));
  } else {
    callback();
  }
};
var formRules = {
  checkPhone: checkPhone,
  checkEmail: checkEmail,
  checkUrl: checkUrl
}
export default formRules;
