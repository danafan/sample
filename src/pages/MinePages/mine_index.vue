<template>
	<div class="container">
		<div class="top_back">
			<img class="mine_back" src="../../static/mine_back.png">
			<div class="mine_back my_info">
				<div class="margin_bottom">所属部门：{{userInfo.dept_name}}</div>
				<div>姓名：{{userInfo.user_name}}</div>
			</div>
		</div>
		<div class="option_item" @click="$router.push('/bdjl_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/bdjl_icon.png">
				<div class="option_label">入库记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item" @click="$router.push('/wdjy_index?page_type=wdjy')">
			<div class="option_left">
				<img class="option_icon" src="../../static/wdjy_icon.png">
				<div class="option_label">我的借样</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item" @click="$router.push('/wdjy_index?page_type=jyjl')" v-if="userInfo.user_type == '1'">
			<div class="option_left">
				<img class="option_icon" src="../../static/jyjl_icon.png">
				<div class="option_label">借样记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item" @click="$router.push('/zcjl_index?page_type=ghjl')" v-if="userInfo.user_type == '1'">
			<div class="option_left">
				<img class="option_icon" src="../../static/ghjl_icon.png">
				<div class="option_label">归还记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item" @click="$router.push('/zcjl_index?page_type=cljl')" v-if="userInfo.user_type == '1'">
			<div class="option_left">
				<img class="option_icon" src="../../static/zjjl_icon.png">
				<div class="option_label">样衣处理</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item" @click="$router.push('/bsjl_index')">
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
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
	}
</script>
<style lang="less" scoped>
.top_back{
	position: relative;
	width: 100%;
	height: 95px;
	.mine_back{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.my_info{
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-size: 16px;
		font-weight: 600;
		.margin_bottom{
			margin-bottom: 12px;
		}
	}
}
.option_item{
	padding-left: 15px;
	padding-right: 15px;
	height: 56px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.option_left{
		display: flex;
		align-items: center;
		.option_icon{
			margin-right: 10px;
			height: 26px;
			width: 26px;
		}
		.option_label{
			font-size: 14px;
			color: #333333;
		}
	}
	.right_arrow{
		width: 12px;
		height: 24px;
	}
}
</style>