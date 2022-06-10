<template>
	<div class="container">
		<div>
			<div class="info_row">事业部：{{lendingInfo.dept_name}}</div>
			<div class="info_row">借样人：{{lendingInfo.user_name}}</div>
			<div class="info_row">提交人：{{lendingInfo.apply_user_name}}</div>
			<div class="info_row">预计归还时间：{{lendingInfo.return_time}}</div>
			<div class="info_row">借用原因：{{lendingInfo.reason}}</div>
			<div class="info_row">备注：{{lendingInfo.remark}}</div>
			<div class="info_row">申请时间：{{lendingInfo.apply_time}}</div>
			<div class="info_row" v-if="yy_type == 1 || yy_type == 2">管理员：{{lendingInfo.admin_name}}</div>
			<div class="info_row" v-if="yy_type == 2">拒绝原因：{{lendingInfo.refund_reason}}</div>
			<div class="padding_div"></div>
			<div class="tab_row" v-if="yy_type == 1">
				<div class="tab_item" :class="{'active_item':active_index === ''}" @click="checkTab('')">全部</div>
				<div class="tab_item" :class="{'active_item':active_index === 0}" @click="checkTab(0)">待还</div>
				<div class="tab_item" :class="{'active_item':active_index == 1}" @click="checkTab(1)">已还</div>
				<div class="tab_item" :class="{'active_item':active_index == 2}" @click="checkTab(2)">报损</div>
			</div>
			<van-list v-model:loading="loading"
			:finished="finished"
			@load="loadMore"
			finished-text="没有更多了" v-if="yy_type == 1 && listArray.length > 0"
			>
			<div class="yy_item" v-for="(item,index) in listArray" :key="index + 1">
				<img class="yy_img" :src="item.domain + item.image">
				<div class="yy_content">
					<div class="yy_row">样衣码：{{item.sku_code}}</div>
					<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
					<div class="status" v-if="item.return_status == 0">待还</div>
					<div class="status" v-if="item.return_status == 1">已还</div>
					<div class="status" v-if="item.return_status == 2">已报损</div>
				</div>
				<img class="bs_icon" src="../../static/bs_icon.png" @click="goYybs(item)" v-if="item.return_status == 0">
			</div>
		</van-list>
	</div>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				lending_id:"",			//借样ID
				lendingInfo:{},			//借样详情
				active_index:'',		//选中的下标
				page:1,
				pagesize:10,				
				listArray:[],			//列表
				loading:false,
				finished:true,
				yy_type:0,				//详情类型（0:待借用；1:已借用；2:已拒绝）
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path == '/yybs_index'){	//样衣报损
				from.meta.isUseCache = true;
			}else{
				from.meta.isUseCache = false;
			}
			next();
		},
		activated(){
			if(!this.$route.meta.isUseCache){
				this.active_index = '';
			}
			//借样ID
			this.lending_id = this.$route.query.lending_id;
			//详情类型（0:待借用；1:已借用；2:已拒绝）
			this.yy_type = this.$route.query.type;
			//借样详情
			this.lendingDetail();
			if(this.yy_type == 1){
				//已借用的列表
				this.page = 1;
				this.listArray = [];	
				this.getGoodsList();
			}
			this.$route.meta.isUseCache = false;
		},
		methods:{
			//切换tab
			checkTab(index){
				this.active_index = index;
				this.page = 1;
				this.listArray = [];				
				this.finished = true;
				//已借用的列表
				this.getGoodsList();
			},
			//借样详情
			lendingDetail(){
				resource.lendingDetail({lending_id:this.lending_id}).then(res => {
					if(res.code == 1){
						this.lendingInfo = res.data;
					}
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
				var arg = {
					batch_id:this.lending_id,
					type:'2',
					page:this.page,
					pagesize:this.pagesize
				}
				if(this.active_index !== ''){
					arg.return_status = this.active_index;
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
			//样衣报损
			goYybs(item){
				this.$router.push('/yybs_index?sku_code=' + item.sku_code + '&batch_id=' + item.batch_id)
			},
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding: 10px 15px;
	.info_row{
		margin-top: 15px;
		font-size: 14px;
		color: #000000;
	}
	.tab_row{
		background:#ffffff;
		position: sticky;
		top: 0;
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tab_item{
			border:1px solid #B9D6FF;
			border-radius: 15px;
			width: 78px;
			text-align: center;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			color: #333333;
		}
		.active_item{
			background: #1572F9;
			color: #ffffff;
		}
	}
	.padding_div{
		height: 15px;
	}
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
			flex-direction: column;
			justify-content: space-around;
			font-size: 14px;
			.yy_row{
				color: #000000;
			}
			.status{
				color: #1572F9;
			}
		}
		.bs_icon{
			width: 24px;
			height: 24px;
		}
	}
}

</style>