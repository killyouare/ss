<template>
  <section class="orders">
    <WorkShift
      :id="workShift.id"
      :start="workShift.start"
      :end="workShift.end"
      :active="workShift.active"
    />
    <Order
      v-for="order in workShift.orders"
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
import Order from "../components/OrderComponent";
import WorkShift from "../components/WorkShiftComponent";
export default {
  data() {
    return {
      workShift: [],
    };
  },
  components: { Order, WorkShift },
  async mounted() {
    this.workShift = await this.$store.dispatch(
      "GetOrders",
      this.$route.params.id
    );
    console.log(this.orders);
  },
};
</script>