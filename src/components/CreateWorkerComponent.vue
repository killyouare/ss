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
        <button @click.prevent="create" class="approve_button">
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
    body: { login: "", name: "", password: "", role_id: "" },
    roles: ["Администратор", "Официант", "Повар"],
    errors: false,
  }),
  methods: {
    async create() {
      this.errors = false;
      const photo = document.querySelector('input[type="file"]').files[0];
      if (photo) this.body.photo_file = photo;
      const message = await this.$store.dispatch("CreateUser", this.body);
      if (message) {
        this.$emit("add", {
          login: this.body.login,
          group: this.roles[this.body.role_id - 1],
          name: this.body.name,
          status: "working",
        });
        return this.$emit("open");
      }
      this.errors = true;
    },
  },

  destroyed() {
    this.body = null;
    this.roles = null;
    this.errors = null;
  },
  components: { Error },
};
</script>