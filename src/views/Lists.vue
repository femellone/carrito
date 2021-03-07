<template>
  <b-container class="lists">
    <b-list-group>
      <b-list-group-item
        class="list"
        v-for="(list, index) in lists"
        :key="`list-${index}`"
      >
        <div class="list__name">
          <span> {{ list.name + index }} </span>
        </div>
        <div class="list__delete-button">
          <b-icon icon="trash-fill" variant="danger" />
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        { id: 0, name: "Lista" },
        { id: 1, name: "Lista" },
        { id: 2, name: "Lista" },
        { id: 3, name: "Lista" },
      ],
    };
  },
};
</script>

<style>
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
