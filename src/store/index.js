import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";
// import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    user: null,
    dismissCountDown: 0,
    alertType: "success",
    alertMsg: "",
  },
  mutations: {
    setUser(state, userEmail) {
      state.user = userEmail;
    },
    openAlert(state, alertType = "success", alertSeconds = 8, alertMsg) {
      state.alertType = alertType;
      state.dismissCountDown = alertSeconds;
      state.alertMsg = alertMsg;
    },
    closeAlert(state) {
      state.dismissCountDown = 0;
    },
  },
  actions: {
    getList({ state }) {
      try {
        db.collection("tucarrito")
          .doc(state.user)
          .get()
          .then((result) => {
            console.log(result);
            // this.productos = result.data().productos;
          })
          .catch((err) => {
            throw new Error(err);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
