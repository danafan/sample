<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div>入库批次：</div>
				<div>{{batch_id}}</div>
			</div>
			<div class="row">
				<div>责任人：</div>
				<div>{{topInfo.liabler_name}}</div>
			</div>
			<div class="row">
				<div>提交人：</div>
				<div>{{topInfo.user_name}}</div>
			</div>
			<div class="row">
				<div>绑定时间：</div>
				<div>{{topInfo.finish_time}}</div>
			</div>
		</div>
		<div class="tab_row" v-if="topInfo.status == 2">
			<div class="tab_item all" :class="{'active_item':tab_index == 0}" @click="checkTab(0)">
				全部
			</div>
			<div class="tab_item" :class="{'active_item':tab_index == 1}" @click="checkTab(1)">
				收到
			</div>
			<div class="tab_item wsd" :class="{'active_item':tab_index == 2}" @click="checkTab(2)">
				未收到
			</div>
		</div>
		<van-list
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item" v-for="(item,index) in listArray" @click="goDetail(item.sku_code)">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="status" v-if="page_type == 'menu' || (page_type == 'index' && topInfo.status == 2 && item.receive_status != 2)">{{item.receive_status == 0?'未确认':item.receive_status == 1?'已收到':'未收到'}}</div>
				<van-radio-group v-model="useArray[index].receive_status" direction="horizontal" v-if="(page_type == 'index' && topInfo.status == 1) || (page_type == 'index' && topInfo.status == 2 && item.receive_status == 2)">
					<van-radio :name="1" @click.stop.native="()=>{}">收到</van-radio>
					<van-radio :name="2" @click.stop.native="()=>{}">未收到</van-radio>
				</van-radio-group>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0"></EmptyPage>
	<div class="button_box" v-if="page_type == 'index' && (topInfo.status == 1 || (topInfo.status == 2 && tab_index != 1 && wsd_num > 0))">
		<div class="button" @click="confirm">一键确认</div>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	import DialogModel from '../../components/dialog_model.vue'
	export default{
		data(){
			return{
				page_type:'index',	//页面类型（index：直接，menu：绑定记录进入）
				checked:'1',
				topInfo:{},			//顶部信息
				batch_id:"",		//批次ID
				tab_index:0,
				dataArray:[],		//总列表
				listArray:[],		//渲染列表
				useArray:[],		//当前渲染的临时列表
				czArray:[],			//需要操作的列表
				wsd_num:0,			//未收到的数量
				showModel:false,
				value:"",
				wsd_ids:[],
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path == '/yyxq'){	//样衣报损
				from.meta.isUseCache = true;
			}else{
				from.meta.isUseCache = false;
			}
			next();
		},
		activated(){
			if(!this.$route.meta.isUseCache){
				this.tab_index = 0;
				this.listArray = [];	
				this.useArray = [];	
				//批次ID
				this.batch_id = this.$route.query.batch_id;
				// 页面类型
				this.page_type = this.$route.query.page_type;
				//绑定记录详情
				this.bindingDetail();
			}
			this.$route.meta.isUseCache = false;
		},
		methods:{
			//绑定记录详情
			bindingDetail(){
				resource.bindingDetail({binding_id:this.batch_id}).then(res => {
					if(res.code == 1){
						this.topInfo = res.data;
						//获取商品列表
						this.getGoodsList();
					}
				})
			},
			//切换选中tab
			checkTab(index){
				this.tab_index = index;
				this.listArray = [];
				if(this.tab_index == 0){
					this.listArray = this.dataArray;
					this.useArray = JSON.parse(JSON.stringify(this.dataArray));
				}else{
					this.dataArray.map(item => {
						if(item.receive_status == this.tab_index){
							this.listArray.push(item);
						}
					})
					if(index == 2){
						let useArray = JSON.parse(JSON.stringify(this.dataArray));
						this.czArray = [];
						useArray.map(item => {
							if(item.receive_status == 2){
								this.czArray.push(item)
							}
						});
						this.useArray = this.czArray;
					}
				}
			},
			//获取商品列表
			getGoodsList(){
				let arg = {
					batch_id:this.batch_id,
					type:0
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.dataArray = res.data;
						this.listArray = res.data;
						this.listArray.map(item => {
							if(item.receive_status == 2){
								this.wsd_num += 1;
							};
							if(this.page_type == 'index' && item.receive_status == 0){
								item.receive_status = 1;
							}
						});
						this.useArray = JSON.parse(JSON.stringify(this.listArray));
						if(this.topInfo.status == 2){	//已确认之后的，把需要操作的取出来
							this.czArray = [];
							this.useArray.map(item => {
								if(item.receive_status == 2){
									this.czArray.push(item)
								}
							});
						}	
					}
				})
			},
			//点击进入详情
			goDetail(sku_code){
				this.$router.push('/yyxq?sku_code=' + sku_code + '&type=1&' + 'batch_id=' + this.batch_id + '&show_status=2');
			},
			//一键确认
			confirm(){
				var ysd = 0;
				var wsd = 0;
				this.wsd_ids = [];
				this.useArray.map(item => {
					if(item.receive_status == 1){
						ysd += 1;
					}
					if(item.receive_status == 2){
						this.wsd_ids.push(item.id);
						wsd += 1;
					}
				});
				var ysd_num = 0;		//已收到的数量
				if(this.topInfo.status == 2){
					this.czArray.map(item => {
						this.useArray.map(i => {
							if(i.receive_status == 1 && (item.id == i.id)){
								ysd_num += 1;
							}
						})
					})
				}
				this.value = `看准哦！一键确认${this.topInfo.status == 2?this.czArray.length:this.useArray.length}件商品，${this.topInfo.status == 2?ysd_num:ysd}件收到，${wsd}件未收到`;
				this.showModel = true;
			},
			//弹窗确认
			callbackFn(v){
				if(v == '2'){
					if(this.topInfo.status == 1){	//待确认
						let arg = {
							binding_id:this.batch_id,
							un_received_ids:this.wsd_ids.join(',')
						}
						resource.addConfirm(arg).then(res => {
							if(res.code == 1){
								this.$toast('已确认');
								this.$router.go(-1);
							}
						})
					}else{							//已确认
						var arr = [];
						this.czArray.map(item => {
							this.useArray.map(i => {
								if(i.receive_status == 1 && (item.id == i.id)){
									arr.push(item.id);
								}
							})
						})
						let arg = {
							binding_id:this.batch_id,
							un_received_ids:arr.join(',')
						}
						resource.editConfirm(arg).then(res => {
							if(res.code == 1){
								this.$toast('已确认');
								this.$router.go(-1);
							}
						})
					}
				}
				this.showModel = false;
			},
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
		height: 140px;
		padding-left:15px;
		padding-right:15px;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		.row{
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: #000000;
		}
	}
	.tab_row{
		margin-top: 10px;
		margin-bottom: 10px;
		width: 100%;
		display: flex;
		height: 38px;
		.tab_item{
			border:1px solid #B9D6FF;
			flex:1;
			text-align: center;
			height: 38px;
			line-height: 38px;
			font-size: 14px;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.all{
			border-radius: 19px 0 0 19px;
		}
		.wsd{
			border-radius: 0 19px 19px 0;
		}
		.active_item{
			color: #ffffff;
			background:#1572F9;
		}
	}
	.van_list{
		flex:1;
		overflow-y: scroll;
		.yy_item{
			margin-bottom: 6px;
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
				flex-direction: column;
				justify-content: space-around;
				font-size: 14px;
				.yy_row{
					color: #000000;
				}
				.status{
					font-size: 14px;
					color: #1572F9;
				}
			}
			.right_arrow{
				width: 12px;
				height: 24px;
			}
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
			background: #2C82FF;
			color: #ffffff;
			width: 160px;
			height: 40px;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			font-weight: 500;
		}
	}
}
</style>