<template>
	<div class="container">
		<div class="yyj_gly">
			<div class="row">
				<div class="lable">样衣码：</div>
				<div class="value">{{sku_code}}</div>
			</div>
			<div class="row">
				<div class="lable">报损原因：</div>
				<div class="value" @click="showPopup = true">
					<div class="yyj_txt" :class="{'default_txt':bsyy != ''}">{{bsyy == ''?'选择报损原因':bsyy}}</div>
					<img class="right_arrow" src="../../static/right_arrow.png">
				</div>
			</div>
			<div class="row">
				<div class="lable">原始价值：</div>
				<div class="value">
					<input class="ysjz" type="number" placeholder="选填" v-model="ysjz">
				</div>
			</div>
		</div>
		<div class="image_lable">上传报损位置图：</div>
		<div class="image_list">
			<div class="image_box" v-for="(item,index) in image_list">
				<img class="image" :src="domain + item">
				<img class="close_icon" src='../../static/close_icon.png' @click="deleteImg(item,index)">
			</div>
			<UploadImage @uploadCallBack="uploadCallBack" v-if="image_list.length < 6"></UploadImage>
		</div>
		<div class="image_lable">报损类型：</div>
		<div class="radio_group">
			<van-radio-group v-model="loss_type" direction="horizontal">
				<van-radio name="1">个人</van-radio>
				<van-radio name="2">部门</van-radio>
			</van-radio-group>
		</div>
		<!-- 个人 -->
		<div class="radio_group" @click="checkLoss" v-if="loss_type == '1'">
			<div class="type_box">
				<div class="loss_name">{{liabler_name}}</div>
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</div>
		<!-- 部门 -->
		<div class="radio_group" @click="checkLoss" v-if="loss_type == '2'">
			<div class="type_box">
				<div class="loss_name">{{dept_name}}</div>
				<img class="right_arrow" src="../../static/right_arrow.png">
			</div>
		</div>


		<BigButton button_txt="报损" @callback="callBack"></BigButton>
		<van-popup v-model:show="showPopup" position="bottom" round>
			<div class="list">
				<div class="item" :class="{'active_item':activeIndex == index}" v-for="(item,index) in bsyy_list" @click="checkBsyy(index)">{{item}}</div>
			</div>
			<div class="padding_box"></div>
			<div class="item" @click="showPopup = false">取消</div>
		</van-popup>
	</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	import resource from '../../api/resource.js'
	import UploadImage from '../../components/upload_img.vue'
	import BigButton from '../../components/big_button.vue'
	export default{
		data(){
			return{
				sku_code:"",
				batch_id:"",
				showPopup:false,		//选择报损原因
				bsyy_list:[],
				activeIndex:999,	//当前选中的报损原因
				bsyy:"",			//选择的报损原因
				ysjz:"",			//原始价值
				domain:"",
				image_list:[],		//图片列表
				loss_type:'1',		//报损类型
				liabler_name:"",	//个人名称
				liabler_id:"",		//个人ID
				dept_name:"",		//部门名称
				dept_id:"",			//部门ID
			}
		},
		created(){
			this.sku_code = this.$route.query.sku_code;
			this.batch_id = this.$route.query.batch_id;
			//获取商品详情
			this.getGoodsInfo()
		},
		methods:{
			//获取商品详情
			getGoodsInfo(){
				var arg = {
					sku_code:this.sku_code
				}
				resource.getGoodsInfo(arg).then(res => {
					if((res.data.status != 1 && res.data.status != 2) || res.data.lock_status != 0){
						this.$toast('该样衣当前还不能报损哦～');
						setTimeout(()=>{
							this.$router.go(-1);
						},1500);
					}else{
						//样衣详情
						let info_data = res.data;
						this.liabler_name = info_data.liabler_name;
						this.liabler_id = info_data.liabler_id;
						this.dept_name = info_data.dept_name;
						this.dept_id = info_data.dept_id;
						//获取报损原因
						this.ajaxTypeList();
					}
				})
			},
			//获取报损原因
			ajaxTypeList(){
				resource.ajaxTypeList({type:'loss_reason'}).then(res => {
					if(res.code == 1){
						this.bsyy_list = res.data;
					}
				})
			},
			//切换报损原因
			checkBsyy(index){
				this.activeIndex = index;
				this.bsyy = this.bsyy_list[this.activeIndex];
				this.showPopup = false;
			},
			//上传图片回调
			uploadCallBack(files){
				for(var i = 0;i < files.length;i ++){
					if(this.image_list.length + files.length > 6){
						this.$toast('图片最多不能超过6张！')
					}else{
						resource.uploadImage({file:files[i]}).then(res => {
							if(res.code == 1){
								this.domain = res.data.domain;
								this.image_list.push(res.data.name);
							}
						})
					}
					
				}
			},
			//删除图片
			deleteImg(item,index){
				resource.deleteImage({name:item}).then(res => {
					if(res.code == 1){
						this.image_list.splice(index,1);
					}
				})
			},
			//选择报损类型的人或部门
			checkLoss(){
				if(this.loss_type == '1'){		//个人
					dd.ready(() => {
						dd.biz.contact.complexPicker({
							title: "选择个人",
							corpId: "ding7828fff434921f5b",
							multiple: false,
							limitTips: "超出了",
							maxUsers: 1000,
							pickedUsers: [],
							pickedDepartments: [],
							disabledUsers: [],
							disabledDepartments: [],
							requiredUsers: [],
							requiredDepartments: [],
							appId: 1664876526,
							permissionType: "GLOBAL",
							responseUserOnly: true,
							startWithDepartmentId: 0,
							onSuccess : (res) => {
								this.liabler_name = res.users[0].name;
								this.liabler_id = res.users[0].emplId;
							},
							onFail : function(err) {
								// 调用失败时回调
								console.log(err)
							}
						});
					})
				}else{
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
				}
			},
			//报损
			callBack(){
				if(this.bsyy == ''){
					this.$toast('请选择报损原因!');
					return;
				}
				let arg = {
					sku_code:this.sku_code,
					type:'3',
					reason:this.bsyy,
					price:this.ysjz,
					images:this.image_list.join(','),
					loss_type:this.loss_type,
					losser_name:this.loss_type == '1'?this.liabler_name:this.dept_name,
					losser_id:this.loss_type == '1'?this.liabler_id:this.dept_id
				}
				if(this.batch_id){
					arg.batch_id = this.batch_id;
				}
				resource.scanGoods(arg).then(res => {
					if(res.code == 1){
						this.$router.replace('/success?value=' + '已报损&img_url=bs');
					}
				})
			}
		},
		components:{
			UploadImage,
			BigButton
		}
	}
</script>
<style lang="less" scoped>
.container{
	padding:15px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	.yyj_gly{
		width: 100%;
		height: 129px;
		display:flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.row{
		width: 100%;
		display:flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #000000;
		
	}
	.value{
		display:flex;
		align-items: center;
		.yyj_txt{
			color: rgba(0, 0, 0, 0.4);
		}
		.default_txt{
			color:#2C82FF;
		}
		.ysjz{
			text-align: end;
			border: none;
			outline: none;
			font-size: 14px;
		}

	}
	.type_box{
		margin-top: 15px;
		height: 32px;
		border:1px solid #cccccc;
		border-radius: 3px;
		display: flex;
		align-items: center;
		padding-left: 8px;
		padding-right: 8px;
	}
	.right_arrow{
		margin-left: 5px;
		width: 12px;
		height: 24px;
	}
	.image_lable{
		width: 100%;
		margin-bottom: 10px;
		margin-top: 10px;
		font-size: 14px;
		color: #000000;
	}
	.radio_group{
		display: flex;
		justify-content: flex-start;
		width: 100%;
		font-size: 14px;
		color: #333333;
	}
	.image_list{
		width: 100%;
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		.image_box{
			margin-right: 15px;
			margin-bottom: 15px;
			position: relative;
			width: 88px;
			height: 88px;
			.image{
				position: absolute;
				width: 100%;
				height: 100%;
			}
			.close_icon{
				position: absolute;
				top: -5px;
				right: -5px;
				width: 11px;
				height: 11px;
			}
		}
	}
	.padding_box{
		width: 100%;
		height: 8px;
		background:#F2F2F2;
	}
	.list{
		max-height: 300px;
		overflow-y: scroll;
	}
	.item{
		width: 100%;
		text-align: center;
		height: 56px;
		line-height: 56px;
		font-size: 17px;
		color: #000000;
	}
	.active_item{
		color: #2C82FF;
	}
}

</style>