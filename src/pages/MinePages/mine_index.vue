<template>
	<div class="container">
		<div class="top_back">
			<img class="mine_back" src="../../static/mine_back.png">
			<div class="mine_back my_info">
				<div class="margin_bottom">所属部门：{{userInfo.dept_name}}</div>
				<div>姓名：{{userInfo.user_name}}</div>
			</div>
		</div>
		<div class="option_item border_bottom" @click="$router.push('/bdjl_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/bdjl_icon.png">
				<div class="option_label">样衣绑定</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item border_bottom" @click="$router.push('/dbjl_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/dbjl_index.png">
				<div class="option_label">调拨记录</div>
			</div>
			<div class="arrow_box">
				<div class="num" v-if="transfernum > 0">{{transfernum}}</div>
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</div>
		<div class="option_item border_bottom" @click="$router.push('/wdjy_index?page_type=wdjy')">
			<div class="option_left">
				<img class="option_icon" src="../../static/wdjy_icon.png">
				<div class="option_label">我的借样</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item border_bottom" @click="$router.push('/wdjy_index?page_type=jyjl')" v-if="userInfo.user_type == '1'">
			<div class="option_left">
				<img class="option_icon" src="../../static/jyjl_icon.png">
				<div class="option_label">借样记录</div>
			</div>
			<div class="arrow_box">
				<div class="num" v-if="unreturnnum > 0">{{unreturnnum}}</div>
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</div>
		<div class="option_item border_bottom" @click="$router.push('/zcjl_index?page_type=ghjl')" v-if="userInfo.user_type == '1'">
			<div class="option_left">
				<img class="option_icon" src="../../static/ghjl_icon.png">
				<div class="option_label">归还记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item border_bottom" @click="$router.push('/zcjl_index?page_type=cljl')" v-if="userInfo.user_type == '1'">
			<div class="option_left">
				<img class="option_icon" src="../../static/zjjl_icon.png">
				<div class="option_label">样衣处理</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item border_bottom" @click="$router.push('/bsjl_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/bsjl_icon.png">
				<div class="option_label">报损记录</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<div class="option_item border_bottom" @click="$router.push('/yyzj_index')">
			<div class="option_left">
				<img class="option_icon" src="../../static/bsjl_icon.png">
				<div class="option_label">样衣转接</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'
	export default{
		created(){
			//获取借样记录待借样数量
			this.getWaitNum();
			//获取借样记录待借样数量
			this.getTransferNum();
		},
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			},
			unreturnnum(){
				return this.$store.state.unreturnnum;
			},
			transfernum(){
				return this.$store.state.transfernum;
			},
		},
		methods:{
			//获取借样记录待借样数量
			getWaitNum(){
				resource.getWaitNum().then(res => {
					this.$store.commit('setUnReturnNum',res.data);
				})
			},
			//获取借样记录待借样数量
			getTransferNum(){
				resource.getTransferNum().then(res => {
					this.$store.commit('setTransferNum',res.data);
				})
			},
		}
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
	.arrow_box{
		display: flex;
		align-items: center;
	}
	.num{
		margin-right: 5px;
		height: 18px;
		line-height: 18px;
		border-radius: 9px;
		padding-left: 5px;
		padding-right: 5px;
		font-size: 13px;
		color: #ffffff;
		background:red;
	}
	.right_arrow{
		width: 12px;
		height: 24px;
	}
}
</style>