<template>
	<div class="container">
		<div class="yyj_gly" v-if="page_type == 'ghjl'">
			<div class="row">
				<div class="lable">样衣间：</div>
				<div class="value">{{topInfo.room_name}}</div>
			</div>
			<div class="row">
				<div class="lable">管理员：</div>
				<div class="value">{{topInfo.admin_name}}</div>
			</div>
			<div class="row">
				<div class="lable">归还时间：</div>
				<div class="value">{{topInfo.finish_time}}</div>
			</div>
			<div class="row">
				<div class="lable">样衣合计：</div>
				<div class="value">{{total_num}}</div>
			</div>
		</div>
		<div class="yyj_gly" v-if="page_type == 'cljl'">
			<div class="row">
				<div class="lable">管理员：</div>
				<div class="value">{{topInfo.user_name}}</div>
			</div>
			<div class="row">
				<div class="lable">处理时间：</div>
				<div class="value">{{topInfo.finish_time}}</div>
			</div>
			<div class="row">
				<div class="lable">处理状态：</div>
				<div class="value">{{topInfo.type == '1'?'内销':'外销'}}</div>
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item border_bottom" v-for="(item,index) in listArray" :key="index + 1">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
	<!-- 归还记录样衣间转移 -->
	<div class="bottom_box" v-if="is_beyond && topInfo.return_type == 1">
		<div class="button" @click="showPopup = true">样衣间转移</div>
	</div>
	<!-- 样衣间 -->
	<van-popup v-model:show="showPopup" position="bottom" round>
		<div class="list">
			<div class="item" :class="{'active_item':roomIndex == index}" v-for="(item,index) in room_list" @click="checkYyj(item.room_name,item.room_id)">{{item.room_name}}</div>
		</div>
		<div class="padding_box"></div>
		<div class="item" @click="showPopup = false">取消</div>
	</van-popup>
	<!-- 转移前提醒 -->
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	import DialogModel from '../../components/dialog_model.vue'
	export default{
		data(){
			return{
				listArray:[],		//列表
				total_num:0,
				loading:false,
				finished:false,
				page:1,
				pagesize:10,
				page_type:"",			//页面来源
				batch_id:"",		
				topInfo:{},				//头部信息
				showPopup:false,		//选择样衣间弹窗
				room_list:[],				//样衣间列表
				roomIndex:999,				//选中的样衣间下标
				room_id:"",					//选中的样衣间id 
				showModel:false,			//提醒弹窗
				value:"",					//提醒文字
				is_beyond:false,			//是否超出24小时
			}
		},
		created(){
			this.page_type = this.$route.query.page_type;
			this.batch_id = this.$route.query.batch_id;
			if(this.page_type == 'cljl'){	//处理记录
				//处理记录头部信息
				this.handleDetail()
			}else{	
				//归还记录头部信息
				this.returnDetail();
			}
			//获取已绑定的商品列表
			this.getGoodsList()
		},
		methods:{
			//判断是否大于24小时
			getTimeFormat(time){
				let finish_time = (new Date(time).getTime()); 
				let current_time = (new Date().getTime()); 
				this.is_beyond = (current_time - finish_time) < 86400000;
			},
			//处理记录头部信息
			handleDetail(){
				resource.handleDetail({handle_id:this.batch_id}).then(res => {
					if(res.code == 1){
						this.topInfo = res.data;
					}
				})
			},
			//归还记录头部信息
			returnDetail(){
				resource.returnDetail({return_id:this.batch_id}).then(res => {
					if(res.code == 1){
						this.topInfo = res.data;
						//判断是否大于24小时
						this.getTimeFormat(this.topInfo.finish_time);
						//获取样衣间列表
						this.getAjaxRooms();
					}
				})
			},
			//加载更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.getGoodsList();
			},
			//获取已绑定的商品列表
			getGoodsList(){
				let arg = {
					batch_id:this.batch_id,
					type:this.page_type == 'ghjl'?'1':'4',
					page:this.page,
					pagesize:this.pagesize
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						this.total_num = res.data.total;
						this.listArray = [...this.listArray,...res.data.data];
						if(this.page == res.data.last_page){
							this.finished = true;
						}
					}
				})
			},
			//获取样衣间列表
			getAjaxRooms(){
				let arg = {
					is_return:0
				}
				resource.ajaxRooms(arg).then(res => {
					if(res.code == 1){
						this.room_list = res.data;
						this.roomIndex = this.room_list.findIndex(item => {
							return this.topInfo.room_id == item.room_id;
						})
					}
				})
			},
			//切换样衣间
			checkYyj(room_name,room_id){
				this.room_id = room_id;
				this.value = `确定要将样衣间转移至${room_name}吗？`;
				this.showPopup = false;
				this.showModel = true;
			},
			//弹窗确认
			callbackFn(v){
				if(v == '1'){
					this.showModel = false;
				}else{
					let arg = {
						room_id:this.room_id,
						return_id:this.batch_id
					}
					resource.editRoom(arg).then(res => {
						if(res.code == 1){
							this.showModel = false;
							this.$toast(res.msg);
							setTimeout(()=>{
								this.$router.go(-1);
							},1000)
						}
					})
				}
			}
		},
		components:{
			EmptyPage,
			DialogModel
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding-left: 30px;
	padding-right: 30px;
}
.yyj_gly{
	width: 100%;
	padding-top:10px;
	padding-bottom:10px;
	.row{
		padding-top: 5px;
		padding-bottom: 5px;
		display:flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #000000;
	}
}
.van_list{
	flex:1;
	overflow-y: scroll;
	.yy_item{
		margin-bottom: 6px;
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
	}
}
.bottom_box{
	width: 100%;
	height: 70px;
	display:flex;
	align-items: center;
	justify-content: center;
	.button{
		border-radius: 20px;
		background: #2C82FF;
		color: #ffffff;
		width: 160px;
		height: 40px;
		display:flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: 500;
	}
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
</style>