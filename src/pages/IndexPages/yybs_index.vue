<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">样衣码：</div>
				<div class="value">{{sku_code}}</div>
			</div>
			<div class="row">
				<div class="lable">报损原因：</div>
				<div class="value" @click="showPopup = true">
					<div class="yyj_txt" :class="{'default_txt':bsyy != ''}">{{bsyy == ''?'选择报损原因':bsyy}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<div class="row">
				<div class="lable">原始价值：</div>
				<div class="value">
					<input class="ysjz" type="number" placeholder="选填" v-model="ysjz">
				</div>
			</div>
		</div>
		<div class="image_lable">上传报损位置图：</div>
		<div class="image_list">
			<div class="image_box" v-for="(item,index) in image_list">
				<img class="image" :src="domain + item">
				<img class="close_icon" src='../../static/close_icon.png' @click="deleteImg(item,index)">
			</div>
			<UploadImage @uploadCallBack="uploadCallBack" v-if="image_list.length < 6"></UploadImage>
		</div>
		<BigButton button_txt="报损" @callback="callBack"></BigButton>
		<van-popup v-model:show="showPopup" position="bottom" round>
			<div class="list">
				<div class="item" :class="{'active_item':activeIndex == index}" v-for="(item,index) in bsyy_list" @click="checkBsyy(index)">{{item}}</div>
			</div>
			<div class="padding_box"></div>
			<div class="item" @click="showPopup = false">取消</div>
		</van-popup>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import UploadImage from '../../components/upload_img.vue'
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				sku_code:"",
				batch_id:"",
				showPopup:false,		//选择报损原因
				bsyy_list:[],
				activeIndex:999,	//当前选中的报损原因
				bsyy:"",			//选择的报损原因
				ysjz:"",			//原始价值
				domain:"",
				image_list:[],		//图片列表
			}
		},
		created(){
			this.sku_code = this.$route.query.sku_code;
			this.batch_id = this.$route.query.batch_id;
			//获取报损原因
			this.ajaxTypeList();
		},
		methods:{
			//获取报损原因
			ajaxTypeList(){
				resource.ajaxTypeList({type:'loss_reason'}).then(res => {
					if(res.code == 1){
						this.bsyy_list = res.data;
					}
				})
			},
			//切换报损原因
			checkBsyy(index){
				this.activeIndex = index;
				this.bsyy = this.bsyy_list[this.activeIndex];
				this.showPopup = false;
			},
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
			//报损
			callBack(){
				if(this.bsyy == ''){
					this.$toast('请选择报损原因!');
					return;
				}
				let arg = {
					sku_code:this.sku_code,
					type:'3',
					reason:this.bsyy,
					price:this.ysjz,
					images:this.image_list.join(','),
				}
				if(this.batch_id){
					arg.batch_id = this.batch_id;
				}
				resource.scanGoods(arg).then(res => {
					if(res.code == 1){
						this.$router.replace('/success?value=' + '已报损&img_url=bs');
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
	.yyj_gly{
		width: 100%;
		height: 129px;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.row{
		width: 100%;
		display:flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #000000;
		.value{
			display:flex;
			align-items: center;
			.yyj_txt{
				color: rgba(0, 0, 0, 0.4);
			}
			.default_txt{
				color:#2C82FF;
			}
			.ysjz{
				text-align: end;
				border: none;
				outline: none;
				font-size: 14px;
			}
		}
	}
	
	.image_lable{
		width: 100%;
		margin-bottom: 10px;
		margin-top: 10px;
		font-size: 14px;
		color: #000000;
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
	.padding_box{
		width: 100%;
		height: 8px;
		background:#F2F2F2;
	}
	.list{
		max-height: 300px;
		overflow-y: scroll;
	}
	.item{
		width: 100%;
		text-align: center;
		height: 56px;
		line-height: 56px;
		font-size: 17px;
		color: #000000;
	}
	.active_item{
		color: #2C82FF;
	}
}

</style>