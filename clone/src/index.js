import Vue from 'vue'
import App from './App'
import './less/reset.less'

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#root')