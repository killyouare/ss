<template>
  <section class="orders">
    <WorkShift
      :id="orders.id"
      :start="orders.start"
      :end="orders.end"
      :active="orders.active"
      :order="true"
      @open="openModal"
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
import Order from "../components/OrderComponent";
import WorkShift from "../components/DetailOrderComponent";
export default {
  components: { Order, WorkShift },
  data() {
    return {
      orders: [],
      modal: false,
      userRole: "",
    };
  },
  methods: {
    openModal() {
      this.modal = !this.modal;
    },
    add(body) {
      this.orders.orders.push(body);
    },
  },
  async mounted() {
    const role = this.$store.getters.getRole;
    this.userRole = role;

    role === "waiter"
      ? (this.orders = (
          await this.$store.dispatch(
            "WaiterGetOrders",
            (
              await this.$store.dispatch("active")
            ).data.id
          )
        ).data)
      : (this.orders = {
          orders: (await this.$store.dispatch("getOrdersCook")).data,
        });
    console.log(this.orders);
  },
};
</script>