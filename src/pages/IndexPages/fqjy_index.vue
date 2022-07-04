<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">借样人：</div>
				<div class="value" @click="checkJyr">
					<div class="yyj_txt" :class="{'default_txt':user_name != ''}">{{user_name == ''?'选择借样人':user_name}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<div class="row">
				<div class="lable">预计归还时间：</div>
				<div class="value" @click="showDate = true">
					<div class="yyj_txt" :class="{'default_txt':ghsj != ''}">{{ghsj == ''?'预计归还时间':ghsj}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<div class="row">
				<div class="lable">借样原因：</div>
				<div class="value" @click="showJyyy = true">
					<div class="yyj_txt" :class="{'default_txt':jyyy != ''}">{{jyyy == ''?'选择借样原因':jyyy}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
		</div>
		<!-- 预计归还时间 -->
		<van-popup v-model:show="showDate" position="bottom" round>
			<van-datetime-picker
			v-model="ghsj_date"
			type="date"
			title="预计归还时间"
			:min-date="minDate"
			@confirm="confirmDate"
			@cancel="showDate = false"
			/>
		</van-popup>
		<!-- 借样原因 -->
		<van-popup v-model:show="showJyyy" position="bottom" round>
			<div class="list">
				<div class="item" :class="{'active_item':jyyyIndex == index}" v-for="(item,index) in jyyy_list" @click="checkJyyy(index)">{{item}}</div>
			</div>
			<div class="padding_box"></div>
			<div class="item" @click="showJyyy = false">取消</div>
		</van-popup>
		<!-- 备注 -->
		<textarea class="remark_input" :row="5" placeholder="备注选填" v-model="remark"></textarea>
		<BigButton button_txt="发起借样" @callback="callBack"></BigButton>
	</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	import resource from '../../api/resource.js'
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				user_name:"",			//借样人
				user_id:"",
				showDate:false,			//归还时间弹窗
				minDate: new Date(),
				ghsj_date:"",
				ghsj:"",				//选择的预计归还时间
				showJyyy:false,			//借样原因弹窗
				jyyy_list:[],			//借样原因
				jyyyIndex:999,				//
				jyyy:"",					//选择的借样原因
				remark:"",					//备注
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		created(){
			//获取借样原因
			this.ajaxTypeList();
		},
		methods:{
			//获取借样原因
			ajaxTypeList(){
				resource.ajaxTypeList({type:'lending_reason'}).then(res => {
					if(res.code == 1){
						this.jyyy_list = res.data;
						this.user_name = this.userInfo.user_name;
						this.user_id = this.userInfo.userid;
					}
				})
			},
			//切换借样人
			checkJyr(index){
				dd.ready(() => {
					dd.biz.contact.complexPicker({
						title: "选择借样人",
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
			//归还时间确认
			confirmDate(){
				const date = new Date(this.ghsj_date);
				const year = date.getFullYear();
				let month = date.getMonth() + 1;
				month = month<10?"0"+month:month;   
				let day = date.getDate();
				day = day<10?"0"+day:day;  
				this.ghsj = year + '-' + month + '-' + day;
				this.showDate = false;
			},
			//切换借样原因
			checkJyyy(index){
				this.jyyyIndex = index;
				this.jyyy = this.jyyy_list[index];
				this.showJyyy = false;
			},
			//发起借样
			callBack(){
				if(this.user_name == ''){
					this.$toast('请选择借样人');
					return;
				}
				if(this.ghsj == ''){
					this.$toast('请选择预计归还时间');
					return;
				}
				if(this.jyyy == ''){
					this.$toast('请选择借样原因');
					return;
				}
				let arg = {
					user_name:this.user_name,
					user_id:this.user_id,
					return_time:this.ghsj,
					reason:this.jyyy,
					remark:this.remark
				}
				resource.lendingApply(arg).then(res => {
					if(res.code == 1){
						this.$toast(res.msg);
						this.$router.push('/success?value=' + '已发起借样&img_url=jy');
					}
				})
			}
		},
		components:{
			BigButton
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding:1px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	.yyj_gly{
		width: 100%;
		height: 120px;
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
			.right_arrow{
				margin-left: 15px;
				width: 12px;
				height: 24px;
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
	.remark_input{
		margin-top: 20px;
		border:none;
		outline: none;
		border-radius: 6px;
		width: 100%;
		height: 105px;
		background:#FBFBFB;
		font-size: 14px;
		padding:20px;
	}
}

</style>