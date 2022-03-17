<template>
  <article>
    <h2>{{ table }}</h2>
    <p>Официант: {{ shift_workers }}</p>
    <p>Статус: {{ status }}</p>
    <p>Цена: {{ price }}</p>
  </article>
</template>

<script>
export default {
  name: "OrderComponent",
  props: ["id", "table", "price", "status", "shift_workers"],
};
</script>