<!--
 /**
  * 个人中心-我的消息
  */
-->
<template>
  <div>
    <div class="content-all">
      <el-row class="mb5">
        <el-form :model="selForm">
          <el-col :span="6">
            <el-form-item label="消息类型:" style="min-width: 200px;">
              <el-select v-model="selForm.messageType" placeholder="请选择" size="small" style="width: 60%;"
                         @change="dataQuery({page: 1})" clearable>
                <el-option label="告警消息" value="0"></el-option>
                <el-option label="通知消息" value="1"></el-option>
                <el-option label="催办消息" value="2"></el-option>
                <el-option label="审批消息" value="3"></el-option>
                <el-option label="订阅消息" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="消息状态:" style="min-width: 200px;">
              <el-select v-model="selForm.messageStatus" placeholder="请选择" size="small" style="width: 60%;"
                         @change="dataQuery({page: 1})" clearable>
                <el-option label="已读" value="1"></el-option>
                <el-option label="未读" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="min-width: 150px;">
            <el-form-item label="日期:" class="" :style="{'margin': '0'}">
              <el-date-picker
                v-model="selForm.dateSelect"
                type="daterange"
                align="left"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dataQuery({page: 1})"
                size="small"
                :style="{'width': '80%'}"
                clearable>
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="line-height: 40px;">
            <el-button type="danger" size="small" plain opt-type="DELETE" :disabled="dmDisable"
                       @click="deleteMore">批量删除
            </el-button>
          </el-col>
        </el-form>
      </el-row>
      <div class="content-detail">
        <div class="select-total">已选择<span>{{multipleSelection.length}}</span>条数据</div>
        <el-table @selection-change="handleSelectionChange"
                  border :data="messageList" style="width: 100%" :row-class-name="tableRowClassName"
                  :header-row-class-name="'tab-head'" @sort-change="timeSort">
          <!--<el-table-column type="index" label="序号"   min-width="80"></el-table-column>-->
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column label="消息状态" min-width="80">
            <template slot-scope="scope">
              <i class="iconfont icons-weidu-copy" style="color: #f75353;"
                 v-if="scope.row.messageStatusCode==='未读'"></i>
              <span style="margin-left: 10px;  font-size: 1px;">{{ scope.row.messageStatusCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="messageTypeCode" label="消息类型" min-width="80">
          </el-table-column>
          <el-table-column prop="createUser" label="发送人" min-width="80" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" sortable="custom" label="发送时间" min-width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="消息" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <a @click="openMessage(scope.row)" class="msg-con"><span v-html="scope.row.messageDetail"></span></a>
            </template>
          </el-table-column>
          <el-table-column min-width="80" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="small" plain @click="deleteMessage(scope.row)" opt-type="DELETE">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination cf">
        <el-pagination
          class="fr"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="消息详情" width="50%" :visible.sync="messageDetailDialog">
      <el-row>
        <el-col :span="5">
          <div class="dialog-content "><span class="dialog-content fr pr15">发送人：</span></div>
        </el-col>
        <el-col :span="10">
          <div class="dialog-content">{{selectMessage.createUser}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="dialog-content"><span class="date-sel  fr pr15">发送时间：</span></el-col>
        <el-col :span="10" class="dialog-content">{{selectMessage.createTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="dialog-content"><span class="date-sel fr pr15">类型：</span></el-col>
        <el-col :span="10" class="dialog-content">{{selectMessage.messageTypeCode}}</el-col>
      </el-row>
      <!--<el-row>-->
      <!--<el-col :span="5" class="dialog-content"><span class="date-sel">标题：</span></el-col>-->
      <!--<el-col :span="10" class="dialog-content">{{}}</el-col>-->
      <!--</el-row>-->
      <el-row>
        <el-col :span="5" class="dialog-content"><span class="date-sel fr pr15">详情：</span></el-col>
        <el-col :span="19" class="dialog-content">
          <div v-if="selectMessage.messageType === 0 ||selectMessage.messageType === 1"
               v-html="selectMessage.messageDetail"
               style="line-height: 18px"></div>
          <a v-else style="line-height: 18px"
             @click="jump(selectMessage.messageType)">{{selectMessage.messageDetail}}</a>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>


<script>
  import axios from 'axios';
  import Auth from 'src/util/auth';
  import RESTAPI from 'src/rest-api/restApi.js';
  import breadNavs from 'src/mixins/bread-nav';

  export default {
    name: 'my-message',
    mixins: [breadNavs],
    data() {
      return {
        isPage: true,
        deleteLogVisible: false,
        selForm: {
          dateSelect: '',
          messageType: '',
          messageStatus: '',
          createStartTime: '',
          createEndTime: ''
        },
        messageList: [],
        messageDetailDialog: false,
        selectMessage: {
          messageType: '',
          messageTypeCode: '',
          messageStatusCode: '',
          messageStatus: '',
          createUser: '',
          createTime: '',
          readTime: '',
          title: '',
          messageDetail: '',
          isDataInterface: '',
          serviceName: ''
        },
        currentPage: 1,
        pageSize: 10,
        currentPages: [10],
        total: 0,
        tableParams: {
          'page': 1,
          'pageSize': 10,
          'dir': 'desc',
          'field': 'createTime'
        },
        multipleSelection: [],
        dmDisable: true
      };
    },
    methods: {
      tableRowClassName(row, rowIndex) {
        if (row.row.messageStatusCode === '未读') {
          return 'warning-row';
        }
      },
      dataQuery(param) {
        if (param.page === 1) {
          this.currentPage = 1;
        }
        var that = this,
          params = Object.assign({}, this.tableParams, param);

        this.selForm.createStartTime = this.selForm.dateSelect && this.selForm.dateSelect.length > 0 ? this.selForm.dateSelect[0] : '';
        this.selForm.createEndTime = this.selForm.dateSelect && this.selForm.dateSelect.length > 0 ? this.selForm.dateSelect[1] : '';
        that.$http({
          url: globals.serverUrl + '/system/messageInfo/list?' + this.$qs.stringify(params),
          method: 'post',
          data: JSON.stringify(this.selForm)
        }).then(res => {
          that.messageList = res.data.data.data;
          that.total = res.data.data.total;
        }).catch(res => {
          console.log('error');
        });
      },
      loginLogDelete() {
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableParams.pageSize = val;
        this.currentPage = 1;
        this.dataQuery({
          page: this.currentPage,
          pageSize: this.pageSize
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableParams.page = val;
        this.dataQuery({
          'page': val
        });
      },
      openMessage(row) {
        this.messageDetailDialog = true;
        this.selectMessage = row;
        row.messageStatusCode = '已读';
        this.$nextTick((res) => {
          this._bindInterfaceClick();
        });
        this._updataMessageState(row);
      },
      _updataMessageState(row) {
        if (row.messageStatus === '0') {
          this.$http({
            method: 'patch',
            url: globals.serverUrl + '/system/messageInfo/update',
            data: JSON.stringify({id: row.id, messageStatus: '1'})
          }).then(res => {
            this._getMsgCount();
          });
        }
      },
      deleteMessage(row) {
        this.$confirm('确定要删除该消息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: globals.serverUrl + '/system/messageInfo/delete',
            data: JSON.stringify([row.id])
          }).then(res => {
            this.currentPage = 1;
            this.dataQuery({
              page: this.currentPage
            });
            this.$notify({
              type: 'success',
              message: res.data.message,
              offset: 120
            });
          }).catch(res => {
            console.log('error');
          });
        }).catch(() => {
        });
      },
      _downInterfaceDoc(item) {
        this._downloadFileForm();
      },
      _downloadFileForm(item) {
        let aRequest = axios.create({
          baseURL: globals.serverUrl,
          timeout: 20000, // request timeout
          // responseType: 'json',
          withCredentials: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + Auth.hasToken()
          },
          responseType: 'arraybuffer', // responseType 范围较contentType上层 contentType仅指content mine-type
          transformResponse: [function (data) {
            return data;
          }]
        });

        aRequest({
          method: 'get',
          url: globals.serverUrl + '/system/download/downloadFile?' + this.$qs.stringify({fileName: '1'}),
          data: this.$qs.stringify({})
        }).then(res => {
          let blob = new Blob([res.data], {type: 'application/pdf'});
          let fileName = '接口调用手册.pdf';

          if ('download' in document.createElement('a')) {
            // h5 支持格式 URL.createObjectURL
            const elink = document.createElement('a');

            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
          } else {
            // navigator.msSaveBlob(blob, fileName);
          }
        });
      },
      _bindInterfaceClick() {
        let tags_a = document.getElementsByClassName('userInterfaceDoc');

        if (tags_a.length > 0) {
          Array.from(tags_a).forEach(item => {
            item.onclick = this._downInterfaceDoc;
          });
        }
      },
      timeSort(column) {
        let _order = column.order === 'ascending' ? 'asc' : 'desc';

        this.currentPage = 1;
        this.dataQuery({
          page: this.currentPage,
          dir: _order
        });
      },
      _getMsgCount() {
        this.$http.post(globals.serverUrl + RESTAPI.MESSAGE_LIST, {messageStatus: '0'}).then(res => {
          this.$store.commit('message/SET_NO_READ_MESSAGE', res.data.data.total);
        }).catch(res => {
          this.$notify.error({
            title: '错误',
            message: res.data,
            offset: 120
          });
        });
      },

      // 消息详情跳转
      jump(type) {
        if (type === '2') {
          this.$router.push({
            name: 'myHandle'
          });
        }
        if (type === '3' || type === '4') {
          this.$router.push({
            name: 'myApply'
          });
        }
      },
      // 批量删除
      handleSelectionChange(val) {
        if (val.length === 0) {
          this.dmDisable = true;
        } else {
          this.dmDisable = false;
        }
        this.multipleSelection = val;
      },
      deleteMore() {
        let that = this;
        let params = [];

        that.multipleSelection.forEach(data => {
          params.push(data.id);
        });
        that.$confirm('确定要删除被选中的消息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http({
            url: globals.serverUrl + '/system/messageInfo/delete',
            method: 'DELETE',
            data: params
          }).then(res => {
            this.$notify({
              type: 'success',
              message: '删除成功！'
            });
            that.dataQuery({});
          }).catch(res => {
            console.log('error');
          });
        }).catch(() => {
        });
      }

    },
    computed: {},
    mounted() {
      // this.dataQuery(this.tableParams);
      this._getMsgCount();
      this.dataQuery({});
      this.$messageBoxCustomer({
        title: '通知',
        message: '你有一条新消息',
        onClose: function () {
          console.log('message is closed');
        }
      })
    }
  };
</script>

<style scoped lang="stylus">
  .msg-con {
    display block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-dialog .dialog-content {
    margin 1% 0;
  }

  .msg-radio {
    padding 10px;
    min-width 150px;
    width 60%;
    height 16px;
    background-color #f0f2f5;
    border-radius: 5px;
  }


</style>
<style lang="stylus">
  .content-detail .el-table tr.tab-head th {
    background: #EAEDF2;
  }

  .el-table tr.row-double-grey {
    background #F0F2F5;
  }

  .el-table .warning-row {
    background: oldlace;
  }
</style>
