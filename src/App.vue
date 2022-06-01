<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import * as dd from 'dingtalk-jsapi';
	import resource from './api/resource.js'
	export default {
		name: 'app',
		created(){
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
		methods:{
			//登录
			login(code){
				resource.login({code:code}).then(res => {
					this.$store.commit('setUserInfo',res.data);
					this.$router.push('/index');
				})
			}
		}
	}
</script>

<style>

</style>
