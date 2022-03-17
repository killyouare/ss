<template>
  <header>
    <article>
      <img src="../assets/img/logo.png" alt="logo" />
    </article>
    <nav>
      <router-link to="/workers">Сотрудники</router-link>
      <router-link to="/shifts">Смены</router-link>
      <router-link to="/orders">Заказы</router-link>
      <a @click.prevent="$emit('open')" href="#" class="approve_button">
        Вход</a
      >
      <a @click.prevent="logout" href="#" class="cancel_button">Выход</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavigationComponent",
  methods: {
    async logout() {
      await this.$store.dispatch("Logout", this.$store.getters.getToken);
      this.$router.push("/");
    },
  },
  async mounted() {
    await this.$store.dispatch("CheckUser");
  },
};
</script>
