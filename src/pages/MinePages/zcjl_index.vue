<template>
	<div class="container">
		<van-list  v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="item" @click="goZcxq(page_type == 'ghjl'?item.return_id:item.handle_id)" v-for="item in listArray">
			<div class="item_label">{{page_type == 'ghjl'?'归还记录':'处理记录'}}</div>
			<div class="item_value">{{item.apply_time}}</div>
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
				listArray:[],		//列表
				loading:true,
				finished:false,
				page:1,
				pagesize:10,
				page_type:"",			//页面来源
			}
		},
		created(){
			this.page_type = this.$route.query.page_type;
			if(this.page_type == 'ghjl'){	//归还记录
				this.returnRecord();
			}else{
				//处理记录
				this.handleRecord();
			}
			
		},
		methods:{
			//加载更多
			loadMore(){
				this.page += 1;
				if(this.page_type == 'ghjl'){	//归还记录
					this.returnRecord();
				}else{
					//处理记录
					this.handleRecord();
				}
			},
			//归还记录
			returnRecord(){
				let arg = {
					page:this.page,
					pagesize:this.pagesize
				}
				resource.returnRecord(arg).then(res => {
					this.loading = false;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
					}
				})
			},	
			//处理记录
			handleRecord(){
				let arg = {
					page:this.page,
					pagesize:this.pagesize
				}
				resource.handleRecord(arg).then(res => {
					this.loading = false;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
					}
				})
			},
			//跳转详情
			goZcxq(batch_id){
				this.$router.push('/zcxq?page_type=' + this.page_type + '&batch_id=' + batch_id);
			}
		},
		components:{
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding-left: 20rem;
	padding-right: 20rem;
}
.van_list{
	.item{
		width: 100%;
		height: 70rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14rem;
		.item_label{
			color: #333333;
		}
		.item_value{
			color: #666666;
		}
	}
}
</style>