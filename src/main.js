import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store";
import router from "./router";
import firebase from "firebase";
import firebaseConfig from "../fbConfig";
import numeral from "numeral";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false;

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,000");
});

firebase.auth().onAuthStateChanged(function () {
  new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
