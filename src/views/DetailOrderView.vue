<template>
  <section class="orders">
    <Order
      :id="orders.id"
      :table="orders.table"
      :shift_workers="orders.shift_workers"
      :price="orders.price_all"
      :status="orders.status"
      :addOrder="true"
      @open="openModal"
    />
    <Table
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
    <Modal v-if="modal" @open="openModal" @add="add" />
  </section>
</template>


<script>
import Table from "../components/DetailOrdersComponent";
import Order from "../components/OrderComponent";
import Modal from "../components/CreatePositionComponent";
export default {
  data() {
    return {
      orders: [],
      modal: false,
      error: false,
    };
  },
  components: { Table, Order, Modal },
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
    add(orders) {
      this.orders = orders;
    },
    openModal() {
      this.modal = !this.modal;
    },
  },
  async mounted() {
    this.orders = (
      await this.$store.dispatch("getOrder", this.$route.params.id)
    ).data;
    console.log(this.orders.status);
  },
};
</script>
