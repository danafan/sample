import Vue from 'vue'
import Router from 'vue-router'

const tab_bar = resolve=>System.import('@/pages/tab_bar')
const index = resolve=>System.import('@/pages/IndexPages/index')
const yybd_index = resolve=>System.import('@/pages/IndexPages/yybd_index')
const bmbd_index = resolve=>System.import('@/pages/IndexPages/bmbd_index')
const yyxq = resolve=>System.import('@/pages/IndexPages/yyxq')
const yybs_index = resolve=>System.import('@/pages/IndexPages/yybs_index')
const scan_index = resolve=>System.import('@/pages/ScanPages/scan_index')
const mine_index = resolve=>System.import('@/pages/MinePages/mine_index')
const success = resolve=>System.import('@/pages/CommonPages/success')


Vue.use(Router);

const router = new Router({
	routes: [
	{
		path: '/tab_bar',
		name:"导航",
		component: tab_bar,
		children:[
		{path: '/index',name:"首页",component: index},
		{path: '/scan',name:"扫码",component: scan_index},
		{path: '/mine',name:"个人中心",component: mine_index},
		]
	},
	{
		path: '/yybd_index',
		name:"样衣绑定",
		component: yybd_index
	},
	{
		path: '/bmbd_index',
		name:"样衣绑定",
		component: bmbd_index
	},
	{
		path: '/yyxq',
		name:"样衣详情",
		component: yyxq
	},
	{
		path: '/yybs_index',
		name:"报损原因",
		component: yybs_index
	},
	{
		path: '/success',
		name:"成功",
		component: success
	},
	]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;
