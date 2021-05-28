import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'
import { generateSign } from '@/pages/yzcloud/signclient.js'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		login(params) {
			return minRequest.post('/sys/login', params,{
				baseURL : '/app'
			})
		},
		userPwdModify(params) {
			return minRequest.post('/post/user/pwd/modify', params)
		},
		// 项目审批列表
		listAuditProject() {
			return minRequest.get('/get/audit/project/list')
		},
		// 用户审批列表
		// listAuditUser() {
		// 	return minRequest.get('/get/audit/user/list')
		// },
		// listAuditProject() {
		// 	return minRequest.get('/generator/task/list',{},{
		// 		baseURL: '/app',
		// 		header: {
					// 'token': sessionStorage.getItem('token')
		// 		}
		// 	})
		// },
		// 文档管理接口：HTTP上传文件
		yzEditHttpUploadFile({ fileUrl }) {
			const sign = generateSign(globalConfig.yzEditAPPKEY, {"appId": [globalConfig.yzEditAPPID],
				"fileUrl": [fileUrl]
			})
			return minRequest.post('/api/file/http', {
				fileUrl,
				appId: globalConfig.yzEditAPPID,
				sign
			}, {
				baseURL: globalConfig.yzDmcUrl
			})
		},
		// 格式转换接口
		yzConvertFile(params) {
			const sign = generateSign(globalConfig.yzFormatConvertAPPKEY, {"appId": [globalConfig.yzFormatConvertAPPID],
				"fileVersionId": [params.fileVersionId],
				"convertType": [params.convertType],
				"destinationName": [params.destinationName]
			})
			return minRequest.post('/api/convert/file', { ...params,
				appId: globalConfig.yzFormatConvertAPPID,
				sign
			}, {
				baseURL: globalConfig.yzEicUrl,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			})
		},
		// 获取用户信息
		getUserInfoByUserName(userName){
			return minRequest.get('/sys/user/getInfoByUsername/' + userName,{},{
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取老师信息
		getTeacherList(){
			return minRequest.get('/generator/teacher/list', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取course
		getCourseList(){
			return minRequest.get('/generator/course/list', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取class
		getClassList(){
			return minRequest.get('/generator/class/list', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取classRoom
		getClassRoomList() {
			return minRequest.get('/generator/classroom/list', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取task表
		getTaskList() {
			return minRequest.get('/generator/task/list1', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取rela表
		getRelaList() {
			return minRequest.get('/generator/relatetasksupervisor/list1', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取union表
		getUnionList() {
			return minRequest.get('/generator/courseteacherclassroom/list1', {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// 获取评价表
		getevaluateList(relateId) {
			return minRequest.get('/generator/evaluate/relatedetail/' + relateId, {}, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		},
		// save evaluate表格
		saveEvaluate(params){
			return minRequest.post('/generator/evaluate/save', params, {
				baseURL: '/app',
				header: {
					'token': sessionStorage.getItem('token')
				}
			});
		}
	}
}
