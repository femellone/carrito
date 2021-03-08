<template>
  <b-container class="lists">
    <b-list-group>
      <!-- "Add new" button -->
      <b-list-group-item
        class="list"
        @click="openModal()"
        title="Agregar una lista"
      >
        <b-icon icon="plus" />
      </b-list-group-item>
      
      <!-- Item when empty lists array is empty -->
      <b-list-group-item
        v-if="!lists.length"
        class="list__empty-message"
      >
        <span>Agrega una lista con el botón de arriba 👆</span>
      </b-list-group-item>

      <!-- Iterated list items -->
      <b-list-group-item
        class="list"
        v-for="(list, index) in lists"
        :key="`list-${index}`"
      >
        <div class="list__name">
          <span> {{ list.name + list.id }} </span>
        </div>
        <div class="list__delete-button">
          <b-icon icon="trash-fill" variant="danger" @click="openModal(list)" />
        </div>
      </b-list-group-item>

    </b-list-group>

    <!-- Add/Delete modal -->
    <b-modal id="modal-list" :title="listToBeDeleted ? `Eliminar lista` : `Agregar lista`" :ok-variant="listToBeDeleted ? 'danger' : 'success'" @ok="listToBeDeleted ? removeList() : addList($event)" @cancel="closeModal" @close="closeModal">

      <!-- Delete content -->
      <span v-if="listToBeDeleted" class="delete-modal">Está seguro de que desea eliminar la lista {{listToBeDeleted.name}}?</span>

        <!-- Add content -->
      <div v-else>
        <b-form-input id="input-name" v-model="listName" :state="validateListName" trim placeholder="Ingresa un nombre para tu lista" />
        <b-form-invalid-feedback id="input-name-feedback">
          No puede estar vacío.
        </b-form-invalid-feedback>
      </div>

      <!-- Footer -->
      <template #modal-ok>
        <span>{{listToBeDeleted ? 'Eliminar' : 'Guardar'}}</span>
      </template>
      <template #modal-cancel>
        <span>Cancelar</span>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        { id: 3, name: "Lista" },
        { id: 2, name: "Lista" },
        { id: 1, name: "Lista" },
        { id: 0, name: "Lista" },
      ],
      listToBeDeleted: null,
      listName: ''
    };
  },
  computed: {
    validateListName(){
      return this.listName.length > 0
    }
  },
  methods: {
    openModal(list){
      if (list) this.listToBeDeleted = list
      this.$bvModal.show('modal-list')
    },

    closeModal(){
      this.$bvModal.hide('modal-list')
      this.listToBeDeleted = null
      this.listName = ''
    },

    removeList() {
      // Agregar el request de delete de la lista
      this.lists = [...this.lists.filter(list => list.id !== this.listToBeDeleted.id)]
      this.listToBeDeleted = null
    },

    addList(event){
      // Agregar primero el request y obtener la nueva lista con su ID desde el response
      if (!this.listName) event.preventDefault()
      else {
        this.lists = [{id: 50, name: this.listName}, ...this.lists]
        this.listName = ''
      }
    },
  },
};
</script>

<style>
.list:first-child {
  background-color: rgb(7, 165, 7);
  color: white;
  justify-content: center;
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.list__name {
  width: 90%;
  text-align: left;
}

.list__delete-button {
  width: 10%;
}
</style>
