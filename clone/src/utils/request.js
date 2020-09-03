import axios from 'axios'

axios.defaults.baseURL = '/'
axios.defaults.timeout = 10000

axios.interceptors.request.use (
	function (config) {
		return config
	},
	function (error) {
		return Promise.reject (error)
	}
)

// {
//   data: '数据',
//   code: 0,
//   msg：'错误信息'
//   success：true/false
// }
// 可自行判断 逻辑报错请求
const errorMsg = '网络异常，请重试'
axios.interceptors.response.use (response => {
	const { data } = response
	if (data) {
		if (data.code === 0) {
			if (data.success) {
				return data.data
			} else {
				return Promise.reject (false)
			}
		} else {
			return Promise.reject (false)
		}
	} else {
		return Promise.reject (false)
	}
}, function () {
	return Promise.reject (false)
})

export default axios
const missErrorRequest = axios.create ()
export { missErrorRequest }