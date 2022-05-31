<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">管理员：</div>
				<div class="value">{{topInfo.user_name}}</div>
			</div>
			<div class="row">
				<div class="lable">处理状态：</div>
				<div class="value" @click="showPopup = true">
					<div class="yyj_txt" :class="{'default_txt':clzt != ''}">{{clzt == ''?'请选择':clzt}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
		</div>
		<van-list v-model:loading="loading"
		:finished="finished"
		@load="loadMore"
		finished-text="没有更多了"
		class="yy_list"
		>
		<div class="yy_item" v-for="(item,index) in listArray" :key="index + 1" @click="goDetail(item.sku_code)">
			<img class="yy_img" :src="item.domain + item.image">
			<div class="yy_content">
				<div class="yy_row">样衣码：{{item.sku_code}}</div>
				<div class="yy_row" v-if="item.i_id">款式编码：{{item.i_id}}</div>
			</div>
			<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1',item.sku_code,index)">
			<img class="right_arrow" src="../../static/right_arrow.png">
		</div>
	</van-list>
	<div class="bottom_box">
		<div class="button_box">
			<div class="button" @click="scanYyCode">
				<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
				<div class="scan_text">扫一扫</div>
			</div>
			<div class="button rk_button" @click="modelFn('2')">样衣处理</div>
		</div>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
	<van-popup v-model:show="showPopup" position="bottom" round>
		<div class="list">
			<div class="item" :class="{'active_item':clztIndex == index}" v-for="(item,index) in clzt_list" @click="checkClzt(index)">{{item}}</div>
		</div>
		<div class="padding_box"></div>
		<div class="item" @click="showPopup = false">取消</div>
	</van-popup>
</div>
</template>
<script>
	import resource from '../../api/resource.js'
	import DialogModel from '../../components/dialog_model.vue'
	export default{
		data(){
			return{
				topInfo:{},							//顶部信息
				showPopup:false,					//选择处理状态
				clzt_list:['内销','外销',],		//处理状态列表
				clzt:"",							//选中的处理状态
				clztIndex:0,						//当前选中的下标
				loading:false,
				finished:true,
				page:1,
				pagesize:10,
				listArray:[],		//列表
				showModel:false,			//是否显示弹窗
				value:"",					//弹窗内容
				modelType:"",				//弹窗类型
				sku_code:"",
				goods_index:"",
				total_num:0
			}
		},
		created(){
			//进入处理界面
			this.handleAdd();
		},
		methods:{
			//进入处理界面
			handleAdd(){
				resource.getHandleAdd().then(res => {
					this.topInfo = res.data;
					//获取已绑定的商品列表
					this.getGoodsList();
				})
			},
			//获取更多
			loadMore(){
				if(this.finished == false){
					this.page += 1;
					//获取已绑定的商品列表
					this.getGoodsList();
				}
			},
			//获取已绑定的商品列表
			getGoodsList(){
				let arg = {
					batch_id:this.topInfo.handle_id,
					type:'4',
					page:this.page,
					pagesize:this.pagesize
				}
				resource.getGoodsList(arg).then(res => {
					this.loading = false;
					this.total_num = res.data.total;
					this.listArray = [...this.listArray,...res.data.data];
					if(this.page == res.data.last_page){
						this.finished = true;
					}
				})
			},
			//点击询问
			modelFn(type,sku_code,index){	//1:删除单条；4:样衣处理
				this.modelType = type;
				switch(this.modelType){
					case '1':
					this.sku_code = sku_code;
					this.goods_index = index;
					this.showModel = true;
					this.value = '确认删除该条记录？';
					break;
					case '2':
					if(this.clzt == ''){
						this.$toast('请选择处理状态!')
					}else if(this.listArray.length == 0){
						this.$toast('还没有商品哦!')
					}else{
						this.showModel = true;
						this.value = `确认要将${this.total_num}件样衣${this.clzt}吗？`;
					}
					break;
				}
			},
			//弹窗确认
			callbackFn(v){
				if(v == '1'){
					this.showModel = false;
				}else{
					this.showModel = false;
					switch(this.modelType){
						case '1':
						//删除商品
						this.removeGoods();
						break;
						case '2':
						//处理提交
						this.postHandleAdd();
						break;
					}
				}
			},
			//处理提交
			postHandleAdd(){
				let arg = {
					room_id:this.topInfo.room_id,
					type:this.clztIndex + 1
				}
				resource.postHandleAdd(arg).then(res => {
					this.$router.push('/success?value=' + '已处理' + '&img_url=success');
				})
			},
			//删除商品
			removeGoods(){
				var arg = {
					batch_id:this.topInfo.handle_id,
					sku_code:this.sku_code,
					type:'4',
				}
				resource.removeGoods(arg).then(res => {
					this.$toast(res.msg);
					this.listArray.splice(this.goods_index,1);
				})
			},
			//点击进入详情
			goDetail(sku_code){
				this.$router.push('/yyxq?sku_code=' + sku_code);
			},
			//点击扫描样衣码
			scanYyCode(){
				let arg = {
					sku_code:58,
					batch_id:this.topInfo.handle_id,
					type:'4'
				}
				resource.scanGoods(arg).then(res => {
					this.$toast(res.msg);
					this.page = 1;
					this.listArray = [];
					//获取已绑定的商品列表
					this.getGoodsList();
				})
			},
			//切换处理状态
			checkClzt(index){
				this.clztIndex = index;
				this.clzt = this.clzt_list[this.clztIndex];
				this.showPopup = false;
			}
		},
		components:{
			DialogModel
		}
	}
</script>
<style lang="less" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 15rem;
	.yyj_gly{
		width: 100%;
		height: 86rem;
		padding-left:15rem;
		padding-right:15rem;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
		.row{
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14rem;
			color: #000000;
			.value{
				display:flex;
				align-items: center;
				.yyj_txt{
					color: rgba(0, 0, 0, 0.4);
				}
				.default_txt{
					color:#2C82FF;
				}
			}
		}
	}
	.yy_list{
		flex:1;
		overflow-y: scroll;
		width: 100%;
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
			.delete_icon{
				width: 18rem;
				height: 20rem;
			}
		}
	}
	.bottom_box{
		.all_delete{
			margin-top:15rem; 
			width: 100%;
			text-align: center;
			color: #428FFF;
			font-size: 14rem;
		}
		.button_box{
			width: 100%;
			height: 70rem;
			display:flex;
			align-items: center;
			justify-content: space-around;
			.button{
				border-radius: 20rem;
				border:1px solid #2C82FF;
				width: 160rem;
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
			.rk_button{
				background: #2C82FF;
				color: #ffffff;
			}
		}
	}
	.right_arrow{
		margin-left: 15rem;
		width: 12rem;
		height: 24rem;
	}
	.padding_box{
		width: 100%;
		height: 8rem;
		background:#F2F2F2;
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