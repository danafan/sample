<template>
	<div>
		<div class="imgBox">
			<img class="upload_icon" src="../static/upload_img_icon.png">
			<input type="file" ref="imgUpload" class="upload_file" multiple accept="image/*" @change="uploadFn">
		</div>
	</div>
</template>
<style lang="less" scoped>
.imgBox{
	background: #fff;
	display: flex;
	align-items:center;
	justify-content:center;
	width: 88rem;
	height: 88rem;
	position: relative;
	.upload_icon{
		width: 28rem;
		height: 24rem;
	}
	.upload_file {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
<script>
	export default{
		methods:{
			// 上传图片
			uploadFn(){
				let files = this.$refs.imgUpload.files;
				this.$emit('uploadCallBack',files)
			}

		}


	}
</script>