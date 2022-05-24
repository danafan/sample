<template>
	<div class="container">
		<div class="yyj_gly">
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
			<div class="image_box" v-for="(item,index) in image_list" @click="deleteImg(index)">
				<img class="image" :src="item">
				<img class="close_icon" src='../../static/close_icon.png'>
			</div>
			<UploadImage @uploadCallBack="uploadCallBack"></UploadImage>
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
	import UploadImage from '../../components/upload_img.vue'
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				showPopup:false,		//选择报损原因
				bsyy_list:['原因1','原因2','原因3','原因4','原因5','原因6','原因7'],
				activeIndex:0,	//当前选中的报损原因
				bsyy:"",			//选择的报损原因
				ysjz:"",			//原始价值
				image_list:[],		//图片列表
			}
		},
		methods:{
			//切换报损原因
			checkBsyy(index){
				this.activeIndex = index;
				this.bsyy = this.bsyy_list[this.activeIndex];
				this.showPopup = false;
			},
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
				this.$router.push('/success?value=' + '已报损&img_url=bs');
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
	.yyj_gly{
		width: 100%;
		height: 86rem;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.row{
		width: 100%;
		display:flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14rem;
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
				font-size: 14rem;
			}
		}
	}
	
	.image_lable{
		width: 100%;
		margin-bottom: 10rem;
		margin-top: 10rem;
		font-size: 14rem;
		color: #000000;
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
	.padding_box{
		width: 100%;
		height: 8rem;
		background:#F2F2F2;
	}
	.list{
		max-height: 300px;
		overflow-y: scroll;
	}
	.item{
		width: 100%;
		text-align: center;
		height: 56rem;
		line-height: 56rem;
		font-size: 17rem;
		color: #000000;
	}
	.active_item{
		color: #2C82FF;
	}
}

</style>