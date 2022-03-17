<template>
  <article>
    <span>{{ name }}</span>
    <span :class="status">{{ status }}</span>
    <span>{{ group }}</span>
    <a v-if="status == 'working'" @click.prevent="$emit('dismiss')" href="#"
      >Уволить</a
    >
  </article>
</template>

<script>
export default {
  name: "DetailUserComponent",
  props: ["id", "name", "status", "group"],
};
</script>