<template>
  <section class="orders">
    <WorkShift
      :id="getData.id"
      :start="getData.start"
      :end="getData.end"
      :active="getData.active"
    />
    <Order
      v-for="order in getData.orders"
      :key="order.id"
      :id="order.id"
      :table="order.table"
      :shift_workers="order.shift_workers"
      :status="order.status"
      :price="order.price"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Order from "../components/OrderComponent";
import WorkShift from "../components/WorkShiftComponent";
export default {
  components: { Order, WorkShift },
  mounted() {
    this.f({
      path: `work-shift/${this.$route.params.id}/order`,
    });
    console.log(this.getData);
  },
  methods: {
    ...mapActions(["f"]),
  },
  computed: {
    ...mapGetters(["getData"]),
  },
};
</script>