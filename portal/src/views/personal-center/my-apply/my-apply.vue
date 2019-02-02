<template>
  <el-container class="home-wrapper">
    <div class="content-all">
      <div class="content-tab">
        <el-row>
          <el-col :span="24">
            <el-form :model="selForm" label-width="90px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="申请类型：" class="form-item" style="float: left;" >
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
                      <!-- <el-option label="订阅中" value="3"></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  &nbsp
                </el-col>
                <el-col :span="11">
                  <el-form-item label="申请日期：" class="form-item">
                    <el-date-picker
                      v-model="selForm.dateSelect"
                      type="daterange"
                      align="left"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="dataQuery({page: 1})"
                      size="small"
                      style="width: 100%;"
                      clearable>
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <div class="content-detail">
          <el-table
            border :data="logData" style="width: 100%" :row-class-name="tableRowClassName"
            :header-row-class-name="'tab-head'" @sort-change="timeSort">
            <el-table-column prop="applyTypeValue" label="申请类型" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="申请内容" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <a @click="openApproveContentDialog(scope.row)">{{scope.row.applyName }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="applyUser" label="申请人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="applyDepart" label="申请组织" show-overflow-tooltip></el-table-column>
            <el-table-column prop="statusValue" label="审批状态" min-width="80" show-overflow-tooltip></el-table-column>
             <el-table-column prop="subsStatus" label="订阅状态" min-width="80" show-overflow-tooltip></el-table-column> 
            <el-table-column prop="applyTime" label="申请时间" sortable="'custom'" min-width="110" show-overflow-tooltip></el-table-column>
            <el-table-column min-width="220" label="审批流程 ">
              <template slot-scope="scope">
                <el-button type="primary" plain size="mini" @click="openProcess(scope.row)" opt-type="LFOW">查看
                </el-button>
                <el-button type="success" plain size="mini" @click="promptApprove(scope.row)"
                           :disabled="scope.row.status !== '2'" opt-type="URGE">催办
                </el-button>
                <el-button type="danger" plain size="mini" @click="deleteApproveRecord(scope.row)"
                           :disabled="scope.row.status === '2'" opt-type="DELETE">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination cf paging">
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
    </div>
    <el-dialog title="审批流程" width="60%" height="50%" style="padding: 20px;" :visible.sync="processStepsDialog">
      <steps style="padding:40px 0;" :child-steps="stepsData"></steps>
    </el-dialog>
    <el-dialog title="申请详情" width="60%" height="50%" style="padding: 20px;" :visible.sync="applyContentDialog">
      <apply-details-content :apply-detail="parentApply"></apply-details-content>
    </el-dialog>
  </el-container>
</template>

<script>
  import steps from './process-steps';
  import applyDetailsContent from './apply-details-content';
  import {formatDate} from 'src/common/js/date';

  export default {
    name: 'my-apply',
    data () {
      return {
        isPage: true,
        applyContentDialog: false,
        processStepsDialog: false,
        selForm: {
          dateSelect: '',
          applyType: '',
          status: '',
          statusValue: '',
          applyStartTime: '',
          applyEndTime: ''
        },
        logData: [],
        messageDetailDialog: false,
        stepsData: {},
        parentApply: {
          applyType: '',
          applyContent: {},
          applyApiId: '',
          applyApiName: ''
        },

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
          params = Object.assign({}, that.tableParams, param);

        that.selForm.applyStartTime = that.selForm.dateSelect && that.selForm.dateSelect.length > 0 ? that.selForm.dateSelect[0] : '';
        that.selForm.applyEndTime = that.selForm.dateSelect && that.selForm.dateSelect.length > 0 ? that.selForm.dateSelect[1] : '';
        that.$http({
          url: globals.serverUrl + '/system/applyInfo/list?' + that.$qs.stringify(params),
          method: 'post',
          data: JSON.stringify(that.selForm)
        }).then(res => {
          that.logData = res.data.data.data;
          that.logData.forEach(item => {
            item.applyTypeValue = that._applyTypeSwitch(item.applyType);
            item.statusValue = that._statusSwitch(item.status);
            item.subsStatus = that._subStatusSwitch(item.subsStatus);
            item.applyTime = formatDate(new Date(item.applyTime), 'yyyy-MM-dd hh:mm:ss');
          });
          that.total = res.data.data.total;
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
      openProcess (row) {
        this.processStepsDialog = true;
        var that = this;

        that.$http({
          url: globals.serverUrl + '/system/approveInfo/history',
          method: 'post',
          data: JSON.stringify({applyId: row.id})
        }).then(res => {
          that.stepsData = res.data.data;
          that.stepsData.forEach(item => {
            item.approveOption = item.approveOption ? item.approveOption : '暂无';
            item.approveNodeName = item.approveNodeName ? item.approveNodeName : '暂无';
          });
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
          let applyContent = res.data.data;

          // todo applyType=1目录订阅 applyType=2 接口订阅
          that.$store.commit({
            type: 'personalCenter/SET_APPLY_CONTENT',
            applyType: row.applyType,
            applyContent: applyContent
          });
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
      _switchDataApply (row) {
        let router = {name: '', params: {}};

        switch (row.applyType) {
          case '0' || '1' :
            router = {
              name: 'dataCatalogAdd',
              params: {
                dataObj: row.resourceId,
                navLabel: '修改',
                parentNavItems: this.navItems,
                directoryApplyType: row.applyType
              }
            };
            break;
          case '2' :
            router = {name: 'resDetail', params: {dataCatalogId: row.resourceId}};
            break;
          case '3' :
            router = {name: 'dataApply', params: {id: row.resourceId, dataApplyType: '1'}};
            break;
          case '4' :
            router = {
              name: 'interfaceDetail',
              params: {id: row.resourceId, navLabel: '接口详情', parentNavItems: this.navItems}
            };
            break;
          default:
        }
        return router;
      },
      deleteApproveRecord (row) {
        this.$confirm('确认删除此次申请吗?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this._deleteApplyRecord(row);
        });
      },
      _deleteApplyRecord (row) {
        this.$http({
          method: 'delete',
          url: '/system/applyInfo/delete',
          data: JSON.stringify([row.id])
        }).then(res => {
          this.dataQuery({'page': 1});
          this.$notify({
            type: 'success',
            message: res.data.message,
            offset: 120
          });
        });
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
            value = ' 无 ';
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
      _subStatusSwitch (type) {
        var value = '';

        switch (type) {
          case '0' :
            value = '订阅失败';
            break;
          case '1' :
            value = '订阅成功';
            break;
          case '2' :
            value = '订阅中';
            break;
        }
        return value;
      },
      promptApprove (row) {
        this.$http({
          method: 'post',
          url: '/system/applyInfo/warn',
          data: JSON.stringify({id: row.id})
        }).then(res => {
          this.$notify({
            type: 'success',
            message: res.data.message,
            offset: 120
          });
        });
      },
      timeSort (column) {
        let _order = column.order === 'ascending' ? 'asc' : 'desc';

        this.dataQuery({dir: _order});
      }
    },
    computed: {},
    components: {
      steps: steps,
      applyDetailsContent: applyDetailsContent
    },
    mounted () {
      this.dataQuery(this.tableParams);
    }
  };
</script>

<style lang="stylus">
  .content-detail .el-table tr.tab-head th {
    background: #EAEDF2;
  }

  .content-all {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .el-table tr.row-double-grey {
    background #F0F2F5;
  }
</style>
