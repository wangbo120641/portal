<!--
     /**
      * 自定义分页组件
      * @desc 分页操作
      * @author yyl 59288
      * @date 2018.7.25
      * @example 调用示例
      *  <customer-pagination :total="total" @afterPageDataChange="pageChange"></customer-pagination>
      * afterPageDataChange: 监听组件内的page信息变化
      * total: 信息条数
      */
       -->
<template>
  <div>
    <el-pagination
      align="right"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="pageInfo.pageSizes"
      :page-size="pageInfo.pageSize"
      :total="total"
      style="margin-top: 30px;"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>

</template>

<script>
  export default {
    name: 'customer-pagination',
    props: {
      total: 0,
      defaultPageSize: {
        type: Number,
        default: function () {
          return 10;
        }
      },
      parentPageInfo:{
        type: Object,
        default: function () {
          return {
            currentPage: 1,
            pageSizes: [5, 10, 15, 20],
            pageSize: 10,
          }
        }
      }
    },
    data() {
      return {
        pageInfo: {
          currentPage: 1,
          pageSizes: [5, 10, 15, 20],
          pageSize: 10,
        },
      }
    },
    methods: {
      sizeChange: function (size) {
        this.pageInfo.pageSize = size;
        this.pageInfo.currentPage = 1;
        this.$emit('afterPageDataChange', this.pageInfo);
      },
      currentChange: function (current) {
        this.pageInfo.currentPage = current;
        this.$emit('afterPageDataChange', this.pageInfo);
      }
    },
    mounted: function () {
      if (this.defaultPageSize != 0) {
        this.pageInfo.pageSize = this.defaultPageSize;
      }
      //this.$emit('afterPageDataChange', this.pageInfo);
    },
    watch: {
      parentPageInfo:  {
        handler: function () {
          this.pageInfo.currentPage = this.parentPageInfo.currentPage || this.parentPageInfo.page;
          this.pageInfo.pageSize = this.parentPageInfo.pageSize;
        },
        deep: true
      }
    }

  }
</script>

<style>

</style>
