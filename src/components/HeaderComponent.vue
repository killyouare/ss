<template>
  <header>
    <article>
      <img src="../assets/img/logo.png" alt="logo" />
    </article>
    <nav>
      <a
        v-if="!token"
        @click.prevent="modal('login')"
        href="#"
        class="approve_button"
      >
        Вход</a
      >
      <router-link v-if="role == 'admin'" to="/workers">Сотрудники</router-link>
      <router-link v-if="role == 'admin'" to="/shifts">Смены</router-link>
      <router-link v-if="role == 'waiter' || role == 'cook'" to="/orders"
        >Заказы</router-link
      >
      <a v-if="token" @click.prevent="logout" href="#" class="cancel_button"
        >Выход</a
      >
    </nav>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "NavigationComponent",
  methods: {
    ...mapMutations({
      modal: "setModal",
      clearUser: "clearUser",
    }),
    ...mapActions(["f"]),
    ...mapGetters([]),
    async logout() {
      await this.f({
        path: "logout",
      });
      localStorage.clear();
      this.clearUser();
      this.$router.push({ name: "Home" }).catch((err) => err);
    },
  },
  async mounted() {
    await this.$store.dispatch("CheckUser");
  },
  computed: {
    role() {
      return this.$store.getters.getRole;
    },
    token() {
      return this.$store.getters.getToken;
    },
  },
};
</script>
