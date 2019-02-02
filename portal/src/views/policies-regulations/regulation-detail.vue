<template>
  <base-container :nav-items="navItems">
    <com-banner slot="banner" :cbHeight="300">
      <div class="regulation-banner">
        <span class="regulation-big-title">政策.法规</span>
      </div>
    </com-banner>
    <div style="margin-bottom: 100px;">
      <el-row>
        <el-col :span="2">
          &nbsp;
        </el-col>
        <el-col :span="20" class="regulation-detail bg-white pd20">
          <div class="detail-title">{{info.length===0?'暂无数据':info.title}}</div>
          <h3 class="source">
            <!-- <span>文件来源：{{info.fileSource?info.fileSource:'暂无数据'}}</span> -->
            <!-- <span> 发布时间：{{info.publishTime }}</span> -->
            <!--<p>法规描述：{{info.description}}</p>-->
          </h3>
          <div class="preview-file" v-if="info.previewUrl">
            <div class="down-tip">
              <div class="content-head-left">仅预览第一页文件，如需继续浏览，请点击<a :href="downUrl" download="w3logo">&nbsp;下载</a>
              </div>
              <div class="content-head-right tr">
                <span> 发布时间：{{info.publishTime | dateFormat}}</span>
              </div>
            </div>
            <div class="file-pdf">
              <pdf :src='url'></pdf>
            </div>
          </div>
          <div v-else class="no-preview">
            暂无文件预览，请下载<a :href="downUrl" download="w3logo">
            <i class="iconfont icons-xiazai ml10"></i>
          </a></div>
          <div class="fl lastInfo" title="上一条">上一条：<a @click="changeDetail(lastId)" style="color: #4040e6;">{{lastTitle?lastTitle:'暂无数据'}}</a>
          </div>
          <div class="fr nextInfo" title="下一条">下一条：<a @click="changeDetail(nextId)" style="color: #4040e6;">{{nextTitle?nextTitle:'暂无数据'}}</a>
          </div>
        </el-col>
        <el-col :span="2">
          &nbsp;
        </el-col>
      </el-row>

    </div>
  </base-container>

</template>

<script>
  import BaseContainer from '../../component/base-container';
  import ComBanner from 'src/component/com-banner/com-banner';
  import BreadNav from '../../mixins/bread-nav';
  import API from '../../rest-api/restApi';
  import pdf from 'vue-pdf';
  import dataFormatFnList from '../../util/dataFormat';

  export default {
    name: 'regulation-detail',
    components: {
      BaseContainer,
      ComBanner,
      pdf
    },
    mixins: [BreadNav],
    data () {
      return {
        id: '',
        info: {},
        lastId: '',
        lastTitle: '',
        nextId: '',
        nextTitle: '',

        url: '',
        previewFile: '',
        downUrl: ''
      };
    },
    created () {
      this.id = this.$route.params.id;
    },
    mounted () {
      if (this.id) {
        this.getDetail(this.id);
      }
    },
    methods: {
      getDetail (id) {
        let that = this;

        if (id) {
          that.$http({
            method: 'post',
            url: API.GET_DETAIL + '?id=' + id
          }).then(res => {
            that.info = res.data.data.info;
            // that.info.publishTime = dataFormatFnList.formatDate(new Date(that.info.publish_time), 'yyyy-MM-dd');
            that.lastId = res.data.data.lastId;
            that.lastTitle = res.data.data.lastTitle;
            that.nextId = res.data.data.nextId;
            that.nextTitle = res.data.data.nextTitle;
            that.url = globals.serverUrl + that.info.previewUrl;
            that.downUrl = globals.serverUrl + that.info.downloadUrl;
          }).catch((res) => {
            console.log(res);
          });
        }
      },
      changeDetail (id) {
        this.getDetail(id);
        let dom = document.querySelector('.back-to-ceiling');

        dom.click();
      }
    },
    filters: {
      // 日期格式转换
      dateFormat (date) {
        return date ? dataFormatFnList.formatDate(new Date(date), 'yyyy-MM-dd') : '暂无';
      }
    }
  };
</script>

<style lang="stylus" src="./policies-regulations.styl" scoped>

</style>
