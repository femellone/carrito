<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">{{ BrandName }}</b-navbar-brand>

    <b-navbar-toggle
      v-if="$route.meta.auth"
      target="nav-collapse"
    ></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="$route.meta.auth"
          ><router-link to="/lists">List</router-link></b-nav-item
        >
        <b-nav-item v-if="$route.meta.auth" @click="logout" href="#"
          >Cerrá sesión</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["BrandName"],
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(
          (user) => this.$router.replace("login"),
          (error) => console.error(error)
        )
        .catch((error) => {
          console.log("No se pudo cambiar la ruta -> " + error);
        });
    },
  },
};
</script>

<style>
.nav__item a {
  text-decoration: none;
}
</style>
