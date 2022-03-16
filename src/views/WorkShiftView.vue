<template>
  <section class="shift">
    <button class="approve_button">Добавить смену</button>
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
export default {
  data() {
    return {
      workShifts: [],
    };
  },
  components: { WorkShift },
  async mounted() {
    this.workShifts = await this.$store.dispatch("GetWorkShifts");
  },
};
</script>