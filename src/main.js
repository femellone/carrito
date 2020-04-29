import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import router from './router'
import firebase from 'firebase'
import firebaseConfig from '../fbConfig'
// import PortalVue from 'portal-vue'

Vue.config.productionTip = false
// Vue.use(PortalVue)
Vue.use(BootstrapVue)

// var firebaseConfig = {
//   apiKey: "AIzaSyCi8q8mkD8gdjTuFsl1F7KUrCyBjoAOFVs",
//   authDomain: "linkstart-9e49f.firebaseapp.com",
//   databaseURL: "https://linkstart-9e49f.firebaseio.com",
//   projectId: "linkstart-9e49f",
//   storageBucket: "linkstart-9e49f.appspot.com",
//   messagingSenderId: "860352115683",
//   appId: "1:860352115683:web:820c7532a442addfd5a6d6",
//   measurementId: "G-Q125DSFL0J"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(function(){
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
})

