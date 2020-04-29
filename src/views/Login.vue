<template>
  <div>
    <h1>No estás conectado</h1>
    <br>
    <b-button @click="register" class="m-2">Registrate</b-button>
    <b-button @click="register" class="m-2">Iniciá sesión</b-button>
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
    register: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      firebase.auth().signInWithPopup(provider)
      .then((user) => this.$router.replace('home'), (error) => console.error(error))
    },
  },
}
</script>

<style>

</style>