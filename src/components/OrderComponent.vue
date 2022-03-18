<template>
  <article>
    <Error v-if="errors" />
    <h2>{{ table }}</h2>
    <p>Официант: {{ shift_workers }}</p>
    <p>Статус: {{ statused }}</p>
    <p>Цена: {{ price }}</p>
    <label for="status">Статус</label>
    <select
      v-if="
        (userRole == 'waiter' &&
          (statused == 'Принят' || statused == 'Готов')) ||
        (userRole == 'cock' &&
          (statused == 'Принят' || statused == 'Готовится'))
      "
      @change="change"
      v-model="body.status"
      name="status"
      id="status"
    >
      <option value="nothing" selected disabled>Выберите статус:</option>
      <option
        v-if="userRole == 'cook' && statused == 'Принят'"
        value="preparing"
      >
        Готовится
      </option>
      <option
        v-if="userRole == 'cook' && statused == 'Готовится'"
        value="ready"
      >
        Готов
      </option>
      <option
        v-if="userRole == 'waiter' && statused == 'Принят'"
        value="canceled"
      >
        Отменен
      </option>
      <option
        v-if="userRole == 'waiter' && statused == 'Готов'"
        value="paid-up"
      >
        Оплачен
      </option>
    </select>
    <router-link
      class="approve_button"
      :to="{ name: 'OneOrder', params: { id: id } }"
      >Подробнее</router-link
    >
  </article>
</template>

<script>
import Error from "./ErrorComponent";
export default {
  name: "OrderComponent",
  props: ["id", "table", "price", "status", "shift_workers", "userRole"],
  data() {
    return {
      statused: this.status,
      statuses: {
        preparing: "Готовится",
        ready: "Готов",
        "paid-up": "Оплачен",
        canceled: "Отменен",
      },
      errors: false,
      body: { id: this.id, status: "nothing" },
    };
  },
  components: { Error },
  methods: {
    async change() {
      const message = await this.$store.dispatch("changeStatus", this.body);
      console.log(message.data);
      if (message.data)
        return (this.statused = this.statuses[this.body.status]);
      this.errors = true;
    },
  },
};
</script>