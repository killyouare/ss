<template>
  <article>
    <h2>{{ table }}</h2>
    <p>Официант: {{ shift_workers }}</p>
    <p :class="active ? 'working' : 'fired'">
      Статус: {{ active ? "Открыта" : "Закрыта" }}
    </p>
    <p>Цена: {{ price }}</p>
    <button class="approve_button">Управление</button>
  </article>
</template>

<script>
export default {
  name: "OrderComponent",
  props: ["id", "table", "price", "status", "shift_workers"],
};
</script>