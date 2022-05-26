<template>
	<div class="model_container">
		<div class="model_content">
			<div class="input_box">
				<div class="value" v-if="model_type == 'text'">{{value}}</div>
				<textarea v-else class="input" :placeholder="input_content" v-model="input_value"></textarea>
			</div>
			<div class="button_list">
				<div class="button" @click="callbackFn('1')">取消</div>
				<div class="button" @click="callbackFn('2')">确定</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				input_value:"",
			}
		},
		props:{
			//提示内容
			value:{
				type:String,
				default:''
			},
			//弹窗类型
			model_type:{
				type:String,
				default:'text'
			},
			//内容
			input_content:{
				type:String,
				default:'请输入拒绝原因(必填)'
			}
		},
		methods:{
			//确定
			callbackFn(type){
				if(this.model_type == 'text'){
					this.$emit('callbackFn',type);
				}else{
					if(type == '1'){
						let arg = {
							type:type,
						}
						this.$emit('callbackFn',arg);
					}else{
						if(this.input_value == ""){
							this.$toast('请输入拒绝原因');
						}else{	
							let arg = {
								type:type,
								input_value:this.input_value
							}
							this.$emit('callbackFn',arg);
						}
					}
				}
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
		.input_box{
			height: 110rem;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.input{
				border: none;
				outline: none;
				padding: 8rem 16rem;
				width: 230rem;
				height: 80rem;
				background: #F6F6F6;
				border-radius: 6rem;
				font-size: 14rem;
			}
			.value{
				width: 100%;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
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