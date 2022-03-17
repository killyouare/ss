<template>
  <article>
    <Error v-if="errors" />
    <h2>Смена №{{ id }}</h2>
    <p>Начало смены в {{ start }}</p>
    <p>Конец смены в {{ end }}</p>
    <p :class="active ? 'working' : 'fired'">
      Статус: {{ active ? "Открыта" : "Закрыта" }}
    </p>
    <router-link
      class="approve_button"
      :to="{ name: 'WorkerOnShift', params: { id: id } }"
      >Добавить сотрудников</router-link
    >
  </article>
</template>

<script>
import Error from "./ErrorComponent";
export default {
  name: "WorkShiftComponent",
  props: ["id", "start", "end", "active"],
  components: { Error },
  data() {
    return {
      errors: false,
      activese: this.active,
    };
  },
  methods: {},
};
</script>