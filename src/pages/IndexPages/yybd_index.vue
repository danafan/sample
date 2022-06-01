<template>
	<div class="container">
		<div class="yyj_gly">
			<!-- 样衣绑定 -->
			<div class="row" v-if="page_type == 'yybd'">
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
			<div class="row">
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
		>
		<div class="yy_item" v-for="(item,index) in listArray" @click="goDetail(item.sku_code)">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
			<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1',item.sku_code,index)">
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</van-list>
	<div class="bottom_box">
		<div class="all_delete" @click="modelFn('2')" v-if="page_type == 'yybd' && listArray.length > 0">全部清空</div>
		<div class="button_box">
			<!-- 样衣绑定 -->
			<div class="button" @click="scanYyCode" v-if="page_type == 'yybd'">
				<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
				<div class="scan_text">扫描样衣码</div>
			</div>
			<div class="button rk_button" @click="modelFn('3')" v-if="page_type == 'yybd'">提交</div>
			<!-- 样衣归还 -->
			<div class="button" @click="scanYyCode" v-if="page_type == 'yygh'">
				<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
				<div class="scan_text">扫码</div>
			</div>
			<div class="button rk_button" @click="modelFn('4')" v-if="page_type == 'yygh'">归还</div>
		</div>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
	<van-popup v-model:show="showPopup" position="bottom" round>
		<div class="list">
			<div class="item" :class="{'active_item':item.room_id == room_id}" v-for="(item,index) in room_list" @click="checkYyj(item.room_id,item.room_name)">{{item.room_name}}</div>
		</div>
		<div class="padding_box"></div>
		<div class="item" @click="showPopup = false">取消</div>
	</van-popup>
</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
	import DialogModel from '../../components/dialog_model.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				user_name:"",				//责任人
				user_id:"",					//责任人ID
				admin_name:"",				//管理员
				showPopup:false,			//选择样衣间弹窗
				room_list:[],				//样衣间列表
				room_name:"",				//选中的样衣间名称
				room_id:"",					//选中的样衣间id 
				bindingInfo:{},				//获取页面批次信息(绑定页面)
				returnInfo:{},				//获取页面批次信息(归还页面)
				page:1,
				pagesize:10,				
				listArray:[],				//列表
				total_num:0,				//总数量
				loading:true,
				finished:false,
				showModel:false,			//是否显示弹窗
				sku_code:"",				//点击单条删除的sku_code
				goods_index:"",				//点击单条删除的index
				value:"",					//弹窗内容
				modelType:"",				//弹窗类型
				page_type:"yybd",			//页面来源
			}
		},
		computed:{
         	userInfo(){
         		return this.$store.state.userInfo;
         	}
         },
		created(){
			//页面来源
			this.page_type = this.$route.query.type;
			//获取样衣间列表
			this.getAjaxRooms();
		},
		methods:{
			//获取样衣间列表
			getAjaxRooms(){
				resource.ajaxRooms().then(res => {
					this.room_list = res.data;
					if(this.page_type == 'yybd'){	//样衣绑定
						//进入绑定页面获取批次信息
						this.getbBindingInfo();
					}else{							//样衣归还
						//进入归还页面获取批次信息
						this.getReturnInfo();
					}
				})
			},
			//进入绑定页面获取批次信息
			getbBindingInfo(){
				resource.getbBindingInfo().then(res => {
					this.bindingInfo = res.data;
					this.user_name = this.userInfo.user_name;
					this.user_id = this.userInfo.userid;
					this.room_name = this.bindingInfo.room_name;
					this.room_id = this.bindingInfo.room_id;
					//获取商品列表
					this.getGoodsList();
				})
			},
			//进入归还页面获取批次信息
			getReturnInfo(){
				resource.getReturnAdd().then(res => {
					this.returnInfo = res.data;
					this.admin_name = this.returnInfo.admin_name;
					this.room_name = this.returnInfo.room_name;
					this.room_id = this.returnInfo.room_id;
					//获取商品列表
					this.getGoodsList();
				})
			},
			//获取更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.getGoodsList();
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
					this.loading = false;
					this.total_num = res.data.total;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
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
					if(this.room_id != ''){
						this.value = `即将入库${this.total_num}件商品？`;
						this.showModel = true;
					}else{
						//底部提交(样衣绑定)
						this.postbBinding();
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
			//底部提交(样衣绑定)
			postbBinding(){
				var arg = {
					binding_id:this.bindingInfo.binding_id
				}
				if(this.room_id != ''){
					arg.room_id = this.room_id;
					arg.room_name = this.room_name;
				}
				resource.postbBinding(arg).then(res => {
					if(this.room_id != ''){
						this.$router.push('/success?value=' + '入库成功' + '&showBut=1&img_url=success');
					}else{
						this.$router.push('/success?value=' + '借样成功' + '&showBut=1&img_url=jy');
					}
				})
			},
			//归还提交
			postReturnAdd(){
				let arg = {
					room_id:this.room_id,
					room_name:this.room_name,
					return_id:this.returnInfo.return_id
				}
				resource.postReturnAdd(arg).then(res => {
					this.$router.replace('/success?value=' + '归还成功' + '&img_url=gh');
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
					this.$toast(res.msg);
					if(this.modelType == '1'){
						this.listArray.splice(this.goods_index,1);
					}else{
						this.page = 1;
						this.listArray = [];
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
						onSuccess : function(res) {
							// 调用成功时回调
							console.log(res)
						},
						onFail : function(err) {
							// 调用失败时回调
							console.log(err)
						}
					});
				})
			},
			//点击进入详情
			goDetail(sku_code){
				this.$router.push('/yyxq?sku_code=' + sku_code);
			},
			//点击扫描样衣码
			scanYyCode(){
				if(this.page_type == 'yybd'){	//样衣绑定
					this.$router.push('/bmbd_index?yym=' + Math.floor(Math.random()*100+8) + '&batch_id=' + this.bindingInfo.binding_id);
				}else{	//样衣归还
					let arg = {
						sku_code:24,
						batch_id:this.returnInfo.return_id,
						type:'1'
					}
					resource.scanGoods(arg).then(res => {
						this.$toast(res.msg);
						this.page = 1;
						this.listArray = [];
						//获取已绑定的商品列表
						this.getGoodsList();
					})
				}
			},
			//切换样衣间
			checkYyj(room_id,room_name){
				this.room_name = room_name;
				this.room_id = room_id;
				this.showPopup = false;
			}
		},
		components:{
			DialogModel
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 15rem;
	.yyj_gly{
		width: 100%;
		height: 86rem;
		padding-left:15rem;
		padding-right:15rem;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		.row{
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14rem;
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
			margin-bottom: 6rem;
			padding-left: 15rem;
			padding-right: 15rem;
			width: 100%;
			height: 100rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.yy_img{
				margin-right: 15rem;
				width: 70rem;
				height: 70rem;
			}
			.yy_content{
				flex:1;
				height: 70rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.yy_row{
					font-size: 14rem;
					color: #000000;
				}
			}
			.delete_icon{
				width: 18rem;
				height: 20rem;
			}
		}
	}
	.bottom_box{
		.all_delete{
			margin-top:15rem; 
			width: 100%;
			text-align: center;
			color: #428FFF;
			font-size: 14rem;
		}
		.button_box{
			width: 100%;
			height: 70rem;
			display:flex;
			align-items: center;
			justify-content: space-around;
			.button{
				border-radius: 20rem;
				border:1px solid #2C82FF;
				width: 160rem;
				height: 40rem;
				display:flex;
				align-items: center;
				justify-content: center;
				font-size: 14rem;
				font-weight: 500;
				.bind_scan_icon{
					margin-right: 4rem;
					width: 14rem;
					height: 14rem;
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
		margin-left: 15rem;
		width: 12rem;
		height: 24rem;
	}
	.padding_box{
		width: 100%;
		height: 8rem;
		background:#F2F2F2;
	}
	.list{
		max-height: 300px;
		overflow-y: scroll;
	}
	.item{
		width: 100%;
		text-align: center;
		height: 56rem;
		line-height: 56rem;
		font-size: 17rem;
		color: #000000;
	}
	.active_item{
		color: #2C82FF;
	}
}
</style>