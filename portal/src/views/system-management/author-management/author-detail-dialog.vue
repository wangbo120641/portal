<template>
  <el-dialog :close-on-click-modal="false" title="菜单详情" width="600px" :visible.sync="dialogFormVisible" >
    <el-form class="pd20 pro-info" :model="tableData" label-width="135px">
      <el-row>
        <el-col>
          <el-form-item label="菜单名称 :">
            {{tableData.menuName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="菜单ID :">
            {{tableData.id}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="父级菜单 :">
            {{tableData.parentMenuName}}
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>
        <el-col>
          <el-form-item label="权限值 :">
            {{tableData.value}}
          </el-form-item>
        </el-col>
      </el-row>-->
      <!--<el-row>
        <el-col>
          <el-form-item label="权限类型 :">
            {{tableData.menuType == 1 ? '菜单' : '按钮'}}
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col>
          <el-form-item label="菜单状态 :">
            {{tableData.status == 0 ? '启用' : '停用'}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="菜单描述 :">
            <p class="text-show" v-bind:title="tableData.remark">
            {{tableData.remark}}
            </p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="菜单操作：">
              <span
                v-for="(item, index) in tableData.menuOperations"
              >
                {{getFunctionTypes(item) + (index == tableData.menuOperations.length-1 ? '':',')}}
              </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      operatingAuthorizations: ''
    },
    data() {
      return {
        checkList: ['add'],
        dialogFormVisible:false,
        tableData: {
          name: '',
          id: '',
          parentName: '',
          type: '',
          value: '',
          remark: '',
          status: ''
        }
      };
    },
    methods: {
      getFunctionTypes: function (type) {
        var functionType = '';
        for (var index in this.operatingAuthorizations){
          var type_ = this.operatingAuthorizations[index];
          if (type == type_.dictValue){
            functionType = type_.dictLabel;
            break;
          }
        }
        return functionType;
      },
      showProjectDetail(row){
        //显示弹窗
        this.getProjectDetailById(row);
        this.dialogFormVisible = true;
      },
      // 获取数据-项目详情
      getProjectDetailById (row) {
        this.tableData = row;
        console.log(this.tableData)
        // var _that = this;
        // let param = {
        //   'prjId': prjId
        // }
        // this.$http.get('/pms/project-query', {params: param}).then((res) => {
        //   _that.tableData = res.data.data;
        // }).catch((response) => {
        //   console.log(response);
        // });
      },
    },
    components: {
    },
    computed: {},
    mounted () {
      
    }
  };
</script>
<style scoped>
  .pro-info .el-form-item {
    margin-bottom: 0;
  }
  .text-show {
    width: 200px;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>

