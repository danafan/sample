<template>
	<div class="box">
		<div class="tabContent">
			<router-view></router-view>
		</div>
		<div class="tab">
			<div class="tabItem" @click="checkTab('index')">
				<img src="../static/index_icon_active.png" v-if="activeIndex == '/index'">
				<img src="../static/index_icon.png" v-else>
				<div class="tabTxt" :class="{'tabTxtSel':activeIndex == '/index'}">首页</div>
			</div>
			<div class="tabItem" @click="checkTab('scan')">
				<img src="../static/scan_icon.png">
				<div class="tabTxt">扫一扫</div>
			</div>
			<div class="tabItem" @click="checkTab('mine')">
				<img src="../static/mine_icon_active.png" v-if="activeIndex == '/mine'">
				<img src="../static/mine_icon.png" v-else>
				<div class="tabTxt" :class="{'tabTxtSel':activeIndex == '/mine'}">个人中心</div>
			</div>
		</div>		
	</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	export default{
		data(){
			return{
				activeIndex:"/index"
			}
		},
		created(){
			this.activeIndex = this.$route.path;
		},
		watch:{
			$route:function(n){
				this.activeIndex = n.path;
				this.$router.push(n.path);
			}
		},
		methods:{
			//切换导航
			checkTab(tab){
				if(tab == 'scan'){	//扫码
					dd.ready(() => {
						dd.biz.util.scan({
							onSuccess: (data) => {
								let sku_code = data.text.split('=')[1];
								this.$router.push('/yyxq?sku_code=' + sku_code)
							},
							onFail : (err) => {
								console.log(err)
							}
						})
					})
				}else{
					this.activeIndex = `/${tab}`;
					this.$router.push(`/${tab}`)
				}
				
			}
		}
	}
</script>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display:flex;
	flex-direction: column;
	.tabContent{
		flex:1;
		position: relative;
	}
	.tab{
		border-top:1px solid #E6E6E6; 
		background: #fff;
		width: 100%;
		height: 49rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.tabItem{
			display:flex;
			flex-direction: column;
			align-items: center;
			img{
				margin-bottom: 4rem;
				width: 20rem;
				height: 20rem;
			}
			.tabTxt{
				font-size: 10rem;
				color: #BBBBBB;
			}
			.tabTxtSel{
				color: #1572F9;
			}
		}

	}
}
</style>









