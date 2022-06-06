<template>
	<div class="empty_container">
		<img class="empty_icon" src="../../static/empty_icon.png">
		<div class="toast">暂无数据</div>
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
	.toast{
		font-size: 16px;
		color: #000000;
	}
}
</style>
<script>
	export default{

	}
</script>