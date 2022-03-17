<template>
  <article>
    <span>{{ name }}</span>
    <span :class="activese">{{ activese ? "На смене" : "Вне смены" }}</span>
    <span>{{ group }}</span>
    <a @click.prevent="activese ? del(id) : add(id)" href="#">{{
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
    async add(id) {
      const res = await this.$store.dispatch("addUserToShift", {
        id: this.$route.params.id,
        user_id: id,
      });
      if (res) {
        return (this.activese = !this.activese);
      }
      return this.timeOut(2000);
    },
    async del(id) {
      const res = await this.$store.dispatch("delUserToShift", {
        id: this.$route.params.id,
        user_id: id,
      });
      if (res) {
        return (this.activese = !this.activese);
      }
      return this.timeOut(2000);
    },
    timeOut(timer) {
      setTimeout(() => {
        this.errors = false;
      }, timer);
    },
  },
};
</script>