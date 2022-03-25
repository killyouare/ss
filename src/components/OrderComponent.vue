<template>
  <article>
    <h2>{{ table }}</h2>
    <p>Официант: {{ shift_workers }}</p>
    <p>Статус: {{ status }}</p>
    <p>Цена: {{ price }}</p>
    <Select
      v-if="
        (about &&
          role == 'waiter' &&
          (status == 'Принят' || status == 'Готов')) ||
        (role == 'cook' && (status == 'Принят' || status == 'Готовится'))
      "
      :role="role"
      :status="status"
      :id="id"
    />

    <router-link
      v-if="about && role != 'cook'"
      class="approve_button"
      :to="{ name: 'OneOrder', params: { id: id } }"
      >Подробнее</router-link
    >
    <a
      v-if="
        (status == 'Принят') | (status == 'Готовится') &&
        role == 'waiter' &&
        addOrder
      "
      class="approve_button"
      @click.prevent="setModal('position')"
      >Добавить заказ</a
    >
  </article>
</template>

<script>
import Select from "./SelectComponent";
import { mapState, mapMutations } from "vuex";
export default {
  name: "OrderComponent",
  props: [
    "id",
    "table",
    "price",
    "status",
    "shift_workers",
    "addOrder",
    "about",
  ],
  components: { Select },
  methods: {
    ...mapMutations(["setModal"]),
  },
  computed: {
    ...mapState(["role"]),
  },
};
</script>