<template>
	<b-navbar toggleable="lg" type="dark" variant="info">
		<b-navbar-brand href="#">{{ BrandName }}</b-navbar-brand>

		<b-navbar-toggle
			v-if="$route.meta.auth"
			target="nav-collapse"
		></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item v-if="$route.meta.auth" @click="goto('Lists')">
					Lists
        </b-nav-item>
				<b-nav-item v-if="$route.meta.auth" @click="logout" href="#">
					Cerrá sesión
				</b-nav-item>
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
		logout: function () {
			firebase
				.auth()
				.signOut()
				.then((user) => this.$router.replace("login"))
				.catch((error) => {
					console.error("No se pudo cambiar la ruta -> " + error);
				});
		},
		goto(r) {
			this.$router.push({ name: r });
		},
	},
};
</script>
