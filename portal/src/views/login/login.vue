<template>
  <div class="login" :class="'bg' + random" @keydown.stop="keydownFn" @click.stop="hideLangFn">
    <div class="f-content">
      <div class="detail">
        <!--<el-row :xs="24" :lg="24" class="r-form">-->
        <!--<div class="f-title">-->
        <!--<span class="lang" @click.stop="showLangFn">-->
        <!--{{$t('login.languageDesc')}}-->
        <!--<i class="down" :class="{'el-icon-arrow-down': !langFlag , 'el-icon-arrow-up': langFlag}"></i>-->
        <!--<ul v-show="langFlag" class="lang-list login-la">-->
        <!--<li><a @click="changeLangFn('zh')">{{$t('login.chinese')}}</a></li>-->
        <!--<li><a @click="changeLangFn('en')">{{$t('login.english')}}</a></li>-->
        <!--</ul>-->
        <!--</span>-->
        <!--</div>-->
        <!--</el-row>-->
        <el-row class="r-form">
          <el-col :xs="2" :sm="2" :md="2" :lg="2">
            <div class="login-icon">
              <i class="icon-uniF0F0F9 icon-size"></i>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="fl w-100">
              <el-input type="text" name="username" v-model="userName" class="login-input w-100"
                        :placeholder="$t('login.username')">
              </el-input>
            </div>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2">
            <div class="login-icon">
              <i class="icon-uniF13EF9 icon-size"></i>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8">
            <div class="fl w-100">
              <el-input type="password" name="password" v-model="password" class="login-input w-100"
                        :placeholder="$t('login.password')">
              </el-input>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4">
            <div class="login-submit" @click="loginFn">
              <input type="button" class="submit" :value="$t('login.loginBtn')">
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-col>
        </el-row>
        <el-row class="login-reme pd10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12">
            <!--<p class="login-reme fl">-->
              <el-checkbox v-model="rememberFlag"  class="login-reme fl" @change="rememberFn">{{$t('login.remember')}}
              </el-checkbox>
              <!--<input type="checkbox" id="saveUsername" name="reme-input">-->
              <!--<label for="saveUsername" class="" >-->
              <!--<i class="checkbox" :class="{'checkbox-checked': rememberFlag}"></i>-->
              <!--{{$t('login.remember')}}-->
              <!--</label>-->
            <!--</p>-->
          </el-col>
          <!--<el-col :xs="12" :sm="12" :md="12" :lg="12">-->
          <!--<label class="fr">忘记密码？(待添加)</label>-->

          <!--</el-col>-->
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
  import login from './login.js';

  export default {
    ...login
  };
</script>

<style lang="stylus" src="./login.styl"></style>


