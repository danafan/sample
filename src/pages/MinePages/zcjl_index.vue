<template>
	<div class="container">
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		class="van_list"
		>
		<div class="item" @click="goZcxq" v-for="item in listArray">
			<div class="item_label">折价记录</div>
			<div class="item_value">05/11/12:45</div>
		</div>
	</van-list>
</div>
</template>
<script>
	export default{
		data(){
			return{
				listArray:['','','','','','','','','','','','','','',''],		//列表
				loading:false,
				finished:false,
				page_type:"",			//页面来源
			}
		},
		created(){
			this.page_type = this.$route.query.page_type;
		},
		methods:{
			//加载更多
			loadMore(){

			},
			//跳转详情
			goZcxq(){
				this.$router.push('/zcxq?page_type=' + this.page_type);
			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20rem;
	padding-right: 20rem;
}
.van_list{
	.item{
		width: 100%;
		height: 70rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14rem;
		.item_label{
			color: #333333;
		}
		.item_value{
			color: #666666;
		}
	}
}
</style>