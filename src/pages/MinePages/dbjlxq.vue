<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div>入库批次：</div>
				<div>{{batch_id}}</div>
			</div>
			<div class="row">
				<div>责任人：</div>
				<div>{{topInfo.user_name}}</div>
			</div>
			<div class="row">
				<div>提交人：</div>
				<div>{{topInfo.room_name}}</div>
			</div>
			<div class="row">
				<div>绑定时间：</div>
				<div>{{topInfo.finish_time}}</div>
			</div>
		</div>
		<div class="tab_row">
			<div class="tab_item all" :class="{'active_item':tab_index == 0}" @click="checkTab(0)">
				全部
			</div>
			<div class="tab_item" :class="{'active_item':tab_index == 1}" @click="checkTab(1)">
				收到
			</div>
			<div class="tab_item wsd" :class="{'active_item':tab_index == 2}" @click="checkTab(2)">
				未收到
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item" v-for="item in listArray" @click="goDetail(item.sku_code)">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<!-- <div class="status">收到</div> -->
				<van-radio-group v-model="checked" direction="horizontal">
					<van-radio name="1" @click.stop.native="()=>{}">收到</van-radio>
					<van-radio name="2" @click.stop.native="()=>{}">未收到</van-radio>
				</van-radio-group>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
	<div class="button_box">
		<div class="button">一键确认</div>
	</div>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				checked:'1',
				topInfo:{},			//顶部信息
				batch_id:"",				//批次ID
				tab_index:0,
				listArray:[],		//列表
				loading:true,
				finished:false,
				page:1,
				pagesize:10
			}
		},
		created(){
			//批次ID
			this.batch_id = this.$route.query.batch_id;
			//获取商品列表
			this.getGoodsList();
			//绑定记录详情
			this.bindingDetail();
		},
		methods:{
			//绑定记录详情
			bindingDetail(){
				resource.bindingDetail({binding_id:this.batch_id}).then(res => {
					if(res.code == 1){
						this.topInfo = res.data;
					}
				})
			},
			//切换选中tab
			checkTab(index){
				this.tab_index = index;
				this.page = 1;
				this.listArray = [];
				this.loading = true;
				this.finished = false;
				//调拨记录记录
				this.getGoodsList();
			},
			//获取商品列表
			getGoodsList(){
				let arg = {
					batch_id:this.batch_id,
					type:0,
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
			//点击进入详情
			goDetail(sku_code){
				this.$router.push('/yyxq?sku_code=' + sku_code + '&type=1&' + 'batch_id=' + this.batch_id);
			},
			//获取更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.getGoodsList();
			}
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
	padding: 15px;
	.yyj_gly{
		width: 100%;
		height: 140px;
		padding-left:15px;
		padding-right:15px;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		.row{
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: #000000;
		}
	}
	.tab_row{
		margin-top: 10px;
		margin-bottom: 10px;
		width: 100%;
		display: flex;
		height: 38px;
		.tab_item{
			border:1px solid #B9D6FF;
			flex:1;
			text-align: center;
			height: 38px;
			line-height: 38px;
			font-size: 14px;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.all{
			border-radius: 19px 0 0 19px;
		}
		.wsd{
			border-radius: 0 19px 19px 0;
		}
		.active_item{
			color: #ffffff;
			background:#1572F9;
		}
	}
	.van_list{
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
				font-size: 14px;
				.yy_row{
					color: #000000;
				}
				.status{
					font-size: 14px;
					color: #1572F9;
				}
			}
			.right_arrow{
				width: 12px;
				height: 24px;
			}
		}
	}
	.button_box{
		width: 100%;
		height: 70px;
		display:flex;
		align-items: center;
		justify-content: space-around;
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
}
</style>