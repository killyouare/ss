<template>
  <section class="orders">
    <WorkShift
      :id="get.id"
      :start="orders.start"
      :end="orders.end"
      :active="orders.active"
    />
    <Order
      v-for="order in orders.orders"
      :key="order.id"
      :id="order.id"
      :table="order.table"
      :shift_workers="order.shift_workers"
      :status="order.status"
      :price="order.price"
      :userRole="userRole"
      :addOptions="userRole == 'waiter'"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Order from "../components/OrderComponent";
import WorkShift from "../components/DetailOrderComponent";
export default {
  components: { Order, WorkShift },
  methods: {
    ...mapActions(["f"]),
  },
  async mounted() {
    
  },
  computed: {
    ...mapGetters([]),
    ...mapState(["role"]),
  },
};
</script>