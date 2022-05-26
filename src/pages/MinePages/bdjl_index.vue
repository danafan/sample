<template>
	<div class="container">
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		class="van_list"
		>
		<div class="bdjl_item" v-for="item in listArray" @click="goDetail">
			<div class="item_left">
				<div class="code">00001</div>
				<div>人员姓名</div>
			</div>
			<div class="item_right">05/11/12:45</div>
		</div>
	</van-list>
</div>
</template>
<script>
	export default{
		data(){
			return{
				listArray:['','',''],		//列表
				loading:false,
				finished:false,
			}
		},
		methods:{
			//点击进入详情
			goDetail(){
				this.$router.push('/bdjlxq');
			},
			//获取更多
			loadMore(){

			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20rem;
	padding-right: 20rem;
	.van_list{
		.bdjl_item{
			width: 100%;
			height: 70rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14rem;
			.item_left{
				color: #333333;
				display: flex;
				align-items: center;
				.code{
					margin-right: 15rem;
				}
			}
			.item_right{
				color: #666666;
			}
		}
	}
}
</style>