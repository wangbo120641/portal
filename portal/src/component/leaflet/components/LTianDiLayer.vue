/**
 * 天地图地图图层
 */
 <template>
    <l-layer-group
        :visible="visible"
        :options="options"
        :layerType="layerType"
        v-on="$listeners"
        :name="name">
        <l-tile-layer :url="mapType=='sate'?satelliteMap.Map:normalMap.Map" :options="options">
        </l-tile-layer>
        <l-tile-layer :url="mapType=='sate'?satelliteMap.Annotion:normalMap.Annotion" :options="options">
        </l-tile-layer>
    </l-layer-group>
        
 </template>
 <script>
import L from 'leaflet';
import LLayerGroup from './LLayerGroup';
import LTileLayer from './LTileLayer';

export default {
  name: 'l-tiandi-layer',
  props: {
    visible: {},
    layerType: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    },
    mapType: {
      default: () => 'map'
    }
  },
  inject: ['getMap'],
  data () {
    return {
      map: this.getMap(),
      options: {
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
      },
      normalMap: {
        Map: 'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
        Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}'
      },
      satelliteMap: {
        Map: 'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
        Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}'
      }
    };
  },

  components: {LTileLayer, LLayerGroup},
  mounted: function () {},
  created () {}
};
</script>
 
