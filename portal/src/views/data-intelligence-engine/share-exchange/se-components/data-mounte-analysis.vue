<template>
    <div class="container mountAnalysis">
        <img src="/static/image/share-index2/data-mounte-title.png" class="share-title fl" />
      <div class="content">
        <div class="bar">
          <div id="mountedBar">
            <el-row>
              <el-col :span="20">
                <div class="mainTarget">
                  <img src="/static/image/share-index2/mount-bg.png" class="bg-count"/>
                  <div class="active-circle out-circle-one">
                    <img src="/static/image/share-index2/mount-bg-circle.png" class="inner-circle"/>
                  </div>
                  <p class="count">{{resData.allMountCount}}<span class="unit">个</span></p>
                  <label class="count-text">目录挂载总数</label>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="mainTarget">
                  <img src="/static/image/share-index2/mount-bg.png" class="bg-count"/>
                  <div class="active-circle out-circle-one">
                    <img src="/static/image/share-index2/mount-bg-circle.png" class="inner-circle"/>
                  </div>
                  <p class="count">{{resData.allReleaseCount}}<span class="unit">个</span></p>
                  <label class="count-text">部门发布目录总数</label>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="mainTarget">
                  <img src="/static/image/share-index2/mount-bg.png" class="bg-count"/>
                  <div class="active-circle out-circle-one">
                    <img src="/static/image/share-index2/mount-bg-circle.png" class="inner-circle"/>
                  </div>
                </div>
                <p class="count count-rate">{{resData.allMountRate}}</p>
                <label class="count-text">目录总挂载率</label>
              </el-col>
            </el-row>
            
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" :row-class-name="rowClass" >
            <el-table-column prop="deptNum" label="部门编码" align="center"></el-table-column>
            <el-table-column prop="deptName" label="部门名称" align="center"></el-table-column>
            <el-table-column prop="mountCount" label="挂载数量" align="center"></el-table-column>
            <el-table-column prop="releaseCount" label="发布目录数" align="center"></el-table-column>
            <el-table-column prop="mountRate" label="部门挂载率" align="center">
              <template slot-scope="scope">
                {{scope.row.mountRate}}
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination tr pt10">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="pagging.currentPage"
              :page-size="pagging.pageSize"
              layout="total, prev, pager, next"
              :total="pagging.total">
            </el-pagination>
          </div>
        </div>
      </div>
     
    </div>
</template>

<script>
    export default {
      name: "data-mounte-analysis",
      // mixin: [resize],
      data () {
        return {
          tableData: [],
          resData: {
            allReleaseCount: 0,
            allMountCount: 0,
            allMountRate: 0
          },
          pagging: {
            total: 0,
            currentPage: 1,
            pageSize: 8
          },
          tableParams: {
            'page': 1,
            'pageSize': 8
            // 'dir': 'desc',
            // 'field': 'id'
          },
        }
      },
      methods: {
        getData (param) {
          var _this = this;
          var params = Object.assign({}, _this.tableParams, param);
          _this.$http.get('/rpc/mount/rate' + '?' + _this.$qs.stringify(params)).then(res => {
            _this.resData = res.data.data;
            _this.tableData = res.data.data.countList;
            _this.pagging.total = res.data.data.deptCount;
          });
        },
        triggerTableData () {
          var _this = this;
          var point = 7;
          if(inter) clearInterval(inter);
          var inter = setInterval(function () {
            var  tableData =  _this.tableData;
            tableData.shift();
            tableData.push(_this.tableDataCopy[point]);
            point ++;
            if (point >= 10) point = 0;
          }, 1000);
        },
        rowClass ({row, rowIndex}) {
          return rowIndex % 2 === 0 ? 'double-row' : 'single-row';
        },
        // getSummary ({columns, data}) {
        //   var summary = ['合计', '--', 0, 0, 0];
        //   columns.forEach((column, index) => {
        //     if (index === 2 || index === 3 || index === 4) {
        //       data.map(item => {
        //         summary[index] += Number(item[column.property])
        //       });
        //       if (index === 4) {
        //         summary[index] = Number(summary[index]).toFixed(2).toString().concat('%');
        //       }
        //       return;
        //     }
        //   });
        //   return summary;
        // },
        handleCurrentChange (val) {
          this.pagging.currentPage = val;
          this.tableParams.page = val;
          this.getData({
            'page': val
          });
        },
      },
      filters: {
        // filteRate (value) {
        //   return value.toString().concat('%');
        // }
      },
      mounted () {
        this.getData();
      }
    }
</script>

<style scoped>
  .mountAnalysis {
    position: relative;
    height: 100%;
  }
  .content {
    padding: 20px;
    clear: both;
  }
  .content .bar {
    width: 42%;
    height: 80%;
    float: left;
  }
  #mountedBar {
    width: 100%;
    height: 100%;
  }
  .table {
    width: 53%;
    float: left;
    height: 80%;
    min-height: 450px;
    padding: 30px 10px;
    background-color: rgba(128, 128, 128, 0.1);
  }
  .mainTarget {
    margin: 5%;
  }
  .bg-count {
    transform: scale(1.1);
    /*width: 300px;*/
    /*height: 150px;*/
    margin-left: 33%;
    position: relative;
  }
  .active-circle {
    z-index: 10;
    width: 120px;
    height: 120px;
    background: url("/static/image/share-index2/mount-active-circle.png");
    background-size: contain;
    background-repeat: no-repeat;
    animation: circleOne 10s linear infinite normal;
  }
  .out-circle-one {
    left: 29%;
    top: 17%;
    z-index: 11;
    position: absolute;
   }
  .count {
    left: 35%;
    top: 43%;
    z-index: 12;
    color: #f3c76c;
    font-size: 25px;
    position: absolute;
  }
  .count-rate {
    left: 34%;
  }
  .unit {
    margin-left: 5px;
    color: rgb(170,242,254);
    font-size: 20px;
  }
  .count-text {
    color: #f3c76c;
    left: 51%;
    top: 45%;
    z-index: 12;
    font-size: 20px;
    position: absolute;
  }
  .inner-circle {
    margin: 14%;
  }

  @keyframes circleOne {
    0% {
      -webkit-transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(180deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
<style>
  .mountAnalysis .el-table__footer-wrapper tbody td,
  .mountAnalysis .el-table__header-wrapper tbody td,
  .mountAnalysis .el-table tr td,
  .mountAnalysis .el-table__header-wrapper table.el-table__header > thead th.is-leaf,
  .mountAnalysis .el-table__empty-block{
    background-color: rgba(0,26, 63, 0.83);
    color: rgb(170,242,254);
  }
  .mountAnalysis .content {
    clear: both;
  }
  .mountAnalysis .table .single-row {
    /*background-color: #b3ffde;*/
    color: rgb(170,242,254);
  }
  .mountAnalysis .table .double-row {
    /*background-color: #4498dd;*/
    color: rgb(170,242,254);
  }
  .mountAnalysis .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(0, 227, 252, 0.6);
    color: #001a3f;
  }
  .mountAnalysis .el-table td, .el-table th {
    padding: 11px 0;
  }
  .mountAnalysis .el-pagination__total {
    color: rgb(170,242,254);
  }
  .mountAnalysis .el-pagination.is-background .btn-next,
  .mountAnalysis .el-pagination.is-background .btn-prev,
  .mountAnalysis .el-pagination.is-background .el-pager li {
    background-color: rgb(170,242,254);
    color: grey;
  }
  .mountAnalysis .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #00e5ff;
  }
</style>
