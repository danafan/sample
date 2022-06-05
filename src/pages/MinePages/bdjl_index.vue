<template>
	<div class="container">
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="bdjl_item" v-for="item in listArray" @click="goDetail(item.binding_id)">
			<div class="item_left">
				<div class="code">{{item.binding_id}}</div>
				<div>{{item.user_name}}</div>
			</div>
			<div class="item_right">{{item.add_time}}</div>
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
				loading:true,
				finished:false,
				page:1,
				pagesize:10
			}
		},
		created(){
			//获取绑定记录
			this.bindingRecord();
		},
		methods:{
			//获取绑定记录
			bindingRecord(){
				resource.bindingRecord().then(res => {
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
			goDetail(batch_id){
				this.$router.push('/bdjlxq?batch_id=' + batch_id);
			},
			//获取更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.bindingRecord();
			}
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20px;
	padding-right: 20px;
	.van_list{
		flex:1;
		overflow-y: scroll;
		width: 100%;
		.bdjl_item{
			width: 100%;
			height: 70px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			.item_left{
				color: #333333;
				display: flex;
				align-items: center;
				.code{
					margin-right: 15px;
				}
			}
			.item_right{
				color: #666666;
			}
		}
	}
}
</style>