<template>
	<div class="empty_container">
		<!-- 普通 -->
		<img class="empty_icon" src="../../static/empty_icon.png" v-if="icon_type == ''">
		<div class="toast"v-if="icon_type == ''">暂无数据</div>
		<!-- 外部采购 -->
		<img class="wbcg_empty" src="../../static/wbcg_empty.png" v-if="icon_type == '1'">
		<!-- 内部调拨 -->
		<img class="cndb_empty" src="../../static/cndb_empty.png" v-if="icon_type == '2'">
	</div>
</template>
<style lang="less" scoped>
.empty_container{
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.empty_icon{
		margin-bottom: 10px;
		width: 184px;
		height: 156px;
	}
	.wbcg_empty{
		width: 347px;
		height: 96px;
	}
	.cndb_empty{
		width: 347px;
		height: 190px;
	}
	.toast{
		font-size: 16px;
		color: #000000;
	}
}
</style>
<script>
	export default{
		props:{
			icon_type:{
				type:String,
				default:''
			}
		}
	}
</script>