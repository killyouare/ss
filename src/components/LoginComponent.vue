<template>
  <article class="modal">
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
        <button @click="$emit('open')" class="cancel_button">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  data: () => ({
    body: {
      login: "",
      password: "",
    },
    errors: [],
  }),
  methods: {
    async authenticate() {
      await this.$store.dispatch("Login", this.body);
      const token = this.$store.getters.getToken;
      console.log(token);
      if (token) return this.restore();
    },
    restore() {
      this.$emit("open");
      this.body.login = "";
      this.body.password = "";
    },
  },
};
</script>