<!--
     /**
      * 角色对应的菜单权限和操作权限展示 和勾选
      * @desc 组件描述
      * @author ljj-17773
      * @date 2018年07月25日17:22:43
      * @example 调用示例
      *  <role-management></role-management>
      */
       -->
<!--todo  当前点击的菜单如果未勾选，右边的复选框需要禁用掉-->
<template>
  <div class="menuRightsContent">
    <div class="fl treeContent">
      <el-tree ref="menuTree"
               :data="menuTreeData_"
               show-checkbox
               node-key="id"
               :check-strictly="true"
               :default-expand-all="true"
               :expand-on-click-node="false"
               :default-checked-keys="thisRole.menuData ? thisRole.menuData.map(item => item.id) : []"
               highlight-current
               :props="treeProps"
               @node-click="handleMenuClick"
               @check="handleCheck"
      >
      </el-tree>
    </div>
    <div class="fl checkContent">
      <el-checkbox-group v-model="checkedMenus">
        <!--<el-checkbox v-for="right in menuAllRights" :label="right.value" :key="right.value" :disabled="disabled">{{right.name}}
        </el-checkbox>-->
        <el-checkbox v-for="(item, index) in menuRights" :key="index" :label="item" :disabled="checkboxDisable">
          {{getRightText(item)}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="cf"></div>
  </div>
</template>

<script>
  import managementUtil from '../management-util';
  import API from '../../../rest-api/restApi';

  export default {
    name: 'role-menu-rights',
    props: {
      menuTreeData: {
        required: true
      },
      dialogVisible: false,
      treeType: {   // 树类型（详情，更新）
        required: true
      },
      role: {
        required: true,
        default () {
          return {};
        }
      },
      disabled: {
        default () {
          return false;
        }
      }
    },
    data () {
      return {
        menuAllRights: [],

        setted: false,

        roleMenuRights: [], // 角色在这个菜单下拥有的权限,add,edit,delete 等

        selectedMenuRights: [],

        menuTreeData_: [],

        allOperations: [],

        functionTypeMap: {},    // functionType的map
        id: '',                 // functionType的key

        menuRights: [],   // 当前menu下的权限

        checkedMenus: [],

        thisRole: this.role,

        clickData: '',  // 当前点击的节点对象

        checkboxDisable: true,  // 右侧checkbox的展示情况

        treeProps: {
          children: 'childMenus',
          label: 'menuName'
        }
      };
    },
    created () {

    },
    methods: {
      handleMenuClick (data, node, component) {// 权限菜单节点点击事件
        // if (data.id != this.clickData.id) {
        //   this.checkedMenus = [];
        // }
        this.menuRights = data.menuOperations;
        if (!node.checked || this.treeType == 'detail') {
          this.checkboxDisable = true;
        } else {
          this.checkboxDisable = false;
        }
        this.clickData = data;
        if (!this.clickData) {
          this.pushRoleMenuObj(data);
          this.clickData = data;
        }
        if (data.functionTypes) {
          this.checkedMenus = data.functionTypes;
        } else {
          this.checkedMenus = this.getFunctionTypes(data.id);
        }
      },
      handleCheck (data, node, component) {
        if (node.checkedKeys.indexOf(data.id) >= 0 && this.clickData.id == data.id) {
          this.checkboxDisable = false;
        } else {
          this.checkboxDisable = true;
        }
        this.resetNodeSelect(data, node);
      },
      getRoleMenuObj: function (rightId) {
        var menuObj = null;

        for (var index in this.thisRole.menuData) {
          var menu = this.thisRole.menuData[index];

          if (rightId == menu.id) {
            menuObj = menu;
            break;
          }
        }
        return menuObj;
      },
      pushRoleMenuObj: function (menuObj) {
        this.thisRole.menuData.push(menuObj);
      },
      popRoleMenuObj: function (menuObj) {
        this.thisRole.menuData.pop(menuObj);
      },
      getFunctionTypes: function (rightId) {
        var functionTypes = [];

        for (var index in this.thisRole.menuData) {
          var menu = this.thisRole.menuData[index];

          if (rightId == menu.id) {
            functionTypes = menu.functionTypes;
            break;
          }
        }
        return functionTypes || [];
      },
      getRole () {
        //  返回修改过后的role对象
        return JSON.parse(JSON.stringify(this.thisRole));
      },
      structMenuData (menuData) {
        menuData.forEach(menu => {
          menu.disabled = this.disabled;
          menu.rights = [];
          if (menu.children) {
            // menu.children = this.structMenuData(menu.children);
            this.structMenuData(menu.children);
          }
        });
        return menuData;
      },
      setTreeDefaultChecked: function () {
        this.$refs.menuTree.setCheckedKeys(this.thisRole.menuData ? this.thisRole.menuData.map(item => {
          return item.id;
        }) : []);
      },
      getThisRole: function () {
        return this.thisRole;
      },
      treeDisabled: function (array, type) {
        if (!array) {
          return;
        }
        for (var index in array) {
          var children = array[index].children;

          if (!children) {
            children = array[index].childMenus;
          }
          this.treeDisabled(children, type);
          array[index].disabled = type != 'update';
        }
      },
      getMenuTreeData () {
        var treeData = Object.assign(this.menuTreeData);

        if (this.menuTreeData && this.menuTreeData[0].id == '1') {
          treeData = Object.assign(this.menuTreeData[0].children);
          if (this.treeType == 'detail') {
            this.treeDisabled(treeData);
          }
        }
        // this.structMenuData(treeData);
        return treeData;
      },
      getRightText: function (right) {
        var label = '';

        for (var index in this.allOperations) {
          var item = this.allOperations[index];

          if (right == item.dictValue) {
            label = item.dictLabel;
            break;
          }
        }
        return label;
      },
      resetRole: function () {
        this.menuTreeData_ = JSON.parse(JSON.stringify(this.menuTreeData));
        // this.thisRole = {};
      },
      getMenuTreeItem: function (array, menuId) {
        if (!array) {
          return null;
        }
        for (var index in array) {
          var child = array[index];

          if (menuId == child.id) {
            return child;
          }
          var children = child.childMenus;
          var item = this.getMenuTreeItem(children, menuId);

          if (item) {
            return item;
          }
        }
      },
      initMenuTreeFunctionType: function () {
        var _that = this;

        _that.thisRole.menuData ? _that.thisRole.menuData.forEach((menu) => {
          var menu_ = _that.getMenuTreeItem(_that.menuTreeData_, menu.id);

          if (menu_) {
            menu_.functionTypes = menu.functionTypes;
          }
        }) : {};
      },

      /**
       * @description checkbox 父节点无选中子节点全部取消选中
       * @param node 当前节点data
       * @param keys 选中的节点
       *
       * */
      resetNodeSelect (node, keys) {
        var _that = this;
        var isContain = keys.checkedKeys.some(key => {
          return key === node.id;
        });

        if (isContain) { // 选中时 选中所有父节点
          var pkeys = _that.getParentNodesKeys(node, {id: '-1', childMenus: _that.menuTreeData_});

          pkeys.map((item, index) => {
            if (item === '-1') {
              pkeys.splice(index, 1);
            }
          });
          this.$refs.menuTree.setCheckedKeys(this.$refs.menuTree.getCheckedKeys().concat(pkeys));
        } else { // 取消时 取消所有子节点
          var checkedKeys = this.$refs.menuTree.getCheckedKeys(),
            childKeys = _that.getChildNodes(node);

          childKeys.map(key => {
            checkedKeys.map((key2, index) => {
              if (key === key2) {
                checkedKeys.splice(index, 1);
              }
            });
          });
          this.$refs.menuTree.setCheckedKeys(checkedKeys);
          this.thisRole.menuData = this.structSelectNodes(checkedKeys);
        }
      },
      structSelectNodes (selectedKeys) {
        var allNodes = this.menuTreeData_;
        var getSelectNodes = function (nodes) {
          var selectdNodes = [];
          for (var key1 in nodes) {
            var item = nodes[key1];
            for (var key2 in selectedKeys) {
              if (selectedKeys[key2] === item.id) {
                selectdNodes.push(item);
                continue;
              }
            }
            if (item.childMenus) {
              var reselNodes = getSelectNodes(item.childMenus);
              if (reselNodes) {
                selectdNodes.concat(reselNodes);
              }
            }
          }
          return selectdNodes;
        };
        return getSelectNodes(allNodes);
      },
      /**
       * @description 找到当前节点的所有父节点的key数组
       * @param current node
       * @returns keys array
       */
      getParentNodesKeys (node, rootNode) {
        var keys = [];
        var pnode = this.getParentNode(node, rootNode);

        if (pnode) {
          keys.push(pnode.id);
          keys = keys.concat(this.getParentNodesKeys(pnode, rootNode));
        }
        return keys;
      },

      /**
       * @description 找到当前节点的父节点
       * @param node 当前节点
       * @param item 目标节点，要遍历的节点
       * @returns node 父节点
       */
      getParentNode (node, item) {
        var pnode = Object.assign({}, item), nodes = item.childMenus, re = null;

        // if (!(nodes instanceof Array) || nodes.length === 0) return {};
        for (var key in nodes) {
          var b = nodes[key].id === node.id;

          if (b) {
            re = pnode; // it为当前节点 pnode为it的父节点
            break;
          } else {
            if (nodes[key].childMenus.length === 0) continue; // 没有子节点
            re = this.getParentNode(node, nodes[key]); // 有子节点，参数是当前节点和要遍历的节点
            if (re !== null) {
              break;
            }
          }
        }
        return re;
      },

     /**
       * @description 找到当前节点所有子节点的key
       * @param node 当前节点
       * @returns keys array of ids
       */
      getChildNodes (node) {
        var re = [];

        // re.psuh(node.id);
        if (node.childMenus.length > 0) {
          node.childMenus.map(item => {
            re.push(item.id);
            if (item.childMenus.length > 0) {
              re = re.concat(this.getChildNodes(item));
            }
          });
        }
        return re;
      }
    },
    computed: {
      getCheckMenu: function () {
        return this.thisRole.menuData ? this.thisRole.menuData.map(item => item.id) : [];
      }
    },
    mounted: function () {
      this.menuTreeData_ = JSON.parse(JSON.stringify(this.menuTreeData));
      if (this.menuTreeData && this.menuTreeData[0].id == '1') {
        this.menuTreeData_ = Object.assign(this.menuTreeData[0].children);
      }
      this.treeDisabled(this.menuTreeData_, this.treeType);
      var _that = this;

      managementUtil.queryBaseInfoByURL(_that, API.DICT_DATA_GET, 'post', function (response) {
        _that.allOperations = response.data.data.data;
      }, {dictType: 'OPERATION_AUTHORIZATION'});
      this.initMenuTreeFunctionType();
    },
    watch: {
      role (value) {
        this.thisRole = JSON.parse(JSON.stringify(value));
        this.menuRights = [];
        this.setTreeDefaultChecked();
        this.initMenuTreeFunctionType();
      },
      selectedMenuRights (value) {// 把选中的 权限keys存入thisRole里面
        var currentNode = this.$refs['menuTree'].getCurrentNode();

        if (currentNode) {
          var thisRoleRight = this.thisRole.rights ? this.thisRole.rights.find(right => right.menuName == currentNode.name) : null;

          if (thisRoleRight) {
            thisRoleRight.rights = value;
          } else {
            if (!this.thisRole.rights) {
              this.thisRole.rights = [];
            }
            this.thisRole.rights.push({menuName: currentNode.name, rights: value});
          }
        } else if (value.length > 0) {
          // todo 判断当前选中的菜单是否checked
          this.$notify({
            showClose: true,
            duration: 2000,  // 弹框显示时间，毫秒
            message: '您尚未选中改菜单！',
            type: 'error',
            offset: 120
          });
        }
        // console.log(value);
      },
      checkedMenus: function () {
        this.clickData.functionTypes = this.checkedMenus;
      }
    }
  };
</script>

<style scoped>
  .menuRightsContent {
    height: 100%;
  }

  .menuRightsContent .treeContent {
    width: 50%;
    height: 100%;
    border-right: 1px solid #c5c7c5;
    overflow: auto;
    /*overflow-x: scroll;*/
  }

  .menuRightsContent .checkContent {
    width: 49%;
  }

  .menuRightsContent .checkContent label[role=checkbox].el-checkbox:first-child {
    margin-left: 30px;
  }
</style>
