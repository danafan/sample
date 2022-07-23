<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">申请人：</div>
				<div class="value">{{top_info.user_name}}</div>
			</div>
			<div class="row">
				<div class="lable">转移后责任人：</div>
				<div class="value">{{top_info.liabler_name}}</div>
			</div>
			<div class="row">
				<div class="lable">当前状态：</div>
				<div class="value" v-if="top_info.status == 0">未处理</div>
				<div class="value" v-if="top_info.status == 1">已同意</div>
				<div class="value" v-if="top_info.status == 2">已拒绝</div>
			</div>
			<textarea class="remark_input" disabled :row="5" v-model="top_info.remark" placeholder="备注内容"></textarea>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="yy_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item border_bottom" v-for="(item,index) in listArray">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				唯一码：{{item.sku_code}}
			</div>
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
	<div class="bottom_box" v-if="page_type == '1' && top_info.status == 0">
		<div class="button" @click="auditFn('0')">拒绝</div>
		<div class="button rk_button" @click="auditFn('1')">同意</div>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
</div>
</template>
<script>
	import EmptyPage from '../CommonPages/empty_page.vue'
	import resource from '../../api/resource.js'
	import DialogModel from '../../components/dialog_model.vue'
	export default{
		data(){
			return{
				page_type:"",				//0:转移记录；1:接管记录
				handover_id:"",				//ID
				user_name:"",				//责任人
				user_id:"",					//责任人ID
				remark:"",					//备注
				page:1,
				pagesize:10,				
				listArray:[],				//列表
				top_info:{},				//顶部信息
				loading:false,
				finished:false,
				showModel:false,
				value:"",
				type:""
			}
		},
		created(){
			let query = this.$route.query;
			this.page_type = query.page_type;
			this.handover_id = query.id;
			//转移和接管记录详情
			this.handoverDetail();
		},
		methods:{
			//获取更多
			loadMore(){
				this.page += 1;
				//转移和接管记录详情
				this.getGoodsList();
			},
			//转移和接管记录详情
			handoverDetail(){
				let arg = {
					handover_id:this.handover_id,
					page:this.page,
					pagesize:this.pagesize,	
				}
				resource.handoverDetail(arg).then(res => {
					if(res.code == 1){
						this.top_info = res.data.info;
						this.loading = false;
						this.listArray = [...this.listArray,...res.data.list.data];
						if(this.page == res.data.list.last_page){
							this.finished = true;
						}
					}
				})
			},
			//审核
			auditFn(type){	//0:拒绝;1:同意
				this.type = type;
				this.value = type == '0'?'确认拒绝？':'确认同意？';
				this.showModel = true;
			},
			//提交审核
			callbackFn(type){
				if(type == '1'){
					this.showModel = false;
				}else{
					let arg = {
						handover_id:this.handover_id,
						type:this.type
					}
					resource.handoverAudit(arg).then(res => {
						if(res.code == 1){
							this.$toast('审核成功！');
							this.$router.go(-1);
						}
					})
				}
			}
		},
		components:{
			EmptyPage,
			DialogModel
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 15px;
	.yyj_gly{
		width: 100%;
		padding-left:15px;
		padding-right:15px;
		.row{
			display:flex;
			padding-top: 5px;
			padding-bottom: 5px;
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
				.right_arrow{
					margin-left: 5px;
					width: 12px;
					height: 24px;
				}
			}
		}
		.remark_input{
			margin-top: 5px;
			border-radius: 3px;
			font-size: 14px;
			border:1px solid rgba(0, 0, 0, 0.4);
			width: 100%;
			height: 60px;
			padding:5px;
		}
	}
	.yy_list{
		flex:1;
		overflow-y: scroll;
		.yy_item{
			padding-left: 15px;
			padding-right: 15px;
			width: 100%;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.yy_img{
				margin-right: 15px;
				width: 70px;
				height: 70px;
			}
			.yy_content{
				flex:1;
				height: 70px;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #000000;
			}
			.delete_icon{
				width: 18px;
				height: 20px;
			}
		}
	}
	.bottom_box{
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
		.rk_button{
			background: #2C82FF;
			color: #ffffff;
		}
	}
	
}
</style>