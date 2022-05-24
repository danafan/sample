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
	padding-left: 20rem;
	padding-right: 20rem;
	position: absolute;
	bottom: 15rem;
	.button_container{
		width: 100%;
		text-align: center;
		height: 40rem;
		line-height: 40rem;
		background: #2C82FF;
		border-radius: 20rem;
		font-size: 14rem;
		color: #ffffff;
		font-weight: 500;
	}
}

</style>