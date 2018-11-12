import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App.vue'

import '@/assets/scss/index.scss'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
