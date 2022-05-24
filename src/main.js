import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/rem'  
import './plugin.js'

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
