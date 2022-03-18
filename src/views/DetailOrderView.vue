<template>
  <section class="orders">
    <Order
      :id="orders.id"
      :position="orders.shift_workers"
      :price="orders.price_all"
      :count="orders.status"
    />
    <Order
      v-for="order in orders.positions"
      :key="order.id"
      :id="order.id"
      :position="order.position"
      :shift_workers="order.shift_workers"
      :count="order.count"
      :price="order.price"
      :status="orders.status"
      @del="del"
    />
  </section>
</template>


<script>
import Order from "../components/DetailOrdersComponent";
export default {
  data() {
    return {
      orders: [],
      openModal: false,
      error: false,
    };
  },
  components: { Order },
  methods: {
    del(id) {
      const positions = this.orders.positions;
      positions.splice(
        positions.findIndex((value) => {
          if (value.id == id) {
            return value;
          }
        }),
        1
      );
    },
  },
  async mounted() {
    this.orders = (
      await this.$store.dispatch("getOrder", this.$route.params.id)
    ).data;
    console.log(this.orders);
  },
};
</script>
