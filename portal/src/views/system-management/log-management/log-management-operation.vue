<!--
     /**
      * 日志管理
      * @desc 操作日志管理
      * @author 17219-zhuxy
      * @date 20180725
      */
       -->
<template>
  <div>
    <el-form :model="selForm">
      <el-row>
        <el-col :span="5">
          <el-form-item label="姓名：">
            <el-input class="el-input" clearable
                      v-model="selForm.userId"
                      @input="userNameInput"
                      style="width: 65%"
                      placeholder="请输入姓名"
                      size="small">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态：">
            <el-select v-model="selForm.status" clearable
                       placeholder="请选择类型" style="width: 65%;"
                       size="small" @change="operationLogDataQuery({page: 1})">
              <el-option label="正常" value="0"></el-option>
              <el-option label="异常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="selForm.dateSelect"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              size="small"
              @change="operationLogDataQuery({page: 1})"
              style="width: 80%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button opt-type="BATCH_DELETE" type="danger" plain size="small" :disabled="multipleSelection.length == 0"
                     @click="mulDelete">批量删除
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <div class="select-total" >已选择<span>{{multipleSelection.length}}</span>条数据</div>
      <el-table
        border
        ref="operationLogTable"
        :data="logData"
        :row-style="getRowStyle"
        :header-cell-style="getHeaderStyle"
        :default-sort="{prop: 'operateTime', order: 'descending'}"
        @sort-change="onSortChange"
        style="width: 100%"
        @row-click="rowClick"
        @selection-change="selectChange"
        :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" min-width="50">
          <template slot-scope="scope">
            {{scope.$index + (currentPage - 1) * pageSize + 1}}
          </template>
        </el-table-column>
        <!--<el-table-column type="selection" min-width="55"></el-table-column>-->
        <el-table-column show-overflow-tooltip prop="userName" label="用户名" min-width="100"></el-table-column>
        <el-table-column show-overflow-tooltip prop="operateIp" label="IP" min-width="100"></el-table-column>
        <el-table-column show-overflow-tooltip prop="action" label="操作名称" min-width="100"></el-table-column>
        <!--<el-table-column prop="operateUrl" :show-overflow-tooltip="true" label="URL" min-width="100"></el-table-column>-->
        <!--<el-table-column prop="method" label="" min-width="80"></el-table-column>-->
        <el-table-column show-overflow-tooltip prop="status" label="状态" min-width="50"></el-table-column>
        <el-table-column show-overflow-tooltip prop="operateTime" sortable label="时间" min-width="100"></el-table-column>
        <!--<el-table-column prop="method" :show-overflow-tooltip="true" label="调用接口" min-width="150"></el-table-column>-->
        <el-table-column show-overflow-tooltip prop="moduleName" label="模块名称" min-width="100"></el-table-column>
        <el-table-column min-width="50" label="操作">
          <template slot-scope="scope">
            <el-button opt-type="DELETE" type="danger" @click="deleteOne(scope.row)" plain
                       size="mini">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cf mt20">
      <el-pagination
        class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import API from '../../../rest-api/restApi';
  import dateFormat from '../../../util/dataFormat';
  import manaUtil from '../management-util';

  export default {
    name: 'log-management-operation',
    data () {
      return {
        isPage: true,
        deleteLogVisible: false,
        selForm: {
          userId: '',
          dateSelect: '',
          type: ''
        },
        logData: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();

            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();

            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();

            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        deleteDateSelect: '',
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        currentPages: [10],
        total: 0,
        tableParams: {
          'page': 1,
          'pageSize': 10,
          'dir': 'desc',
          'field': 'operateTime'
        }
      };
    },
    methods: {
      tableRowClassName (row, rowIndex) {
        return row.rowIndex % 2 === 0 ? 'warning-row' : '';
      },
      operationLogDataQuery (page) {
        var that = this;
        var param = Object.assign(this.tableParams, page);
        var param_ = Object.assign(this.selForm, {
          operateStartTime: !that.selForm.dateSelect ? undefined : that.selForm.dateSelect[0],
          operateEndTime: !that.selForm.dateSelect ? undefined : that.selForm.dateSelect[1]
        });

      that.$http({
          url: API.OPERATE_LOG_LIST + '?' + that.$qs.stringify(param),
          method: 'post',
          data: JSON.stringify(param_)
        }).then(res => {
          that.logData = res.data.data.data;
          that.total = res.data.data.total;
        });
      },
      operationLogDelete () {
      },
      handleSizeChange (val) {
        this.pageSize = val;
        this.tableParams.pageSize = val;
        this.currentPage = 1;
        this.operationLogDataQuery({
          page: this.currentPage,
          pageSize: this.pageSize
        });
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.tableParams.page = val;
        this.operationLogDataQuery({
          'page': val
        });
      },
      dateFormat: function (date) {
        return dateFormat.dateFormat(date);
      },
      selectChange: function (selete) {
        this.multipleSelection = selete;
      },
      deleteOne: function (row) {
        var _this = this;
        _this.$confirm('确定删除日志？').then(() => {
          _this.$http.get(API.OPERATE_LOG_DEL + '?' + _this.$qs.stringify({id: row.id})).then(res => {
            if (res.data.code === '1') {
              _this.$notify({
                message: res.data.message,
                type: 'success',
                offset: 120
              });
              _this.currentPage = 1;
              _this.operationLogDataQuery({page: 1});
            }
          });
        }).catch();
      },
      mulDelete: function () {
        var _this = this;
        _this.$confirm('确定删除日志？').then(() => {
          var ids = _this.multipleSelection.map(item => item.id);
          _this.$http({
            method: 'delete',
            url: API.OPERATE_LOG_DEL_MULTI,
            data: JSON.stringify(ids)
          }).then(res => {
            if (res.data.code === '1') {
              _this.$notify({
                message: res.data.message,
                type: 'success',
                offset: 120
              });
              _this.currentPage = 1;
              _this.operationLogDataQuery({page: 1});
            }
          });
        }).catch();
      },
      // deleteLogByIds: function (ids) {
      //   this.$http({
      //     method: 'delete',
      //     url: API.OPERATE_LOG_DEL,
      //     data: JSON.stringify(ids)
      //   }).then(res => {
      //     if (res.data.code == 1) {
      //       this.$notify({
      //         message: res.data.message,
      //         type: 'success',
      //         offset: 120
      //       });
      //       this.currentPage = 1;
      //       this.operationLogDataQuery({page: 1});
      //     }
      //   }).catch();
      // },
      rowClick: function (row, event, column) {
        if (!manaUtil.isClickButton(event))
          {this.$refs['operationLogTable'].toggleRowSelection(row);}
      },
      onSortChange: function (sort) {
        if (!sort.prop) {
          return;
        }
        var _that = this;
        var order = sort.order;
        var dir = 'desc';

      switch (order) {
          case 'descending':
            dir = 'desc';
            break;
          case 'ascending':
            dir = 'asc';
            break;
        }
        _that.tableParams.dir = dir;
        _that.operationLogDataQuery();
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5'
        };
      },
      getRowStyle: function ({row, rowIndex}) {
        return (rowIndex % 2 == 1 ? {
          background: '#F0F2F5'
        } : {});
      },
      userNameInput: function () {
        var _that = this;

      manaUtil.debounce(function () {
          _that.operationLogDataQuery({page: 1});
        }, 500);
      }
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      // }
    },
    mounted () {
      this.operationLogDataQuery();
    }
  };
</script>

<style scoped lang="stylus" src="./log-management.styl">
</style>
