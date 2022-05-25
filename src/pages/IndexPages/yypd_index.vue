<template>
	<div class="container">
		<div class="tab_box">
			<div class="tab_item left" :class="{'active_back':active_index == '1'}" @click="checkTab('1')">
				未完成
				<div class="num" :class="{'active_num':active_index == '1'}">4</div>
			</div>
			<div class="tab_item right" :class="{'active_back':active_index == '2'}" @click="checkTab('2')">
				已完成
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		class="van_list"
		>
		<div class="task_item" v-for="item in task_list" @click="goPdxq">
			<div class="item_lable">您有新的盘点任务待完成</div>
			<div class="item_value">05/11/12:45</div>
		</div>
	</van-list>

</div>
</template>
<script>
	export default{
		data(){
			return{
				active_index:'1',		//tab选中
				task_list:20,			//列表
				loading:false,			//是否加载中
				finished:false,			//是否是最后一页
			}
		},
		methods:{
			//切换顶部tab
			checkTab(type){
				this.active_index = type;
			},
			//盘点详情
			goPdxq(){
				this.$router.push('/pdxq_index');
			},
			//加载更多
			loadMore(){
				console.log('加载更多')
			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20rem;
	padding-right: 20rem;
	display: flex;
	flex-direction: column;
	.tab_box{
		margin-top: 10rem;
		margin-bottom: 20rem;
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
		.task_item{
			width: 100%;
			height: 70rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14rem;
			.item_lable{
				color: #333333;
			}
			.item_value{
				color: #666666;
			}
		}

	}
}
</style>