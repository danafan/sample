<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import resource from './api/resource.js'
	export default {
		name: 'app',
		created(){
			resource.testLogin().then(res => {
    			this.$router.push('/index')
    		})
		}
	}
</script>

<style>

</style>
