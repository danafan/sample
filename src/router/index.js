import Vue from 'vue'
import Router from 'vue-router'

const tab_bar = resolve=>System.import('@/pages/tab_bar')
const index = resolve=>System.import('@/pages/IndexPages/index')
const yybd_index = resolve=>System.import('@/pages/IndexPages/yybd_index')
const bmbd_index = resolve=>System.import('@/pages/IndexPages/bmbd_index')
const yyxq = resolve=>System.import('@/pages/IndexPages/yyxq')
const yybs_index = resolve=>System.import('@/pages/IndexPages/yybs_index')
const fqjy_index = resolve=>System.import('@/pages/IndexPages/fqjy_index')
const yypd_index = resolve=>System.import('@/pages/IndexPages/yypd_index')
const pdxq_index = resolve=>System.import('@/pages/IndexPages/pdxq_index')
const zjcl_index = resolve=>System.import('@/pages/IndexPages/zjcl_index')
const scan_index = resolve=>System.import('@/pages/ScanPages/scan_index')
const mine_index = resolve=>System.import('@/pages/MinePages/mine_index')
const bdjl_index = resolve=>System.import('@/pages/MinePages/bdjl_index')
const wdjy_index = resolve=>System.import('@/pages/MinePages/wdjy_index')
const jyjlxq = resolve=>System.import('@/pages/MinePages/jyjlxq')
const jyxq = resolve=>System.import('@/pages/MinePages/jyxq')

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
		name:"样衣绑定/样衣归还",
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
		path: '/fqjy_index',
		name:"发起借样",
		component: fqjy_index
	},
	{
		path: '/yypd_index',
		name:"样衣盘点",
		component: yypd_index
	},
	{
		path: '/pdxq_index',
		name:"盘点详情",
		component: pdxq_index
	},
	{
		path: '/zjcl_index',
		name:"折价处理",
		component: zjcl_index
	},
	{
		path: '/bdjl_index',
		name:"绑定记录",
		component: bdjl_index
	},
	{
		path: '/wdjy_index',
		name:"我的借样",
		component: wdjy_index
	},
	{
		path: '/jyxq',
		name:"借样详情",
		component: jyxq
	},
	{
		path: '/jyjlxq',
		name:"借样记录详情",
		component: jyjlxq
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
