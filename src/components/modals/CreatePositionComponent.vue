<template>
  <form @submit.prevent>
    <h2>Добавление позиции</h2>
    <div>
      <label for="menu_id">Номер товара из меню</label>
      <select v-model="body.menu_id" id="menu_id">
        <option v-for="menu in menus" :key="menu.id" :value="menu.id">
          {{ menu.name }} - {{ menu.price }}
        </option>
      </select>
    </div>
    <div>
      <label for="number_of_person">Количество</label>
      <input
        v-model="body.count"
        type="number"
        min="1"
        max="10"
        id="number_of_person"
      />
    </div>
    <div>
      <button @click="add" class="approve_button">Отправить</button>
      <button class="cancel_button" @click="$emit('open')">Отмена</button>
    </div>
  </form>
</template>

<script>
export default {
  props: ["users", "id"],
  data() {
    return {
      body: {
        menu_id: "",
        count: "",
      },
      menus: [],
      errors: false,
    };
  },
  methods: {
    async add() {
      this.errors = false;
      const message = (await this.$store.dispatch("createPosition", this.body))
        .data;
      if (message) {
        this.$emit("add", message);
        return this.$emit("open");
      }
      this.errors = true;
    },
  },
  async mounted() {
    this.menus = await this.$store.dispatch("getMenu");
    this.body.id = this.$route.params.id;
  },
  destroy() {
    this.body = null;
    this.errors = null;
  },
};
</script>