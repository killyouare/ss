<template>
  <section class="shift">
    <a @click.prevent="OpenModal" class="approve_button">Добавить смену</a>
    <Modal v-if="modal" @open="OpenModal" @add="add" />
    <WorkShift
      v-for="workShift in workShifts"
      :key="workShift.id"
      :id="workShift.id"
      :start="workShift.start"
      :end="workShift.end"
      :active="workShift.active"
    />
  </section>
</template>

<script>
import WorkShift from "../components/WorkShiftComponent";
import Modal from "../components/CreateWorkShiftComponent";
export default {
  data() {
    return {
      workShifts: [],
      modal: false,
    };
  },
  components: { WorkShift, Modal },
  methods: {
    OpenModal() {
      this.modal = !this.modal;
    },
    add(body) {
      this.workShifts.push(body);
    },
  },
  async mounted() {
    this.workShifts = await this.$store.dispatch("GetWorkShifts");
  },
};
</script>