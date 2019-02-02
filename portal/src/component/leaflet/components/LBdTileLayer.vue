/**
 * 百度地图图层
 */
 <template>
        <l-tile-layer v-on="$listeners" :name="name" 
        :visible="visible"
        :options="options"
        :layerType="layerType"
        :tms="true"
        :url="mapType=='sate'?imgUrl:mapUrl">
        </l-tile-layer>
 </template>
 <script>
// import {LTileLayer} from "../components/vueleaflet/main"
import L from 'leaflet';

import LTileLayer from './LTileLayer';

export default {
  name: 'LBdTileLayer',
  props: {
    visible: {

    },
    layerType: {},
    name: {
      type: String
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
        subdomains: [0, 1, 2]
      },
            // 影像图url
      imgUrl: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20170606',
            // 政区图url
      mapUrl: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518'
    };
  },

  components: {LTileLayer},
  mounted: function () {

        // console.log(this.map)
  },
  created () {
        // console.log(this.map)
  }

};
 </script>
 
