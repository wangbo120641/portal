vue文件方法声明顺序
    - components   
    - props    
    - data     
    - created
    - mounted
    - activited
    - update
    - beforeRouteUpdate
    - metods   
    - filter
    - computed
    - watch
    
    
注释规范
代码注释在一个项目的后期维护中显的尤为重要，所以我们要为每一个被复用的组件编写组件使用说明，为组件中每一个方法编写方法说明。
以下情况，务必添加注释

1.公共组件使用说明
2.各组件中重要函数或者类说明
3.复杂的业务逻辑处理说明
4.特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
5.注释块必须以/**（至少两个星号）开头**/；
6.单行注释使用//；



单行注释

   普通方法一般使用单行注释// 来说明该方法主要作用
多行注释

   组件使用说明，和调用说明 
   <!--公用组件：数据表格
      /**
      * 组件名称
      * @module 组件存放位置
      * @desc 组件描述
      * @author 组件作者
      * @date 2017年12月05日17:22:43
      * @example 调用示例
      *  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
          */
       -->
       
       
 编码规范
 优秀的项目源码，即使是多人开发，看代码也如出一人之手。统一的编码规范，可使代码更易于阅读，易于理解，易于维护。尽量按照ESLint格式要求编写代码
 
     1.使用ES6风格编码源码
         定义变量使用let ,定义常量使用const
         使用export ，import 模块化
     2.组件 props 原子化
         提供默认值
         使用 type 属性校验类型
         使用 props 之前先检查该 prop 是否存在
     3.避免 this.$parent
     4.谨慎使用 this.$refs
     5.无需将 this 赋值给 component 变量
     6.调试信息console.log() debugger 使用完及时删除
