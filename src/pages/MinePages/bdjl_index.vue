<template>
	<div class="container">
		<div class="tab_row">
			<div class="tab_item dbjl" :class="{'active_item':tab_index == 1}" @click="checkTab(1)">
				调拨记录
			</div>
			<div class="tab_item rkjl" :class="{'active_item':tab_index == 2}" @click="checkTab(2)">
				入库记录
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="bdjl_item" v-for="item in listArray" @click="goDetail(item.binding_id)">
			<div class="item_left">
				<div class="code">{{item.binding_id}}</div>
				<div>{{item.user_name}}</div>
			</div>
			<div class="item_right">{{item.add_time}}</div>
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
				tab_index:1,		//默认调拨记录
				listArray:[],		//列表
				loading:true,
				finished:false,
				page:1,
				pagesize:10
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path == '/dbjlxq' || to.path == '/bdjlxq'){	//样衣报损
				from.meta.isUseCache = true;
			}else{
				from.meta.isUseCache = false;
			}
			next();
		},
		activated(){
			if(!this.$route.meta.isUseCache){
				this.tab_index = 1;
			}
			this.page = 1;
			this.listArray = [];	
			this.loading = true;
			this.finished = false;
			//获取绑定记录
			this.bindingRecord();
			this.$route.meta.isUseCache = false;
		},
		methods:{
			//切换选中tab
			checkTab(index){
				this.tab_index = index;
				this.page = 1;
				this.listArray = [];
				this.loading = true;
				this.finished = false;
				//获取绑定记录
				this.bindingRecord();
			},
			//获取绑定记录
			bindingRecord(){
				let arg = {
					binding_flag:this.tab_index,
					page:this.page,
					pagesize:this.pagesize
				}
				resource.bindingRecord(arg).then(res => {
					if(res.code == 1){
						this.loading = false;
						this.listArray = [...this.listArray,...res.data.data];
						if(this.page == res.data.last_page){
							this.finished = true;
						}
					}
				})
			},
			//点击进入详情
			goDetail(batch_id){
				if(this.tab_index == 1){		//调拨记录
					this.$router.push('/dbjlxq?batch_id=' + batch_id + '&page_type=menu');
				}else{							//绑定记录
					this.$router.push('/bdjlxq?batch_id=' + batch_id);
				}
			},
			//获取更多
			loadMore(){
				this.page += 1;
				//获取已绑定的商品列表
				this.bindingRecord();
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
		.dbjl{
			border-radius: 19px 0 0 19px;
		}
		.rkjl{
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
		width: 100%;
		.bdjl_item{
			width: 100%;
			height: 70px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			.item_left{
				color: #333333;
				display: flex;
				align-items: center;
				.code{
					margin-right: 15px;
				}
			}
			.item_right{
				color: #666666;
			}
		}
	}
}
</style>