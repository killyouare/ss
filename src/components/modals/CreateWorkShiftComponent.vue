<template>
  <form @submit.prevent>
    <h2>Добавление смены</h2>
    <div>
      <label for="start">Начало</label>
      <input
        type="datetime-local"
        v-model="body.start"
        name="login"
        id="start"
      />
    </div>
    <div>
      <label for="end">Конец</label>
      <input
        type="datetime-local"
        v-model="body.end"
        name="password"
        id="end"
      />
    </div>
    <div>
      <button @click.prevent="createWorkShift" class="approve_button">
        Отправить
      </button>
      <button @click="$emit('open')" class="cancel_button">Отмена</button>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    body: {
      start: "",
      end: "",
    },
    errors: false,
  }),
  methods: {
    async createWorkShift() {
      const result = await this.$store.dispatch("CreateWorkShift", {
        start: this.body.start.replace("T", " "),
        end: this.body.end.replace("T", " "),
      });
      if (result) {
        this.$emit("add", {
          start: this.body.start.replace("T", " "),
          end: this.body.end.replace("T", " "),
          id: result.id,
        });
        return this.$emit("open");
      }
      this.errors = true;
    },
  },
  destroyed() {
    this.body = null;
    this.errors = null;
  },
};
</script>