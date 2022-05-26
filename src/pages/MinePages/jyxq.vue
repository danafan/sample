<template>
	<div class="container">
		<div>
			<div class="info_row">商品编码：234234234</div>
			<div class="info_row">款式编码：234234234</div>
			<div class="info_row">供应商款号：234234234</div>
			<div class="padding_div"></div>
			<div class="tab_row" v-if="yy_type == 2">
				<div class="tab_item" :class="{'active_item':active_index == 0}" @click="checkTab(0)">全部</div>
				<div class="tab_item" :class="{'active_item':active_index == 1}" @click="checkTab(1)">报损</div>
				<div class="tab_item" :class="{'active_item':active_index == 2}" @click="checkTab(2)">待还</div>
				<div class="tab_item" :class="{'active_item':active_index == 3}" @click="checkTab(3)">已还</div>
			</div>
			<van-list v-model:loading="loading" :finished="finished" @load="loadMore"  v-if="yy_type == 2"
			>
			<div class="yy_item" v-for="item in listArray">
				<img class="yy_img" src="../../static/index_back.png">
				<div class="yy_content">
					<div class="yy_row">样衣码：2376452734</div>
					<div class="yy_row">款式编码：2376452734</div>
					<div class="status">已还</div>
				</div>
				<img class="bs_icon" src="../../static/bs_icon.png" @click="goYybs">
			</div>
		</van-list>
	</div>

</div>
</template>
<style lang="less" scoped>
.container{
	padding: 10rem 15rem;
	.info_row{
		margin-top: 15rem;
		font-size: 14rem;
		color: #000000;
	}
	.tab_row{
		background:#ffffff;
		position: sticky;
		top: 0;
		width: 100%;
		height: 50rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tab_item{
			border:1px solid #B9D6FF;
			border-radius: 15rem;
			width: 78rem;
			text-align: center;
			height: 30rem;
			line-height: 30rem;
			font-size: 14rem;
			color: #333333;
		}
		.active_item{
			background: #1572F9;
			color: #ffffff;
		}
	}
	.padding_div{
		height: 15rem;
	}
	.yy_item{
		padding-left: 15rem;
		padding-right: 15rem;
		width: 100%;
		height: 100rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.yy_img{
			margin-right: 15rem;
			width: 70rem;
			height: 70rem;
		}
		.yy_content{
			flex:1;
			height: 70rem;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 14rem;
			.yy_row{
				color: #000000;
			}
			.status{
				color: #1572F9;
			}
		}
		.bs_icon{
			width: 24rem;
			height: 24rem;
		}
	}
}

</style>
<script>
	export default{
		data(){
			return{
				active_index:0,		//选中的下标
				loading:false,
				finished:false,
				listArray:20,
				yy_type:1,			//详情类型（1:待借用；2:已借用；3:已拒绝）
			}
		},
		created(){
			this.yy_type = this.$route.query.type;
		},
		methods:{
			//切换tab
			checkTab(index){
				this.active_index = index;
			},
			//样衣报损
			goYybs(){
				this.$router.push('/yybs_index')
			},
			//加载更多
			loadMore(){

			}
		}
	}
</script>