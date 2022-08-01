<template>
	<div>
		<img class="index_back" src="../../static/index_back.png">
		<div class="container">
			<div class="title">德儿电子商务样衣系统</div>
			<div class="card_box">
				<div class="list_box">
					<div class="item" @click="$router.push('/yybd_index?page_type=yybd')">
						<img class="item_icon" src="../../static/yybd_icon.png">
						<div class="item_lable">样衣绑定</div>
					</div>
					<div class="item" @click="$router.push('/fqjy_index')">
						<img class="item_icon" src="../../static/fqjy_icon.png">
						<div class="item_lable">样衣间借样</div>
					</div>
					<div class="item" @click="$router.push('/yybd_index?page_type=yygh')" v-if="userInfo.user_type == '1'">
						<img class="item_icon" src="../../static/yygh_icon.png">
						<div class="item_lable">样衣间归还</div>
					</div>
					<div class="item" @click="$router.push('/yypd_index')">
						<img class="item_icon" src="../../static/yypd_icon.png">
						<div class="item_lable">样衣盘点</div>
					</div>
					<div class="item" @click="$router.push('/zjcl_index')" v-if="userInfo.user_type == '1'">
						<img class="item_icon" src="../../static/zjcl_icon.png">
						<div class="item_lable">样衣处理</div>
					</div>
					<div class="item" @click="$router.push('/yybd_index?page_type=ckgh')" v-if="userInfo.user_type == '1'">
						<img class="item_icon" src="../../static/ckgh_icon.png">
						<div class="item_lable">仓库归还</div>
					</div>
					<div class="item" @click="yybsFn">
						<img class="item_icon" src="../../static/yybs_icon.png">
						<div class="item_lable">样衣报损</div>
					</div>
					<div class="item" @click="$router.push('/yyzy_index')">
						<img class="item_icon" src="../../static/yyzy_icon.png">
						<div class="item_lable">样衣转移</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	export default{
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		methods:{
			//扫码报损
			yybsFn(){
				dd.ready(() => {
					dd.biz.util.scan({
						onSuccess: (data) => {
							var sku_code = "";	
							if(data.text.indexOf('=') > -1){
								sku_code = data.text.split('=')[1];
							}else{
								sku_code = data.text;
							}
							if(sku_code.length == 14){	
								this.$toast('请扫描样衣码或唯一码');
							}else{		
								this.$router.push('/yybs_index?sku_code=' + sku_code);
							}
						},
						onFail : (err) => {
							console.log(err)
						}
					})
				})
			}
		}
	}
</script>
<style lang="less" scoped>
.index_back{
	width: 100%;
	height: 190px;
}
.container{
	.title{
		margin-top: 58px;
		width: 100%;
		text-align: center;
		font-size: 24px;
		color: #ffffff;
		font-weight: 500;
	}
	.card_box{
		padding-top: 52px;
		margin-top: 58px;
		background: #ffffff;
		border-radius: 36px 36px 0 0;
		.list_box{
			display: flex;
			flex-wrap: wrap;
			.item{
				margin-bottom: 40px;
				width: 125px;
				display:flex;
				flex-direction: column;
				align-items: center;
				.item_icon{
					margin-bottom: 8px;
					width: 48px;
					height: 48px;
				}
				.item_lable{
					font-size: 14px;
					color:#000000;
				}
			}
		}
	}
}
</style>