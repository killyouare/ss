<template>
  <article>
    <h2>Смена №{{ id }}</h2>
    <p>Начало смены в {{ start }}</p>
    <p>Конец смены в {{ end }}</p>
    <p :class="active ? 'working' : 'fired'">
      Статус: {{ active ? "Открыта" : "Закрыта" }}
    </p>
    <a class="approve_button" v-if="order" @click.prevent="$emit('open')"
      >Добавить смену</a
    >
  </article>
</template>

<script>
export default {
  name: "WorkShiftComponent",
  props: ["id", "start", "end", "active", "order"],
};
</script>