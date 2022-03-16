<template>
  <article>
    <span>{{ name }}</span>
    <span :class="status">{{ status }}</span>
    <span>{{ group }}</span>
    <router-link :to="{ name: 'worker', params: { id: id } }"
      >Подробнее</router-link
    >
  </article>
</template>

<script>
export default {
  name: "WorkerComponent",
  props: ["id", "name", "status", "group"],
};
</script>