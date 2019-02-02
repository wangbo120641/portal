<template>
  <el-table
    :header-cell-style="getHeaderStyle" 
    :border="false" 
    :data="formatData" 
    :row-style="showRow" 
    v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column 
      v-else 
      v-for="(column, index) in columns" 
      :key="column.value" 
      :label="column.text" 
      :show-overflow-tooltip="(column.showOverflow ? true : false)" 
      :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{column.value != 'menuType' ? scope.row[column.value] : (scope.row[column.value] == 1 ? '菜单权限' : '按钮权限')}}
        <template v-if="index == columns.length - 1">
          <el-button opt-type="DETAIL"  type="success" plain size="mini"
                     @click="onDetailClick(scope.row)">
            详情
          </el-button>
          <el-button opt-type="UPDATE" size="mini" plain type="primary"
                     @click="onUpdateClick(scope.row)">
            编辑
          </el-button>
          <el-button opt-type="DELETE" size="mini" plain type="danger"
                     @click="onDeleteClick(scope.row)">
            删除
          </el-button>
        </template>
      </template>
      <!--<template slot-scope="scope" v-if="index == columns.length - 1">
        <el-button type="success" plain round size="mini" @click="onDetailClick(scope.row)">详情</el-button>
        <el-button size="mini" plain round type="primary" @click="onUpdateClick(scope.row)">修改
        </el-button>
        <el-button size="mini" plain round type="danger" @click="onDeleteClick(scope.row)">删除
        </el-button>
      </template>-->
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval';
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      var rowIndex = row.rowIndex;
      var style = (rowIndex % 2 == 1 ? "background: #F0F2F5" : "");   //奇偶行变色
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;'  : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    onDetailClick: function (obj) {
      this.$emit('onDetailClick',obj)
    },
    onUpdateClick: function (obj) {
      this.$emit('onUpdateClick',obj)
    },
    onDeleteClick: function (obj) {
      this.$emit('onDeleteClick',obj)
    },
    getRowStyle: function ({row, rowIndex}) {
      return rowIndex % 2 == 1 ? {
        background: '#F0F2F5'
      } : {};
    },
    getHeaderStyle: function ({row, rowIndex}) {
      return {
        background: '#F0F2F5'
      }
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
