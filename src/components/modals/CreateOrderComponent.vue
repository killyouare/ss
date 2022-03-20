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
        work_shift_id: this.id,
        table_id: "",
        number_of_person: "",
      },
      errors: false,
    };
  },
  methods: {
    async add() {
      this.errors = false;
      const message = (await this.$store.dispatch("createOrder", this.body))
        .data;
      if (message) {
        this.$emit("add", {
          id: message.id,
          table: message.table,
          shift_workers: message.shift_workers,
          status: message.status,
          price: message.price,
        });
        return this.$emit("open");
      }
      this.errors = true;
    },
  },
  destroy() {
    this.body = null;
    this.errors = null;
  },
};
</script>