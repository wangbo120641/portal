import store from 'src/vuex/store.js';
import matchRoutes from '../../router/matchRoutes';
import API from '../../rest-api/restApi';
import axios from 'axios';

var LoginVue = {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      userName: localStorage.getItem('loginName'),
      password: localStorage.getItem('passwd'),
      errMessage: '',
      rememberFlag: localStorage.getItem('rememberFlag') === 'true',
      // rememberFlag: true,
      langFlag: false,
      currentLang: '',
      random: Math.floor(Math.random(0, 1) * 3),
      loginUrl: globals.serverUrl + API.LOGIN_POST
    };
  },
  created () {
    let lang = localStorage.getItem('langulage') || 'zh';

    this.$i18n.locale = lang;
    store.state.lang = lang;
    this.currentLang = lang;
  },
  mounted () {
    // this.rememberFlag = localStorage.getItem('rememberFlag');
    // this.$store.dispatch('auth/setToken', '1234567890');// 存储token到cookie中
    // this.$store.commit('user/SET_NAME', {name: 'admin123', cname: '管理员',userId:'admin'});// 存储登录用户的用户名
    // this.$router.push({path: '/home'});
  },
  methods: {
    loginFn () { // 登录事件
      this._confirmLogin();
    },
    rememberFn (val) { // 是否记住用户
      // this.rememberFlag = !this.rememberFlag;
      // todo:改为通过dispatch或者commit
      localStorage.setItem('rememberFlag', val);
    },
    showLangFn () { // 展开语言选择
      this.langFlag = !this.langFlag;
    },
    hideLangFn () {
      this.langFlag = false;
    },
    changeLangFn (lang) { // 切换语言
      this.currentLang = lang;
      this.$i18n.locale = lang;
      store.state.lang = lang;
    },
    keydownFn (event) {
      if (event.keyCode === 13) {
        this._confirmLogin();
      }
    },

    _confirmLogin () {
      const formHttp = axios.create({
        baseURL: globals.serverUrl, // 'http://192.168.76.96:8084',
        timeout: 20000,
        responseType: 'json',
        withCredentials: false, // 是否允许带cookie这些
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (this.rememberFlag) { // 是否记住用户名
        localStorage.setItem('loginName', this.userName);
        localStorage.setItem('passwd', this.password);
      } else {
        localStorage.removeItem('loginName');
        localStorage.removeItem('passwd');
      }

      // this.$store.dispatch('auth/setToken', '1234567890');// 存储token到cookie中 设置登录状态到cookie loginKey=true
      // this.$store.commit('user/SET_NAME', {name: 'admin', cname: '管理员'});// 存储登录用户的用户名
      // this.$router.push({path: '/home'});
      // return;

      if (!this.userName || !this.password) {
        this.errMessage = this.$t('login.emptyMsg');
        this.$notify({
          title: '警告',
          message: this.errMessage,
          type: 'warning',
          offset: 120
        });
      } else { // 判断用户名密码是否为空
        this.errMessage = '';
        // form请求的时候参数必须是qs格式化的，json格式请求的格式为JSON格式化的
        var data = this.$qs.stringify({username: this.userName, password: this.password});

        formHttp({url: API.LOGIN_POST, method: 'post', data: data}).then(resp => {
          if (resp.data.code == '1000') {
            this.$notify({
              title: '错误',
              message: '用户名或密码错误',
              type: 'error',
              offset: 120
            });
            return;
          }
          var token = resp.data.token;

          this.$store.dispatch('auth/setToken', token);// 存储token到cookie中

          this.$store.commit('user/SET_NAME', {
            userId: resp.data.id,
            name: resp.data.userId,
            cname: resp.data.userName
          });// 存储登录用户的用户名

          // 获取用户头像
          this.$http({
            url: API.USER_INFO,
            method: 'post',
            data: JSON.stringify({})
          }).then(res => {
            // this.personalInfo = res.data.data.data[0];
            console.log(res.data.data.data[0].avatar);
            this.$store.commit('user/SET_AVATAR', res.data.data.data[0].avatar);
          });

          // 考虑把权限菜单放入localstory，进入系统判断token未过期则取localstory中的进行比较
          // 登录后首先获取有权限的菜单，然后跳转到指定url；默认只加载不需要权限的，比如首页，登录页，404等
          // this.$http.get(API.MENU_GET).then((resp) => {
          this.$http.post(API.MENU_BY_USERID_POST + '?userId=' + this.$store.state.user.name, JSON.stringify({})).then((resp) => {
            var menus = resp.data.data.childMenus;

            this.structMenu(menus);
            // console.log(this.$router.options.routes);
            // 不用this.$router.options.routes，用最全的静态路由配置表，放到vuex中去
            var fullRoutes = this.$store.getters['router/getFullRoutes'];
            var routes = this.matchMenu(fullRoutes, menus);// 拿后端返回的routes和前端routes匹配，获取用户有权限的routes。

            this.$store.commit('permission/SET_PERM_BY_ROUTES', routes);// vuex中存储各个页面的按钮权限

            this.$router.options.routes = routes;// 设置新的route
            this.$store.commit('auth/SET_MENU', routes);// 存储menu，防止登录后刷新页面导致无权限的menu出现

            if (this.$route.query.redirect) { // 跳转到指定链接
              this.$router.replace({path: this.$route.query.redirect});
            } else {
              this.$router.replace({name: 'home'});
            }
          });
        }).catch(error => {
          // this.errMessage = this.$t('login.errMsg');
          // 登录用户名或密码错误
          if (error.response && error.response.status == 1000) {
            this.$notify.error({title: '错误',
              message: '用户名或密码错误！',
              offset: 120});
          }
        });
      }
    },
    structMenu (menus) {// 后端返回的菜单格式不满足要求，重新构建菜单格式
      menus.forEach(menu => {
        menu.meta = {title: menu.menuName, permission: menu.functionType, name: menu.remark};
        menu.name = menu.remark;
        if (menu.childMenus) {
          menu.children = menu.childMenus;
          this.structMenu(menu.children);
        }
      });
    },
    matchMenu (routes, menu) {
      var r = JSON.parse(JSON.stringify(routes));

      matchRoutes(r, menu);
      return r;
    }
  },
  computed: {}
};

export default LoginVue;
