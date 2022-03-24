<template>
  <article>
    <h2>{{ table }}</h2>
    <p>Официант: {{ shift_workers }}</p>
    <p>Статус: {{ status }}</p>
    <p>Цена: {{ price }}</p>
    <label
      v-if="
        (role == 'waiter' && (status == 'Принят' || status == 'Готов')) ||
        (role == 'cook' && (status == 'Принят' || status == 'Готовится'))
      "
      for="status"
      >Статус</label
    >
    <select
      v-if="
        (role == 'waiter' && (status == 'Принят' || status == 'Готов')) ||
        (role == 'cook' && (status == 'Принят' || status == 'Готовится'))
      "
      @change="change"
      v-model="body.status"
      name="status"
      id="status"
    >
      <option value="nothing" selected disabled>Выберите статус:</option>
      <option v-if="role == 'cook' && status == 'Принят'" value="preparing">
        Готовится
      </option>
      <option v-if="role == 'cook' && status == 'Готовится'" value="ready">
        Готов
      </option>
      <option v-if="role == 'waiter' && status == 'Принят'" value="canceled">
        Отменен
      </option>
      <option v-if="role == 'waiter' && status == 'Готов'" value="paid-up">
        Оплачен
      </option>
    </select>
    <router-link
      class="approve_button"
      :to="{ name: 'OneOrder', params: { id: id } }"
      >Подробнее</router-link
    >
    <a
      v-if="role == 'waiter' && (status == 'Принят') | (status == 'Готовится')"
      class="approve_button"
      @click.prevent=""
      >Добавить заказ</a
    >
  </article>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "OrderComponent",
  props: [
    "id",
    "table",
    "price",
    "status",
    "shift_workers",
    "addOptions",
    "addOrder",
  ],
  data() {
    return {
      statuses: {
        preparing: "Готовится",
        ready: "Готов",
        "paid-up": "Оплачен",
        canceled: "Отменен",
      },
      body: { id: this.id, status: "nothing" },
    };
  },
  methods: {
    ...mapActions(["f"]),
    async change() {
      await this.f({
        path: `order/${this.id}/change-status`,
        method: "patch",
        data: { status: this.body.status },
      });
      if (this.getData) {
        await this.f({ path: "work-shift/active/get" });
        return this.f({ path: `work-shift/${this.getData.id}/order` });
      }
    },
  },
  computed: {
    ...mapState(["role"]),
    ...mapGetters(["getData"]),
  },
};
</script>