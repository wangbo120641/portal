import findRealParent from './utils/findRealParent';
import propsBinder from './utils/propsBinder';
import LBdTileLayer from './components/LBdTileLayer';
import LCircle from './components/LCircle';
import LCircleMarker from './components/LCircleMarker';
import LControlAttribution from './components/LControlAttribution';
import LControlLayers from './components/LControlLayers';
import LControlScale from './components/LControlScale';
import LControlZoom from './components/LControlZoom';
import LDivPopup from './components/LDivPopup';
import LMap from './components/LMap';
import LFeatureGroup from './components/LFeatureGroup';
import LGoogleLayer from './components/LGoogleLayer';
import LGeoJson from './components/LGeoJson';
import LIconDefault from './components/LIconDefault';
import LImageOverlay from './components/LImageOverlay';
import LLayerGroup from './components/LLayerGroup';
import LMarker from './components/LMarker';
import LPolygon from './components/LPolygon';
import LPolyline from './components/LPolyline';
import LPopup from './components/LPopup';
import LRectangle from './components/LRectangle';
import LTianDiLayer from './components/LTianDiLayer';
import LTileLayer from './components/LTileLayer';
import LTooltip from './components/LTooltip';
import LWMSTileLayer from './components/LWMSTileLayer';
import LGoogleHeatLayer from './components/LGoogleHeatLayer';
import LHeatMap from './components/LHeatMap';
import CRS from './components/CRS';

// import LControlDraw from './components/LControlDraw';
import Vue from 'vue';

var components = [
  // findRealParent,
  // propsBinder,
  LBdTileLayer,
  LCircle,
  LCircleMarker,
  LControlAttribution,
  // LControlDraw,
  LControlLayers,
  LControlScale,
  LControlZoom,
  LDivPopup,
  LMap,
  LFeatureGroup,
  LGoogleLayer,
  LGeoJson,
  LIconDefault,
  LImageOverlay,
  LLayerGroup,
  LMarker,
  LPolygon,
  LPolyline,
  LPopup,
  LRectangle,
  LTianDiLayer,
  LTileLayer,
  LTooltip,
  LWMSTileLayer,
  LGoogleHeatLayer,
  LHeatMap
  // CRS
];

components.forEach(component => {
  Vue.component(component.name, component);
});
import 'leaflet/dist/leaflet.css';
// 解决leaflet图片引用不正确的问题
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export {
  findRealParent,
  propsBinder,
  LBdTileLayer,
  LCircle,
  LCircleMarker,
  LControlAttribution,
  // LControlDraw,
  LControlLayers,
  LControlScale,
  LControlZoom,
  LDivPopup,
  LMap,
  LFeatureGroup,
  LGoogleLayer,
  LGeoJson,
  LIconDefault,
  LImageOverlay,
  LLayerGroup,
  LMarker,
  LPolygon,
  LPolyline,
  LPopup,
  LRectangle,
  LTianDiLayer,
  LTileLayer,
  LTooltip,
  LWMSTileLayer,
  LGoogleHeatLayer,
  LHeatMap,
  CRS
};
