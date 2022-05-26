<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">借样人：</div>
				<div class="value" @click="showPopup = true">
					<div class="yyj_txt" :class="{'default_txt':jyr != ''}">{{jyr == ''?'选择借样人':jyr}}</div>
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
		<!-- 借样人 -->
		<van-popup v-model:show="showPopup" position="bottom" round>
			<div class="list">
				<div class="item" :class="{'active_item':jyrIndex == index}" v-for="(item,index) in jyr_list" @click="checkJyr(index)">{{item}}</div>
			</div>
			<div class="padding_box"></div>
			<div class="item" @click="showPopup = false">取消</div>
		</van-popup>
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
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				showPopup:false,		//借样人弹窗
				jyr_list:['借样人1','借样人2','借样人3','借样人4','借样人5'],
				jyrIndex:0,				//
				jyr:"",					//选择的借样人
				showDate:false,			//归还时间弹窗
				minDate: new Date(),
				ghsj_date:"",
				ghsj:"",				//选择的预计归还时间
				showJyyy:false,			//借样原因弹窗
				jyyy_list:['原因1','原因2','原因3','原因4','原因5'],
				jyyyIndex:0,				//
				jyyy:"",					//选择的借样原因
				remark:"",				//备注
			}
		},
		methods:{
			//切换借样人
			checkJyr(index){
				this.jyrIndex = index;
				this.jyr = this.jyr_list[this.jyrIndex];
				this.showPopup = false;
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
				this.jyyy = this.jyyy_list[this.jyyyIndex];
				this.showJyyy = false;
			},
			//发起借样
			callBack(){
				this.$router.push('/success?value=' + '已发起借样&img_url=jy');
			}
		},
		components:{
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
		height: 120rem;
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
	.remark_input{
		margin-top: 20rem;
		border:none;
		outline: none;
		border-radius: 6rem;
		width: 100%;
		height: 105rem;
		background:#FBFBFB;
		font-size: 14rem;
		padding:20rem;
	}
}

</style>