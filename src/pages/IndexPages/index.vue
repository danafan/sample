<template>
	<div>
		<img class="index_back" src="../../static/index_back.png">
		<div class="container">
			<div class="title">德儿电子商务样衣系统</div>
			<div class="card_box">
				<div class="list_box">
					<div class="item" @click="$router.push('/yybd_index?type=yybd')">
						<img class="item_icon" src="../../static/yybd_icon.png">
						<div class="item_lable">样衣绑定</div>
					</div>
					<div class="item" @click="$router.push('/fqjy_index')">
						<img class="item_icon" src="../../static/fqjy_icon.png">
						<div class="item_lable">发起借样</div>
					</div>
					<div class="item" @click="$router.push('/yybd_index?type=yygh')">
						<img class="item_icon" src="../../static/yygh_icon.png">
						<div class="item_lable">样衣归还</div>
					</div>
					<div class="item" @click="$router.push('/yypd_index')">
						<img class="item_icon" src="../../static/yypd_icon.png">
						<div class="item_lable">样衣盘点</div>
					</div>
					<div class="item" @click="$router.push('/zjcl_index')">
						<img class="item_icon" src="../../static/zjcl_icon.png">
						<div class="item_lable">样衣处理</div>
					</div>
					<div class="item" @click="yybsFn">
						<img class="item_icon" src="../../static/yybs_icon.png">
						<div class="item_lable">样衣报损</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		methods:{
			//扫码报损
			yybsFn(){
				this.$router.push('/yybs_index?sku_code=' + 20);
			}
		}
	}
</script>
<style lang="less" scoped>
.index_back{
	width: 100%;
	height: 190rem;
}
.container{
	.title{
		margin-top: 58rem;
		width: 100%;
		text-align: center;
		font-size: 24rem;
		color: #ffffff;
		font-weight: 500;
	}
	.card_box{
		padding-top: 52rem;
		margin-top: 58rem;
		background: #ffffff;
		border-radius: 67rem 67rem 0 0;
		.list_box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.item{
				margin-bottom: 40rem;
				width: 120rem;
				display:flex;
				flex-direction: column;
				align-items: center;
				.item_icon{
					margin-bottom: 8rem;
					width: 48rem;
					height: 48rem;
				}
				.item_lable{
					font-size: 14rem;
					color:#000000;
				}
			}
		}
	}
}
</style>