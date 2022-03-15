<template>
  <article class="modal">
    <form @submit.prevent>
      <h2>Авторизация</h2>
      <div>
        <label for="login_enter">Логин</label>
        <input type="text" v-model="login" id="login_enter" />
      </div>
      <div>
        <label for="password_enter">Пароль</label>
        <input type="password" v-model="password" id="password_enter" />
      </div>
      <div>
        <button @click="authenticate" class="approve_button">Отправить</button>
        <button @click="authenticate" class="cancel_button">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  data: () => ({
    login: "",
    password: "",
  }),
  methods: {
    async authenticate() {
      const body = {
        login: this.login,
        password: this.password,
      };
      console.log(body);
    },
  },
};
</script>