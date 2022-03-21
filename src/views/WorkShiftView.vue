<template>
  <section class="shift">
    <a @click.prevent="OpenModal" class="approve_button">Добавить смену</a>
    <WorkShift
      v-for="workShift in getData.data"
      :key="workShift.id"
      :id="workShift.id"
      :start="workShift.start"
      :end="workShift.end"
      :active="workShift.active"
    />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WorkShift from "../components/WorkShiftComponent";
export default {
  components: { WorkShift },
  methods: {
    ...mapActions(["f"]),
  },
  computed: {
    ...mapGetters(["getData"]),
  },
  mounted() {
    this.f({
      path: "work-shift",
    });
  },
};
</script>