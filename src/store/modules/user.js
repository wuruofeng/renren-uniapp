import Vue from 'vue'
import _ from 'lodash'
export default {
	state: {
		user: null
	},
	mutations: {
		login(state, user) {
			state.user = user
			// 缓存用户信息
			Vue.prototype.$cache.set('_userInfo', user, 0)
		},
		logout(state) {
			state.user = null
			// 清理缓存用户信息
			Vue.prototype.$cache.delete('_userInfo')
		}
	},
	actions: {
		autoLogin({ commit, getters, dispatch }) {
			console.log('autoLogin', getters.user);
			// 判断本地是否有账号信息，如果有，就自动重新登录
			if (getters.user && getters.user.username && getters.user.password) {
				const params = {
					username: getters.user.username,
					password: getters.user.password
				}
				uni.showLoading({
					title: '自动登录中...'
				})
				dispatch('login', params).then(res => {
					sessionStorage.setItem('token', res.token);
					uni.hideLoading()
					// uni.showToast({
					// 	title: '已自动登录！',
					// 	icon: 'success'
					// })
				}).catch(() => {
					uni.hideLoading()
					uni.showToast({
						title: '会话过期，请重新登录！',
						icon: 'none'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000)
				})
			} else {
				// 如果本地没有账号信息，就提示用户必须登录
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					showCancel: false,
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					}
				})
			}
		},
		login({ commit }, params) {
			return new Promise((resolve, reject) => {
				Vue.prototype.$minApi.login(params).then(res => {
					if (res.ok()) {
						let tmp = { ...params, ...res}
						sessionStorage.setItem('userInfo',JSON.stringify(tmp));
						commit('login', tmp)
						// 关于消息推送的保存
						// 保存clientid到服务器
						// #ifdef APP-PLUS
						const clientInfo = plus.push.getClientInfo()
						let pushUser = {
							clientid: clientInfo.clientid,
							appid: clientInfo.appid,
							appkey: clientInfo.appkey,
							userName: tmp.userName,
							userRole: tmp.roleStr
						}
						// 提交api请求，服务端保存客户端角色信息
						// Vue.prototype.$minApi.savePushUser(pushUser)
						// #endif

						resolve(res)
					} else {
						reject(res)
					}
				}).catch(err => {
					reject(err)
				})
			})
		},
		logout({ commit }) {
			commit('logout')
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
	},
	getters: {
		user: state => {
			if (state.user) {
				return state.user
			}
			return Vue.prototype.$cache.get('_userInfo')
		}
	}
}
