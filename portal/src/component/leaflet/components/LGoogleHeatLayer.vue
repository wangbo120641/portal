/**
* 谷歌热力地图图层
*/
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import propsBinder from '../utils/propsBinder.js';
  import findRealParent from '../utils/findRealParent.js';

  import HeatLayer from '../plugins/leaflet-heat';
  // import heatmapData from '../../../../mocks/data-intelligence-engine/specific-analysis/specific/map';

  const props = {
    latLngs: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true
    },
    className: {
      type: String,
      custom: true,
      default: null
    },
    options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    transparent: {
      type: Boolean,
      custom: false,
    },
    version: {
      type: String,
      default: '1.1.1'
    },
    crs: {
      default: null,
    },
    upperCase: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      custom: false,
      default: 1.0
    },
    zIndex: {
      type: Number,
      default: 1
    },
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
    },
  };
  export default {
    name: 'l-wms-tile-layer',
    props: props,
    mounted () {
      const options = this.options;
      const otherPropertytoInitialize = [ 'layers', 'styles', 'format', 'transparent', 'version', 'crs', 'upperCase', 'zIndex', 'opacity' ];
      for (var i = 0; i < otherPropertytoInitialize.length; i++) {
        const propName = otherPropertytoInitialize[i];
        if(this[propName] !== undefined) {
          options[propName] = this[propName];
        }
      }
      this.mapObject = L.tileLayer.wms(this.baseUrl, options);
      L.DomEvent.on(this.mapObject, this.$listeners);
      propsBinder(this, this.mapObject, props);
      this.parentContainer = findRealParent(this.$parent);
      this.parentContainer.addLayer(this, !this.visible);
      var heatLayerData = heatmapData;
      heatLayerData = heatLayerData.map(p => {
        return [p.lat, p.lng, Math.ceil(Math.random()*500)];
      })
      console.log(L.heatLayer);
      var heat = L.heatLayer(heatLayerData, {radius: 60}).addTo(this.parentContainer);
    },
    methods: {
      setVisible(newVal, oldVal) {
        if (newVal == oldVal) return;
        if (this.mapObject) {
          if (newVal) {
            this.parentContainer.addLayer(this);
          } else {
            this.parentContainer.removeLayer(this);
          }
        }
      }
    },
    beforeDestroy() {
      this.parentContainer.removeLayer(this);
    },
    render() {
      return null;
    }
  }
</script>
