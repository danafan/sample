<template>
	<div class="container">
		<div class="row">
			<div class="lable">部门：</div>
			<div class="value" @click="changeDept">
				<div class="yyj_txt" :class="{'default_txt':dept_name != ''}">{{dept_name == ''?'选择部门':dept_name}}</div>
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</div>
		<div class="num_row">
			<div>合计：{{listArray.length}}</div>
			<div class="clear_text" @click.stop="modelFn('2')">清空</div>
		</div>
		<van-list
		class="yy_list"
		v-if="listArray.length > 0"
		>
		<div class="yy_item" v-for="(item,index) in listArray" :key="index + 1">
			<div class="yy_content">
				商品编码：{{item}}
			</div>
			<img class="delete_icon" src="../../static/delete_icon.png" @click.stop="modelFn('1',index)">
		</div>
	</van-list>
	<EmptyPage v-if="listArray.length == 0"></EmptyPage>
	<div class="button_box">
		<div class="button" @click="scanYyCode">
			<img class="bind_scan_icon" src="../../static/bind_scan_icon.png">
			<div class="scan_text">扫描商品编码</div>
		</div>
		<div class="button rk_button" @click="modelFn('3')">提交</div>
	</div>
	<DialogModel :value="value" @callbackFn="callbackFn" v-if="showModel"></DialogModel>
</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	import resource from '../../api/resource.js'
	import DialogModel from '../../components/dialog_model.vue'
	import EmptyPage from '../CommonPages/empty_page.vue'
	export default{
		data(){
			return{
				dept_name:"",					//部门名称
				dept_id:"",						//部门ID
				listArray:[],					//商品编码列表
				showModel:false,				//是否显示弹窗
				value:"",						//弹窗内容
				modelType:"",					//弹窗类型
			}
		},
		methods:{
			//点击询问
			modelFn(type,index){	//1:删除单条；2:清空；3:提交
				this.modelType = type;
				switch(this.modelType){
				case '1':    				//单个删除
					this.goods_index = index;
					this.showModel = true;
					this.value = '确认删除该条记录？';
					break;
				case '2': 					//清空
					this.showModel = true;
					this.value = `确认要清空吗？合计${this.listArray.length}件。`;
					break;
				case '3': 					//提交
					this.showModel = true;
					this.value = `确认退回吗？合计${this.listArray.length}件。`;
					break;
				}
			},
			//弹窗确认
			callbackFn(v){
				if(v == '1'){					//取消
					this.showModel = false;
				}else{							//确认
					if(this.modelType == '1'){			//单个删除
						this.listArray.splice(this.goods_index,1);
						this.showModel = false;
					}else if(this.modelType == '2'){	//清空
						this.listArray = [];
						this.showModel = false;
					}else if(this.modelType == '3'){	//提交
						if(this.dept_id == ''){
							this.$toast('请选择部门！');
						}else if(this.listArray.length == 0){
							this.$toast('请扫描商品编码！');
						}else{
							let arg = {
								dept_id:this.dept_id,
								sku_list:this.listArray.join(',')
							}
							resource.batchReturn(arg).then(res => {
								if(res.code == 1){
									this.dept_name = "";
									this.dept_id = "";
									this.listArray = [];
								}
							})
							this.showModel = false;
						}
					}
					
				}
			},
			//点击扫描商品编码
			scanYyCode(){
				dd.ready(() => {
					dd.biz.util.scan({
						onSuccess: (data) => {
							let spbm_code = data.text;
							this.listArray.push(spbm_code);
						},
						onFail : (err) => {
							console.log(err)
						}
					})
				})
			},
			//点击选择部门
			changeDept(){
				dd.ready(() => {
					dd.biz.contact.departmentsPicker({
						title:"选择部门",            
						corpId:"ding7828fff434921f5b",             
						multiple:false,            
						limitTips:"超出了",          
						maxDepartments:100,           
						pickedDepartments:[],         
						disabledDepartments:[],        
						requiredDepartments:[],        
						appId:1664876526,              
						permissionType:"GLOBAL",
						onSuccess : (res) => {
							this.dept_name = res.departments[0].name;
							this.dept_id = res.departments[0].id;
						},
						onFail : function(err) {}
					});
				})
			},
		},
		components:{
			DialogModel,
			EmptyPage
		}
	}
</script>
<style lang="less" scoped>
	.container{
		background: #F9FBFC;
		display: flex;
		flex-direction: column;
		padding: 15px;
		.row{
			display:flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: #000000;
			height: 50px;
			background: #FFFFFF;
			border-radius: 6px;
			padding-left:15px;
			padding-right:15px;
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
		.num_row{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 35px;
			font-size: 12px;
			color: #000000;
			padding-left:10px;
			padding-right:10px;
			.clear_text{
				color: #2C82FF;
			}
		}
		.yy_list{
			flex:1;
			overflow-y: scroll;
			width: 100%;
			.yy_item{
				width: 100%;
				height: 50px;
				background: #FFFFFF;
				border-radius: 6px;
				margin-bottom: 6px;
				padding-left: 10px;
				padding-right: 15px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.yy_content{
					flex:1;
					font-size: 14px;
					color: #000000;
				}
				.delete_icon{
					width: 18px;
					height: 20px;
				}
			}
		}
		.button_box{
			background:#ffffff;
			width: 100%;
			height: 70px;
			display:flex;
			align-items: center;
			justify-content: space-around;
			.button{
				border-radius: 20px;
				border:1px solid #2C82FF;
				width: 160px;
				height: 40px;
				display:flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				font-weight: 500;
				.bind_scan_icon{
					margin-right: 4px;
					width: 14px;
					height: 14px;
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
		.right_arrow{
			margin-left: 15px;
			width: 12px;
			height: 24px;
		}
		.list{
			max-height: 300px;
			overflow-y: scroll;
		}
		
		
	}
</style>