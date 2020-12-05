import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/bootstrap.css'

//引入界面权限控制文件
import "./permissions"

//引入按钮的权限控制文件
import "./buttonPermissions"

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
