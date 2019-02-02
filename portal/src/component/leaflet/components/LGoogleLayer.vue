/**
 * 谷歌地图图层
 */
 <template>

        <l-tile-layer v-on="$listeners" :name="name" 
        :visible="visible"
        :options="options"
        :layerType="layerType"
        :url="mapType=='sate'?imgUrl:mapUrl">
        </l-tile-layer>
        
 </template>
 <script>
import L from "leaflet"

import LTileLayer from "./LTileLayer"

export default {
    name: 'l-google-layer',
    props:{
        visible:{

        },
        layerType:{},
        name:{
            type:String
        },
        mapType:{
            default:()=>'map'
        }
    },
    inject: ['getMap'],
    data(){
        return {
            map:this.getMap(),
            options:{
                subdomains:[]
            },
            // 影像图url
            imgUrl:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            // 政区图url
            mapUrl:'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
        }
    },
    
    components:{LTileLayer},
    mounted:function(){
        
        // console.log(this.map)
    },
    created(){
        // console.log(this.map)
    }
     
 }
 </script>
 
