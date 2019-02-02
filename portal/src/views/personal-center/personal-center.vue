<!--
 /**
  * 个人中心
  */
-->
<template>
  <div class="dark personal-center">
    <base-container :nav-items="navItems">
      <el-row :gutter="20">
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="22">
          <el-container class="home-wrapper">
            <el-aside class="con-aside" style="width: 250px">
              <template v-for="item, index in menuItems">
                <el-card :class="['box-card', index == 1 ? 'custom-box-shadow' : '']">
                  <div slot="header" class="clearfix">
                    <span><i :class="item.icon"></i> {{item.title }}</span>
                  </div>
                  <div v-bind:class="['text', 'item', $route.name == child.name ? 'active' : 'con-item']"
                       v-for="child in item.children" @click="$router.push({name: child.name})">
                    <i :class="[child.icon,'item-icon']"></i>
                    <el-badge v-if="$store.state.message.noReadMessage>0 && child.name == 'myMessage'"
                              :value="$store.state.message.noReadMessage" :max="99" class="item item-btn badge-msg">
                      <span>{{child.title }}</span>
                    </el-badge>
                    <el-button v-else type="text" class="item-btn"> {{child.title}}</el-button>
                  </div>
                </el-card>
              </template>

            </el-aside>
            <el-main style="padding-top:0px">
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
      </el-row>
    </base-container>
  </div>
</template>

<script>
  import BaseContainer from '@/component/base-container';
  import asideMenuItems from './aside-menu-datas';
  import BreadNav from 'src/mixins/bread-nav';
  import RESTAPI from 'src/rest-api/restApi.js';
  import comBanner from 'src/component/com-banner/com-banner.vue';
  import API from '../../rest-api/restApi';

  export default {
    name: 'personal-center',
    components: {BaseContainer, comBanner},
    mixins: [BreadNav],
    data () {
      return {
        button: 'button',
        menuItems: asideMenuItems
      };
    },
    beforeRouteEnter (to, from, next) {
      next();
    },
    beforeCreate () {
    },
    computed: {},
    methods: {
      _getMsgCount (callback) {
        this.$http.post(API.MESSAGE_LIST, {messageStatus: '0'}).then(res => {
          callback(res.data.data.total);
        }).catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.data,
            offset: 120
          });
        });
      }
    },
    mounted () {
      var callback = (count) => {
        // this.$store.dispatch('personalCenter/getMsgCount',{msgCount: count});
        this.$store.commit('message/SET_NO_READ_MESSAGE', count);
      };

      this._getMsgCount(callback);
    }
  };
</script>

<style scoped lang="stylus" src="./personal-center.styl"></style>
<style lang="stylus">
  .personal-center {
    .el-card__body {
      padding: 20px 0;
    }
    .el-main {
      margin: 0 20px;
      overflow :hidden;
    }
    .pagination {
      margin-top: 30px;
    }
    .text-flow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 80%;
    }
    .el-dialog__body {
      padding 40px;
    }
  }

  .badge-msg .el-badge__content.is-fixed {
    height: 14px;
    line-height: 14px;
    padding: 1px 4px;
    border-radius: 14px;
    top: 6px;
  }


</style>
