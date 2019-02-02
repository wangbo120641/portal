<!--
     /**
      * 选择本地图片并裁剪
      * @desc 选择本地图片并裁剪
      * @author ljj-17773
      * @date 2018/8/8
      * @example 调用示例
      * crop-width 裁剪图片的宽度，和高度相等
      * emit事件 'crop' 数据{crop:base64格式的图片}
      * 清理组件调用destoryCropper方法
      *  <cropper v-if="cropShow" crop-width="100" crop-height="100"></cropper>
      *
      *  注意，必须有v-if控制cropper组件的显示和隐藏，这样才能触发完整生命周期，避免和mock发生冲突
      */
       -->
<template>
  <div class="cropperPage">
    <el-row style="height:5px;">
      
    </el-row>
    <!--<el-row style="height:50px;">-->
      <!--<el-button size="small" @click="showFolder" type="primary" icon="el-icon-picture">选择图片</el-button>-->
      <!--<el-button size="small" @click="handleCrop" type="success" icon="el-icon-edit-outline">裁剪</el-button>-->
      <!---->
      <!--<input style="display: none" ref="inputer" type="file"  accept="image" @change="handleFile">-->
    <!--</el-row>-->
    <div class="container fl">
      <div v-show="!( imgData && imgData.length>0)" class="imgTips">
        <i class="el-icon-picture" ></i>
        <br/>
        <br/>
        <span style="color: #c4c4c4;">
          请选择图片！
        </span>
      </div>
        <img id="image" class="image" ref="image" :src="imgData" v-show="imgData && imgData.length>0" alt="图片">
    </div>

    <div class="preview fr" >
      <div class="show">
        <div id="picturePreview" class="picturePreview" :style="'backgroundImage:url()'">
        </div>
      </div>
      <div style="text-align: center;box-sizing: border-box;">
        <br/>
        <el-button size="mediumn" @click="showFolder" type="primary" icon="el-icon-picture" style="margin-top: 50px">选择图片</el-button>
        <br/>
        <el-button size="mediumn" @click="handleCrop" type="success" icon="el-icon-edit-outline" style="margin-top: 30px">裁剪图片</el-button>

        <input style="display: none" ref="inputer" type="file"  accept="image" @change="handleFile">
      </div>
    </div>
  </div>
  
</template>

<script>
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.min.css';
  function changeProxy () {
    // 防止mock修改的xmlhttprequest对cropperjs产生影响
    if (window._XMLHttpRequest) {
      var xmlhttp = window.XMLHttpRequest;
      window.XMLHttpRequest = window._XMLHttpRequest;
      window._XMLHttpReques = xmlhttp;
    }
    if (window._ActiveXObject) {
      var activate = window.ActiveXObject;
      window.ActiveXObject = window._ActiveXObject;
      window._ActiveXObject = activate;
    }
  }
  export default {
    name: 'cropper-img',
    props: {
      cropWidth: {required: false, default () {return 100;}},
      cropHeight: {required: false, default () {return 100;}}
    },
    data () {
      return {
        imgData: '',
        imgCropperData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg'
        },
        crop: ''
      };
    },
    beforeCreate () {
      // 解决cropperjs和mock冲突的问题
      changeProxy();
    },
    beforeDestroy () {
      changeProxy();
    },
    mounted () {
    },
    methods: {
      showFolder () {
        this.$refs['inputer'].click();
      },
      handleFile () {
        this.file = this.$refs['inputer'].files[0];

        var b_version = navigator.appVersion;
        var version = b_version.split(';');
        if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
          if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, '').replace(/MSIE/g, ''));
            if (trim_Version < 10) {
              var x = new ActiveXObject('Msxml2.XMLHTTP.6.0');
              x.onreadystatechange = () => {
                if (x.readyState < 4) return;
                var xml_dom = new ActiveXObject('MSXML2.DOMDocument');
                var tmpNode = xml_dom.createElement('tmpNode');
                tmpNode.dataType = 'bin.base64';
                tmpNode.nodeTypedValue = x.responseBody;
                var base64string = tmpNode.text.replace(/\n/g, '');
                this.imgData = 'data:image/jpeg;base64,' + base64string;
                this.$nextTick(() => {
                  this.initCropper();
                });
              };
              x.open('get', this.file, true);
              x.send('');
            }
          }
        } else {
          // 如果是其他浏览器使用FileReader对象获取
          var reader = new FileReader();
          // 将图片将转成 base64 格式
          reader.readAsDataURL(this.file);
          reader.onload = (evt) => {
            this.imgData = evt.target.result;
            this.$nextTick(() => {
              this.initCropper();
            });
          };
        }
      },
      initCropper () {
        var previews = [document.getElementById('picturePreview')];
        this.destoryCropper();
        this.cropper = new Cropper(document.getElementById('image'), {
          aspectRatio: 1 / 1,
          preview: previews,
          autoCropArea: 0.5, // 选择框的大小
          // resizable:true,
          wheelZoomRatio: 0.2, // 滚轴放大倍数
          dragMode: 'move', // move/crop  move不允许重新画框
          toggleDragModeOnDblclick: false, // 当点击两次时可以在“crop”和“move”之间切换拖拽模式，
          rotatable: false,
          ready: function () {
          },
          crop (event) {
            // console.log(event.detail.x);
          }
        });
      },
      handleCrop () {//裁剪操作
        // var data = this.cropper.getImageData();
        var crop=this.cropper.getCroppedCanvas({
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high',
          width: this.cropWidth,
          height: this.cropHeight
        }).toDataURL('image/png')
        this.$emit('crop',{crop:crop});
        // console.log('canvas', this.cropper.getCroppedCanvas({
        //   imageSmoothingEnabled: true,
        //   imageSmoothingQuality: 'high',
        //   width: 200,
        //   height: 200
        // }).toDataURL('image/png'));
        // console.log('cropper', data);
        // this.cropper.getCroppedCanvas().toBlob((blob) => {
        //   const formData = new FormData();
        //   formData.append('croppedImage', blob);
        //   console.log(blob);
        // });
      },
      getCrop () {
  
      },
      clearCropper(){
        this.destoryCropper();
        this.imgData='';
      },
      destoryCropper () {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = null;
        }
      }
    }
  };
  </script>

<style scoped>
  .cropperPage{
    height: 500px;width: 860px;overflow:hidden;position: relative
  }
 .container{
   height: 480px;
   width:600px;
   max-width: 600px;
   margin-left: 5px;
   overflow: hidden;
   box-shadow: 0 0 5px rgba(0,0,0,.15);
 }
 .imgTips{
   text-align: center;
   margin-top: 160px;
 }
 .imgTips i{
   color:#d7d7d7;font-size: 80px
 }
 .image{
   max-width: 100%;
 }
  .preview{
    width:240px;
    margin-left: 10px;
    
  }
  .show{
    overflow: auto;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .picturePreview{
    width:200px;
    height:200px;
    /*float: right;*/
    margin-left: 10px;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    overflow: hidden;
  }
</style>
