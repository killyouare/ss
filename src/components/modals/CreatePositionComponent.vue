<template>
  <form @submit.prevent>
    <h2>Добавление позиции</h2>
    <div>
      <label for="menu_id">Номер товара из меню</label>
      <select v-model="body.menu_id" id="menu_id">
        <option v-for="menu in data" :key="menu.id" :value="menu.id">
          {{ menu.name }} - {{ menu.price }}
        </option>
      </select>
    </div>
    <div>
      <label for="number_of_person">Количество</label>
      <input v-model="body.count" type="number" min="1" max="10" />
    </div>
    <div>
      <button @click="add" class="approve_button">Отправить</button>
      <button class="cancel_button" @click="clearModal">Отмена</button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: "",
      body: {
        menu_id: "",
        count: "",
      },
    };
  },
  methods: {
    ...mapActions(["f"]),
    ...mapMutations(["clearModal"]),
    async add() {
      await this.f({
        path: `order/${this.$route.params.id}/position`,
        method: "post",
        data: this.body,
      });
      if (this.getData) return this.clearModal();
      await this.f({ path: "menu" });
    },
  },
  async mounted() {
    await this.f({ path: "menu" });
  },
  computed: {
    ...mapGetters(["getData"]),
    ...mapState(["data", "errors"]),
  },
  destroy() {
    this.body = null;
    this.errors = null;
  },
};
</script>