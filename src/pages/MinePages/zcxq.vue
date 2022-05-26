<template>
	<div class="container">
		<div class="yyj_gly" v-if="page_type == 'ghjl'">
			<div class="row">
				<div class="lable">样衣仓：</div>
				<div class="value">王芳芳</div>
			</div>
			<div class="row">
				<div class="lable">管理员：</div>
				<div class="value">王芳芳</div>
			</div>
			<div class="row">
				<div class="lable">归还时间：</div>
				<div class="value">王芳芳</div>
			</div>
		</div>
		<div class="yyj_gly" v-if="page_type == 'cljl'">
			<div class="row">
				<div class="lable">管理员：</div>
				<div class="value">王芳芳</div>
			</div>
			<div class="row">
				<div class="lable">处理时间：</div>
				<div class="value">王芳芳</div>
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		class="van_list"
		>
		<div class="yy_item" v-for="item in listArray">
			<img class="yy_img" src="../../static/index_back.png">
			<div class="yy_content">
				<div class="yy_row">样衣码：2376452734</div>
				<div class="yy_row">款式编码：2376452734</div>
			</div>
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
			loadMore(){

			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding-left: 30rem;
	padding-right: 30rem;
}
.yyj_gly{
	width: 100%;
	padding-top:10rem;
	padding-bottom:10rem;
	.row{
		padding-top: 5rem;
		padding-bottom: 5rem;
		display:flex;
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
	}
}
</style>