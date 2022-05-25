<template>
	<div class="container">
		<div class="top_back">
			<img class="mine_back" src="../../static/mine_back.png">
			<div class="mine_back my_info">
				<div class="margin_bottom">所属部门：新兴事业部</div>
				<div>姓名：王一一</div>
			</div>
		</div>
		<div class="option_item" @click="$router.push('/bdjl_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/bdjl_icon.png">
				<div class="option_label">绑定记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item" @click="$router.push('/wdjy_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/wdjy_icon.png">
				<div class="option_label">我的借样</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item">
			<div class="option_left">
				<img class="option_icon" src="../../static/jyjl_icon.png">
				<div class="option_label">借样记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item">
			<div class="option_left">
				<img class="option_icon" src="../../static/ghjl_icon.png">
				<div class="option_label">归还记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item">
			<div class="option_left">
				<img class="option_icon" src="../../static/zjjl_icon.png">
				<div class="option_label">折价记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item">
			<div class="option_left">
				<img class="option_icon" src="../../static/bsjl_icon.png">
				<div class="option_label">报损记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style lang="less" scoped>
.top_back{
	position: relative;
	width: 100%;
	height: 95rem;
	.mine_back{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.my_info{
		padding-left: 20rem;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-size: 16rem;
		font-weight: 600;
		.margin_bottom{
			margin-bottom: 12rem;
		}
	}
}
.option_item{
	padding-left: 15rem;
	padding-right: 15rem;
	height: 56rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.option_left{
		display: flex;
		align-items: center;
		.option_icon{
			margin-right: 10rem;
			height: 26rem;
			width: 26rem;
		}
		.option_label{
			font-size: 14rem;
			color: #333333;
		}
	}
	.right_arrow{
		width: 12rem;
		height: 24rem;
	}
}
</style>