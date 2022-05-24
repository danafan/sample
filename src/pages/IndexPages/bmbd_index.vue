<template>
	<div class="container">
		<div class="bd_row">
			<div class="row_label">样衣码：</div>
			<div class="row_label">861273612837</div>
		</div>
		<div class="img_box">
			<div class="row_label">上传照片：</div>
			<div class="img_toast">（至少上传一张照片，上限上传数量为六张）</div>
		</div>
		<div class="image_list">
			<div class="image_box" v-for="(item,index) in image_list" @click="deleteImg(index)">
				<img class="image" :src="item">
				<img class="close_icon" src='../../static/close_icon.png'>
			</div>
			<UploadImage @uploadCallBack="uploadCallBack"></UploadImage>
		</div>
		<div class="bd_row">
			<div class="row_label">商品编码：</div>
			<div class="scan_txt" :class="{'spbm_color':spbm != ''}">{{spbm == ''?'扫码':spbm}}</div>
		</div>
		<BigButton button_txt="添加" @callback="callBack"></BigButton>
	</div>
</template>
<script>
	import UploadImage from '../../components/upload_img.vue'
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				image_list:[],		//图片列表
				spbm:"",			//商品编码
			}
		},
		methods:{
			//上传图片回调
			uploadCallBack(files){
				for(var i = 0;i < files.length;i ++){
					var fr = new FileReader();
					fr.onload = (e) => {
						this.image_list.push(e.target.result);
					};
					fr.readAsDataURL(files[i]);
				}
			},
			//删除图片
			deleteImg(index){
				this.image_list.splice(index,1);
			},
			//添加
			callBack(){
				console.log('添加')
			}
		},
		components:{
			UploadImage,
			BigButton
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding:15rem 30rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	.bd_row{
		width: 100%;
		height: 50rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.img_box{
		width: 100%;
		.img_toast{
			margin-top: 2rem;
			font-size: 12rem;
			color: rgba(0, 0, 0, 0.6);
		}
	}
	.row_label{
		font-size: 14rem;
		color: #000000;
	}
	.scan_txt{
		font-size: 14rem;
		color: #2C82FF;
	}
	.spbm_color{
		color: #333333;
	}
	.image_list{
		width: 100%;
		margin-top: 10rem;
		display: flex;
		flex-wrap: wrap;
		.image_box{
			margin-right: 15rem;
			margin-bottom: 15rem;
			position: relative;
			width: 88rem;
			height: 88rem;
			.image{
				position: absolute;
				width: 100%;
				height: 100%;
			}
			.close_icon{
				position: absolute;
				top: -5rem;
				right: -5rem;
				width: 11rem;
				height: 11rem;
			}
		}
	}
}

</style>