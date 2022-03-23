<template>
  <section>
    <article class="modal">
      <Login v-if="modal == 'login'" />
      <Order v-if="modal == 'order'" />
      <Position v-if="modal == 'position'" />
      <Worker v-if="modal == 'worker'" />
      <WorkShift v-if="modal == 'workShift'" />
    </article>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Login from "./modals/LoginComponent";
import Order from "./modals/CreateOrderComponent";
import Position from "./modals/CreatePositionComponent";
import Worker from "./modals/CreateWorkerComponent";
import WorkShift from "./modals/CreateWorkShiftComponent";
export default {
  name: "ModalComponent",
  components: { Login, Order, Position, Worker, WorkShift },
  computed: {
    ...mapState(["modal"]),
  },
};
</script>