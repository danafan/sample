<template>
	<div class="container">
		<div class="top_content">
			<div class="yyj_gly">
				<div class="row">
					<div>事业部：</div>
					<div>0001</div>
				</div>
				<div class="row">
					<div>借衣人：</div>
					<div>王芳芳</div>
				</div>
				<div class="row">
					<div>提交人：</div>
					<div>第五样衣间</div>
				</div>
				<div class="row">
					<div>预计归还时间：</div>
					<div>2019-09-04 12：00</div>
				</div>
				<div class="row">
					<div>借用原因：</div>
					<div>2019-09-04 12：00</div>
				</div>
				<div class="row">
					<div>备注：</div>
					<div>2019-09-04 12：00</div>
				</div>
				<div class="row">
					<div>申请时间：</div>
					<div>2019-09-04 12：00</div>
				</div>
			</div>
			<van-list v-model:loading="loading"
			:finished="finished"
			@load="loadMore"
			class="van_list"
			>
			<div class="yy_item" v-for="item in listArray" @click="goDetail">
				<img class="yy_img" src="../../static/index_back.png">
				<div class="yy_content">
					<div class="yy_row">样衣码：2376452734</div>
					<div class="yy_row">款式编码：2376452734</div>
				</div>
				<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1')">
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</van-list>
	</div>
	<div class="bottom_box">
		<div class="all_delete" v-if="listArray.length > 0" @click.stop="modelFn('2')">清空记录</div>
		<div class="smyym_button">
			<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
			<div class="scan_text">扫描样衣码</div>
		</div>
		<div class="button_box">
			<!-- 样衣归还 -->
			<div class="button jj_button" @click.stop="modelFn('4')">拒绝</div>
			<div class="button rk_button" @click.stop="modelFn('3')">借样</div>
		</div>
	</div>
	<DialogModel :value="value" :model_type="model_type" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
</div>
</template>
<script>
	import DialogModel from '../../components/dialog_model.vue'
	export default{
		data(){
			return{
				listArray:['','','','','','','',''],		//列表
				loading:false,
				finished:false,
				showModel:false,			//是否显示弹窗
				value:"",			//弹窗内容
				model_type:"text",	//弹窗类型（text:文字；input:输入框）
			}
		},
		methods:{
			//点击询问
			modelFn(type){	//1:删除单条；2:全部清空；3:借样
				this.model_type = 'text'
				this.showModel = true;
				this.modelType = type;
				switch(this.modelType){
					case '1':
					this.value = '确认删除该条记录？';
					break;
					case '2':
					this.value = '确定要全部清空历史记录吗？';
					break;
					case '3':
					this.value = '即将借出123件商品？';
					break;
					case '4':
					this.model_type = 'input';
					break;
				}
			},
			//弹窗确认
			callbackFn(v){
				if(this.model_type == 'text'){
					if(v == '1'){
						this.showModel = false;
					}else{
						this.showModel = false;
						switch(this.modelType){
							case '1':
							console.log('删除单条记录')
							break;
							case '2':
							console.log('清除全部记录')
							break;
							case '3':
							this.$router.push('/success?value=' + '借样成功' + '&img_url=success');
							break;
						}
					}
				}else{
					if(v.type == '1'){
						this.showModel = false;
					}else{
						this.showModel = false;
						console.log(v.input_value)
						this.$router.push('/success?value=' + '借样拒绝' + '&img_url=jyjj');
					}
				}
			},
			//点击进入详情
			goDetail(){
				this.$router.push('/yyxq');
			},
			//获取更多
			loadMore(){

			}
		},
		components:{
			DialogModel
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 15rem;
	.top_content{
		flex:1;
		overflow-y: scroll;
	}
	.yyj_gly{
		width: 100%;
		height: 260rem;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		.row{
			display:flex;
			align-items: center;
			font-size: 14rem;
			color: #000000;
		}
	}
	.van_list{
		.yy_item{
			margin-bottom: 6rem;
			width: 100%;
			height: 100rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.yy_img{
				margin-right: 15rem;
				width: 70rem;
				height: 70rem;
			}
			.yy_content{
				flex:1;
				height: 70rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.yy_row{
					font-size: 14rem;
					color: #000000;
				}
			}
			.delete_icon{
				width: 18rem;
				height: 20rem;
			}
			.right_arrow{
				margin-left: 15rem;
				width: 12rem;
				height: 24rem;
			}
		}
	}
	.bottom_box{
		.all_delete{
			margin-top:15rem; 
			margin-bottom:30rem; 
			width: 100%;
			text-align: center;
			color: #428FFF;
			font-size: 14rem;
		}
		.smyym_button{
			margin-bottom: 15rem;
			border-radius: 20rem;
			border:1px solid #2C82FF;
			width: 100%;
			height: 40rem;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 14rem;
			font-weight: 500;
			.bind_scan_icon{
				margin-right: 4rem;
				width: 14rem;
				height: 14rem;
			}
			.scan_text{
				color: #2C82FF;
			}
		}
		.button_box{
			width: 100%;
			height: 70rem;
			display:flex;
			align-items: center;
			justify-content: space-around;
			.button{
				border-radius: 20rem;
				border:1px solid #2C82FF;
				width: 160rem;
				height: 40rem;
				display:flex;
				align-items: center;
				justify-content: center;
				font-size: 14rem;
				font-weight: 500;
			}
			.jj_button{
				background: #ffffff;
				color: #2C82FF;
			}
			.rk_button{
				background: #2C82FF;
				color: #ffffff;
			}
		}
		
	}
}
</style>