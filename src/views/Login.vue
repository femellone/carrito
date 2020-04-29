<template>
  <div>
    <h1>No estás conectado</h1>
    <br>
    <b-button @click="login" class="m-2">Registrate</b-button>
    <b-button @click="login" class="m-2">Iniciá sesión</b-button>
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

<style>

</style>