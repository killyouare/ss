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
      v-if="role == 'admin'"
      :class="activese ? 'cancel_button' : 'approve_button'"
      @click.prevent="activese ? close() : open()"
      href="#"
      >{{ activese ? "Закрыть" : "Открыть" }}</a
    >
    <router-link
      v-if="role == 'admin'"
      class="approve_button"
      :to="{ name: 'orders', params: { id: id } }"
      >Управление</router-link
    >
  </article>
</template>

<script>
import Error from "./modals/ErrorComponent";
export default {
  name: "WorkShiftComponent",
  props: ["id", "start", "end", "active"],
  components: { Error },
  data() {
    return {
      activese: this.active,
    };
  },
  methods: {
    async open() {
      const res = await this.$store.dispatch("OpenShift", this.id);
      if (res) {
        return (this.activese = !this.activese);
      }
    },
    async close() {
      const res = await this.$store.dispatch("CloseShift", this.id);
      if (res) {
        return (this.activese = !this.activese);
      }
    },
  },
  computed: {
    role() {
      return this.$store.getters.getRole;
    },
    token() {
      return this.$store.getters.getToken;
    },
    errors: () => this.$store.getters.getError,
  },
};
</script>