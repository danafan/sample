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
				<div>样衣间：</div>
				<div>{{topInfo.room_name}}</div>
			</div>
			<div class="row">
				<div>入库时间：</div>
				<div>{{topInfo.finish_time}}</div>
			</div>
		</div>
		<van-list
		class="van_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item border_bottom" v-for="item in listArray" @click="goDetail(item.sku_code)">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0"></EmptyPage>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				topInfo:{},			//顶部信息
				batch_id:"",				//批次ID
				listArray:[],		//列表
			}
		},
		created(){
			//批次ID
			this.batch_id = this.$route.query.batch_id;
			//获取商品列表
			this.getGoodsList();
			//绑定记录详情
			this.bindingDetail();
		},
		methods:{
			//绑定记录详情
			bindingDetail(){
				resource.bindingDetail({binding_id:this.batch_id}).then(res => {
					if(res.code == 1){
						this.topInfo = res.data;
					}
				})
			},
			//获取商品列表
			getGoodsList(){
				let arg = {
					batch_id:this.batch_id,
					type:0
				}
				resource.getGoodsList(arg).then(res => {
					if(res.code == 1){
						this.listArray = res.data;
					}
				})
			},
			//点击进入详情
			goDetail(sku_code){
				this.$router.push('/yyxq?sku_code=' + sku_code + '&type=1&' + 'batch_id=' + this.batch_id + '&show_status=2');
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
				.yy_row{
					font-size: 14px;
					color: #000000;
				}
			}
			.right_arrow{
				width: 12px;
				height: 24px;
			}
		}
	}
}
</style>