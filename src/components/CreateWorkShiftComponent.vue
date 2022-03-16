<template>
  <article class="modal">
    <form @submit.prevent>
      <h2>Добавление смены</h2>
      <div>
        <label for="start">Начало</label>
        <input type="datetime-local" v-model="start" name="login" id="start" />
      </div>
      <div>
        <label for="end">Конец</label>
        <input type="datetime-local" v-model="end" name="password" id="end" />
      </div>
      <div>
        <button class="approve_button">Отправить</button>
        <button class="cancel_button">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  data: () => ({
    start: "",
    end: "",
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