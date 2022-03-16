<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
      <router-link to="addWorker">+</router-link>
    </article>
    <User
      v-for="user in users"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :group="user.group"
      :status="user.status"
    />
  </section>
</template>

<script>
import User from "../components/WorkerComponent";
export default {
  data() {
    return {
      users: [],
    };
  },
  components: { User },
  async mounted() {
    this.users = await this.$store.dispatch("GetUsers");
  },
};
</script>