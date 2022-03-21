<template>
  <article>
    <span>{{ name }}</span>
    <span :class="status">{{ status }}</span>
    <span>{{ group }}</span>
    <a
      v-if="status == 'working' && dismiss"
      @click.prevent="dismissUser"
      href="#"
      >Уволить</a
    >
    <router-link v-if="!dismiss" :to="{ name: 'worker', params: { id: id } }"
      >Подробнее</router-link
    >
  </article>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "WorkerComponent",
  props: ["id", "name", "status", "group", "dismiss"],
  methods: {
    ...mapActions(["f"]),
    dismissUser() {
      this.f({
        path: `user/${this.$route.params.id}/to-dismiss`,
      });
      this.f({
        path: `user/${this.$route.params.id}`,
      });
    },
  },
};
</script>