<template>
	<div class="container">
		<van-list  v-model:loading="loading"
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
				page:1,
				pagesize:10
			}
		},
		created(){
			//获取已绑定的商品列表
			this.getGoodsList();
		},
		methods:{
			//加载更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.getGoodsList();
			},
			//获取已绑定的商品列表
			getGoodsList(){
				let arg = {
					type:'3',
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
.van_list{
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