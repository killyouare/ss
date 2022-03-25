<template>
  <header>
    <article>
      <img src="../assets/img/logo.png" alt="logo" />
    </article>
    <nav>
      <a v-if="!token" @click.prevent="modal('login')" class="approve_button">
        Вход</a
      >
      <router-link v-if="role == 'admin'" to="/workers">Сотрудники</router-link>
      <router-link v-if="role == 'admin'" to="/shifts">Смены</router-link>
      <router-link v-if="role == 'waiter' || role == 'cook'" to="/orders"
        >Заказы</router-link
      >
      <a v-if="token" @click.prevent="logout" class="cancel_button">Выход</a>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "NavigationComponent",
  methods: {
    ...mapMutations({
      modal: "setModal",
      clearUser: "clearUser",
    }),
    ...mapActions(["f", "CheckUser"]),
    async logout() {
      await this.f({
        path: "logout",
      });
      this.clearUser();
      this.$router.push({ name: "home" }).catch((err) => err);
    },
  },
  async mounted() {
    await this.CheckUser();
  },
  computed: {
    ...mapState(["role", "token"]),
  },
};
</script>
