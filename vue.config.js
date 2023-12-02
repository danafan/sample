// const path = require('path');
// function resolve (dir) {
//     return path.join(__dirname, dir)
// }
module.exports = {	
	devServer: {
		proxy: {
			'/clothes': {
				target: 'https://house.92nu.com',
				// target: 'http://test_sample.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		},
		host:"0.0.0.0",  
	},
	assetsDir: "clothes",
	publicPath:'../',
	// lintOnSave: true,
	// chainWebpack: (config)=>{
	// 	config.resolve.alias
	// 	.set('vendor',resolve('./src/vendor'))
	// }
}