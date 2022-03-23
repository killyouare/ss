<template>
  <article>
    <span>{{ name }}</span>
    <span
      :class="status ? (status != 'fired' ? 'working' : 'fired') : 'fired'"
      >{{
        status
          ? status != "fired"
            ? status == "working"
              ? "Работает"
              : "На смене"
            : "Уволен"
          : "Не на смене"
      }}</span
    >
    <span>{{ group }}</span>
    <a v-if="status == 'working' && dismiss" @click.prevent="dismissUser"
      >Уволить</a
    >
    <router-link
      v-if="!dismiss && !ws"
      :to="{ name: 'worker', params: { id: id } }"
      >Подробнее</router-link
    >
    <a v-if="ws" @click.prevent="status ? change('del') : change('add')">{{
      status ? "Убрать" : "Добавить"
    }}</a>
  </article>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "WorkerComponent",
  props: ["id", "name", "status", "group", "dismiss", "ws"],
  methods: {
    ...mapActions(["f"]),
    change(status) {
      if (status == "add")
        this.f({
          path: `work-shift/${this.$route.params.id}/user`,
          method: "post",
          data: {
            user_id: this.id,
          },
        });
      else
        this.f({
          path: `work-shift/${this.$route.params.id}/user/${this.id}`,
          method: "delete",
        });
      this.f({ path: `work-shift/${this.$route.params.id}` });
    },
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