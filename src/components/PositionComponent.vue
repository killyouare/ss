<template>
  <article>
    <h2>Номер: {{ id }}</h2>
    <p>Позиция: {{ position }}</p>
    <p>Количество: {{ count }}</p>
    <p>Цена: {{ price }}</p>
    <a v-if="status == 'Принят'" class="cancel_button" @click.prevent="del"
      >Удалить</a
    >
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DetailOrdersComponent",
  props: ["id", "position", "count", "price", "status"],
  methods: {
    ...mapActions(["f"]),
    async del() {
      this.f({
        path: `order/${this.$route.params.id}/position/${this.id}`,
        method: "delete",
      });
    },
  },
  computed: {
    ...mapGetters(["getData"]),
  },
};
</script>