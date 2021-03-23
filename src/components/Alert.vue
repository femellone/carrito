<template>
  <b-alert
    :show="dismissCountDown"
    dismissible
    :variant="alertType"
    @dismissed="closeAlert"
  >
    <p>{{ alertMsg }}</p>
    <b-progress
      :variant="alertType"
      :max="dismissCountDown"
      :value="dismissCountDown"
      height="4px"
    ></b-progress>
  </b-alert>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["dismissCountDown", "alertType", "alertMsg"]),
  },
  methods: {
    ...mapMutations(["closeAlert"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style></style>
