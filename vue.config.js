const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {	
	devServer: {
		proxy: {
			'/clothes': {
				target: 'https://house.92nu.com',
				// target: 'http://bi.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		}
	},
	assetsDir: "web",
	lintOnSave: true,
	chainWebpack: (config)=>{
		config.resolve.alias
		.set('vendor',resolve('./src/vendor'))
	}
}