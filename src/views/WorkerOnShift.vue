<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
    </article>
    <User
      v-for="user in users"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :group="user.group"
      :status="
        workShift.users.findIndex((value) => {
          if (value.id == user.id) {
            return value;
          }
        }) == -1
          ? false
          : true
      "
    />
  </section>
</template>

<script>
import User from "../components/DetailWorkerOnShiftComponent";
export default {
  data() {
    return {
      users: [],
      workShift: [],
      error: false,
    };
  },
  components: { User },
  async mounted() {
    this.users = (await this.$store.dispatch("GetUsers")).filter((value) => {
      if (value.status != "fired") {
        return value;
      }
    });
    this.workShift = (
      await this.$store.dispatch("GetWokrerOnShift", this.$route.params.id)
    ).data;
  },
};
</script>