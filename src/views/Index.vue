<template>
  <div>
    <div class="container">
      <div class="form-group">
        <div class="producto-agregar d-flex flex-row">
          <input type="text" v-model="nombre" class="form-control" id="Producto" placeholder="Producto">
          <button @click="addProduct" class="btn btn-success">+</button>
        </div>
        <div class="precio d-flex flex-row">
          <input  v-model="precio" type="number" class="form-control" style="width: 65%;" id="precio" placeholder="Precio">
          <input v-model="cantidad" type="number" class="form-control" style="width: 35%;" id="cantidad" placeholder="Cant">
        </div>
      </div>
      <div class="table table-container">
        <div class="tbody">
          <div v-for="(producto, index) in productos" :key="index" :id="index" class="tr text-center row d-flex">
            <div class="td detalle py-3 col col-5">{{producto.nombre}}</div>
            <div class="td detalle py-3 col col-1">{{producto.cantidad}}</div>
            <div class="td detalle py-3 col col-3">{{ producto.precio | formatNumber }}</div>
            <div class="td btn-container text-right col-3 d-flex no-wrap"><button @click="increase(index)" class="btn btn-success">+</button><button @click="decrease(index)" class="btn btn-danger menos">-</button></div>
          </div>
        </div>
      </div>
      <div class="total form-group">
        <input type="text" v-model="total" class="form-control m-0 p-0 w-50" id="total" disabled>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
import firebase from 'firebase'
import numeral from 'numeral'

export default {
  name: 'Index',
  data() {
    return {
      productos: [],
      nombre: null,
      cantidad: null,
      precio: null,
      user: firebase.auth().currentUser.email
    }
  },
  methods: {
    getProducts: function () {
      try {
        //comentario
        // this.productos = []
        db.collection('tucarrito').doc(this.user).get()
        .then(
          (result) => {
            this.productos = result.data().productos
          },
          error => console.log(error)
        )
      } catch (error) {
        console.log(error)
      }
    },
    addProduct: function () {
      console.log(this.user)
      if (this.nombre && this.cantidad && this.precio && this.cantidad <= 20 && this.precio >= 100) {
        this.productos.push({
          'nombre': this.nombre,
          'cantidad': this.cantidad,
          'precio': this.precio
        })
        let productos = this.productos
        let ref = db.collection('tucarrito').doc(this.user)
        ref.set({productos})
        this.nombre = null
        this.cantidad = null
        this.precio = null
        this.getProducts()
      }
      else {
        if (this.nombre == null || this.nombre == '') {
          window.alert('Ingresá un nombre porfa.')
        }
        else if (this.cantidad == null || this.cantidad == '') {
          window.alert('Ingresá una cantidad porfa.')
        }
        else if (this.precio == null || this.precio == '') {
          window.alert('Ingresá un precio porfa.')
        }
      }
    },
    increase: function (index) {
      this.productos[index].cantidad = parseInt(this.productos[index].cantidad) + 1
      let productos = this.productos
      db.collection('tucarrito').doc(this.user).set({productos})
    },
    decrease: function (index) {
      this.productos[index].cantidad -= 1
      if (this.productos[index].cantidad <= 0) {
        this.productos.splice(index, 1)
      }
      let productos = this.productos
      db.collection('tucarrito').doc(this.user).set({productos})
    }
  },
  computed: {
    total: function () {
      var resultado = 0
      this.productos.forEach(producto => {
        resultado += producto.cantidad * producto.precio
      });
      return numeral(resultado).format('0,0') + 'Gs.'
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style>

header {
  display: flex !important;
}

.container {
  width: 90%;
  height: 500px;
  margin-top: 30px;
}

.table {
  height: 400px;
  overflow-y: scroll;
}

.table * {
  font-size: .8rem;
  padding: 0;
  width: 100%;
  align-self: center;
}

.tbody * {
  border-top: solid #d1d1d1 1px;
}

.btn {
  padding: 2px 9px;
}

.menos {
  padding: 2px 11px;
}

.total {
  display: inline-flex;
  height: .8rem;
  position: fixed;
  bottom: 25px;
  right: -55px;
}

.total input {
  text-align: end;
}

.detalle {
  overflow: auto;
}

.btn-container button {
  height: 27px;
}


tr {
  width: inherit;
}

</style>