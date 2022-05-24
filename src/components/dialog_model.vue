<template>
	<div class="model_container">
		<div class="model_content">
			<div class="value">{{value}}</div>
			<div class="button_list">
				<div class="button" @click="callbackFn('1')">取消</div>
				<div class="button" @click="callbackFn('2')">确定</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			//提示内容
			value:{
				type:String,
				default:''
			}
		},
		methods:{
			//确定
			callbackFn(type){
				this.$emit('callbackFn',type);
			}
		}
	}
</script>
<style lang="less" scoped>
.model_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	.model_content{
		border-radius: 6rem;
		background:#ffffff;
		width: 290rem;
		height: 140rem;
		display: flex;
		flex-direction: column;
		font-weight: 600;
		font-size: 15rem;
		color: #333333;
		.value{
			width: 100%;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.button_list{
			height: 40rem;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}
}
</style>