// 常用坐标系
var CRS={}
import 'proj4'
import 'proj4leaflet'

// 百度地图的坐标系
CRS.bd_crs_3395 = new L.Proj.CRS(
    'EPSG:3395',
    '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
    {
        resolutions: function () {
            var level = 19;
            var res = [];
            res[0] = Math.pow(2, 18);
            for (var i = 1; i < level; i++) {
                res[i] = Math.pow(2, (18 - i))
            }
            return res;
        }(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    }
);

export default CRS;
