<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';

const props = {
  layerType: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  }
};

export default {
  name: 'l-layer-group',
  props: props,
  data() {
    return {
      ready: false,
    }
  },
  provide: function() {//通过依赖注入的方式，给后代组件提供获取地图对象的方法
    return {
      getMap: this.getMap
    };
  },

  mounted() {
    this.mapObject = L.layerGroup();
    propsBinder(this, this.mapObject, props);
    L.DomEvent.on(this.mapObject, this.$listeners);
    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    // if (this.visible) {
    //   this.parentContainer.addLayer(this);
    // }
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy() {
    this.parentContainer.removeLayer(this);
  },
  methods: {
    getMap(){return this.mapObject},
    addLayer(layer, alreadyAdded) {
      // if (!alreadyAdded) {
      //   this.mapObject.addLayer(layer.mapObject);
      // }
      // this.parentContainer.addLayer(layer, true);
      this.mapObject.addLayer(layer.mapObject);
    },
    removeLayer(layer, alreadyRemoved) {
      // if (!alreadyRemoved) {
      //   this.mapObject.removeLayer(layer.mapObject);
      // }
      // this.parentContainer.removeLayer(layer, true);
      this.mapObject.removeLayer(layer.mapObject);
    },
    setVisible(newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal) {
        this.parentContainer.addLayer(this);
      } else {
        this.parentContainer.removeLayer(this);
      }
    },
  },
};
</script>
