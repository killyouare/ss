<template>
  <form>
    <label for="status">Статус</label>
    <select @change="change" v-model="body.status" name="status" id="status">
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
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectComponent",
  data() {
    return {
      statuses: {
        preparing: "Готовится",
        ready: "Готов",
        "paid-up": "Оплачен",
        canceled: "Отменен",
      },
      body: { status: "nothing" },
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
        if (this.role == "cook")
          return this.f({
            path: `order/taken/get`,
          });
        await this.f({ path: "work-shift/active/get" });
        return await this.f({ path: `work-shift/${this.getData.id}/order` });
      }
    },
  },
  computed: { ...mapGetters(["getData"]) },
  props: ["status", "role", "id"],
};
</script>