import http from './request.js'
let path = {	
	getConfig:'ding/getConfig',						//获取钉钉鉴权信息
	dingAuth:'ding/auth',							//钉钉鉴权
	login:'login/login',							//登录
	uploadImage:'common/addimage',					//上传图片
	deleteImage:'common/delimage',					//删除图片
	ajaxRooms:'ajaxrooms',							//获取样衣间列表
	getbBindingInfo:'binding/add_binding',			//进入绑定页面获取批次信息
	getGoodsList:'lending/goodslist',				//获取已绑定的商品列表
	getCodeInfo:'index/getcodeinfo',				//根据扫描的商品编码获取商品信息
	bindGoods:'binding/bindgoods',					//样衣码和商品绑定接口
	removeGoods:'binding/remove',					//删除商品
	getGoodsInfo:'binding/goodsinfo',				//获取样衣详情
	lendingApply:'lending/apply',					//发起借样
	myLendingList:'lending/mylendinglist',			//我的借样列表
	lendingList:'lending/lendinglist',				//借样记录列表
	lendingDetail:'lending/detail',					//借样详情
	lendingAdd:'lending/add',						//借样批次提交接口
	scanGoods:'index/scangoods',					//扫码录入样衣
	returnAdd:'return/add',							//进入归还界面
	bindingRecord:'binding/bindinglist',			//绑定记录
	returnRecord:'return/list',						//归还记录
	bindingDetail:'binding/detail',					//绑定记录详情
	handleRecord:'handle/list',						//处理记录
	handleAdd:'handle/add',							//进入处理界面
	handleDetail:'handle/detail',					//处理记录详情头部信息
	returnDetail:'return/detail',					//归还记录头部信息
	checkList:'check/list',							//盘点记录列表
	checkDetail:'check/detail',						//盘点记录详情头部信息
	checkGoodsList:'check/goodslist',				//盘点记录详情商品列表
	checkScanGoods:'check/scangoods',				//扫码盘点
	ajaxTypeList:'index/ajaxtypelist',				//ajax获取类型列表接口
	getSkuCodeInfo:'binding/getskucodeinfo',		//验证样衣码接口
	getWaitNum:'lending/getwaitnum',				//获取待借用记录数量
}								
export default{
	//获取钉钉鉴权信息
	getConfig(params){
		return http.get(path.getConfig, params)
	},
	//钉钉鉴权
	dingAuth(params){
		return http.get(path.dingAuth, params)
	},
	//登录
	login(params){
		return http.get(path.login, params)
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
	//发起借样
	lendingApply(params){
		return http.post(path.lendingApply, params)
	},
	//我的借样
	myLendingList(params){
		return http.get(path.myLendingList, params)
	},
	//借样记录
	lendingList(params){
		return http.get(path.lendingList, params)
	},
	//借样详情
	lendingDetail(params){
		return http.get(path.lendingDetail, params)
	},
	//借样批次提交接口
	lendingAdd(params){
		return http.post(path.lendingAdd, params)
	},
	//扫码录入样衣
	scanGoods(params){
		return http.post(path.scanGoods, params)
	},
	//进入归还界面
	getReturnAdd(params){
		return http.get(path.returnAdd, params)
	},
	//归还提交
	postReturnAdd(params){
		return http.post(path.returnAdd, params)
	},
	//绑定记录
	bindingRecord(params){
		return http.get(path.bindingRecord, params)
	},
	//归还记录
	returnRecord(params){
		return http.get(path.returnRecord, params)
	},
	//绑定记录详情
	bindingDetail(params){
		return http.get(path.bindingDetail, params)
	},
	//处理记录
	handleRecord(params){
		return http.get(path.handleRecord, params)
	},
	//进入处理页面
	getHandleAdd(params){
		return http.get(path.handleAdd, params)
	},
	//处理提交
	postHandleAdd(params){
		return http.post(path.handleAdd, params)
	},
	//处理记录详情头部信息
	handleDetail(params){
		return http.get(path.handleDetail, params)
	},
	//归还记录头部信息
	returnDetail(params){
		return http.get(path.returnDetail, params)
	},
	//盘点记录列表
	checkList(params){
		return http.get(path.checkList, params)
	},
	//盘点记录详情头部信息
	checkDetail(params){
		return http.get(path.checkDetail, params)
	},
	//盘点记录详情商品列表
	checkGoodsList(params){
		return http.get(path.checkGoodsList, params)
	},
	//扫码盘点接口
	checkScanGoods(params){
		return http.get(path.checkScanGoods, params)
	},
	//ajax获取类型列表接口
	ajaxTypeList(params){
		return http.get(path.ajaxTypeList, params)
	},
	//验证样衣码接口
	getSkuCodeInfo(params){
		return http.get(path.getSkuCodeInfo, params)
	},
	//获取待借用记录数量
	getWaitNum(params){
		return http.get(path.getWaitNum, params)
	},
}









