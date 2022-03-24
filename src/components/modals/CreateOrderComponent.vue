<template>
  <form @submit.prevent>
    <h2>Добавление заказа</h2>
    <div>
      <label for="table_id">Номер столика</label>
      <input
        v-model="body.table_id"
        type="number"
        name="password"
        id="table_id"
        min="1"
        max="8"
      />
    </div>
    <div>
      <label for="number_of_person">Количество персон</label>
      <input
        v-model="body.number_of_person"
        type="number"
        name="password"
        id="number_of_person"
      />
    </div>
    <div>
      <button @click="add" class="approve_button">Отправить</button>
      <button class="cancel_button" @click="clearModal">Отмена</button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      body: {},
    };
  },
  methods: {
    ...mapActions(["f"]),
    ...mapMutations(["clearModal"]),
    async add() {
      await this.f({
        path: "order",
        method: "post",
        data: {
          work_shift_id: this.getData.id,
          table_id: this.body.table_id,
          number_of_person: this.body.number_of_person,
        },
      });
      if (this.getData) {
        await this.f({ path: "work-shift/active/get" });
        await this.f({ path: `work-shift/${this.getData.id}/order` });
        return this.clearModal();
      }
    },
  },
  computed: {
    ...mapGetters(["getData"]),
  },
};
</script>