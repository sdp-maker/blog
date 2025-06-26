import '@/assets/css/global.styl'
import 'element-ui/lib/theme-chalk/display.css'
import animated from 'animate.css'
import 'github-markdown-css/github-markdown.css'
import 'vant/lib/index.css'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/vant'

import '@/plugins/element'
import '@/plugins/http'
import '@/plugins/vuescroll'


// import _ from 'lodash'



Vue.use(animated)

Vue.config.productionTip = false
// Vue.prototype._ = _
Vue.prototype.$EventBus = new Vue()

//hack alert
window.alert = function (value) {
  Vue.prototype.$notify.error({
    title: '错误',
    message: value
  })
}



new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
