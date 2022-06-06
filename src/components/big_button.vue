<template>
	<div class="button">
		<div class="button_container" @click="confirm">{{button_txt}}</div>
	</div>
</template>
<script>
	export default{
		props:{
			//按钮文字
			button_txt:{
				type:String,
				default:""
			}
		},
		methods:{
			//点击按钮
			confirm(){
				this.$emit('callback');
			}
		}
		
	}
</script>
<style lang="less" scoped>
.button{
	width: 100%;
	padding-left: 20px;
	padding-right: 20px;
	position: absolute;
	bottom: 15px;
	.button_container{
		width: 100%;
		text-align: center;
		height: 40px;
		line-height: 40px;
		background: #2C82FF;
		border-radius: 20px;
		font-size: 14px;
		color: #ffffff;
		font-weight: 500;
	}
}

</style>