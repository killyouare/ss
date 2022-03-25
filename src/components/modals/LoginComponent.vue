<template>
  <form @submit.prevent>
    <h2>Авторизация</h2>
    <div>
      <label for="login_enter">Логин</label>
      <input type="text" v-model="body.login" id="login_enter" />
    </div>
    <div>
      <label for="password_enter">Пароль</label>
      <input type="password" v-model="body.password" id="password_enter" />
    </div>
    <div>
      <button @click="authenticate" class="approve_button">Отправить</button>
      <button @click="clearModal" class="cancel_button">Отмена</button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "LoginComponent",
  data: () => ({
    body: {},
  }),
  methods: {
    ...mapMutations(["clearModal", "setToken"]),
    ...mapActions(["getUserRole", "f"]),
    async authenticate() {
      await this.f({
        path: "login",
        method: "post",
        data: this.body,
        useToken: false,
      });
      if (this.data) {
        this.setToken(this.getData.user_token);
        this.getUserRole();
        return this.clearModal();
      }
    },
  },
  computed: {
    ...mapGetters(["getData"]),
    ...mapState(["data", "modal"]),
  },
};
</script>