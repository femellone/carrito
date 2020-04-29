import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    initializeApp: function() {
      console.log('se cargó initializeapp')
      var firebaseConfig = {
        apiKey: "AIzaSyCi8q8mkD8gdjTuFsl1F7KUrCyBjoAOFVs",
        authDomain: "linkstart-9e49f.firebaseapp.com",
        databaseURL: "https://linkstart-9e49f.firebaseio.com",
        projectId: "linkstart-9e49f",
        storageBucket: "linkstart-9e49f.appspot.com",
        messagingSenderId: "860352115683",
        appId: "1:860352115683:web:820c7532a442addfd5a6d6",
        measurementId: "G-Q125DSFL0J"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    },
    register: function (state) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        state.token = result.credential.accessToken;
        // The signed-in user info.
        state.user = result.user.uid;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(`Error - Codigo: ${errorCode}`)
        var errorMessage = error.message;
        console.log(`Error - Mensaje: ${errorMessage}`)
        // The email of the user's account used.
        var email = error.email;
        console.log(`Error - Email: ${email}`)
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(`Error - Credencial: ${credential}`)
        // ...
      });
    },
    logout: function (state) {
      state.user = null
      state.token = null
    },
    ifLoged: function (state) {
      state.user = firebase.auth().currentUser
    }
  },
  actions: {
  },
  modules: {
  }
})
