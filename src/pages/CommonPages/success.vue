<template>
	<div class="container">
		<img class="success_icon" src="../../static/success_page_icon.png" v-if="img_url =='success'">
		<img class="success_icon" src="../../static/bs_page_icon.png" v-if="img_url =='bs'">
		<img class="success_icon" src="../../static/jy_page_icon.png" v-if="img_url =='jy'">
		<img class="success_icon" src="../../static/gh_page_icon.png" v-if="img_url =='gh'">
		<div class="toast">{{toast_value}}</div>
		<BigButton button_txt="返回首页" @callback="callBack" v-if="showBut == '1'"></BigButton>
	</div>
</template>
<script>
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				showBut:'0',		//是否显示按钮
				toast_value:"",		//提示文字
				img_url:"",			//图片前缀
			}
		},
		created(){
			let options = this.$route.query;
			this.showBut = options.showBut;
			this.toast_value = options.value;
			this.img_url = options.img_url;
		},
		methods:{
			//按钮回调
			callBack(){
				this.$router.replace('/index');
			}
		},
		components:{
			BigButton
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.success_icon{
		margin-bottom: 20rem;
		width: 184rem;
		height: 156rem;
	}
	.toast{
		font-size: 16rem;
		color: #000000;
	}
}
</style>