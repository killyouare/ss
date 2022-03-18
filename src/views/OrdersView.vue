<template>
  <section class="orders">
    <WorkShift
      :id="orders.id"
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
    />
  </section>
</template>

<script>
import Order from "../components/OrderComponent";
import WorkShift from "../components/DetailOrderComponent";
export default {
  components: { Order, WorkShift },
  data() {
    return {
      orders: [],
      userRole: "",
    };
  },
  async mounted() {
    const res = (await this.$store.dispatch("active")).data;
    this.orders = (await this.$store.dispatch("WaiterGetOrders", res.id)).data;
    console.log(this.orders);
    this.userRole = this.$store.getters.getRole;
    console.log(this.userRole);
  },
};
</script>