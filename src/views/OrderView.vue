<template>
  <section class="orders">
    <WorkShift
      v-if="role != 'cook'"
      :id="getData.id"
      :start="getData.start"
      :end="getData.end"
      :active="getData.active"
      :ws="new Date() < new Date(getData.start)"
    />
    <Order
      v-for="order in getData.orders ? getData.orders : getData"
      :key="order.id"
      :id="order.id"
      :table="order.table"
      :shift_workers="order.shift_workers"
      :status="order.status"
      :price="order.price"
      :about="true"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Order from "../components/OrderComponent";
import WorkShift from "../components/WorkShiftComponent";
export default {
  components: { Order, WorkShift },
  async mounted() {
    if (this.role == "admin")
      return this.f({
        path: `work-shift/${this.$route.params.id}/order`,
      });
    if (this.role == "waiter") {
      await this.f({ path: "work-shift/active/get" });
      return this.f({ path: `work-shift/${this.getData.id}/order` });
    }
    this.f({
      path: `order/taken/get`,
    });
  },
  methods: {
    ...mapActions(["f"]),
  },
  computed: {
    ...mapGetters(["getData"]),
    ...mapState(["role"]),
  },
};
</script>