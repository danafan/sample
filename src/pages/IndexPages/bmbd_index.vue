<template>
	<div class="container">
		<!-- 外部采购 -->
		<div class="bd_row" v-if="type == '2'">
			<div class="row_label">样衣码：</div>
			<div class="row_label">{{yym}}</div>
		</div>
		<div class="img_box" v-if="type == '2'">
			<div class="row_label">上传照片：</div>
			<div class="img_toast">（至少上传一张照片，上限上传数量为六张）</div>
		</div>
		<div class="image_list" v-if="type == '2'">
			<div class="image_box" v-for="(item,index) in image_list">
				<img class="image" :src="domain + item">
				<img class="close_icon" src='../../static/close_icon.png' @click="deleteImg(item,index)">
			</div>
			<UploadImage @uploadCallBack="uploadCallBack" v-if="image_list.length < 6"></UploadImage>
		</div>
		<!-- 内部调拨 -->
		<div class="bd_row" v-if="type == '1'">
			<div class="row_label">商品编码：</div>
			<div class="row_label">{{spbm}}</div>
		</div>
		<div class="bd_row" v-if="type == '1'">
			<div class="row_label">样衣码：</div>
			<div class="scan_txt" @click="scanYyCode">{{!sku_code?'扫码':sku_code}}</div>
		</div>
		<BigButton button_txt="添加" @callback="callBack"/>
	</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	import UploadImage from '../../components/upload_img.vue'
	import BigButton from '../../components/big_button.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				yym:"",				//样衣码
				spbm:"",			//商品编码
				sku_code:"",		//扫出来的样衣码
				type:2,				//类型（1:内部调拨 2:外部采购）
				batch_id:"",		//批次id
				domain:"",
				image_list:[],		//图片列表
			}
		},
		created(){
			this.type = this.$route.query.type;
			this.yym = this.$route.query.yym;
			this.spbm = this.$route.query.spbm;
			this.batch_id = this.$route.query.batch_id
		},
		methods:{
			//上传图片回调
			uploadCallBack(files){
				for(var i = 0;i < files.length;i ++){
					if(this.image_list.length + files.length > 6){
						this.$toast('图片最多不能超过6张！')
					}else{
						resource.uploadImage({file:files[i]}).then(res => {
							if(res.code == 1){
								this.domain = res.data.domain;
								this.image_list.push(res.data.name);
							}
						})
					}
				}
			},
			//删除图片
			deleteImg(item,index){
				resource.deleteImage({name:item}).then(res => {
					if(res.code == 1){
						this.image_list.splice(index,1);
					}
				})
			},
			//点击扫描样衣码
			scanYyCode(){
				// this.sku_code = '88'
				
				dd.ready(() => {
					dd.biz.util.scan({
						onSuccess: (data) => {
							var sku_code = "";	//小于：样衣码；等于：商品编码；大于：唯一吗
							if(data.text.indexOf('=') > -1){
								sku_code = data.text.split('=')[1];
							}else{
								sku_code = data.text;
							}
							this.getSkuCodeInfo(sku_code)
						},
						onFail : (err) => {
							console.log(err)
						}
					})
				})
			},
			//验证样衣码接口
			getSkuCodeInfo(sku_code){
				resource.getSkuCodeInfo({sku_code:sku_code}).then(res => {
					if(res.code == '1'){
						this.sku_code = sku_code;
					}
				})
			},
			//添加
			callBack(){		
				var arg = {
					type:this.type,
					batch_id:this.batch_id,
				}
				if(this.type == '2'){	//外部采购
					if(this.image_list.length == 0){
						this.$toast('至少上传1张图片!');
						return;
					}else{
						arg.images = this.image_list.join(',');
						arg.sku_code = this.yym;
					}
				}else{	//内部调拨
					if(this.sku_code == ''){
						this.$toast('请扫描样衣码!');
						return;
					}else{
						arg.sku_code = this.sku_code
						arg.unique_ksbm = this.spbm
					}
				}
				resource.bindGoods(arg).then(res => {
					if(res.code == 1){
						this.$toast(res.msg);
						this.$router.replace('/yybd_index?page_type=yybd&isLoad=1');
					}
				})
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
	padding:15px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	.bd_row{
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.img_box{
		width: 100%;
		.img_toast{
			margin-top: 2px;
			font-size: 12px;
			color: rgba(0, 0, 0, 0.6);
		}
	}
	.row_label{
		font-size: 14px;
		color: #000000;
	}
	.scan_txt{
		font-size: 14px;
		color: #2C82FF;
	}
	.image_list{
		width: 100%;
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		.image_box{
			margin-right: 15px;
			margin-bottom: 15px;
			position: relative;
			width: 88px;
			height: 88px;
			.image{
				position: absolute;
				width: 100%;
				height: 100%;
			}
			.close_icon{
				position: absolute;
				top: -5px;
				right: -5px;
				width: 11px;
				height: 11px;
			}
		}
	}
}

</style>


<!-- 
<template>
	<div class="container">
		<div class="bd_row">
			<div class="row_label">样衣码：</div>
			<div class="row_label">{{yym}}</div>
		</div>
		<div class="img_box">
			<div class="row_label">上传照片：</div>
			<div class="img_toast">（至少上传一张照片，上限上传数量为六张）</div>
		</div>
		<div class="image_list">
			<div class="image_box" v-for="(item,index) in image_list">
				<img class="image" :src="domain + item">
				<img class="close_icon" src='../../static/close_icon.png' @click="deleteImg(item,index)">
			</div>
			<UploadImage @uploadCallBack="uploadCallBack" v-if="image_list.length < 6"></UploadImage>
		</div>
		<div class="bd_row">
			<div class="row_label">商品编码：</div>
			<div class="scan_txt" :class="{'spbm_color':codeInfo.sku_id != ''}" @click="getCodeInfo">{{codeInfo.sku_id == ''?'扫码':codeInfo.sku_id}}</div>
		</div>
		<BigButton button_txt="添加" @callback="callBack"></BigButton>
	</div>
</template>
<script>
	import UploadImage from '../../components/upload_img.vue'
	import BigButton from '../../components/big_button.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				yym:"",				//样衣码
				batch_id:"",		//批次id
				domain:"",
				image_list:[],		//图片列表
				codeInfo:{
					sku_id:""
				},					//商品信息
			}
		},
		created(){
			this.yym = this.$route.query.yym;
			this.batch_id = this.$route.query.batch_id
		},
		methods:{
			//根据扫描的商品编码获取商品信息
			getCodeInfo(){
				let arg = {
					code:'22T2M738701402' + Math.floor(Math.random()*10000+1)
				}
				resource.getCodeInfo(arg).then(res => {
					this.codeInfo = res.data;
				})
			},
			//上传图片回调
			uploadCallBack(files){
				for(var i = 0;i < files.length;i ++){
					if(this.image_list.length + files.length > 6){
						this.$toast('图片最多不能超过6张！')
					}else{
						resource.uploadImage({file:files[i]}).then(res => {
							this.domain = res.data.domain;
							this.image_list.push(res.data.name);
						})
					}
					
				}
			},
			//删除图片
			deleteImg(item,index){
				resource.deleteImage({name:item}).then(res => {
					this.image_list.splice(index,1);
				})
			},
			//添加
			callBack(){
				if(this.image_list.length == 0){
					this.$toast('至少上传1张图片!');
					return;
				}
				var arg = {
					batch_id:this.batch_id,
					images:this.image_list.join(','),
					sku_code:this.yym,
				}
				if(this.codeInfo.sku_id != ''){
					arg.supplier_i_id = this.codeInfo.supplier_i_id,
					arg.i_id = this.codeInfo.i_id,
					arg.sku_id = this.codeInfo.sku_id,
					arg.unique_no = this.codeInfo.unique_no
				}
				resource.bindGoods(arg).then(res => {
					this.$toast(res.msg);
					this.$router.go(-1);
				})
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

</style> -->