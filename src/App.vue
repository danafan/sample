<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import * as dd from 'dingtalk-jsapi';
	import resource from './api/resource.js'
	export default {
		name: 'app',
		created(){
			this.$router.replace('/index');
			//获取钉钉鉴权信息
			// this.getConfig();
		},
		watch:{
			$route(to,from){
				let router = this.$route;
				let path = router.path;
				let query = router.query;
				let name = router.name;
				if(path == '/yybd_index'){
					if(query.page_type == 'yybd'){
						this.setTabBarTitle('样衣绑定')
					}else{
						this.setTabBarTitle('样衣归还')
					}
				}else if(path == '/wdjy_index'){
					if(query.page_type == 'wdjy'){
						this.setTabBarTitle('我的借样')
					}else{
						this.setTabBarTitle('借样记录')
					}
				}else if(path == '/zcjl_index'){
					if(query.page_type == 'cljl'){
						this.setTabBarTitle('处理记录')
					}else{
						this.setTabBarTitle('归还记录')
					}
				}else if(path == '/zcxq'){
					if(query.page_type == 'cljl'){
						this.setTabBarTitle('处理记录详情')
					}else{
						this.setTabBarTitle('归还记录详情')
					}
				}else if(path == '/zj_record'){
					if(query.page_type == 'zyju'){
						this.setTabBarTitle('转移记录')
					}else{
						this.setTabBarTitle('接管记录')
					}
				}else{
					this.setTabBarTitle(router.name)
				}
			}
		},
		methods:{
			//设置标题栏文字
			setTabBarTitle(title){
				dd.biz.navigation.setTitle({
   					 title : title,//控制标题文本，空字符串表示显示默认文本
   					 onSuccess : function(result) {
   					 },
   					 onFail : function(err) {}
   					});
			},
			//获取钉钉鉴权信息
			getConfig(){
				resource.getConfig().then(res => {
					if(res.code == 1){
						let data = res.data;
						//钉钉鉴权
						this.dingAuth(data);
					}
				})
			},
			//钉钉鉴权
			dingAuth(data){
				data.url = window.location.href;
				data.corp_id = 'ding7828fff434921f5b';
				resource.dingAuth(data).then(res => {
					//钉钉鉴权
					this.ddConfig(res.data);
				})
			},
			//钉钉鉴权
			ddConfig(data){
				dd.config({
					agentId: data.agentId, // 必填，微应用ID
					corpId: data.corpId,//必填，企业ID
					timeStamp: data.timeStamp, // 必填，生成签名的时间戳
					nonceStr: data.nonceStr, // 必填，自定义固定字符串。
					signature: data.signature, // 必填，签名
					jsApiList : [
					'biz.contact.complexPicker',
					'biz.contact.departmentsPicker'
					] // 必填，需要使用的jsapi列表，注意：不要带dd。
				});
				dd.error(function (err) {
					alert('dd error: ' + JSON.stringify(err));
				})
				//钉钉获取code
				this.getDingCode();
			},
			//钉钉获取code
			getDingCode(){
				dd.ready(() => {
					dd.runtime.permission.requestAuthCode({
						corpId: "ding7828fff434921f5b", 
						onSuccess:  (info) => {
                  		let code = info.code // 通过该免登授权码可以获取用户身份
                  		//登录
                  		this.login(code);
                  	}});
				});
			},
			//登录
			login(code){
				resource.login({code:code}).then(res => {
					if(res.code == 1){
						this.$store.commit('setUserInfo',res.data);
						var route = this.$route;
						// 处理直接扫码进入样衣详情页
						if(route.path == '/'){
							this.$router.replace('/index');
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
