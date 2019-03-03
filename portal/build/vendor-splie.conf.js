const webpack = require('webpack')

const singleVendors = {
    'element-ui': ['element-ui'],
    'echarts': ['echarts'],
    'lodash': ['lodash'],
    'zrender': ['zrender'],
    'vue-fullpage.js': ['vue-fullpage.js']
}
function getModuleName(module) {
    const sign = 'node_modules';
    var signIndex = module.resource.indexOf(sign);
    var pathSeparator = module.resource.slice(signIndex - 1, signIndex);
    var modulePath = module.resource.substring(signIndex + sign.length + 1);
    var moduleName = modulePath.substring(0, modulePath.indexOf(pathSeparator)).toLowerCase();
    // console.log(moduleName);
    return moduleName
  }

 const vendorConfig = {
    plugins: [
        ...Object.keys(singleVendors).map(name => {
            return new webpack.optimize.CommonsChunkPlugin({
              name: name,
              chunks: ['vendor'],
              minChunks: function (module, count) {
                return module.resource && singleVendors[name].filter(item => new RegExp(item).test(getModuleName(module)))[0] && count >= 1
              }
            })
          }),
    ]
 }
 const htmlWebpackConf = {
     chunks: ['manifest', 'element-ui','echarts','lodash','zrender','vue-fullpage.js','vendor', 'web','app']
 }
 module.exports.vendorConfig = vendorConfig
 module.exports.htmlWebpackConf = htmlWebpackConf