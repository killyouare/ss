<template>
  <article class="modal">
    <Error v-if="errors" />
    <form @submit.prevent>
      <h2>Добавление нового сотрудника</h2>
      <div>
        <label for="name">Имя</label>
        <input type="text" v-model="body.name" name="name" id="name" />
      </div>
      <div>
        <label required for="login">Логин</label>
        <input type="text" v-model="body.login" name="login" id="login" />
      </div>
      <div>
        <label required for="password">Пароль</label>
        <input
          type="password"
          v-model="body.password"
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
        <select required v-model="body.role_id" name="role" id="role">
          <option value="nothing" selected disabled>Выберите роль:</option>
          <option value="1">Администратор</option>
          <option value="2">Официант</option>
          <option value="3">Повар</option>
        </select>
      </div>
      <div>
        <button @click="$emit('create')" class="approve_button">
          Отправить
        </button>
        <button @click="$emit('open')" class="cancel_button">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
import Error from "./ErrorComponent";

export default {
  data: () => ({
    body: { login: "", name: "", password: "", role: "" },
    errors: false,
  }),
  methods: {},
  destroyed() {
    this.body = "";
    this.errors = "";
  },
  components: { Error },
};
</script>