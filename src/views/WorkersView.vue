<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
      <a @click.prevent="setModal('worker')">+</a>
    </article>
    <User
      v-for="user in getData"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :group="user.group"
      :status="user.status"
    />
  </section>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import User from "../components/WorkerComponent";
export default {
  components: { User },
  async mounted() {
    await this.f({ path: "user" });
  },
  methods: {
    ...mapMutations(["setModal"]),
    ...mapActions(["f"]),
  },
  computed: {
    ...mapGetters(["getData"]),
  },
};
</script>