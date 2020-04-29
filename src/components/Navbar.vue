<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="user" @click="logout" href="#">Cerrá sesión</b-nav-item>
        <template v-else>
          <b-nav-item @click="register" href="#">Registrate</b-nav-item>
          <b-nav-item @click="register" href="#">Iniciá sesión</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

import { mapMutations, mapState } from 'vuex'

export default {
  props: ['userReal'],
  data() {
    return {
      user: null
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations(['register', 'logout', 'initializeApp'])
  },
}
</script>

<style>

</style>