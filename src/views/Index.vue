<template>
  <div>
    <div class="container mt-5 w-75">
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
      <table class="table">
        <tbody class="overflow-auto">
          <tr v-for="(producto, index) in productos" :key="index" :id="index" class="text-center row d-flex">
            <td class="detalle py-3 col col-3">{{producto.nombre}}</td>
            <td class="detalle py-3 col col-3">{{producto.cantidad}}</td>
            <td class="detalle py-3 col col-3">{{producto.precio}}</td>
            <td class="text-right col-3 d-flex no-wrap"><button @click="increase(index)" class="btn btn-success">+</button><button @click="decrease(index)" class="btn btn-danger menos">-</button></td>
          </tr>
        </tbody>
      </table>
      <div class="total form-group">
        <input type="number" v-model="total" class="form-control m-0 p-0 w-50" id="total" disabled>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      productos: [
        {'nombre': 'azucar', 'precio': 5000, cantidad: '5'},
      ],
      nombre: null,
      cantidad: null,
      precio: null
    }
  },
  methods: {
    addProduct: function () {
      if (this.nombre && this.cantidad && this.precio && this.cantidad <= 20 && this.precio >= 100) {
        this.productos.push({
          'nombre': this.nombre,
          'cantidad': this.cantidad,
          'precio': this.precio
        })
        this.nombre = null
        this.cantidad = null
        this.precio = null
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
      var cantidad = parseInt(this.productos[index].cantidad)
      var precio = parseInt(this.productos[index].precio)
      cantidad = cantidad + 1
      this.productos[index].cantidad = cantidad
      this.productos[index].precio = precio
    },
    decrease: function (index) {
      var cantidad = this.productos[index].cantidad
      var precio = this.productos[index].precio
      cantidad = cantidad - 1
      this.productos[index].cantidad = cantidad
      this.productos[index].precio = precio
      if (cantidad <= 0) {
        var elemento = document.getElementById(index)
        elemento.remove()
        this.productos.splice(index, 0)
      }
    },
    register: function () {
      
    }
  },
  computed: {
    total: function () {
      var resultado = 0
      this.productos.forEach(producto => {
        resultado += producto.cantidad * producto.precio
      });
      return resultado
    }
  },
}
</script>

<style>

header {
  display: flex !important;
}

table {
  height: 500px;
  overflow: scroll;
}

.table * {
  font-size: .8rem;
  padding: 0;
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
</style>