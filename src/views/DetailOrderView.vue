<template>
  <section class="orders">
    <Order
      :id="getData.id"
      :table="getData.table"
      :shift_workers="getData.shift_workers"
      :price="getData.price_all"
      :status="getData.status"
      :addOrder="true"
      class="order"
    />
    <Table
      v-for="order in getData.positions"
      :key="order.id"
      :id="order.id"
      :position="order.position"
      :shift_workers="order.shift_workers"
      :count="order.count"
      :price="order.price"
      :status="getData.status"
    />
  </section>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import Table from "../components/DetailOrdersComponent";
import Order from "../components/OrderComponent";
export default {
  components: { Table, Order },
  methods: {
    ...mapActions(["f"]),
  },
  mounted() {
    this.f({
      path: `order/${this.$route.params.id}`,
    });
  },
  computed: {
    ...mapGetters(["getData"]),
  },
};
</script>
