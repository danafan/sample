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
	</div>
</template>
<script>
	export default{
		data(){
			return{
				active_index:'1',		//tab选中
			}
		},
		methods:{
			//切换顶部tab
			checkTab(type){
				this.active_index = type;
			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20rem;
	padding-right: 20rem;
	.tab_box{
		margin-top: 10rem;
		margin-bottom: 10rem;
		display: flex;
		height: 38rem;
		.tab_item{
			background:#ffffff;
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
}
</style>