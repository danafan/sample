<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">申请人：</div>
				<div class="value">晁错</div>
			</div>
			<div class="row">
				<div class="lable">转移后责任人：</div>
				<div class="value" @click="checkZrr">
					<div class="yyj_txt" :class="{'default_txt':user_name != ''}">{{user_name == ''?'选择责任人':user_name}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<textarea class="remark_input" :row="5" v-model="remark" placeholder="请输入备注"></textarea>
		</div>
		<div class="all_checked" v-if="listArray.length > 0">
			<van-checkbox v-model="all_checked" shape="square">全选</van-checkbox>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="yy_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item border_bottom" v-for="(item,index) in listArray">
			<img class="yy_img" src="../../static/empty_icon.png">
			<div class="yy_content">
				唯一码：876128316283
			</div>
			<van-checkbox v-model="checked"></van-checkbox>
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
	<div class="bottom">
		<BigButton button_txt="一键转移" @callback="callBack"></BigButton>
	</div>
</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi'; 
	import EmptyPage from '../CommonPages/empty_page.vue'
	import BigButton from '../../components/big_button.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				user_name:"",				//责任人
				user_id:"",					//责任人ID
				remark:"",					//备注
				page:1,
				pagesize:10,				
				listArray:[''],				//列表
				total_num:0,				//总数量
				loading:false,
				finished:false,
				checked:false,
				all_checked:false,			//全选
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		methods:{
			//点击选择责任人
			checkZrr(){
				dd.ready(() => {
					dd.biz.contact.complexPicker({
						title: "选择责任人",
						corpId: "ding7828fff434921f5b",
						multiple: false,
						limitTips: "超出了",
						maxUsers: 1000,
						pickedUsers: [],
						pickedDepartments: [],
						disabledUsers: [],
						disabledDepartments: [],
						requiredUsers: [],
						requiredDepartments: [],
						appId: 1664876526,
						permissionType: "GLOBAL",
						responseUserOnly: true,
						startWithDepartmentId: 0,
						onSuccess : (res) => {
							//责任人
							this.user_name = res.users[0].name;
							this.user_id = res.users[0].emplId;
						},
						onFail : function(err) {
							// 调用失败时回调
							console.log(err)
						}
					});
				})
			},
			//获取更多
			loadMore(){
				if(this.page_type == 'yygh'){
					this.page += 1;
					//获取已绑定的商品列表
					this.getGoodsList();
				}
			},
			//获取已绑定的商品列表
			getGoodsList(){
				let batch_id = this.page_type == 'yybd'?this.bindingInfo.binding_id:this.returnInfo.return_id;
				let arg = {
					batch_id:batch_id,
					type:this.page_type == 'yybd'?'0':'1',
					page:this.page,
					pagesize:this.pagesize
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						if(this.page_type == 'yygh'){
							this.total_num = res.data.total;
							this.listArray = [...this.listArray,...res.data.data];
							if(this.page == res.data.last_page){
								this.finished = true;
							}
						}else{
							this.listArray = res.data;
							this.finished = true;
						}
					}
				})
			},
			//一键转移
			callBack(){
				this.$router.replace('/success?value=已提交转移&img_url=success&showBut=1');
			}
		},
		components:{
			BigButton,
			EmptyPage
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
	.all_checked{
		font-size: 14px;
		color: #000000;
		padding-top: 15px;
		padding-bottom: 15px;
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
	.bottom{
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
}
</style>