<template>
  <section class="shift">
    <a @click.prevent="setModal('workShift')" class="approve_button"
      >Добавить смену</a
    >
    <WorkShift
      v-for="workShift in data"
      :key="workShift.id"
      :id="workShift.id"
      :start="workShift.start"
      :end="workShift.end"
      :active="workShift.active"
      :ws="true"
    />
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import WorkShift from "../components/WorkShiftComponent";
export default {
  components: { WorkShift },
  methods: {
    ...mapMutations(["setModal"]),
    ...mapActions(["f"]),
  },
  computed: {
    ...mapState(["data"]),
  },
  mounted() {
    this.f({
      path: "work-shift",
    });
  },
};
</script>