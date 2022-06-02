<template>
	<div class="container">
		<div class="search_box" v-if="page_type == 'jyjl'">
			<img class="search_icon" src="../../static/search_icon.png">
			<input class="search_input" @change="searchFn" type="text" placeholder="搜索借样人" v-model="jyr">
		</div>
		<div class="tab_row">
			<div class="tab_item djy" :class="{'active_item':tab_index == 0}" @click="checkTab(0)">
				待借用
				<div class="num" :class="{'active_num':tab_index == 0}" v-if="page_type == 'jyjl'">{{unreturnnum}}</div>
			</div>
			<div class="tab_item" :class="{'active_item':tab_index == 1}" @click="checkTab(1)">
				已借用
			</div>
			<div class="tab_item yjj" :class="{'active_item':tab_index == 2}" @click="checkTab(2)">
				已拒绝
			</div>
		</div>
		<van-list v-model:loading="loading"
		 :finished="finished"
		  @load="loadMore"
		  finished-text="没有更多了"
		   class="van_list"
		   v-if="listArray.length > 0"
		>
		<div class="record_item" v-for="item in listArray" @click="goJyxq(item.lending_id)">
			<div class="first_row">
				<div class="name">{{item.user_name}}的样衣记录</div>
				<div class="date">{{item.apply_time}}</div>
			</div>
			<div class="num_row" v-if="tab_index == 1">
				<div>总数：{{item.total_num}}</div>
				<div>已还：{{item.return_num}}</div>
				<div>待还：{{item.un_return_num}}</div>
				<div>报损：{{item.loss_num}}</div>
			</div>
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0 && loading == false"></EmptyPage>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				jyr:"",				//借样人
				tab_index:0,		//当前选中的tab下标
				unreturnnum:0,		//获取待借用记录数量
				page:1,
				pagesize:10,				
				listArray:[],				//列表
				loading:true,
				finished:false,
				page_type:'',		//页面来源
			}
		},
		created(){
			//页面来源
			this.page_type = this.$route.query.page_type;
			if(this.page_type == 'wdjy'){	//我的借样列表	
				this.myLendingList();
			}else{		//借样记录
				this.lendingList();
				//获取待借用记录数量
				this.unNeturnNum();
			}
		},
		methods:{
			//切换选中tab
			checkTab(index){
				this.tab_index = index;
				this.page = 1;
				this.listArray = [];
				this.loading = true;
				this.finished = false;
				if(this.page_type == 'wdjy'){	//我的借样列表	
					this.myLendingList();
				}else{		//借样记录
					this.lendingList();
				}
			},
			//搜索
			searchFn(){
				this.page = 1;
				this.listArray = [];
				this.loading = true;
				this.finished = false;
				this.lendingList();
			},
			//获取更多
			loadMore(){
				this.page += 1;
				if(this.page_type == 'wdjy'){	//我的借样列表	
					this.myLendingList();
				}else{		//借样记录
					this.lendingList();
				}
			},
			//获取待借用记录数量
			unNeturnNum(){
				resource.unNeturnNum().then(res => {
					if(res.code == 1){
					this.unreturnnum = res.data;
				}
				})
			},
			//我的借样列表
			myLendingList(){
				let arg = {
					status:this.tab_index,
					page:this.page,
					pagesize:this.pagesize
				}
				resource.myLendingList(arg).then(res => {
					if(res.code == 1){
					this.loading = false;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
					}
				}
				})
			},
			//借样记录列表
			lendingList(){
				let arg = {
					status:this.tab_index,
					user_name:this.jyr,
					page:this.page,
					pagesize:this.pagesize
				}
				resource.lendingList(arg).then(res => {
					if(res.code == 1){
					this.loading = false;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
					}
				}
				})
			},
			//借样详情
			goJyxq(lending_id){
				if(this.tab_index == 0){	//待借样
					if(this.page_type == 'wdjy'){	//我的借样
						this.$router.push('/jyxq?type=' + this.tab_index + '&lending_id=' + lending_id);
					}else{	//借样记录
						this.$router.push('/jyjlxq?lending_id=' + lending_id);
					}
				}else{
					this.$router.push('/jyxq?type=' + this.tab_index + '&lending_id=' + lending_id);
				}
				
			}
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 8rem 12rem;
	.search_box{
		background: #F8F8F8;
		border-radius: 17rem;
		width: 100%;
		height: 34rem;
		display: flex;
		align-items: center;
		padding-left: 10rem;
		padding-right: 10rem;
		.search_icon{
			margin-right: 5rem;
			width: 19rem;
			height: 19rem;
		}
		.search_input{
			flex:1;
			height: 30rem;
			border: none;
			outline: none;
			font-size: 14rem;
			padding-left: 5rem;
		}
	}
	.tab_row{
		margin-top: 10rem;
		margin-bottom: 10rem;
		width: 100%;
		display: flex;
		height: 38rem;
		.tab_item{
			border:1px solid #B9D6FF;
			flex:1;
			text-align: center;
			height: 38rem;
			line-height: 38rem;
			font-size: 14rem;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.djy{
			border-radius: 19rem 0 0 19rem;
			.num{
				margin-left: 5rem;
				height: 18rem;
				line-height: 18rem;
				border-radius: 9rem;
				padding-left: 5rem;
				padding-right: 5rem;
				font-size: 13rem;
				color: #ffffff;
				background:#1572F9;
			}
			.active_num{
				background-color: #ffffff;
				color: #333333;
			}
		}
		.yjj{
			border-radius: 0 19rem 19rem 0;
		}
		.active_item{
			color: #ffffff;
			background:#1572F9;
		}
	}
	.van_list{
		flex:1;
		overflow-y: scroll;
		.record_item{
			width: 100%;
			height: 80rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 15rem;
			padding-right: 15rem;
			font-size: 14rem;
			.first_row{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.name{
					color: #333333;
				}
				.date{
					color: #666666;
				}
			}
			.num_row{
				margin-top: 10rem;
				color: #6FAAFF;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
}
</style>