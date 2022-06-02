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
				<div>样衣间：</div>
				<div>{{topInfo.room_name}}</div>
			</div>
			<div class="row">
				<div>入库时间：</div>
				<div>{{topInfo.finish_time}}</div>
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
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
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
				topInfo:{},			//顶部信息
				batch_id:"",				//批次ID
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
				this.$router.push('/yyxq?sku_code=' + sku_code + '&type=0&' + 'batch_id=' + this.batch_id);
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
	padding: 15rem;
	.yyj_gly{
		width: 100%;
		height: 140rem;
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
			.right_arrow{
				width: 12rem;
				height: 24rem;
			}
		}
	}
}
</style>