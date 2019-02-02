<!--
     /**
      * 字典管理
      * @desc 组件描述
      * @author wy
      * @date 2017年12月05日17:22:43
      * @example 调用示例
      *  <dic-management></dic-management>
      */
       -->
<template>
  <div class="dark">
    <base-container class="home-wrapper" :nav-items="navItems">
      <router-view></router-view>
      <!--<div style="width: 100%; ">
        <div style="margin: auto 20px;padding: 1% 1%; background: white">
          <p class="title1">字典类型</p>
          <div class="search">
            <el-input style="width:40%; margin-bottom: 1%" class="fl" placeholder="请输入类型名称查询" v-model="input" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            &lt;!&ndash;<el-button type="primary" plain @click="">搜索</el-button>&ndash;&gt;
            <el-button class="fr" type="success" plain id="dicTypeAdd" @click="changeStatus($event)">新增字典类型</el-button>
            <el-button class="fr" style="margin-right: 1%" type="danger" plain @click="removeBatch(dicTypeMultipleSelection)">批量删除</el-button>
          </div>
          <div>
            <el-table ref="dictTypeTable" stripe :data="dictType" id="dictTypeTable" @row-click="dicTypeHandleCurrentChange"
                      @selection-change="dicTypeHandleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="dictName" label="类型名称"></el-table-column>
              &lt;!&ndash;<el-table-column prop="dictType" label="字典类型"></el-table-column>&ndash;&gt;
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">{{ scope.row.status==0?'正常':'停用' }}</template>
              </el-table-column>
              <el-table-column prop="createUser" label="创建者"></el-table-column>
              <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                  {{dateFormat(scope.row.createTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser" label="更新者"></el-table-column>
              <el-table-column prop="updateTime" label="更新时间">
                <template slot-scope="scope">
                  {{dateFormat(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column prop="" label="操作" min-width="130px">
                <template slot-scope="scope">
                  <el-button plain type="success" size="mini" id="dicTypeShow" @click="changeStatus($event,scope.row)">
                    详情
                  </el-button>
                  <el-button plain type="primary" size="mini" id='dicTypeEdit' @click="changeStatus($event,scope.row)">
                    修改
                  </el-button>
                  <el-button plain type="danger" size="mini" @click="dicTypeDel(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination align="right" name="dicTypePage"
                           style="margin: 1% 1%"
                           background
                           @size-change="handleSizeChange(dicType,$event)"
                           @current-change="pageHandleCurrentChange(dicType,$event)"
                           :current-page="dicTypePageInfo.page"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="dicTypePageInfo.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="dicTypeTotal">
            </el-pagination>
          </div>
        </div>
        <div style="margin: 20px 30px;padding: 1% 1%; background: white">
          <p class="title1">字典数据</p>
          <div class="search">
            <el-input style="width:40%; margin-bottom: 1%" class="fl" placeholder="请输入字典标签查询" v-model="input" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            &lt;!&ndash;<el-button type="primary" plain @click="">搜索</el-button>&ndash;&gt;
            <el-button type="success" class="fr" id="dicDataAdd" plain @click="changeStatus($event)">新增字典数据</el-button>
            <el-button type="danger" class="fr" style="margin-right: 1%" plain @click="removeBatch(dicDataMultipleSelection)">批量删除</el-button>
          </div>
          <div>
            <el-table ref="multipleTable" stripe :data="dictData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="dicDatahHandleSelectionChange" @row-click="dicDataHandleCurrentChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column prop="dictLabel" label="字典标签"></el-table-column>
              <el-table-column prop="dictTypeName" label="字典类型"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.status==0?'正常':'停用' }}
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                  {{dateFormat(scope.row.createTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="updateUser" label="更新者"></el-table-column>
              <el-table-column prop="updateTime" label="更新时间">
                <template slot-scope="scope">
                  {{dateFormat(scope.row.updateTime)}}
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column prop="" label="操作" min-width="120px">
                <template slot-scope="scope">
                  <el-button plain type="success" id='dicDataShow' size="mini" @click="changeStatus($event,scope.row)">
                    详情
                  </el-button>
                  <el-button plain type="primary" id='dicDataEdit' size="mini" @click="changeStatus($event,scope.row)">
                    修改
                  </el-button>
                  <el-button plain type="danger" size="mini" @click="dicDataDel(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination align="right" name="dicDataPage"
                           style="margin: 1% 1%"
                           background
                           @size-change="handleSizeChange(dicData,$event)"
                           @current-change="pageHandleCurrentChange(dicData,$event)"
                           :current-page="dicDataPageInfo.page"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="dicDataTotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <el-dialog :title="dialogTextMap[dialogStatus]" width="50%" :visible.sync="dialogFormVisible">
        &lt;!&ndash;字典类型弹框表单&ndash;&gt;
        <el-form v-if="dialogStatus === 'dicTypeAdd'||dialogStatus === 'dicTypeEdit'||dialogStatus==='dicTypeShow'"
                 :rules="dicRules"
                 ref="dictTypeOne"
                 :model="dictTypeOne" label-position="right" label-width="130px">
          <el-form-item label="字典名称" prop="dictName">
            <el-input v-model="dictTypeOne.dictName" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="字典类型" prop="dictType">
            <el-input v-model="dictTypeOne.dictType" placeholder="请输入字典类型" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="dictTypeOne.status" placeholder="请选择字典状态" :disabled='isDisabled'>
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="dictTypeOne.remark" :disabled='isDisabled'></el-input>
          </el-form-item>
        </el-form>
        &lt;!&ndash;字典数据弹框表单&ndash;&gt;
        <el-form v-if="dialogStatus === 'dicDataAdd'||dialogStatus === 'dicDataEdit'||dialogStatus === 'dicDataShow'"
                 :rules="dicRules"
                 ref="dictDataOne"
                 :model="dictDataOne" label-position="right" label-width="130px">
          &lt;!&ndash;<el-form-item label="字典编码" prop="dictCode">
            <el-input v-model="dictDataOne.dictName" disabled placeholder="自动分配"></el-input>
          </el-form-item>&ndash;&gt;
          <el-form-item label="字典排序" prop="dictSort">
            <el-input v-model="dictDataOne.dictSort" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="字典标签" prop="dictLabel">
            <el-input v-model="dictDataOne.dictLabel" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="字典键值" prop="dictValue">
            <el-input v-model="dictDataOne.dictValue" :disabled='isDisabled'></el-input>
          </el-form-item>
          <el-form-item label="字典类型" prop="dictType">
            <el-select v-model="dictDataOne.dictType" placeholder="请选择字典类型" :disabled='isDisabled'>
              <el-option
                v-for="item in allDicType"
                :label="item.dictName"
                :value="item.dictType"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          &lt;!&ndash;<el-form-item label="是否默认" porp="isDefault" >
            <el-select v-model="dictDataOne.isDefault" placeholder="请选择" :disabled='isDisabled'>
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
            </el-select>
          </el-form-item>&ndash;&gt;
          <el-form-item label="状态" prop="status">
            <el-select v-model="dictDataOne.status" placeholder="请选择字典状态" :disabled='isDisabled'>
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark" >
            <el-input type="textarea" v-model="dictDataOne.remark" :disabled='isDisabled'></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button v-if="dialogStatus === 'dicTypeAdd'" type="primary" id="dicTypeAddSubmit"
                     @click="dicTypeAdd" size="medium">确定
          </el-button>
          <el-button v-if="dialogStatus === 'dicTypeEdit'" type="primary" id="dicTypeEditSubmit"
                     @click="dicTypeEdit" size="medium">确定
          </el-button>
          <el-button v-if="dialogStatus === 'dicDataAdd'" type="primary" id="dicDataAddSubmit"
                     @click="dicDataAdd" size="medium">确定
          </el-button>
          <el-button v-if="dialogStatus === 'dicDataEdit'" type="primary" id="dicDataEditSubmit"
                     @click="dicDataEdit" size="medium">确定
          </el-button>
          <el-button @click="resetForm" type="danger" size="medium">取消</el-button>
        </div>
      </el-dialog>-->
    </base-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import dic from './dic-management';

  export default {
    ...dic
  };
</script>

<style scoped>
  .search {
    padding: 20px 40px;
    text-align: center
  }

  #dictTypeTable {
    width: 100%;
  }

  .title1 {
    font-size: 20px;
    font-weight: bold;
  }
</style>
