<template>
  <article>
    <h2>Смена №{{ id }}</h2>
    <p>Начало смены в {{ start }}</p>
    <p>Конец смены в {{ end }}</p>
    <p :class="active ? 'working' : 'fired'">
      Статус: {{ active ? "Открыта" : "Закрыта" }}
    </p>
    <a
      v-if="role == 'admin' && ws"
      :class="active ? 'cancel_button' : 'approve_button'"
      @click.prevent="active ? change('close') : change('open')"
      
      >{{ active ? "Закрыть" : "Открыть" }}</a
    >
    <router-link
      v-if="role == 'admin' && ws"
      class="approve_button"
      :to="{ name: 'orders', params: { id: id } }"
      >Управление</router-link
    >
    <router-link
      v-if="role == 'admin' && !ws"
      class="approve_button"
      :to="{ name: 'WorkerOnShift', params: { id: id } }"
      >Добавить сотрудников</router-link
    >
  </article>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "WorkShiftComponent",
  props: ["id", "start", "end", "active", "ws"],
  methods: {
    ...mapActions(["f"]),
    
    change(status) {
      this.f({
        path: `work-shift/${this.id}/${status}`,
      });
      this.f({
        path: "work-shift",
      });
    },
  },
  computed: {
    ...mapState(["role", "errors"]),
  },
};
</script>