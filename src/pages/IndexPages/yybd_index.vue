<template>
	<div class="container">
		<div class="yyj_gly">
			<!-- 样衣绑定 -->
			<div class="row" v-if="page_type == 'yybd'">
				<div class="lable">样衣来源：</div>
				<div class="value" @click="clickYyly">
					<div class="yyj_txt default_txt">{{yyly_list[yylyIndex].name}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<div class="row" v-if="page_type == 'yybd' || (page_type == 'yygh' && room_type == 2)">
				<div class="lable">责任人：</div>
				<div class="value" @click="checkZrr">
					<div class="yyj_txt" :class="{'default_txt':user_name != ''}">{{user_name == ''?'选择责任人':user_name}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<!-- 样衣归还 -->
			<div class="row" v-if="page_type == 'yygh'">
				<div class="lable">管理员：</div>
				<div class="value">
					{{admin_name}}
				</div>
			</div>
			<div class="row" v-if="(yylyIndex == 0 && page_type == 'yybd') || page_type == 'yygh'">
				<div class="lable">样衣间：</div>
				<div class="value" @click="showPopup = true">
					<div class="yyj_txt" :class="{'default_txt':room_name != ''}">{{room_name == ''?'选择样衣间':room_name}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="yy_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item border_bottom" v-for="(item,index) in listArray" :key="index + 1" @click="goDetail(item.sku_code)">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
			<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1',item.sku_code,index)">
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false" :icon_type="page_type == 'yybd'?yylyIndex == 0?'1':'2':''"></EmptyPage>
	<div class="bottom_box">
		<div class="all_delete" @click="modelFn('2')" v-if="page_type == 'yybd' && listArray.length > 0">全部清空</div>
		<div class="button_box">
			<div class="button" @click="scanYyCode">
				<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
				<div class="scan_text">扫一扫</div>
			</div>
			<!-- 样衣绑定 -->
			<div class="button rk_button" @click="modelFn('3')" v-if="page_type == 'yybd'">提交</div>
			<!-- 样衣归还 -->
			<div class="button rk_button" @click="modelFn('4')" v-if="page_type == 'yygh'">归还</div>
		</div>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
	<!-- 样衣来源 -->
	<van-popup v-model:show="showYyly" position="bottom" round>
		<div class="list">
			<div class="item" :class="{'active_item':yylyIndex == index}" v-for="(item,index) in yyly_list" @click="checkYyly(index)">{{item.name}}</div>
		</div>
		<div class="padding_box"></div>
		<div class="item" @click="showYyly = false">关闭</div>
	</van-popup>
	<!-- 样衣间 -->
	<van-popup v-model:show="showPopup" position="bottom" round>
		<div class="list">
			<div class="item" :class="{'active_item':roomIndex == index}" v-for="(item,index) in room_list" @click="checkYyj(index)">{{item.room_name}}</div>
		</div>
		<div class="padding_box"></div>
		<div class="item" @click="checkYyj(999)">清空</div>
	</van-popup>
</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
	import DialogModel from '../../components/dialog_model.vue'
	import EmptyPage from '../CommonPages/empty_page.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				user_name:"",				//责任人
				user_id:"",					//责任人ID
				admin_name:"",				//管理员
				showPopup:false,			//选择样衣间弹窗
				room_list:[],				//样衣间列表
				roomIndex:999,				//选中的样衣间下标
				room_name:"",				//选中的样衣间名称
				room_id:"",					//选中的样衣间id 
				room_type:1,				//样衣间类型（2:显示责任人）
				bindingInfo:{},				//获取页面批次信息(绑定页面)
				returnInfo:{},				//获取页面批次信息(归还页面)
				page:1,
				pagesize:10,				
				listArray:[],				//列表
				total_num:0,				//总数量
				loading:false,
				finished:false,
				showModel:false,			//是否显示弹窗
				sku_code:"",				//点击单条删除的sku_code
				goods_index:"",				//点击单条删除的index
				value:"",					//弹窗内容
				modelType:"",				//弹窗类型
				page_type:"yybd",			//页面来源
				showYyly:false,				//样衣来源弹窗
				yyly_list:[{
					name:'外部采购',
					id:'2'
				},{
					name:'仓内调拨',
					id:'1'
				}],							//样衣来源列表
				yylyIndex:0,				//选中的样衣来源下标
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path == '/yyxq' || to.path == '/bmbd_index'){	//样衣详情/样衣绑定
				from.meta.isUseCache = true;
			}else{
				from.meta.isUseCache = false;
			}
			next();
		},
		activated(){
			//页面来源
			this.page_type = this.$route.query.page_type;
			if(!this.$route.meta.isUseCache){
				this.user_name = this.userInfo.user_name;	//责任人
				this.user_id = this.userInfo.userid;		//责任人ID
				this.admin_name = "";				//管理员
				this.room_list = [];				//样衣间列表
				this.roomIndex = 999;				//选中的样衣间下标
				this.room_name = "";				//选中的样衣间名称
				this.room_id = "";					//选中的样衣间id 
				this.room_type = 1;					//样衣类型
				this.bindingInfo = {};				//获取页面批次信息(绑定页面)
				this.returnInfo = {};				//获取页面批次信息(归还页面)
				this.page = 1;			
				this.listArray = [];				//列表
				this.total_num = 0;					//总数量
				//获取样衣间列表
				this.getAjaxRooms();
			}else{
				//绑定成功之后刷新列表
				if(this.$route.query.isLoad == '1'){
					this.page = 1;			
					this.listArray = [];				//列表
					this.total_num = 0;					//总数量
					//进入绑定页面获取批次信息
					this.getbBindingInfo();
				}
			}
			this.yylyIndex = localStorage.getItem('yylyIndex')?localStorage.getItem('yylyIndex'):0;
			this.$route.meta.isUseCache = false;
		},
		methods:{
			//获取样衣间列表
			getAjaxRooms(){
				let arg = {
					is_return:this.page_type == 'yybd'?0:1
				}
				resource.ajaxRooms(arg).then(res => {
					if(res.code == 1){
						this.room_list = res.data;
						if(this.page_type == 'yybd'){	//样衣绑定
							//进入绑定页面获取批次信息
							this.getbBindingInfo();
						}else{							//样衣归还
							//进入归还页面获取批次信息
							this.getReturnInfo();
						}
					}
				})
			},
			//进入绑定页面获取批次信息
			getbBindingInfo(){
				resource.getbBindingInfo().then(res => {
					if(res.code == 1){
						this.bindingInfo = res.data;
						//获取商品列表
						this.getGoodsList();
					}
				})
			},
			//进入归还页面获取批次信息
			getReturnInfo(){
				resource.getReturnAdd().then(res => {
					if(res.code == 1){
						this.returnInfo = res.data;
						this.admin_name = this.returnInfo.admin_name;
						//获取商品列表
						this.getGoodsList();
					}
				})
			},
			//获取更多
			loadMore(){
				if(this.page_type == 'yygh'){
					this.page += 1;
					//获取已绑定的商品列表
					this.getGoodsList();
				}
			},
			//获取已绑定的商品列表
			getGoodsList(){
				let batch_id = this.page_type == 'yybd'?this.bindingInfo.binding_id:this.returnInfo.return_id;
				let arg = {
					batch_id:batch_id,
					type:this.page_type == 'yybd'?'0':'1',
					page:this.page,
					pagesize:this.pagesize
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						if(this.page_type == 'yygh'){
							this.total_num = res.data.total;
							this.listArray = [...this.listArray,...res.data.data];
							if(this.page == res.data.last_page){
								this.finished = true;
							}
						}else{
							this.listArray = res.data;
							this.finished = true;
						}
					}
				})
			},
			//点击询问
			modelFn(type,sku_code,index){	//1:删除单条；2:全部清空；3:入库；3:归还
				this.modelType = type;
				switch(this.modelType){
					case '1':
					this.value = '确认删除该条记录？';
					this.sku_code = sku_code;
					this.goods_index = index;
					this.showModel = true;
					break;
					case '2':
					this.value = '确定要全部清空历史记录吗？';
					this.showModel = true;
					break;
					case '3':
					if(this.listArray.length == 0){
						this.$toast('暂时没有商品哦！');
					}else{
						if(this.room_id != ''){
							this.value = `即将入库${this.listArray.length}件商品？`;
							this.showModel = true;
						}else{
							this.value = `即将借样${this.listArray.length}件商品？`;
							this.showModel = true;
						}
					}
					break;
					case '4':
					if(this.room_id == ''){
						this.$toast('请选择样衣间！');
						return;
					}
					if(this.listArray.length == 0){
						this.$toast('还没有商品哦！');
						return;
					}
					this.value = '确认归还样衣吗？';
					this.showModel = true;
					break;
				}
			},
			//弹窗确认
			callbackFn(v){
				if(v == '1'){
					this.showModel = false;
				}else{
					this.showModel = false;
					switch(this.modelType){
						case '1':
							//删除商品
							this.removeGoods();
							break;
							case '2':
							//删除商品
							this.removeGoods();
							break;
							case '3':
							//底部提交(样衣绑定)
							this.postbBinding();
							break;
							case '4':
							//归还提交
							this.postReturnAdd();
							break;
						}
					}
				},
			//绑定提交
			postbBinding(){
				if(!this.user_id){
					this.$toast('责任人不能为空!');
					return;
				}
				var arg = {
					type:this.yylyIndex == 0?2:1,
					binding_id:this.bindingInfo.binding_id,
					user_name:this.user_name,
					user_id:this.user_id
				}
				if(this.room_id != ''){
					arg.room_id = this.room_id;
					arg.room_name = this.room_name;
				}
				resource.postbBinding(arg).then(res => {
					if(res.code == 1){
						if(this.room_id != ''){
							this.$router.replace('/success?value=入库成功&showBut=1&img_url=success');
						}else{
							this.$router.replace('/success?value=借样成功&showBut=1&img_url=jy');
						}
					}
				})
			},
			//归还提交
			postReturnAdd(){
				var arg = {
					room_id:this.room_id,
					room_name:this.room_name,
					return_id:this.returnInfo.return_id
				}
				if(this.room_type == 2){
					arg.user_id = this.user_id
				}
				resource.postReturnAdd(arg).then(res => {
					if(res.code == 1){
						this.$router.replace('/success?value=归还成功&showBut=1&img_url=gh');
					}
				})
			},
			//删除商品
			removeGoods(){
				let batch_id = this.page_type == 'yybd'?this.bindingInfo.binding_id:this.returnInfo.return_id;
				var arg = {
					batch_id:batch_id,
					type:this.page_type == 'yybd'?'0':'1',
				}
				if(this.modelType == '1'){
					arg.sku_code = this.sku_code;
				}
				resource.removeGoods(arg).then(res => {
					if(res.code == 1){
						this.$toast(res.msg);
						if(this.modelType == '1'){
							this.listArray.splice(this.goods_index,1);
							this.total_num -= 1;
						}else{
							this.page = 1;
							this.listArray = [];
							this.total_num = 0;
						}
					}
				})
			},
			//点击选择责任人
			checkZrr(){
				dd.ready(() => {
					dd.biz.contact.complexPicker({
						title: "选择责任人",
						corpId: "ding7828fff434921f5b",
						multiple: false,
						limitTips: "超出了",
						maxUsers: 1000,
						pickedUsers: [],
						pickedDepartments: [],
						disabledUsers: [],
						disabledDepartments: [],
						requiredUsers: [],
						requiredDepartments: [],
						appId: 1664876526,
						permissionType: "GLOBAL",
						responseUserOnly: true,
						startWithDepartmentId: 0,
						onSuccess : (res) => {
							//责任人
							this.user_name = res.users[0].name;
							this.user_id = res.users[0].emplId;
						},
						onFail : function(err) {
							// 调用失败时回调
							console.log(err)
						}
					});
				})
			},
			//点击切换样衣来源
			clickYyly(){
				if(this.listArray.length > 0){
					this.$toast('请清空列表后再切换样衣来源！')
				}else{
					this.showYyly = true;
				}
			},
			//切换样衣来源
			checkYyly(index){
				this.yylyIndex = index;
				localStorage.setItem('yylyIndex',index);
				if(this.yylyIndex == 1){
					this.roomIndex = 999;				//选中的样衣间下标
					this.room_name = "";				//选中的样衣间名称
					this.room_id = "";					//选中的样衣间id 
					this.room_type = 1;					//样衣类型
				}
				this.showYyly = false;
			},
			//点击进入详情
			goDetail(sku_code){
				this.$router.push('/yyxq?sku_code=' + sku_code);
			},
			//点击扫描样衣码
			scanYyCode(){
				// 样衣码(小于)：20 - 100；商品编码(等于)：22K2M324702307；唯一码(大于)：22K2M324702001
				// var sku_code = '22K2M32470200130232';	
				// if(this.yylyIndex == 0){	//外部采购
				// 	if(sku_code.length < 14){	
				// 		this.getSkuCodeInfo(sku_code);
				// 	}else{		
				// 		this.$toast('请扫描样衣码');
				// 	}
				// }else{						//内部调拨
				// 	if(sku_code.length < 14){				//样衣码
				// 		this.$toast('请扫描商品编码或唯一码');
				// 	}else if(sku_code.length == 14){		//商品编码
				// 		this.$router.replace('/bmbd_index?spbm=' + sku_code + '&batch_id=' + this.bindingInfo.binding_id + '&type=' + this.yyly_list[this.yylyIndex].id);
				// 	}else{									//唯一码
				// 		this.callBack(sku_code);
				// 	}
				// }
				// return;
				dd.ready(() => {
					dd.biz.util.scan({
						onSuccess: (data) => {
							var sku_code = "";	
							if(data.text.indexOf('=') > -1){
								sku_code = data.text.split('=')[1];
							}else{
								sku_code = data.text;
							}
							if(this.page_type == 'yybd'){	//样衣绑定
								if(this.yylyIndex == 0){	//外部采购
									if(sku_code.length < 14){	
										this.getSkuCodeInfo(sku_code);
									}else{		
										this.$toast('请扫描样衣码');
									}
								}else{						//内部调拨
									if(sku_code.length < 14){				//样衣码
										this.$toast('请扫描商品编码或唯一码');
									}else if(sku_code.length == 14){		//商品编码
										this.$router.push('/bmbd_index?spbm=' + sku_code + '&batch_id=' + this.bindingInfo.binding_id + '&type=' + this.yyly_list[this.yylyIndex].id);
									}else{									//唯一码
										this.callBack(sku_code);
									}
								}
							}else{	//样衣归还
								let arg = {
									sku_code:sku_code,
									batch_id:this.returnInfo.return_id,
									type:'1'
								}
								resource.scanGoods(arg).then(res => {
									if(res.code == 1){
										this.$toast(res.msg);
										this.page = 1;
										this.listArray = [];
										//获取已绑定的商品列表
										this.getGoodsList();
									}
								})
							}
						},
						onFail : (err) => {
							console.log(err)
						}
					})
				})
			},
			//验证样衣码接口
			getSkuCodeInfo(sku_code){
				resource.getSkuCodeInfo({sku_code:sku_code}).then(res => {
					if(res.code == '1'){
						this.$router.push('/bmbd_index?yym=' + sku_code + '&batch_id=' + this.bindingInfo.binding_id+ '&type=' + this.yyly_list[this.yylyIndex].id);
					}
				})
			},
			//仓内调拨直接添加
			callBack(sku_code){		
				var arg = {
					type:1,
					batch_id:this.bindingInfo.binding_id,
					unique_ksbm:sku_code
				}
				resource.bindGoods(arg).then(res => {
					if(res.code == 1){
						this.$toast(res.msg);
						//获取已绑定的商品列表
						this.getGoodsList();
					}
				})
			},
			//切换样衣间
			checkYyj(index){
				this.roomIndex = index;
				if(index > this.room_list.length - 1){
					this.room_name = "";
					this.room_id = "";
				}else{
					this.room_name = this.room_list[index].room_name;
					this.room_id = this.room_list[index].room_id;
					this.room_type = this.room_list[index].type;
				}
				this.showPopup = false;
			}
		},
		components:{
			DialogModel,
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 15px;
	.yyj_gly{
		width: 100%;
		padding-left:15px;
		padding-right:15px;
		.row{
			display:flex;
			padding-top: 5px;
			padding-bottom: 5px;
			justify-content: space-between;
			font-size: 14px;
			color: #000000;
			.value{
				display:flex;
				align-items: center;
				.yyj_txt{
					color: rgba(0, 0, 0, 0.4);
				}
				.default_txt{
					color:#2C82FF;
				}
			}
		}
	}
	.yy_list{
		flex:1;
		overflow-y: scroll;
		.yy_item{
			margin-bottom: 6px;
			padding-left: 15px;
			padding-right: 15px;
			width: 100%;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.yy_img{
				margin-right: 15px;
				width: 70px;
				height: 70px;
			}
			.yy_content{
				flex:1;
				height: 70px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.yy_row{
					font-size: 14px;
					color: #000000;
				}
			}
			.delete_icon{
				width: 18px;
				height: 20px;
			}
		}
	}
	.bottom_box{
		.all_delete{
			margin-top:15px; 
			width: 100%;
			text-align: center;
			color: #428FFF;
			font-size: 14px;
		}
		.button_box{
			width: 100%;
			height: 70px;
			display:flex;
			align-items: center;
			justify-content: space-around;
			.button{
				border-radius: 20px;
				border:1px solid #2C82FF;
				width: 160px;
				height: 40px;
				display:flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				font-weight: 500;
				.bind_scan_icon{
					margin-right: 4px;
					width: 14px;
					height: 14px;
				}
				.scan_text{
					color: #2C82FF;
				}
			}
			.rk_button{
				background: #2C82FF;
				color: #ffffff;
			}
		}
	}
	.right_arrow{
		margin-left: 15px;
		width: 12px;
		height: 24px;
	}
	.padding_box{
		width: 100%;
		height: 8px;
		background:#F2F2F2;
	}
	.list{
		max-height: 300px;
		overflow-y: scroll;
	}
	.item{
		width: 100%;
		text-align: center;
		height: 56px;
		line-height: 56px;
		font-size: 17px;
		color: #000000;
	}
	.active_item{
		color: #2C82FF;
	}
}
</style>