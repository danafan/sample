import http from './request.js'
let path = {	
	testLogin:'login/test_login',					//测试登录
	uploadImage:'common/addimage',					//上传图片
	deleteImage:'common/delimage',					//删除图片
	ajaxRooms:'ajaxrooms',							//获取样衣间列表
	getbBindingInfo:'binding/add_binding',			//进入绑定页面获取批次信息
	getGoodsList:'lending/goodslist',				//获取已绑定的商品列表
	getCodeInfo:'index/getcodeinfo',				//根据扫描的商品编码获取商品信息
	bindGoods:'binding/bindgoods',					//样衣码和商品绑定接口
	removeGoods:'binding/remove',					//删除商品
	getGoodsInfo:'binding/goodsinfo',				//获取样衣详情
}						
export default{
	//测试登录
	testLogin(params){
		return http.get(path.testLogin, params)
	},
	//上传图片
	uploadImage(params){
		return http.post(path.uploadImage, params)
	},
	//删除图片
	deleteImage(params){
		return http.post(path.deleteImage, params)
	},
	//获取样衣间列表
	ajaxRooms(params){
		return http.get(path.ajaxRooms, params)
	},
	//进入绑定页面获取批次信息
	getbBindingInfo(params){
		return http.get(path.getbBindingInfo, params)
	},
	//绑定提交
	postbBinding(params){
		return http.post(path.getbBindingInfo, params)
	},
	//获取已绑定的商品列表
	getGoodsList(params){
		return http.get(path.getGoodsList, params)
	},
	//根据扫描的商品编码获取商品信息
	getCodeInfo(params){
		return http.get(path.getCodeInfo, params)
	},
	//样衣码和商品绑定接口
	bindGoods(params){
		return http.post(path.bindGoods, params)
	},
	//删除商品
	removeGoods(params){
		return http.post(path.removeGoods, params)
	},
	//获取样衣详情
	getGoodsInfo(params){
		return http.get(path.getGoodsInfo, params)
	},
}









