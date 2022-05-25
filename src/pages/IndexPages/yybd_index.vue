<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">管理员：</div>
				<div class="value">王芳芳</div>
			</div>
			<div class="row">
				<div class="lable">样衣间：</div>
				<div class="value" @click="showPopup = true">
					<div class="yyj_txt" :class="{'default_txt':yyj != ''}">{{yyj == ''?'选择样衣间':yyj}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
		</div>
		<div class="yy_list">
			<div class="yy_item" v-for="item in listArray" @click="goDetail">
				<img class="yy_img" src="../../static/index_back.png">
				<div class="yy_content">
					<div class="yy_row">样衣码：2376452734</div>
					<div class="yy_row">款式编码：2376452734</div>
				</div>
				<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1')">
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</div>
		<div class="bottom_box">
			<div class="all_delete" @click="modelFn('2')" v-if="page_type == 'yybd' && listArray.length > 0">全部清空</div>
			<div class="button_box">
				<!-- 样衣绑定 -->
				<div class="button" @click="scanYyCode" v-if="page_type == 'yybd'">
					<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
					<div class="scan_text">扫描样衣码</div>
				</div>
				<!-- 样衣归还 -->
				<div class="button" @click="scanYyCode" v-if="page_type == 'yygh'">
					<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
					<div class="scan_text">扫码</div>
				</div>
				<!-- 样衣绑定 -->
				<div class="button rk_button" @click="modelFn('3')" v-if="page_type == 'yybd'">入库</div>
				<!-- 样衣归还 -->
				<div class="button rk_button" @click="modelFn('4')" v-if="page_type == 'yygh'">归还</div>
			</div>
		</div>
		<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
		<van-popup v-model:show="showPopup" position="bottom" round>
			<div class="list">
				<div class="item" :class="{'active_item':activeYyjIndex == index}" v-for="(item,index) in yyj_list" @click="checkYyj(index)">{{item}}</div>
			</div>
			<div class="padding_box"></div>
			<div class="item" @click="showPopup = false">取消</div>
		</van-popup>
	</div>
</template>
<script>
	import DialogModel from '../../components/dialog_model.vue'
	export default{
		data(){
			return{
				yyj:"",						//选中的样衣间
				listArray:['','',''],		//列表
				showModel:false,			//是否显示弹窗
				value:"",					//弹窗内容
				modelType:"",				//弹窗类型
				showPopup:false,			//选择样衣间
				yyj_list:['第一样衣间','第二样衣间','第三样衣间','第四样衣间','第五样衣间','第六样衣间','第七样衣间','第八样衣间'],
				activeYyjIndex:0,		//当前选中的样衣间
				page_type:"yybd",		//页面来源
			}
		},
		created(){
			//页面来源
			this.page_type = this.$route.query.type;
		},
		methods:{
			//点击询问
			modelFn(type){	//1:删除单条；2:全部清空；3:入库；3:归还
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
					this.value = '即将入库123件商品？';
					break;
					case '4':
					this.value = '确认归还样衣吗？';
					break;
				}
			},
			//弹窗确认
			callbackFn(v){
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
							this.$router.push('/success?value=' + '入库成功' + '&showBut=1&img_url=success');
						break;
						case '4':
							this.$router.push('/success?value=' + '归还成功' + '&img_url=gh');
						break;
					}
				}
			},
			//点击进入详情
			goDetail(){
				this.$router.push('/yyxq?type=' + this.page_type);
			},
			//点击扫描样衣码
			scanYyCode(){
				if(this.page_type == 'yybd'){	//样衣绑定
					this.$router.push('/bmbd_index');
				}else{	//样衣归还
					console.log('样衣归还扫码');
				}
			},
			//切换样衣间
			checkYyj(index){
				this.activeYyjIndex = index;
				this.yyj = this.yyj_list[this.activeYyjIndex];
				this.showPopup = false;
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
	.yyj_gly{
		width: 100%;
		height: 86rem;
		padding-left:15rem;
		padding-right:15rem;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		.row{
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
			}
		}
	}
	.yy_list{
		flex:1;
		.yy_item{
			margin-bottom: 6rem;
			padding-left: 15rem;
			padding-right: 15rem;
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
		}
	}
	.bottom_box{
		.all_delete{
			margin-top:15rem; 
			width: 100%;
			text-align: center;
			color: #428FFF;
			font-size: 14rem;
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
				.bind_scan_icon{
					margin-right: 4rem;
					width: 14rem;
					height: 14rem;
				}
				.scan_text{
					color: #2C82FF;
				}
			}
			.rk_button{
				background: #2C82FF;
				color: #ffffff;
			}
		}
	}
	.right_arrow{
		margin-left: 15rem;
		width: 12rem;
		height: 24rem;
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