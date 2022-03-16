<template>
  <article>
    <h2>Смена №{{ id }}</h2>
    <p>Начало смены в {{ start }}</p>
    <p>Конец смены в {{ end }}</p>
    <p :class="active ? 'working' : 'fired'">
      Статус: {{ active ? "Открыта" : "Закрыта" }}
    </p>
    <router-link
      class="approve_button"
      :to="{ name: 'orders', params: { id: id } }"
      >Управление</router-link
    >
  </article>
</template>

<script>
export default {
  name: "WorkShiftComponent",
  props: ["id", "start", "end", "active"],
};
</script>