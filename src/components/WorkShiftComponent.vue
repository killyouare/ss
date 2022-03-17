<template>
  <article>
    <Error v-if="errors" />
    <h2>Смена №{{ id }}</h2>
    <p>Начало смены в {{ start }}</p>
    <p>Конец смены в {{ end }}</p>
    <p :class="activese ? 'working' : 'fired'">
      Статус: {{ activese ? "Открыта" : "Закрыта" }}
    </p>
    <a
      :class="activese ? 'cancel_button' : 'approve_button'"
      @click.prevent="activese ? close() : open()"
      href="#"
      >{{ activese ? "Закрыть" : "Открыть" }}</a
    >
    <router-link
      class="approve_button"
      :to="{ name: 'orders', params: { id: id } }"
      >Управление</router-link
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
  methods: {
    async open() {
      this.errors = false;
      const res = await this.$store.dispatch("OpenShift", this.id);
      if (res) {
        return (this.activese = !this.activese);
      }
      return this.timeOut(2000);
    },
    async close() {
      const res = await this.$store.dispatch("CloseShift", this.id);
      if (res) {
        return (this.activese = !this.activese);
      }
      return this.timeOut(2000);
    },
    timeOut(timer) {
      this.errors = true;
      setTimeout(() => {
        this.errors = false;
      }, timer);
    },
  },
};
</script>