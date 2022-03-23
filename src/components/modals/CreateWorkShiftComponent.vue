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
      <button @click.prevent="clearModal" class="cancel_button">Отмена</button>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data: () => ({
    body: {},
  }),
  methods: {
    ...mapMutations(["clearModal"]),
    ...mapActions(["f"]),
    async createWorkShift() {
      await this.f({
        path: "work-shift",
        method: "post",
        data: {
          start: this.body.start?.replace("T", " "),
          end: this.body.end?.replace("T", " "),
        },
      });
      if (this.data) {
        this.f({
          path: "work-shift",
        });
        return this.clearModal();
      }
    },
  },
  computed: {
    ...mapState(["data"]),
  },
  destroyed() {
    this.body = null;
    this.errors = null;
  },
};
</script>