<template>
  <div class="container mt-5">
    <h1>Bienvenido</h1>
    <p class="mx-2">Te mostramos cuanto alcanza tu compra antes de ir a la caja del super 😉</p>
    <b-button @click="login" class="m-2 btn-success">Registrate</b-button>
    <b-button @click="login" class="m-2 btn-success">Iniciá sesión</b-button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data() {
    return {
      
    }
  },
  methods: {
    login: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      firebase.auth().signInWithRedirect(provider)
      .then((user) => this.$router.replace('home'), (error) => console.error(error))
    },
  },
}
</script>