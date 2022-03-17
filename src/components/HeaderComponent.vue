<template>
  <header>
    <article>
      <img src="../assets/img/logo.png" alt="logo" />
    </article>
    <nav>
      <a
        v-if="!token"
        @click.prevent="$emit('open')"
        href="#"
        class="approve_button"
      >
        Вход</a
      >
      <router-link v-if="role == 'admin'" to="/workers">Сотрудники</router-link>
      <router-link v-if="role == 'admin'" to="/shifts">Смены</router-link>
      <router-link v-if="role == 'admin'" to="/orders">Заказы</router-link>
      <a v-if="token" @click.prevent="logout" href="#" class="cancel_button"
        >Выход</a
      >
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavigationComponent",
  data() {
    return {
      token: "",
      role: "",
    };
  },
  methods: {
    setToken(token) {
      this.token = token;
    },
    setRole(role) {
      this.token = role;
    },
    async logout() {
      await this.$store.dispatch("Logout", this.$store.getters.getToken);
      this.setToken("");
      this.setRole("");
      this.$router.push("/");
    },
  },
  async mounted() {
    const { token, role } = await this.$store.dispatch("CheckUser");
    this.token = token;
    this.role = role;
  },
};
</script>
