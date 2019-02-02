<template>
  <div>
    <el-dialog
      title="新增政策法规文件"
      :visible.sync="dialogAdd_">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="文件标题" prop="title">
          <el-input v-model="form.title">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="法规类型">-->
        <!--<el-radio-group v-model="form.lawType">-->
        <!--<el-radio label="pdf">pdf</el-radio>-->
        <!--<el-radio label="doc">doc</el-radio>-->
        <!--<el-radio label="excle">excle</el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.publishTime"  :picker-options="cusPickerOptions" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="文件描述" prop="description">
          <el-input type="textarea" v-model="form.description">
          </el-input>
        </el-form-item>
        <el-form-item prop="file">
          <el-upload
            class="upload-demo"
            drag
            :auto-upload="false"
            action="https://test"
            :multiple="false"
            :headers="{'Content-Type':'multipart/form-data'}"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="removeFile"
            accept=".pdf,.doc"
            :on-change="verifyFile"
            :before-remove="beforeRemove"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">提示：建议添加后缀为pdf、PDF、doc文件！</div>
          </el-upload>
          <span v-if="isUpload===false" class="is-uploade">请上传文件</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="addRegulation('form')" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import API from '../../rest-api/restApi';
  import dataFormatFnList from '../../util/dataFormat.js';
  import axios from 'axios';

  export default {
    name: 'regulation-add',
    props: ['dialogAdd'],
    watch: {
      dialogAdd: function () {
        this.dialogAdd_ = true;
      }
    },
    data () {
      return {
        dialogAdd_: false,
        form: {
          title: '',
          // lawType: '',
          description: '',
          publishTime: ''
        },
        file: {},
        isUpload: true,
        fileList: [],
        rules: {
          title: {required: true, message: '请输入法规标题', trigger: 'blur'},
          publishTime: {required: true, message: '请输入发布时间', trigger: 'change'},
          description: {required: true, message: '请输入文件描述', trigger: 'blur'}
          // file: {required: true, message: '请上传文件', trigger: 'change'}
        },
        cusPickerOptions: {
          disabledDate: function (time) {
            return time.getTime() > Date.now();
          }
        }
      };
    },

    methods: {

      cancel () {
        this.dialogAdd_ = false;
        this.$refs['form'].resetFields();
        this.file = {};
        this.fileList = [];
      },
      // 检查上传的文件
      verifyFile (file) {
        // console.log(file)
        let index = file.name.lastIndexOf('.');
        let suffix = file.name.substring(index + 1, file.name.length);

        if (suffix !== 'pdf' && suffix !== 'PDF' && suffix !== 'doc') {
          this.fileList = [];
          this.$message.warning(`建议添加后缀为pdf、PDF、doc文件！`);
          this.isUpload = false;
        } else {
          this.file = file;
          this.isUpload = true;
        }
        console.log(this.isUpload);
      },
      removeFile () {
        this.file = {};
      },
      handleExceed (files, fileList) {
        this.$message.warning(`您已添加了一个文件，如需替换，请先删除已添加文件`);
      },
      beforeRemove (file) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      addRegulation (form) {
        var _this = this;

        this.$refs[form].validate((valid) => {
          if (valid && this.file.name) {
            this.isUpload = true;
            this.dialogAdd_ = false;
            this.form.publishTime = dataFormatFnList.dateFormat(this.form.publishTime);
            let formatterParams = this.$qs.stringify(this.form);
            let config = {
              heders: {'Content-Type': 'multipart/form-data'}
            };
            let formData = new FormData();

            formData.append('file', _this.file.raw);

            // formData.append('file', document.getElementsByName('file')[0].files[0]);
            this.$http({
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
              },
              url: API.SAVE_FILE + '?' + formatterParams,
              data: formData
            }).then(resp => {
              this.$notify({
                type: 'success',
                message: resp.data.message,
                offset: 120
              });
              this.$emit('getList');
              this.cancel();
            });
            // }
          } else {
            this.isUpload = false;
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
