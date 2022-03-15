<template>
  <article class="modal">
    <form @submit.prevent>
      <h2>Добавление нового сотрудника</h2>
      <div>
        <label for="name">Имя</label>
        <input type="text" v-model="name" name="name" id="name" />
      </div>
      <div>
        <label for="login">Логин</label>
        <input type="text" v-model="login" name="login" id="login" />
      </div>
      <div>
        <label for="password">Пароль</label>
        <input
          type="password"
          v-model="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <label for="photo_file" class="photo_input">Фото</label>
        <input type="file" name="photo" id="photo_file" />
      </div>
      <div>
        <label for="role">Роль</label>
        <select v-model="role" name="role" id="role">
          <option value="nothing" selected disabled>Выберите роль:</option>
          <option value="1">Администратор</option>
          <option value="2">Официант</option>
          <option value="3">Повар</option>
        </select>
      </div>
      <div>
        <button @click="authenticate" class="approve_button">Отправить</button>
        <button class="cancel_button">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  data: () => ({
    login: "",
    name: "",
    password: "",
    role: "",
    photofile: "",
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