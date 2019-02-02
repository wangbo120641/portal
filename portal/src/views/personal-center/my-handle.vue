<!--
 /**
  * 个人中心-我的审批
  */
-->
<template>
  <div class="pd20">
    <!--搜索选项-->
    <el-row>
      <el-col :span="24">
        <el-form :model="selForm" label-width="90px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="申请类型：" class="form-item">
                <el-select v-model="selForm.applyType" placeholder="请选择" style="width: 100%;" size="small"
                           @change="dataQuery({page: 1})" clearable>
                  <el-option label="数据目录订阅" value="1"></el-option>
                  <el-option label="API 接口订阅" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审批状态：" class="form-item">
                <el-select v-model="selForm.status" placeholder="请选择" style="width: 100%;" size="small"
                           @change="dataQuery({page: 1})" clearable>
                  <el-option label="审批驳回" value="0"></el-option>
                  <el-option label="审批中" value="2"></el-option>
                  <el-option label="审批通过" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="申请日期：" class="form-item">
                <el-date-picker
                  v-model="selForm.dateSelect"
                  type="daterange"
                  align="left"
                  style="width:100%;"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="dataQuery({page: 1})"
                  size="small"
                  @sort-change="timeSort"
                  clearable>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <!--表格-->
    <el-row>
      <el-col :span="24" class="content-detail">
        <el-table
          border :data="logData" style="width: 100%" :row-class-name="tableRowClassName" class="nowrap-table"
          :header-row-class-name="'tab-head'" @sort-change="timeSort">
          <el-table-column prop="applyTypeValue" label="申请类型" show-overflow-tooltip min-width="100"></el-table-column>          
          <el-table-column label="申请内容" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <a @click="openApproveContentDialog(scope.row)">{{scope.row.applyName }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="statusValue" label="审批状态" show-overflow-tooltip min-width="90"></el-table-column>
          <!-- <el-table-column prop="applyUser" label="申请人" show-overflow-tooltip min-width="80"></el-table-column> -->
          <el-table-column prop="applyTime" sortable="custom" label="申请时间" min-width="160"></el-table-column>
          <el-table-column min-width="150" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="approve(scope.row, '1')"
                         :disabled="!(scope.row.status === '2')" opt-type="AGREE">同意
              </el-button>
              <el-button type="danger" size="small" plain @click="approve(scope.row, '0')"
                         :disabled="!(scope.row.status === '2')" opt-type="DISAGREE">驳回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="content-detail">
        <el-pagination
          class="fr mt20 pagination"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="申请详情" width="50%" :visible.sync="applyContentDialog">
      <apply-details-content :apply-detail="parentApply"></apply-details-content>
    </el-dialog>
    <el-dialog title="审批意见" width="50%" :visible.sync="approveCommentDialog" @close="onClose">
      <el-form :model="approveComment" ref="approveComment" label-width="20%" :rules="rules">
        <el-row v-if="approveComment.isLastApprove === '1' && approveComment.approveType === '3'">
          <el-col :span="24">
            <el-form-item prop="createUser" label="指定创建人:">
              <el-select v-model="approveComment.createUser" placeholder="请选择" style="width: 80%">
                <el-option
                  v-for="item in createUsers"
                  :label="item.userName + '  ' + item.userId"
                  :value="item.userId"
                  :key="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="approveOption" label="审批意见:">
              <el-input type="textarea" placeholder="请输入审批意见" v-model="approveComment.approveOption"
                        style="width: 80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain size="medium" @click="approveSubmit">确 定</el-button>
        <el-button type="danger" plain @click="approveReset" size="medium">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import applyDetailsContent from './my-apply/apply-details-content';
  import {formatDate} from 'src/common/js/date';
  import API from '../../rest-api/restApi';

  export default {
    name: 'my-handle',
    data () {
      return {
        isPage: true,
        applyContentDialog: false,
        approveCommentDialog: false,
        selForm: {
          dateSelect: '',
          applyType: '',
          status: '',
          applyStartTime: '',
          applyEndTime: ''
        },
        logData: [],
        messageDetailDialog: false,
        stepsData: {},
        approveComment: {
          createUser: '',
          applyId: '',
          approveOption: '',
          approveType: '',
          isLastApprove: ''
        },
        parentApply: {
          applyType: '',
          applyContent: {},
          applyApiId: '',
          applyApiName: ''
        },
        rules: {
          createUser: [
            {required: true, message: '请选择创建人', trigger: 'blur'}
          ],
          approveOption: [
            {required: true, message: '请输入审批意见', trigger: 'blur'}
          ]
        },
        createUsers: [],
        currentPage: 1,
        pageSize: 10,
        currentPages: [10],
        total: 0,
        tableParams: {
          'page': 1,
          'pageSize': 10,
          'dir': 'desc',
          'field': 'applyTime'
        }
      };
    },
    methods: {
      tableRowClassName (row, rowIndex) {
        return row.rowIndex % 2 === 0 ? '' : 'row-double-grey';
      },
      dataQuery (param) {
        var that = this,
          params = Object.assign({}, this.tableParams, param);

        that.selForm.applyStartTime = that.selForm.dateSelect && that.selForm.dateSelect.length > 0 ? that.selForm.dateSelect[0] : '';
        that.selForm.applyEndTime = that.selForm.dateSelect && that.selForm.dateSelect.length > 0 ? that.selForm.dateSelect[1] : '';
        that.$http({
          url: API.APPROVE_INFO + '?' + that.$qs.stringify(params),
          method: 'post',
          data: JSON.stringify(that.selForm)
        }).then(res => {
          that.logData = res.data.data.data;
          that.logData.forEach(item => {
            item.applyTypeValue = that._applyTypeSwitch(item.applyType);
            item.statusValue = that._statusSwitch(item.status);
          });
          that.total = res.data.data.total;
        });
      },
      openApproveContentDialog (row) {
        this._applyContentDetailsQuery(row);
      },
      _applyContentDetailsQuery (row) {
        var params = {applyType: row.applyType, id: row.id, resourceId: row.resourceId};
        var that = this;

        this.$http({
          method: 'post',
          url: globals.serverUrl + '/system/applyInfo/detail',
          data: JSON.stringify(params)
        }).then(res => {
          that.$store.commit({
            type: 'personalCenter/SET_APPLY_CONTENT',
            applyType: row.applyType,
            applyContent: res.data
          });
          let applyContent = res.data.data;

          Object.keys(applyContent).forEach(key => {
            if (key.lastIndexOf('Time') > 0) {
              applyContent[key] = formatDate(new Date(applyContent[key]), 'yyyy-MM-dd hh:mm:ss');
            }
          });
          that.$nextTick(function () {
            that.parentApply.applyContent = applyContent;
            that.parentApply.applyType = row.applyType;
            that.parentApply.applyApiId = row.apiId;
            that.parentApply.applyApiName = row.apiName;
          });
          that.applyContentDialog = true;
        });
      },
      handleSizeChange (val) {
        this.pageSize = val;
        this.tableParams.pageSize = val;
        this.currentPage = 1;
        this.dataQuery({
          page: this.currentPage,
          pageSize: this.pageSize
        });
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.tableParams.page = val;
        this.dataQuery({
          'page': val
        });
      },
      approve (row, type) {
        this.approveCommentDialog = true;
        // this.approveComment.isLastApprove = row.isLastApprove;
        this.approveComment.applyId = row.id;
        this.approveComment.approveType = type;
        this.approveComment.approveOption = '';
        // if (type === '0' && row.isLastApprove === '1') { // 查找指定审批人 无效
        //   this.queryCreateUser();
        // }
      },
      _applyTypeSwitch (type) {
        var value = '';

        switch (type) {
          case '1' :
            value = '数据目录订阅';
            break;
          case '2' :
            value = 'API 接口订阅';
            break;
          default:
            value = '暂无数据';
            break;
        }
        return value;
      },
      _statusSwitch (type) {
        var value = '';

        switch (type) {
          case '0' :
            value = '审批驳回';
            break;
          case '1' :
            value = '审批通过';
            break;
          case '2' :
            value = '审批中';
            break;
        }
        return value;
      },
      approveSubmit () {
        this.$refs['approveComment'].validate(validate => {
          if (validate) {
            let url = this.approveComment.approveType === '1' ? '/system/approveInfo/approve' : '/system/approveInfo/reject';

            this.$http({
              method: 'post',
              url: globals.serverUrl + url,
              data: JSON.stringify(this.approveComment)
            }).then(res => {
              this.$notify({
                type: 'success',
                message: res.data.message,
                offset: 120
              });
              this.approveCommentDialog = false;
              this.dataQuery(this.tableParams);
            });
          }
        });
      },
      approveReset () {
        this.$refs['approveComment'].resetFields();
      },
      queryCreateUser () {
        this.$http({
          method: 'post',
          url: globals.serverUrl + '/auth/userInfo_query?' + this.$qs.stringify({
            'page': 1,
            'pageSize': 10,
            'dir': 'asc',
            'field': 'id'
          }),
          data: JSON.stringify({})
        }).then(res => {
          this.createUsers = res.data.data.data;
        });
      },
      timeSort (column) {
        let _order = column.order === 'ascending' ? 'asc' : 'desc';

        this.dataQuery({dir: _order});
      },
      onClose () {
        this.approveCommentDialog = false;
        this.$refs.approveComment.resetFields();
      }
    },
    components: {
      applyDetailsContent: applyDetailsContent
    },
    mounted () {
      this.dataQuery(this.tableParams);
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

  .el-dialog .dialog-content {
    margin 1% 0;
  }
</style>
<style lang="stylus">
  .content-detail .el-table tr.tab-head th {
    background: #EAEDF2;
  }

  .el-table tr.row-double-grey {
    background #F0F2F5;
  }
</style>
