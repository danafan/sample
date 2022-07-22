<template>
	<div class="container">
		<div class="tab_box">
			<div class="tab_item left" :class="{'active_back':active_index == '0'}" @click="checkTab('0')">
				转移记录
				<div class="num" :class="{'active_num':active_index == '0'}">1</div>
			</div>
			<div class="tab_item right" :class="{'active_back':active_index == '1'}" @click="checkTab('1')">
				接管记录
				<div class="num" :class="{'active_num':active_index == '1'}">2</div>
			</div>
		</div>
		<div class="check_status" @click="showPopup = true">
			<div class="lable">{{status_list[status_index].name}}</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="task_list.length > 0"
		>
		<div class="task_item border_bottom" v-for="item in task_list" @click="goZjju">
			<div class="item_lable">您有一条样衣{{active_index == '0'?'转移':'接管'}}记录待处理</div>
			<div class="item_value">{{item.add_time}}</div>
		</div>
	</van-list>
	<EmptyPage v-if="task_list.length == 0 && loading == false"></EmptyPage>
	<!-- 筛选条件 -->
	<van-popup v-model:show="showPopup" position="bottom" round>
		<div class="list">
			<div class="item" :class="{'active_item':status_index == index}" v-for="(item,index) in status_list" @click="checkStatus(index)">{{item.name}}</div>
		</div>
		<div class="padding_box"></div>
		<div class="item" @click="showPopup = false">取消</div>
	</van-popup>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				active_index:'0',		//tab选中
				task_list:[''],			//列表
				loading:true,			//是否加载中
				finished:false,			//是否是最后一页
				page:1,
				pagesize:10,
				unchecknum:0,			//未完成的数量
				showPopup:false,
				status_list:[{
					id:'0',
					name:'全部'
				},{
					id:'1',
					name:'已同意'
				},{
					id:'2',
					name:'待处理'
				},{
					id:'3',
					name:'已拒绝'
				}],						//筛选状态列表
				status_index:0,			//选中的状态下标
			}
		},
		created(){
			//盘点记录列表
			this.checkList();
		},
		methods:{
			//加载更多
			loadMore(){
				this.page += 1;
				//盘点记录列表
				this.checkList();
			},
			//盘点记录列表
			checkList(){
				let arg = {
					status:this.active_index,
					page:this.page,
					pagesize:this.pagesize
				}
				resource.checkList(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						if(this.active_index == '0'){
							this.unchecknum = res.data.total;
						}
						this.task_list = [...this.task_list,...res.data.data];
						if(this.page == res.data.last_page){
							this.finished = true;
						}
					}
				})
			},
			//切换顶部tab
			checkTab(type){
				this.active_index = type;
				this.page = 1;
				this.task_list = [];
				//盘点记录列表
				this.checkList();
			},
			//切换状态
			checkStatus(index){
				this.status_index = index;
				this.showPopup = false;
			},
			//查看记录
			goZjju(){
				this.$router.push('/zj_record?page_type=zyju&type=' + this.active_index);
			}
			
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	flex-direction: column;
	.tab_box{
		margin-top: 10px;
		margin-bottom: 20px;
		display: flex;
		height: 38px;
		.tab_item{
			background:#F9FBFC;
			width: 50%;
			height: 38px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #333333;
			.num{
				margin-left: 6px;
				border-radius: 8px;
				background:#1572F9;
				padding-left: 5px;
				padding-right: 5px;
				height: 16px;
				line-height: 16px;
				font-size: 12px;
				color: #ffffff;
			}
			.active_num{
				background:#ffffff;
				color: #1572F9;
			}
		}
		.left{
			border-radius: 19px 0 0 19px;
		}
		.right{
			border-radius: 0 19px 19px 0;
		}
		.active_back{
			background: #1572F9;
			color: #ffffff;
		}
	}
	.check_status{
		padding-top: 15px;
		padding-bottom: 15px;
		font-size: 14px;
		color: #000000;
		display: flex;
		align-items: center;
		.right_arrow{
			margin-left: 5px;
			width: 12px;
			height: 24px;
		}
	}
	.van_list{
		flex:1;
		overflow-y: scroll;
		.task_item{
			width: 100%;
			height: 70px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			.item_lable{
				color: #333333;
			}
			.item_value{
				color: #666666;
			}
		}
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
}
</style>