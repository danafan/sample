<template>
	<div class="container">
		<div class="search_box" v-if="page_type == 'jyjl'">
			<img class="search_icon" src="../../static/search_icon.png">
			<input class="search_input" type="text" placeholder="搜索借样人" v-model="jyr">
		</div>
		<div class="tab_row">
			<div class="tab_item djy" :class="{'active_item':tab_index == 1}" @click="checkTab(1)">
				待借用
			</div>
			<div class="tab_item" :class="{'active_item':tab_index == 2}" @click="checkTab(2)">
				已借用
			</div>
			<div class="tab_item yjj" :class="{'active_item':tab_index == 3}" @click="checkTab(3)">
				已拒绝
			</div>
		</div>
		<van-list v-model:loading="loading" :finished="finished" @load="loadMore" class="van_list"
		>
		<div class="record_item" v-for="item in record_list" @click="goJyxq">
			<div class="first_row">
				<div class="name">蜂鸟的样衣记录</div>
				<div class="date">05/11/12:45</div>
			</div>
			<div class="num_row" v-if="tab_index == 2">
				<div>总数：53</div>
				<div>已还：23</div>
				<div>待还：11</div>
				<div>报损：22</div>
			</div>
		</div>
	</van-list>
</div>
</template>
<script>
	export default{
		data(){
			return{
				jyr:"",				//借样人
				tab_index:1,		//当前选中的tab下标
				loading:false,
				finished:false,
				record_list:10,		//列表
				page_type:'',		//页面来源
			}
		},
		created(){
			//页面来源
			this.page_type = this.$route.query.page_type;
		},
		methods:{
			//切换选中tab
			checkTab(index){
				this.tab_index = index;
			},
			//加载更多
			loadMore(){

			},
			//借样详情
			goJyxq(){
				if(this.tab_index == 1){	//待借样
					if(this.page_type == 'wdjy'){	//我的借样
						this.$router.push('/jyxq?type=' + this.tab_index);
					}else{	//借样记录
						this.$router.push('/jyjlxq');
					}
				}else{
					this.$router.push('/jyxq?type=' + this.tab_index);
				}
				
			}
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
		}
		.djy{
			border-radius: 19rem 0 0 19rem;
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