<template>
	<div class="container">
		<div class="tab_box">
			<div class="tab_item left" :class="{'active_back':active_index == '0'}" @click="checkTab('0')">
				未完成
				<div class="num" :class="{'active_num':active_index == '0'}">{{unchecknum}}</div>
			</div>
			<div class="tab_item right" :class="{'active_back':active_index == '1'}" @click="checkTab('1')">
				已完成
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="task_list.length > 0"
		>
		<div class="task_item border_bottom" v-for="item in task_list" @click="goPdxq(item.check_id)">
			<div class="item_lable">您有新的盘点任务{{item.check_status == '0'?'待完成':'已完成'}}</div>
			<div class="item_value">{{item.add_time}}</div>
		</div>
	</van-list>
	<EmptyPage v-if="task_list.length == 0 && loading == false"></EmptyPage>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				active_index:'0',		//tab选中
				task_list:[],			//列表
				loading:false,			//是否加载中
				finished:false,			//是否是最后一页
				page:1,
				pagesize:10,
				unchecknum:0,			//未完成的数量
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
			//盘点详情
			goPdxq(batch_id){
				this.$router.push('/pdxq_index?type=' + this.active_index + '&batch_id=' + batch_id);
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
}
</style>