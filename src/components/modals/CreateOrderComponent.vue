<template>
  <form @submit.prevent>
    <h2>Добавление заказа</h2>
    <div>
      <label for="table_id">Номер столика</label>
      <select v-model="body.table_id" id="table_id">
        <option value="nothing" selected disabled>Выберите столик</option>
        <option v-for="table in data" :key="table.id" :value="table.id">
          {{ table.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="number_of_person">Количество персон</label>
      <input
        v-model="body.number_of_person"
        type="number"
        name="password"
        id="number_of_person"
        min="1"
        :max="
          body.table_id != 'nothing'
            ? data
              ? data.find((value) => {
                  if (value.id === this.body.table_id) return value;
                }).capacity
              : 3
            : 3
        "
      />
    </div>
    <div>
      <button @click="add" class="approve_button">Отправить</button>
      <button class="cancel_button" @click="clearModal">Отмена</button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      orderId: "",
      body: {
        table_id: "nothing",
      },
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
          work_shift_id: this.orderId,
          table_id: this.body.table_id,
          number_of_person: this.body.number_of_person,
        },
      });
      if (this.getData) {
        await this.f({ path: "work-shift/active/get" });

        return this.clearModal();
      }
      this.f({ path: "table" });
    },
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters(["getData"]),
  },
  mounted() {
    this.orderId = this.data.data.id;
    this.f({ path: "table" });
  },
  async destroyed() {
    this.f({ path: `work-shift/${this.getData.id}/order` });
  },
};
</script>