<template>
  <article>
    <Error v-if="errors" />
    <h2>Номер: {{ id }}</h2>
    <p>Позиция: {{ position }}</p>
    <p>Количество: {{ count }}</p>
    <p>Цена: {{ price }}</p>
    <a
      v-if="status == 'Принят'"
      class="cancel_button"
      @click.prevent="del"
      
      >Удалить</a
    >
  </article>
</template>

<script>
export default {
  name: "DetailOrdersComponent",
  props: ["id", "position", "count", "price", "status"],
  data() {
    return {
      errors: false,
    };
  },
  methods: {
    async del() {
      this.errors = false;
      const res = await this.$store.dispatch("delPosition", {
        order_id: this.$route.params.id,
        position_id: this.id,
      });
      console.log(res);
      if (res.data) return this.$emit("del", this.id);
      this.errors = true;
    },
  },
};
</script>