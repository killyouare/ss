<template>
  <section>
    <article class="modal">
      <Error v-if="errors" />
      <Login v-if="modal == 'login'" />
      <Order v-if="modal == 'order'" />
      <Position v-if="modal == 'position'" />
      <Worker v-if="modal == 'worker'" />
      <WorkShift v-if="modal == 'workShift'" />
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Error from "./modals/ErrorComponent";
import Login from "./modals/LoginComponent";
import Order from "./modals/CreateOrderComponent";
import Position from "./modals/CreatePositionComponent";
import Worker from "./modals/CreateWorkerComponent";
import WorkShift from "./modals/CreateWorkShiftComponent";
export default {
  name: "ModalComponent",
  components: { Error, Login, Order, Position, Worker, WorkShift },
  methods: {
    ...mapGetters(["getModal", "getErrors"]),
  },
  computed: {
    modal() {
      return this.getModal();
    },
    errors() {
      return this.getErrors();
    },
  },
};
</script>