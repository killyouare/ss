<template>
  <section class="shift">
    <a @click.prevent="OpenModal" class="approve_button">Добавить смену</a>
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
  methods: {
    add(body) {
      this.workShifts.push(body);
    },
  },
  async mounted() {
    this.workShifts = await this.$store.dispatch("GetWorkShifts");
  },
};
</script>