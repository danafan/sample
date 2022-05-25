<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div>我的应盘总样衣：</div>
				<div>9</div>
			</div>
			<div class="row">
				<div>计划完成日期：</div>
				<div>2022-08-18</div>
			</div>
		</div>
		<div class="tab_box">
			<div class="tab_item left" :class="{'active_back':active_index == '1'}" @click="checkTab('1')">
				未盘
				<div class="num" :class="{'active_num':active_index == '1'}">4</div>
			</div>
			<div class="tab_item right" :class="{'active_back':active_index == '2'}" @click="checkTab('2')">
				已盘
				<div class="num" :class="{'active_num':active_index == '2'}">4</div>
			</div>
		</div>
		<van-list v-model:loading="loading" :finished="finished" @load="loadMore" class="van_list">
			<div class="yy_item" v-for="item in listArray">
				<img class="yy_img" src="../../static/index_back.png">
				<div class="yy_content">
					<div class="yy_row">样衣码：2376452734</div>
					<div class="yy_row">款式编码：2376452734</div>
				</div>
				<img class="bs_icon" src="../../static/bs_icon.png" @click="showPopup = true" v-if="active_index == '1'">
			</div>
		</van-list>
		<div class="bottom">
			<div class="button" @click="scanYyCode">
				<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
				<div class="scan_text">扫一扫</div>
			</div>
		</div>
		<van-popup v-model:show="showPopup" position="bottom" round>
			<div class="list">
				<div class="item" :class="{'active_item':bsyyIndex == index}" v-for="(item,index) in bsyy_list" @click="checkBsyy(index)">{{item}}</div>
			</div>
			<div class="padding_box"></div>
			<div class="item" @click="showPopup = false">取消</div>
		</van-popup>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				active_index:"1",		//切换下标
				loading:false,
				finished:false,
				listArray:20,			//列表
				showPopup:false,		//报损原因弹窗
				bsyy_list:['原因1','原因2','原因3','原因4','原因5','原因6'],	//原因列表
				bsyyIndex:0,		
				bsyy:"",		//选中的报损原因
			}
		},
		methods:{
			//切换选中
			checkTab(type){
				this.active_index = type;
			},
			//扫一扫
			scanYyCode(){

			},
			//点击报损
			bsFn(){

			},
			//加载更多
			loadMore(){

			},
			//切换报损原因
			checkBsyy(index){
				this.bsyyIndex = index;
				this.showPopup = false;
				//添加
				this.$router.push('/yybs_index');
			}
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding-left:20rem;
	padding-right:20rem;
	.yyj_gly{
		padding: 10rem;
		.row{
			padding-top: 5rem;
			padding-bottom: 5rem;
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14rem;
			color: #000000;
		}
	}
	.tab_box{
		margin-top: 15rem;
		margin-bottom: 25rem;
		display: flex;
		height: 38rem;
		.tab_item{
			background:#F9FBFC;
			width: 50%;
			height: 38rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14rem;
			color: #333333;
			.num{
				margin-left: 6rem;
				border-radius: 8rem;
				background:#1572F9;
				padding-left: 5rem;
				padding-right: 5rem;
				height: 16rem;
				line-height: 16rem;
				font-size: 12rem;
				color: #ffffff;
			}
			.active_num{
				background:#ffffff;
				color: #1572F9;
			}
		}
		.left{
			border-radius: 19rem 0 0 19rem;
		}
		.right{
			border-radius: 0 19rem 19rem 0;
		}
		.active_back{
			background: #1572F9;
			color: #ffffff;
		}
	}
	.van_list{
		flex:1;
		overflow-y: scroll;
		.yy_item{
			margin-bottom: 6rem;
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
				.yy_row{
					font-size: 14rem;
					color: #000000;
				}
			}
			.bs_icon{
				width: 24rem;
				height: 24rem;
			}
		}
	}
	.bottom{
		height: 70rem;
		display: flex;
		align-items: center;
		justify-content: center;

		.button{
			border-radius: 20rem;
			border:1px solid #2C82FF;
			width: 100%;
			height: 40rem;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 14rem;
			font-weight: 500;
			.bind_scan_icon{
				margin-right: 4rem;
				width: 14rem;
				height: 14rem;
			}
			.scan_text{
				color: #2C82FF;
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
		height: 56rem;
		line-height: 56rem;
		font-size: 17rem;
		color: #000000;
	}
	.active_item{
		color: #2C82FF;
	}
}
</style>