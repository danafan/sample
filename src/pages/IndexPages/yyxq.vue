<template>
	<div class="container">
		<div class="yy_img_list">
			<img class="yy_img" :src="item" @click="preImg(index)" v-for="(item,index) in new_images">
		</div>
		<div class="info_row" v-if="page_type == '0'">样衣码：{{yyInfo.sku_code}}</div>
		<div class="info_row" v-if="page_type == '0'">款式编码：{{yyInfo.i_id}}</div>
		<div class="info_row" v-if="page_type == '0'">商品编码：{{yyInfo.sku_id}}</div>
		<div class="info_row" v-if="page_type == '0'">供应商款号：{{yyInfo.supplier_i_id}}</div>
		<!-- <div class="info_row" v-if="page_type == 'yybd'">样衣码：234234234</div>
		<div class="info_row" v-if="page_type == 'yygh'">样衣状态：借用中</div>
		<div class="info_row" v-if="page_type == 'yygh'">提交人：哈哈哈</div>
		<div class="info_row" v-if="page_type == 'yygh'">借样原因：拍照</div>
		<div class="info_row" v-if="page_type == 'yygh'">备注：这就是备注</div> -->
		<van-image-preview v-model:show="showPreImg" :images="new_images" :start-position="activeIndex">
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
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				showPreImg:false,	//预览图片弹窗
				yyInfo:{},			//样衣详情
				new_images:[],		//图片列表
				activeIndex:0,		//预览当前图片下标
				page_type:"",		//页面类型
				sku_code:"",			//样衣码
				batch_id:"",			//批次id
			}
		},
		created(){
			//页面类型（0: 绑定 1: 在库中 2、借用中 3、已报损 4、已处理）
			this.page_type = this.$route.query.type;
			//样衣码
			this.sku_code = this.$route.query.sku_code;
			//批次id
			this.batch_id = this.$route.query.batch_id;
			//获取商品详情
			this.getGoodsInfo();
		},
		methods:{
			//获取商品详情
			getGoodsInfo(){
				let arg = {
					sku_code:this.sku_code,
					batch_id:this.batch_id,
					type:this.page_type
				}
				resource.getGoodsInfo(arg).then(res => {
					this.yyInfo = res.data;
					this.yyInfo.images.map(item => {
						this.new_images.push(this.yyInfo.domain + item);
					});
				})
			},
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