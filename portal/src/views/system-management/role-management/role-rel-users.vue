<!--
     /**
      * 角色关联的用户
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018年07月25日17:22:43
      * @example 调用示例
      *  <role-management></role-management>
      */
       -->
<template>
  <div style="height: 100%; overflow-y: auto"> 
    <el-table
      border
      :header-cell-style="getHeaderStyle"
      :row-style="getRowStyle"
      :data="relUsers">
      <el-table-column label="用户编号" prop="userId"></el-table-column>
      <el-table-column label="用户姓名" prop="userName"></el-table-column>
      <el-table-column label="组织" prop="departmentInfo.departmentName"></el-table-column>
    </el-table>
  </div>
  

</template>

<script>
  import API from "../../../rest-api/restApi";

  export default {
    name: 'role-rel-users',
    props: {
      role: {
        required: true
      }
    },
    data () {
      return {
        relUsers: []
      };
    },
    created () {
      
    },
    methods: {
      queryRelUsers: function () {
        var _that = this;
        _that.$http({
          url: API.USER_QUERY_BY_ROLE_ID + '?' + _that.$qs.stringify({roleId: _that.role.id}) ,
          method: 'post',
        }).then((resp) => {
          this.relUsers=resp.data.data
        });
      },
      getHeaderStyle: function ({row, rowIndex}) {
        return {
          background: '#F0F2F5'
        }
      },
      getRowStyle: function ({row, rowIndex}) {
        return rowIndex % 2 == 1 ? {
          background: '#F0F2F5'
        }:{}
      }
    },
    mounted: function () {
      this.queryRelUsers();
    },
    watch: {
     /* role:function () {
        this.queryRelUsers();
      }*/
    }
  };
</script>

<style scoped>
.roleUser{
  border-collapse: collapse;
  width:100%;
}
.roleUser thead{
  background-color: azure;
}
  .roleUser td,.roleUser th{
    padding: 5px 10px;
    border:1px solid #ebeef5;
  }
</style>
