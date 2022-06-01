<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div>我的应盘总样衣：</div>
				<div>{{topInfo.total_num}}</div>
			</div>
			<div class="row">
				<div>计划完成日期：</div>
				<div>{{topInfo.plan_finish_time}}</div>
			</div>
		</div>
		<div class="tab_box">
			<div class="tab_item left" :class="{'active_back':active_index == '0'}" @click="checkTab('0')">
				未盘
				<div class="num" :class="{'active_num':active_index == '0'}">{{topInfo.uncheck_num}}</div>
			</div>
			<div class="tab_item right" :class="{'active_back':active_index == '1'}" @click="checkTab('1')">
				已盘
				<div class="num" :class="{'active_num':active_index == '1'}">{{topInfo.checked_num}}</div>
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了" class="van_list">
		<div class="yy_item" v-for="(item,index) in listArray" :key="index + 1">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
			<img class="bs_icon" src="../../static/bs_icon.png" @click="bsFn(item.sku_code)" v-if="active_index == '0'">
		</div>
	</van-list>
	<div class="bottom" v-if="type == '0'">
		<div class="button" @click="scanYyCode">
			<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
			<div class="scan_text">扫一扫</div>
		</div>
	</div>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				type:"",				//0:未完成；1:已完成
				batch_id:"",			//批次ID
				topInfo:{},				//头部信息
				active_index:"0",		//切换下标
				loading:false,
				finished:false,
				page:0,
				pagesize:10,
				listArray:[],			//列表
			}
		},
		created(){
			this.type = this.$route.query.type;
			this.batch_id = this.$route.query.batch_id;
			//获取头部信息
			this.checkDetail();
		},
		methods:{
			//获取头部信息
			checkDetail(){
				resource.checkDetail({check_id:this.batch_id}).then(res => {
					this.topInfo = res.data;
				})
			},
			//切换选中
			checkTab(type){
				this.active_index = type;
				this.page = 1;
				this.listArray = [];
				//商品列表
				this.checkGoodsList();
			},
			//扫一扫
			scanYyCode(){
				let arg = {
					sku_code:2,
					batch_id:this.batch_id
				}
				resource.checkScanGoods(arg).then(res => {
					this.$toast(res.msg);
					this.page = 1;
					this.listArray = [];
					//获取已绑定的商品列表
					this.checkGoodsList();
					//获取头部信息
					this.checkDetail();
				})
			},
			//点击报损
			bsFn(sku_code){
				//添加
				this.$router.push('/yybs_index?sku_code=' + sku_code + '&batch_id=' + this.batch_id);
			},
			//加载更多
			loadMore(){
				this.page += 1;
				//商品列表
				this.checkGoodsList();
			},
			//商品列表
			checkGoodsList(){
				let arg = {
					batch_id:this.batch_id,
					status:this.active_index,
					page:this.page,
					pagesize:this.pagesize
				}
				resource.checkGoodsList(arg).then(res => {
					this.loading = false;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding-left:20rem;
	padding-right:20rem;
	.yyj_gly{
		padding: 10rem;
		.row{
			padding-top: 5rem;
			padding-bottom: 5rem;
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14rem;
			color: #000000;
		}
	}
	.tab_box{
		margin-top: 15rem;
		margin-bottom: 25rem;
		display: flex;
		height: 38rem;
		.tab_item{
			background:#F9FBFC;
			width: 50%;
			height: 38rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14rem;
			color: #333333;
			.num{
				margin-left: 6rem;
				border-radius: 8rem;
				background:#1572F9;
				padding-left: 5rem;
				padding-right: 5rem;
				height: 16rem;
				line-height: 16rem;
				font-size: 12rem;
				color: #ffffff;
			}
			.active_num{
				background:#ffffff;
				color: #1572F9;
			}
		}
		.left{
			border-radius: 19rem 0 0 19rem;
		}
		.right{
			border-radius: 0 19rem 19rem 0;
		}
		.active_back{
			background: #1572F9;
			color: #ffffff;
		}
	}
	.van_list{
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
			.bs_icon{
				width: 24rem;
				height: 24rem;
			}
		}
	}
	.bottom{
		height: 70rem;
		display: flex;
		align-items: center;
		justify-content: center;

		.button{
			border-radius: 20rem;
			border:1px solid #2C82FF;
			width: 100%;
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