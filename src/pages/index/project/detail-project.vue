<!-- 项目审批明细 -->
<template>
	<view :class="darkMode?'custom-dark':'custom-light'">
		<view class="place-detail">
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">督导状态</view>
					<view class="flex-item-70">
						<uni-tag size="small" :text="formatAuditStatus(itemStatus).text" :type="formatAuditStatus(itemStatus).color"
						 :circle="true"></uni-tag>
					</view>
				</view>
			</view>
			<view class="cu-bar detail-item solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>
					<b>基本信息</b>
				</view>
			</view>
			<div class="">
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">授课老师</view>
						<view class="flex-item-70">{{renderCfg.teacherName}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">职称</view>
						<view class="flex-item-70">{{renderCfg.teacherTitle}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教师所属系</view>
						<view class="flex-item-70">{{renderCfg.teacherDepartment}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">课程名称</view>
						<view class="flex-item-70">{{renderCfg.courseName}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">课程所属系</view>
						<view class="flex-item-70">{{renderCfg.courseDepartment}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">专业</view>
						<view class="flex-item-70">{{renderCfg.classSpeciality}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">年级</view>
						<view class="flex-item-70">{{renderCfg.classGrade + '届'}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">班级</view>
						<view class="flex-item-70">{{renderCfg.className}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">日期</view>
						<view class="flex-item-70">{{renderCfg.time}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">节数</view>
						<view class="flex-item-70">{{renderCfg.orderNum}}</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教室</view>
						<view class="flex-item-70">{{renderCfg.classroomId}}</view>
					</view>
				</view>
				<view class="cu-bar detail-item solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>
						<b>评价指标</b>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教书育人</view>
						<view class="flex-item-70">
							<picker @change="bindPicker1Change" :value="index1" :range="range1">
								<view class="uni-input">{{range1[index1]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教学态度</view>
						<view class="flex-item-70">
							<picker @change="bindPicker2Change" :value="index2" :range="range1">
								<view class="uni-input">{{range1[index2]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教学内容</view>
						<view class="flex-item-70">
							<picker @change="bindPicker3Change" :value="index3" :range="range2">
								<view class="uni-input">{{range2[index3]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教学方法</view>
						<view class="flex-item-70">
							<picker @change="bindPicker4Change" :value="index4" :range="range2">
								<view class="uni-input">{{range2[index4]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教学组织</view>
						<view class="flex-item-70">
							<picker @change="bindPicker5Change" :value="index5" :range="range2">
								<view class="uni-input">{{range2[index5]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">教学表达</view>
						<view class="flex-item-70">
							<picker @change="bindPicker6Change" :value="index6" :range="range1">
								<view class="uni-input">{{range1[index6]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">总体效果</view>
						<view class="flex-item-70">
							<picker @change="bindPicker7Change" :value="index7" :range="range1">
								<view class="uni-input">{{range1[index7]}}分</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">总分</view>
						<view class="flex-item-70" style="color:red">{{sumScore + '分'}}</view>
					</view>
				</view>
				<view class="cu-bar detail-item solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>
						<b>其他</b>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">内容摘要</view>
						<textarea v-model="abstract" class="flex-item-70" placeholder="请在此处输入内容摘要"/>
					</view>
				</view>
				<view class="padding-lr padding-tb-xs detail-item">
					<view class="uni-flex uni-row">
						<view class="flex-item-30">评语与建议</view>
						<textarea v-model="suggest" class="flex-item-70" placeholder="请在此处输入评语与建议"/>
					</view>
				</view>
				<view class="cu-bar detail-item solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>
						<b>拍照打卡</b>
					</view>
				</view>
				<view>
					<uni-group title="只选择图片">
						<uni-file-picker limit="3" title="最多选择3张图片" @success="upload_suc" @fail="upload_fail"></uni-file-picker>
					</uni-group>
				</view>
				
			</div>
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :button-group="buttonGroup" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import auditIdea from '@/pages/index/audit-idea.vue'
	import {
		filePreview,
		formatAuditStatus
	} from '@/utils/index.js'
	export default {
		components: {
			uniGoodsNav,
			uniTag,
			uniIcons,
			auditIdea
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
			itemStatus(){
				if (this.hasChecked) {
				uni.setNavigationBarTitle({
			    title: this.$t('ProjectWatch')
				})
			}else{
				uni.setNavigationBarTitle({
			    title: this.$t('ProjectApproval')
				})
			}
				return this.hasChecked == false ? 0 : 1;
			},
			sumScore(){
				return this.range1[this.index1]+this.range1[this.index2]+this.range2[this.index3]+this.range2[this.index4]+this.range2[this.index5]+this.range1[this.index6]+this.range1[this.index7]
			}
		},
		data() {
			return {
				hasChecked:false,
				renderCfg:{
					teacherName:"刘伟1",
					teacherTitle:"副教授1",
					teacherDepartment:"信科院1",
					courseName:"嵌入式原理1",
					courseDepartment:"信科院1",
					classSpeciality:"计算机科学与技术",
					classGrade:"2017",
					className:"--",
					time:"--",
					orderNum:"--",
					classroomId:"3101",
				},
				range1:[1,2,3,4,5,6,7,8,9,10],
				range2:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
				index1:0,
				index2:0,
				index3:0,
				index4:0,
				index5:0,
				index6:0,
				index7:0,
				abstract:"",
				suggest:"",
				base_renderCfg:{},
				isPass: false,
				item: {},
				options: [{
					icon: '/static/img/alarm.png',
					text: '请打卡后再上传！'
				}],
				buttonGroup: [
					{
						text: '上传',
						backgroundColor: '#39b54a',
						color: '#fff'
					}
				],
				hasUplaoded:false,
				relateId:'',
				unionId:'',

			}
		},
		mounted(){
			// inject into base_renderCfg by session
			this.base_renderCfg =  JSON.parse(sessionStorage.getItem('baseList'));
			let url = location.href;
			let str = url.substr(url.indexOf("?") + 1);
			let params = str.split('&');

			let relateId = params[0].split('=')[1];
			this.relateId = relateId;
			let unionId = params[1].split('=')[1];
			this.unionId = unionId;
			let status = params[2].split('=')[1];

			this.hasChecked = status == 0?false:true;

			// 过滤rela
			let fil_renderCfg = this.base_renderCfg.filter(item => item.relateId == relateId)

			if (this.hasChecked == true) {
				//禁用按钮
				this.options[0].icon = '/static/img/suc.png'
				this.options[0].text = '打卡成功！'
				this.buttonGroup[0].text = "已上传";
				this.buttonGroup[0].backgroundColor = "#808080";
				//去拿一下评价表
				this.$minApi.getevaluateList(relateId).then(res=>{
						if (res.code == '0') {
							let dto = res.evaluateDetailRspDTO;
							this.renderCfg.teacherName = dto.teacherInfoRspDTO.teacherName;
							this.renderCfg.teacherTitle = dto.teacherInfoRspDTO.teacherTitle;
							this.renderCfg.teacherDepartment = dto.teacherInfoRspDTO.teacherDepartment;
							this.renderCfg.courseName = dto.courseInfoRspDTO.courseName;
							this.renderCfg.courseDepartment = dto.courseInfoRspDTO.courseDepartment;
							this.renderCfg.classSpeciality = dto.classInfoRspDTO.classSpeciality;
							this.renderCfg.classGrade = dto.classInfoRspDTO.classGrade;
							this.renderCfg.className = dto.classInfoRspDTO.className;
							this.renderCfg.time = fil_renderCfg[0].taskId.time || "--";
							this.renderCfg.orderNum = fil_renderCfg[0].taskId.unionId.orderNum || "--";
							this.renderCfg.classroomId = dto.classroomInfoRspDTO.classroomId;
							this.index1 = dto.evaluatePartOne - 1;
							this.index2 = dto.evaluatePartTwo - 1;
							this.index3 = dto.evaluatePartThree - 1;
							this.index4 = dto.evaluatePartFour - 1;
							this.index5 = dto.evaluatePartFive - 1;
							this.index6 = dto.evaluatePartSix - 1;
							this.index7 = dto.evaluatePartSeven - 1;
							this.abstract = dto.courseAbstract;
							this.suggest = dto.suggest;
						}else{
							uni.showToast({
								title:'数据库请求错误',
								icon:'none'
							})
						}
						
				})
			}else{
				
				// 赋值
				console.log('fil_renderCfg',fil_renderCfg);
				this.renderCfg.teacherName = fil_renderCfg[0].taskId.unionId.teacherId.teacherName || "刘伟";
				this.renderCfg.teacherTitle = fil_renderCfg[0].taskId.unionId.teacherId.teacherTitle || "副教授";
				this.renderCfg.teacherDepartment = fil_renderCfg[0].taskId.unionId.teacherId.teacherDepartment || "刘伟";
				this.renderCfg.courseName = fil_renderCfg[0].taskId.unionId.courseId.courseName || "嵌入式原理";
				this.renderCfg.courseDepartment = fil_renderCfg[0].taskId.unionId.courseId.courseDepartment || "信科院";
				this.renderCfg.classSpeciality = fil_renderCfg[0].taskId.unionId.classId.classSpeciality || "计算机科学与技术";
				this.renderCfg.classGrade = fil_renderCfg[0].taskId.unionId.classId.classGrade || "2017";
				this.renderCfg.className = fil_renderCfg[0].taskId.unionId.classId.className || "--";
				this.renderCfg.time = fil_renderCfg[0].taskId.time || "--";
				this.renderCfg.orderNum = fil_renderCfg[0].taskId.unionId.orderNum || "--";
				this.renderCfg.classroomId = fil_renderCfg[0].taskId.unionId.classroomId || "--";

			}

			

			
		},
		onReady() {
			if (this.hasChecked) {
				uni.setNavigationBarTitle({
			    title: this.$t('ProjectWatch')
				})
			}else{
				uni.setNavigationBarTitle({
			    title: this.$t('ProjectApproval')
				})
			}
			
			// navBar-bg-color
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: this.themeBgColor,
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			})
		},
		onLoad(options) {
			try {
				this.item = JSON.parse(options.data)
			} catch (e) {
				this.item = []
			}
		},
		methods: {
			filePreview,
			formatAuditStatus,
			async buttonClick(e) {
				if (this.hasChecked == true) {
					return;
				}
				if (!this.hasUplaoded) {
					uni.showToast({
						title:"请先完成打卡后再上传!",
						icon:"none"
					})
					return;
				}else{
					//TODO save
					let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
					let params = {
						unionId:+this.unionId,
						userId:userInfo.userid,
						evaluatePartOne:this.range1[this.index1],
						evaluatePartTwo:this.range1[this.index2],
						evaluatePartThree:this.range2[this.index3],
						evaluatePartFour:this.range2[this.index4],
						evaluatePartFive:this.range2[this.index5],
						evaluatePartSix:this.range1[this.index6],
						evaluatePartSeven:this.range1[this.index7],
						evaluateSum:this.sumScore,
						suggest:this.suggest,
						courseAbstract:this.abstract,
						relateId:+this.relateId,
					}
					let res = [];
					res = await this.$minApi.saveEvaluate(params).then(res=>{
						if (res.code == '0') {
							uni.switchTab({
								url: '/pages/index/index',
								success(){
									let page = getCurrentPages().pop(); //跳转页面成功之后
									page.refresh();
								}
							});
						}else{
							uni.showToast({
								title:'上传失败',
								icon:'none'
							})
						}
					})
				}
			},
			updateQuery() {
				// 更新数据
				let pages = getCurrentPages()
				// let currPage = pages[pages.length - 1]; //当前页面
				let prevPage = pages[pages.length - 2] //上一个页面
				prevPage.isDoRefresh = true
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			},
			bindPicker1Change: function(e) {
				this.index1 = e.detail.value
			},
			bindPicker2Change: function(e) {
				this.index2 = e.detail.value
			},
			bindPicker3Change: function(e) {
				this.index3 = e.detail.value
			},
			bindPicker4Change: function(e) {
				this.index4 = e.detail.value
			},
			bindPicker5Change: function(e) {
				this.index5 = e.detail.value
			},
			bindPicker6Change: function(e) {
				this.index6 = e.detail.value
			},
			bindPicker7Change: function(e) {
				this.index7 = e.detail.value
			},
			upload_suc(){
				uni.showToast({
					title:'上传成功',
					icon:"none"
				})
				this.hasUplaoded = true;
				this.options[0].icon = '/static/img/suc.png'
				this.options[0].text = '打卡成功！'
			},
			upload_fail(){
				uni.showToast({
					title:'上传失败',
					icon:"none"
				})
			},
		}
	}
</script>

<style>
	.place-detail {
		/* margin: 27rpx 20rpx 104rpx 20rpx; */
		padding-bottom: 104rpx;
	}

	/* .place-detail .uni-row {
		margin: 5rpx 0;
	} */
	.txt-center{
		text-align: center;
	}
	.uni-input{
		padding: 0;
	}
</style>
