<template>
	<div class="container">
		<div class="top_content">
			<div class="info_row">部门：{{lendingInfo.dept_name}}</div>
			<div class="info_row">借样人：{{lendingInfo.user_name}}</div>
			<div class="info_row">提交人：{{lendingInfo.apply_user_name}}</div>
			<div class="info_row">预计归还时间：{{lendingInfo.return_time}}</div>
			<div class="info_row">借用原因：{{lendingInfo.reason}}</div>
			<div class="info_row">备注：{{lendingInfo.remark}}</div>
			<div class="info_row">申请时间：{{lendingInfo.apply_time}}</div>
			<van-list v-model:loading="loading"
			:finished="finished"
			@load="loadMore"
			finished-text="没有更多了"
			class="van_list"
			v-if="listArray.length > 0"
			>
			<div class="yy_item border_bottom" v-for="(item,index) in listArray" :key="index + 1" @click="goDetail(item.sku_code)">
				<img class="yy_img" :src="item.domain + item.image">
				<div class="yy_content">
					<div class="yy_row">样衣码：{{item.sku_code}}</div>
					<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
				</div>
				<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1',item.sku_code,)">
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</van-list>
	</div>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
	<div class="bottom_box">
		<div class="all_delete" v-if="listArray.length > 0" @click.stop="modelFn('2')">清空记录</div>
		<div class="smyym_button" @click="scanCode">
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
	import * as dd from 'dingtalk-jsapi';
	import DialogModel from '../../components/dialog_model.vue'
	import EmptyPage from '../CommonPages/empty_page.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				lending_id:"",			//批次id
				lendingInfo:{},			//借样详情
				page:1,
				pagesize:10,				
				listArray:[],				//列表
				loading:true,
				finished:false,
				showModel:false,			//是否显示弹窗
				sku_code:"",				//点击单条删除的sku_code
				goods_index:"",				//点击单条删除的index
				value:"",			//弹窗内容
				model_type:"text",	//弹窗类型（text:文字；input:输入框）
				input_value:"",		//拒绝原因
			}
		},
		created(){
			//批次id
			this.lending_id = this.$route.query.lending_id;
			//借样详情
			this.lendingDetail();
			//已借用的列表
			this.getGoodsList();
		},
		methods:{
			//借样详情
			lendingDetail(){
				resource.lendingDetail({lending_id:this.lending_id}).then(res => {
					if(res.code == 1){
						this.lendingInfo = res.data;
					}
				})
			},
			//扫描样衣码
			scanCode(){
				dd.ready(() => {
					dd.biz.util.scan({
						onSuccess: (data) => {
							var sku_code = "";	
							if(data.text.indexOf('=') > -1){
								sku_code = data.text.split('=')[1];
							}else{
								sku_code = data.text;
							}
							if(sku_code.length == 14){	
								this.$toast('请扫描样衣码或唯一码');
							}else{		
								let arg = {
									sku_code:sku_code,
									batch_id:this.lending_id,
									type:'2'
								}
								resource.scanGoods(arg).then(res => {
									if(res.code == 1){
										this.page = 1;
										this.listArray = [];
										//获取已绑定的商品列表
										this.getGoodsList();
									};

								})
							}
						},
						onFail : (err) => {
							console.log(err)
						}
					})
				})
			},
			//获取更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.getGoodsList();
			},
			//已借用的列表
			getGoodsList(){
				let arg = {
					batch_id:this.lending_id,
					type:'2',
					page:this.page,
					pagesize:this.pagesize
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						this.listArray = [...this.listArray,...res.data.data];
						if(this.page == res.data.last_page){
							this.finished = true;
						}
					}
				})
			},
			//点击询问
			modelFn(type,sku_code,index){	//1:删除单条；2:全部清空；3:借样
				this.model_type = 'text'
				this.modelType = type;
				switch(this.modelType){
					case '1':
					this.value = '确认删除该条记录？';
					this.sku_code = sku_code;
					this.goods_index = index;
					this.showModel = true;
					break;
					case '2':
					this.value = '确定要全部清空历史记录吗？';
					this.showModel = true;
					break;
					case '3':
					if(this.listArray.length == 0){
						this.$toast('暂时还没有商品哦!');
						return;
					}
					this.value = `即将借出${this.listArray.length}件商品？`;
					this.showModel = true;
					break;
					case '4':
					this.model_type = 'input';
					this.showModel = true;
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
							//删除商品
							this.removeGoods();
							break;
							case '2':
							//删除商品
							this.removeGoods();
							break;
							break;
							case '3':
							//借样审批
							this.lendingAdd();
							break;
						}
					}
				}else{
					if(v.type == '1'){
						this.showModel = false;
					}else{
						this.showModel = false;
						this.input_value = v.input_value;
						if(this.input_value == ''){
							this.$toast('请输入拒绝原因');
							return;
						}
						//借样审批
						this.lendingAdd();
					}
				}
			},
			//删除商品
			removeGoods(){
				var arg = {
					batch_id:this.lending_id,
					type:'2'
				}
				if(this.modelType == '1'){
					arg.sku_code = this.sku_code;
				}
				resource.removeGoods(arg).then(res => {
					if(res.code == 1){
						this.$toast(res.msg);
						if(this.modelType == '1'){
							this.listArray.splice(this.goods_index,1);
						}else{
							this.page = 1;
							this.listArray = [];
						}
					}
				})
			},
			//借样审批
			lendingAdd(){
				var arg = {
					lending_id:this.lending_id
				}
				if(this.modelType == '3'){
					arg.type = 1;
				}else if(this.modelType == '4'){
					arg.type = 0;
					arg.reason = this.input_value;
				}
				resource.lendingAdd(arg).then(res => {
					if(res.code == 1){
						if(this.modelType == '3'){
							this.$router.replace('/success?value=' + '借样成功' + '&img_url=success');
						}else if(this.modelType == '4'){
							this.$router.replace('/success?value=' + '借样拒绝' + '&img_url=jyjj');
						}
					}
				})
			},
			//点击进入详情
			goDetail(sku_code){
				//在库中
				this.$router.push('/yyxq?type=1&sku_code=' + sku_code + '&batch_id=' + this.lending_id);
			}
		},
		components:{
			DialogModel,
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 15px;
	.top_content{
		flex:1;
		overflow-y: scroll;
		.info_row{
			margin-top: 15px;
			font-size: 14px;
			color: #000000;
		}
		.van_list{
			.yy_item{
				margin-bottom: 6px;
				width: 100%;
				height: 100px;
				display: flex;
				align-items: center;
				.yy_img{
					margin-right: 15px;
					width: 70px;
					height: 70px;
				}
				.yy_content{
					flex:1;
					height: 70px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.yy_row{
						font-size: 14px;
						color: #000000;
					}
				}
				.delete_icon{
					width: 18px;
					height: 20px;
				}
				.right_arrow{
					margin-left: 15px;
					width: 12px;
					height: 24px;
				}
			}
		}
	}
	.bottom_box{
		.all_delete{
			margin-top:15px; 
			margin-bottom:30px; 
			width: 100%;
			text-align: center;
			color: #428FFF;
			font-size: 14px;
		}
		.smyym_button{
			margin-bottom: 15px;
			border-radius: 20px;
			border:1px solid #2C82FF;
			width: 100%;
			height: 40px;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			font-weight: 500;
			.bind_scan_icon{
				margin-right: 4px;
				width: 14px;
				height: 14px;
			}
			.scan_text{
				color: #2C82FF;
			}
		}
		.button_box{
			width: 100%;
			height: 70px;
			display:flex;
			align-items: center;
			justify-content: space-around;
			.button{
				border-radius: 20px;
				border:1px solid #2C82FF;
				width: 160px;
				height: 40px;
				display:flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
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