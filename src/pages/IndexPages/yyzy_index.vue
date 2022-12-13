<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">申请人：</div>
				<div class="value" @click="showPicker = true" v-if="userInfo.user_type == 1">
					<div class="default_txt">{{sqr_name}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
				<div class="value" v-else>{{sqr_name}}</div>
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
		<van-list
		class="yy_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item border_bottom" v-for="(item,index) in listArray">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				唯一码：{{item.sku_code}}
			</div>
			<van-checkbox v-model="item.is_checked"></van-checkbox>
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0"></EmptyPage>
	<div class="bottom">
		<BigButton button_txt="一键转移" @callback="callBack"></BigButton>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
	<van-popup v-model="showPicker" round position="bottom">
		<van-picker title="申请人" :default-index="current_index" :columns="columns" show-toolbar @cancel="showPicker = false" @confirm="onConfirm">
			<template #option="option">
				<div>
					<div>{{ option.real_name }}</div>
				</div>
			</template>
		</van-picker>
	</van-popup>
</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi'; 
	import EmptyPage from '../CommonPages/empty_page.vue'
	import BigButton from '../../components/big_button.vue'
	import DialogModel from '../../components/dialog_model.vue'
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				sqr_name:"",				//申请人
				sqr_id:"",					//选择的申请人ID
				user_name:"",				//责任人
				user_id:"",					//责任人ID
				remark:"",					//备注
				listArray:[],				//列表
				all_checked:false,			//全选
				showModel:false,			//确认转移弹窗
				value:"",					//确认转移弹窗文字提示
				showPicker:false,
				current_index:null,			//当前选中的下标
				columns:[],					//申请人列表
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			},
		},
		watch:{
			all_checked:function(n,o){
				this.listArray.map(item => {
					item.is_checked = n;
				})
			}
		},
		created(){
			//当前用户所有借样中的样衣接口
			this.getClothesList();
			this.sqr_name = this.userInfo.user_name;
			if(this.userInfo.user_type == 1){
				//获取申请人列表
				this.ajaxUsers();
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
			//当前用户所有借样中的样衣接口
			getClothesList(sqr_id){
				let arg = {}
				if(sqr_id){
					arg.select_user_id = sqr_id;
				}
				resource.clothesList(arg).then(res => {
					if(res.code == 1){
						let data_list = res.data;
						data_list.map(item => {
							item.is_checked = false;
						})
						this.listArray = data_list;
					}
				})
			},
			//一键转移
			callBack(){
				let checked_list = this.listArray.filter(item => {
					return item.is_checked == true;
				})
				if(this.user_id == ''){
					this.$toast('请选择转移后责任人');
				}else if(checked_list.length == 0){
					this.$toast('请选择样衣！');
				}else{
					this.value = `确认将选中样衣转移给【${this.user_name}】？`
					this.showModel = true;
				}
			},
			//弹窗确认或取消
			callbackFn(type){
				if(type == '2'){
					var ids = [];
					this.listArray.map(item => {
						if(item.is_checked == true){
							ids.push(item.sku_code);
						}
					})
					let arg = {
						ids:ids.join(','),
						user_name:this.user_name,
						user_id:this.user_id,
						remark:this.remark
					}
					resource.applyTransfer(arg).then(res => {
						if(res.code == 1){
							this.$router.replace('/success?value=已提交转移&img_url=success&showBut=1');
						}
					})
				}else{
					this.showModel = false;
				}
			},
			//获取申请人列表
			ajaxUsers(){
				resource.ajaxUsers().then(res => {
					if(res.code == 1){
						this.columns = res.data;
					}
				})
			},
			onConfirm(value, index){
				this.sqr_name = value.real_name;
				this.sqr_id = value.userid;
				this.current_index = index;
				this.showPicker = false;
				//当前用户所有借样中的样衣接口
				this.getClothesList(this.sqr_id)
			}
		},
		components:{
			DialogModel,
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