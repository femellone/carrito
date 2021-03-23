<template>
  <div>
    <b-container>
      <b-input-group>
        <b-form-input v-model="nombre" placeholder="Producto" trim />
        <b-form-input
          v-model="cantidad"
          type="number"
          placeholder="Cantidad"
          width="20%"
        />
      </b-input-group>
      <b-input-group>
        <b-button
          @click="addProduct"
          variant="success"
          size="lg"
          class="mt-2"
          block
          >+</b-button
        >
      </b-input-group>
      <b-table striped hover :items="productos" :fields="fields"></b-table>
      <!-- <div class="table table-container">
				<div class="tbody">
					<div v-for="(producto, index) in productos" :key="index" :id="index" class="tr text-center row d-flex">
						<div class="td detalle py-3 col col-5">{{ producto.nombre }}</div>
						<div class="td detalle py-3 col col-1">{{ producto.cantidad }}</div>
						<div class="td btn-container text-right col-3 d-flex no-wrap">
							<button @click="increase(index)" class="btn btn-success">+</button
							><button @click="decrease(index)" class="btn btn-danger menos">
								-
							</button>
						</div>
					</div>
				</div>
			</div> -->
      <b-input-group size="sm" append="Gs.">
        <b-form-input
          type="number"
          v-model="total"
          class="m-0 p-0 w-25"
          disabled
        />
      </b-input-group>
    </b-container>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
import numeral from "numeral";
import { mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      fields: ["producto", "cantidad", ""],
      productos: [],
      nombre: null,
      cantidad: null,
      precio: null,
      user: firebase.auth().currentUser.email,
    };
  },
  methods: {
    ...mapActions({
      getProducts: "getList",
    }),
    addProduct: function () {
      if (
        this.nombre &&
        this.cantidad &&
        this.precio &&
        this.cantidad <= 20 &&
        this.precio >= 100
      ) {
        this.productos.push({
          nombre: this.nombre,
          cantidad: this.cantidad,
          precio: this.precio,
        });
        let ref = db.collection("tucarrito").doc(this.user);
        ref.set({ productos: this.productos });
        this.nombre = null;
        this.cantidad = null;
        this.precio = null;
      } else {
        if (this.nombre == null || this.nombre == "") {
          window.alert("Ingresá un nombre porfa.");
        } else if (this.cantidad == null || this.cantidad == "") {
          window.alert("Ingresá una cantidad correcta porfa.");
        } else if (this.precio == null || this.precio == "") {
          window.alert("Ingresá un precio porfa.");
        }
      }
    },
    increase: function (index) {
      this.productos[index].cantidad =
        parseInt(this.productos[index].cantidad) + 1;
      db.collection("tucarrito")
        .doc(this.user)
        .set({ productos: this.productos });
    },
    decrease: function (index) {
      this.productos[index].cantidad -= 1;
      if (this.productos[index].cantidad < 1) {
        this.productos.splice(index, 1);
      }
      db.collection("tucarrito")
        .doc(this.user)
        .set({ productos: this.productos });
    },
  },
  computed: {
    total: function () {
      var resultado = 0;
      this.productos.forEach((producto) => {
        resultado += producto.cantidad * producto.precio;
      });
      return numeral(resultado).format("0,0");
    },
  },
  beforeMount() {
    console.log(this.$route.params.id);
    // this.getProducts();
  },
};
</script>

<style></style>
