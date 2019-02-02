// divpopup，在地图上添加一个固定大小的div，可以在里面嵌套报图或其他自定义的东西，可以添加任意多个
// todo:查看tooltip，看如何允许穿透div拖动地图，或者直接使用tooltip改造
<template>
  <div v-bind:style="contentSize">
      <span v-if="content.length>0">{{content}}</span>
      <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  content: {
    default: '',
  },
  latLng: {
    type: [Object, Array]
  },
  size:{
      type:[Object,Array],
      default:() => ([100,100])
  },
  options: {
    type: Object,
    default: () => ({}),
  },
};

export default {
  name: 'l-div-popup',
  props: props,
  data() {
    return {
      ready: false,
    }
  },
  computed:{
      contentSize(){
        if(this.size instanceof Array){
            return {width:this.size[0]+'px',height:this.size[1]+'px'}
        }else{
            return {width:this.size.width+'px',height:this.size.height+'px'}
        }
      }
  },
  mounted() {

      this.options.className="divPopup";
      this.options.closeOnClick=false;
      this.options.closeButton=false;
      this.options.autoClose=false;
      this.options.autoPan=false;
      this.options.pane="overlayPane";//设置显示层级，不同的pane有不同的显示层级,改层级不会压盖点、线、面要素

      if(this.size instanceof Array){
            this.options.offset=[0,this.size[1]/2];
            this.options.maxWidth=this.size[0];
            this.options.maxHeight=this.size[1];
      }else{
            this.options.offset=[0,this.size.height/2];
            this.options.maxWidth=this.size.width;
            this.options.maxHeight=this.size.height;
      }

    this.mapObject = L.popup(this.options);
    if (this.latLng !== undefined) {
      this.mapObject.setLatLng(this.latLng);
    }
    // this.mapObject.setContent(this.content || this.$el);
    this.mapObject.setContent( this.$el);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, props);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.addLayer(this.mapObject);
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
};
</script>
<style>
.divPopup{
  box-shadow: none;
  margin-bottom: 0px;
}
.divPopup::before{
    content: ''
}
.divPopup::after{
    content: ''
}
.divPopup .leaflet-popup-tip-container{
    display: none
}
.divPopup .leaflet-popup-tip-container{
  box-shadow: none
}
.divPopup .leaflet-popup-content-wrapper{
    padding: 0;
    margin: 0;
    border-radius: 0;
    padding: 2px;
}
.divPopup .leaflet-popup-content{
    padding: 0;
    margin: 0;
}
</style>

