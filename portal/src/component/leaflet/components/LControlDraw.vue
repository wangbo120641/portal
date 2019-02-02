<script>
import propsBinder from '../utils/propsBinder.js';
import 'leaflet';
import '../../Leaflet.draw-develop/leaflet.draw';
import '../../Leaflet.draw-develop/ln_cn';

const props = {
  position: {
    type: String,
    default: 'topright'
  },
  options: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'l-control-draw',
  props: props,
  mounted () {
    const options = this.options;

    // 用于绘画的图层
    var drawnItems = L.featureGroup();

    this.mapObject = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        poly: {
          allowIntersection: false
        }
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true
        }
      }
    });

    propsBinder(this, this.mapObject, props);
    // this.$parent.registerLayerControl(this);
    this.$parent.mapObject.addLayer(drawnItems);
    this.$parent.mapObject.addControl(this.mapObject);
    // 把绘画结果添加到地图上
    this.$parent.mapObject.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;

      drawnItems.addLayer(layer);
      console.log('drawLayer', layer);
    });
  },
  methods: {

  },
  beforeDestroy () {
    this.mapObject.remove();
  },
  render () {
    return null;
  }
};
</script>
