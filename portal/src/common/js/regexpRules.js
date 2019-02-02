
var regexpRules = {
  phone: (value) => {
    return (new RegExp(/^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/im)).test(value);
  },
  telPhone: (value) => {
    return RegExp(/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/).test(value);
  },
  email: (value) => {
    return RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/im).test(value);
  },
  age: (value) => {
    // return RegExp(/^[1-9][0-9]{0,2}$/im).test(value);
    return RegExp(/^[1-9]\d?$|^1[01]\d$|^120$/im).test(value);
  },
  url: (value) => {
    return RegExp(/^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/im).test(value);
  }
};

export default regexpRules;
