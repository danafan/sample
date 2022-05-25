<template>
	<div class="container">
		<div class="yy_img_list">
			<img class="yy_img" :src="item" @click="preImg(index)" v-for="(item,index) in images">
		</div>
		<div class="info_row">商品编码：234234234</div>
		<div class="info_row">款式编码：234234234</div>
		<div class="info_row">供应商款号：234234234</div>
		<div class="info_row" v-if="page_type == 'yybd'">样衣码：234234234</div>
		<div class="info_row" v-if="page_type == 'yygh'">样衣状态：借用中</div>
		<div class="info_row" v-if="page_type == 'yygh'">提交人：哈哈哈</div>
		<div class="info_row" v-if="page_type == 'yygh'">借样原因：拍照</div>
		<div class="info_row" v-if="page_type == 'yygh'">备注：这就是备注</div>
		<van-image-preview v-model:show="showPreImg" :images="images" :start-position="activeIndex">
		</van-image-preview>
	</div>
</template>
<style lang="less" scoped>
.container{
	padding: 25rem 0 15rem 30rem;
	.yy_img_list{
		display: flex;
		flex-wrap: wrap;
		.yy_img{
			margin-right: 30rem;
			margin-bottom: 10rem;
			width: 80rem;
			height: 80rem;
		}
	}
	.info_row{
		margin-top: 15rem;
		font-size: 14rem;
		color: #000000;
	}
}

</style>
<script>
	export default{
		data(){
			return{
				loading:"",
				finished:false,
				showPreImg:false,	//预览图片弹窗
				activeIndex:0,		//预览当前图片下标
				images:['https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
				'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg','https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
				'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'],	//图片列表
				page_type:"yybd",			//页面来源
			}
		},
		created(){
			//页面来源
			this.page_type = this.$route.query.type;
		},
		methods:{
			//预览图片
			preImg(index){
				this.showPreImg = true;
				this.activeIndex = index;
			},
			onLoad(){

			}
		}
	}
</script>