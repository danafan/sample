<template>
	<div class="container">
		<div class="yyj_gly" v-if="page_type == 'ghjl'">
			<div class="row">
				<div class="lable">样衣仓：</div>
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
		<div class="yy_item" v-for="(item,index) in listArray" :key="index + 1">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				listArray:[],		//列表
				loading:false,
				finished:false,
				page:0,
				pagesize:10,
				page_type:"",			//页面来源
				batch_id:"",		
				topInfo:{},				//头部信息
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
		},
		methods:{
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
					type:this.page_type == 'yygh'?'1':'4',
					page:this.page,
					pagesize:this.pagesize
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						this.listArray = [...this.listArray,...res.data.data];
						if(this.page == res.data.last_page){
							this.finished = true;
						}
					}
				})
			},
		},
		components:{
			EmptyPage
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
</style>