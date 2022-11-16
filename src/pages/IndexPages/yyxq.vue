<template>
	<div class="container">
		<div class="padding">
			<div class="yy_img_list">
				<img class="yy_img" :src="item" @click="preImg(index)" v-for="(item,index) in new_images">
			</div>
			<div class="info_row" v-if="yyInfo.sale_status == 0">参考售价：{{yyInfo.selling_price}}</div>
			<div class="info_row" v-if="yyInfo.sale_status == 1">销售人员：{{yyInfo.salesman}}</div>
			<div class="info_row">{{yyInfo.sku_code.length < 14?'样衣码':'唯一码'}}：{{yyInfo.sku_code}}</div>
			<div class="info_row">款式编码：{{yyInfo.i_id}}</div>
			<div class="info_row">商品编码：{{yyInfo.sku_id}}</div>
			<div class="info_row">供应商款号：{{yyInfo.supplier_i_id}}</div>
			<div class="info_row" v-if="show_status == 1">样衣状态：{{yyInfo.clothes_status}}</div>
			<div class="info_row" v-if="yyInfo.status == '1'">样衣间：{{yyInfo.room_name}}</div>
			<div class="info_row" v-if="yyInfo.status == '1'">责任人：{{yyInfo.admin_name}}</div>
			<div class="info_row" v-if="yyInfo.status == '2'">借样人：{{yyInfo.user_name}}</div>
			<div class="info_row" v-if="yyInfo.status == '2'">借样时间：{{yyInfo.finish_time}}</div>
			<div class="info_row" v-if="yyInfo.status == '2'">提交人：{{yyInfo.apply_user_name}}</div>
			<div class="info_row" v-if="yyInfo.status == '2' || yyInfo.status == '4'">管理员：{{yyInfo.status == '2'?yyInfo.admin_name:yyInfo.user_name}}</div>
			<div class="info_row" v-if="yyInfo.status == '2'">借样原因：{{yyInfo.reason}}</div>
			<div class="info_row" v-if="yyInfo.status == '3'">报损时间：{{yyInfo.add_time}}</div>
			<div class="info_row" v-if="yyInfo.status == '3'">报损人：{{yyInfo.user_name}}</div>
			<div class="info_row" v-if="yyInfo.status == '3'">个人/部门：{{yyInfo.losser_name}}</div>
		</div>
		
		<van-image-preview v-model:show="showPreImg" :images="new_images" :start-position="activeIndex">
		</van-image-preview>
		<BigButton button_txt="操作" @callback="callBack" v-if="yyInfo.is_sale == 1"></BigButton>
	</div>
</template>
<style lang="less" scoped>
.container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.padding{
		padding: 25px 15px 0;
	}
	.yy_img_list{
		display: flex;
		flex-wrap: wrap;
		.yy_img{
			margin-right: 30px;
			margin-bottom: 10px;
			width: 80px;
			height: 80px;
		}
	}
	.info_row{
		margin-top: 15px;
		font-size: 14px;
		color: #000000;
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				showPreImg:false,	//预览图片弹窗
				yyInfo:{
					sku_code:""
				},			//样衣详情
				new_images:[],		//图片列表
				activeIndex:0,		//预览当前图片下标
				page_type:"",		//页面类型
				sku_code:"",		//样衣码
				batch_id:"",		//批次id
				show_status:1
			}
		},
		created(){
			//样衣码
			this.sku_code = this.$route.query.sku_code;
			//页面类型（0: 已绑定，1: 在库中 2、借用中 3、已报损 4、已处理）
			this.page_type = this.$route.query.type;
			//批次id
			this.batch_id = this.$route.query.batch_id;
			//是否显示样衣状态
			this.show_status = this.$route.query.show_status?this.$route.query.show_status:1;
			//获取商品详情
			this.getGoodsInfo();
		},
		methods:{
			//获取商品详情
			getGoodsInfo(){
				var arg = {
					sku_code:this.sku_code
				}
				if(this.page_type){
					arg.type = this.page_type;
				}
				if(this.batch_id){
					arg.batch_id = this.batch_id;
				}
				resource.getGoodsInfo(arg).then(res => {
					if(res.code == 1){
						this.yyInfo = res.data;
						this.yyInfo.images.map(item => {
							this.new_images.push(this.yyInfo.domain + item);
						});
					}
				})
			},
			//预览图片
			preImg(index){
				this.showPreImg = true;
				this.activeIndex = index;
			},
			//点击操作
			callBack(){
				resource.indexSale({sku_code:this.sku_code}).then(res => {
					this.$router.go(-1);
					this.$toast(res.msg)
				})
			}
		},
		components:{
			BigButton
		}
	}
</script>