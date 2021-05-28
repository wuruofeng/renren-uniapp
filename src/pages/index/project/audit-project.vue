<!-- 项目审批 -->
<template>
	<view style="margin-bottom: 100rpx">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="mycard">
				<view v-for="item in cardList" :key="item.id" class="card-item" v-if="false">
					<uni-card is-full :title="item.projectType" is-shadow note="true" :extra="item.createTime"
						:thumbnail="`/static/img/project/${formatProjectType(item.projectType)}`"
						@tapHeader="clickCard(item)">
						<view class="audit-card-content">
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">项目名称</view>
								<view class="flex-item-80">{{item.projectName}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">项目类型</view>
								<view class="flex-item-80">{{item.projectType}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">所在区域</view>
								<view class="flex-item-80">{{item.area}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">项目地址</view>
								<view class="flex-item-80">{{item.addr}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">立项人</view>
								<view class="flex-item-80">{{item.createUser}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">审核状态</view>
								<view class="flex-item-80">
									<uni-tag size="small" :text="formatAuditStatus(item.auditStatus).text"
										:type="formatAuditStatus(item.auditStatus).color" :circle="true"></uni-tag>
								</view>
							</view>
							<view class="uni-flex uni-row">
								<view class="flex-item-20">附件</view>
								<view class="flex-item-80">
									<view v-for="atta in item.attachment" :key="atta.url" @tap="filePreview(atta)">
										<uni-icons color="#007aff" type="paperclip" size="22"></uni-icons>
										<text>{{atta.name}}</text>
									</view>
								</view>
							</view>
						</view>

						<template v-slot:footer>
							<view class="footer-box">
								<view class="iconfont icontongguo my-iconfont text-green" @tap="passClick(item)">通过
								</view>
								<view class="iconfont iconweibiaoti522 my-iconfont text-red" @tap="unPassClick(item)">拒绝
								</view>
								<view class="my-iconfont text-blue" @tap="adjustClick(item)">调整</view>
							</view>
						</template>
					</uni-card>
				</view>
				<view v-for="(item,index) in relaArr" :key="index" class="card-item">
					<uni-card is-full :title="item.taskId.unionId.courseId.courseName" is-shadow 
						:thumbnail="`/static/img/project/build.png`"
						@tapHeader="clickCard(item)" v-if="item.taskId.unionId">
						<view class="audit-card-content">
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">课程名</view>
								<view class="flex-item-80">{{item.taskId.unionId.courseId.courseName}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">日期</view>
								<view class="flex-item-80">{{item.taskId.time}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">教室</view>
								<view class="flex-item-80">{{item.taskId.unionId.classroomId}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">教师名</view>
								<view class="flex-item-80">{{item.taskId.unionId.teacherId.teacherName}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">节数</view>
								<view class="flex-item-80">{{item.taskId.unionId.orderNum}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">督导状态</view>
								<view class="flex-item-80">
									<uni-tag size="small" :text="formatAuditStatus(item.status).text"
										:type="formatAuditStatus(item.status).color" :circle="true"></uni-tag>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</mescroll-body>
		<audit-idea ref="popupAuditIdeaRef" :isPass="isPass" :isPaddingBottom="true" @updateQuery="updateQuery">
		</audit-idea>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
	import uniCard from "@/components/uni-card/uni-card"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import auditIdea from '@/pages/index/audit-idea.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		filePreview,
		formatAuditStatus,
		formatProjectType
	} from '@/utils/index.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniCard,
			uniTag,
			uniIcons,
			auditIdea
		},
		computed: mapGetters(['user']),
		data() {
			return {
				isPass: false,
				selectedProject: {},
				// 列表数据
				cardList: [],
				// 渲染数据
				renderList:[],
				//

				teachersArr:[],
				teachersArr_obj:{},
				courseArr:[],
				courseArr_obj:{},
				classArr:[],
				classArr_obj:{},
				classRoomArr:[],
				classRoomArr_obj:{},
				taskArr:[],
				taskArr_obj:{},
				relaArr:[],
				unionArr:[],
				unionArr_obj:{},

			}
		},
		methods: {
			filePreview,
			formatAuditStatus,
			formatProjectType,
			refresh(){
				location.reload();
			},
			/* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				if (!this.user) {
					this.mescroll.endErr()
					return
				}
				this.$minApi.listAuditProject({}, page.num, page.size).then(res => {
					const curPageData = res.data // 当前页面获取数据
					const totalSize = 10 // 后台接口有返回列表的总数据量totalSize
					this.mescroll.endBySize(curPageData.length, totalSize)
					// 设置列表数据
					if (page.num == 1) this.cardList = [] // 如果是第一页需手动置空列表
					this.cardList = this.cardList.concat(curPageData) // 追加新数据
				}).catch(() => {
					this.mescroll.endErr()
				})
			},
			clickCard(item) {
				uni.navigateTo({
					url: '/pages/index/project/detail-project?relateId=' + item.relateId + '&union_id=' + item.taskId.unionId.unionId + '&status=' + item.status
				})
			},
			adjustClick(item) {
				uni.navigateTo({
					url: '/pages/index/project/adjust-project?data=' + JSON.stringify(item)
				})
			},
			passClick(item) {
				this.selectedProject = item
				this.isPass = true
				this.$refs.popupAuditIdeaRef.$refs.share.open()
			},
			unPassClick(item) {
				this.selectedProject = item
				this.isPass = false
				this.$refs.popupAuditIdeaRef.$refs.share.open()
			},
			async queryByName(name) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				const res = await this.$minApi.listAuditProject()
				if (res.ok()) {
					this.cardList = res.data
				}
				uni.hideLoading()
			},
			updateQuery() {
				this.queryByName()
			},
			/******************
			 * 首先获取各种原子表
			*******************/
			async getTeacher(){
				let res = [];
				res = await this.$minApi.getTeacherList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
			async getCourse(){
				let res = [];
				res = await this.$minApi.getCourseList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
			async getClass(){
				let res = [];
				res = await this.$minApi.getClassList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
			async getClassRoom(){
				let res = [];
				res = await this.$minApi.getClassRoomList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
			/******************
			 * 开搞
			*******************/
			async getTask(){
				let res = [];
				res = await this.$minApi.getTaskList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
			async getRela(){
				let res = [];
				res = await this.$minApi.getRelaList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
			async getUnion(){
				let res = [];
				res = await this.$minApi.getUnionList().then(res=>{
					if (res.code == '0') {
						return res.page.list;
					}
				})
				return res;
			},
		},
		async beforeMount(e) {
				this.teachersArr = await this.getTeacher();
				this.courseArr = await this.getCourse();
				this.classArr = await this.getClass();
				this.classRoomArr = await this.getClassRoom();
				this.taskArr = await this.getTask();
				this.relaArr = await this.getRela();
				this.unionArr = await this.getUnion();
				// format
				this.teachersArr.forEach(item => {
					this.teachersArr_obj[item.teacherId] = item;
				});
				this.courseArr.forEach(item => {
					this.courseArr_obj[item.courseId] = item;
				});
				this.classArr.forEach(item => {
					this.classArr_obj[item.classId] = item;
				});
				this.classRoomArr.forEach(item => {
					this.classRoomArr_obj[item.classroomId] = item;
				});
				this.unionArr.forEach(item => {
					this.unionArr_obj[item.unionId] = item;
				});
				this.taskArr.forEach(item => {
					this.taskArr_obj[item.taskId] = item;
				});
				// Filter
				const f_relaArr = this.relaArr.filter(item => item.userId == this.user.userid);
				this.relaArr = f_relaArr;
				// 置换
				this.relaArr.forEach(item =>{
					let tmp_taskId = item.taskId;
					item.taskId = Object.assign({},this.taskArr_obj[tmp_taskId]); 
					let tmp_unionId = item.taskId.unionId;
					item.taskId.unionId = Object.assign({},this.unionArr_obj[tmp_unionId]);
					let tmp_classId = item.taskId.unionId.classId;
					item.taskId.unionId.classId = Object.assign({},this.classArr_obj[tmp_classId]);
					let tmp_courseId = item.taskId.unionId.courseId;
					item.taskId.unionId.courseId = Object.assign({},this.courseArr_obj[tmp_courseId]);
					let tmp_teacherId = item.taskId.unionId.teacherId;
					item.taskId.unionId.teacherId = Object.assign({},this.teachersArr_obj[tmp_teacherId]);
				})
				// 塞到session里面
				sessionStorage.setItem('baseList',JSON.stringify(this.relaArr));
				console.log('relaArr',this.relaArr);
				
		},
		mounted(){
			// console.log('😀😀😀😀😀😀😀data',this._data);
			
		},
	}
</script>

<style>
	.mescroll-totop {
		opacity: 1 !important;
	}
</style>
