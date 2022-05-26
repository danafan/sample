<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div>入库批次：</div>
				<div>0001</div>
			</div>
			<div class="row">
				<div>管理员：</div>
				<div>王芳芳</div>
			</div>
			<div class="row">
				<div>样衣间：</div>
				<div>第五样衣间</div>
			</div>
			<div class="row">
				<div>入库时间：</div>
				<div>2019-09-04 12：00</div>
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		class="van_list"
		>
		<div class="yy_item" v-for="item in listArray" @click="goDetail">
			<img class="yy_img" src="../../static/index_back.png">
			<div class="yy_content">
				<div class="yy_row">样衣码：2376452734</div>
				<div class="yy_row">款式编码：2376452734</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
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
				this.$router.push('/yyxq');
			},
			//获取更多
			loadMore(){

			}
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