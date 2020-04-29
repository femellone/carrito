import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import router from './router'
import firebase from 'firebase'
// import PortalVue from 'portal-vue'

Vue.config.productionTip = false
// Vue.use(PortalVue)
Vue.use(BootstrapVue)

firebase.auth().onAuthStateChanged(function(){
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
})

