<!--
     /**
      * 用表格形式展示角色信息
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018年07月27日17:22:43
      * @example 调用示例
      *  <role-baseinfo></role-baseinfo>
      */
       -->
<template>
  <table class="roleinfo" cellpadding="0" cellspacing="0" style="margin-left: 0px;width:448px;">
    <tbody>
    <tr class="el-table__row">
      <td style="width:65px;">角色名称</td><td style="width:180px;">{{role.roleName}}</td>
    </tr>
    <tr class="el-table__row">
      <td>角色状态</td><td>{{role.status==0?'启用':'禁用'}}</td>
    </tr>
    <tr class="el-table__row--striped">
      <td>创建时间</td><td>{{formattedDate(role.createTime)}}</td>
    </tr>
    <tr class="el-table__row--striped">
      <td>修改时间</td><td>{{formattedDate(role.updateTime)}}</td>
    </tr>
    <tr class="el-table__row--striped">
      <td>角色描述</td><td>{{role.roleDetail}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import dateFormat from '../../../util/dataFormat'
  var props = {
    role: {}
  };
  export default {
    name: 'role-baseinfo',
    props: props,
    methods: {
      formattedDate: function (date) {
        if (!date) {
          return '';
        } 
        var format = dateFormat.dateFormat(date);
        return format;
      }
    },
    watch: {
      role: function () {
        // console.log(this.role)
      }
    }
  };
</script>

<style scoped>
.roleinfo{
  border-collapse: collapse;
  margin: 0px;
}
.roleinfo>tbody>tr>td:first-child
{
  background-color: azure;
}
.roleinfo td{
  padding: 10px 10px;
  border:1px solid #ebeef5;
}
</style>
