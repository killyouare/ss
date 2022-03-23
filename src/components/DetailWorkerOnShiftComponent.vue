<template>
  <article>
    <span>{{ name }}</span>
    <span :class="activese">{{ activese ? "На смене" : "Вне смены" }}</span>
    <span>{{ group }}</span>
    <a @click.prevent="activese ? del(id) : add(id)">{{
      activese ? "Убрать" : "Добавить"
    }}</a>
  </article>
</template>
<script>
export default {
  name: "DetailUserComponent",
  props: ["id", "name", "status", "group"],
  data() {
    return {
      activese: this.status,
    };
  },
  methods: {
    timeOut(timer) {
      setTimeout(() => {
        this.errors = false;
      }, timer);
    },
  },
};
</script>