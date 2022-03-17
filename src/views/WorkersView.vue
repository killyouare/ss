<template>
  <section class="employees">
    <Modal v-if="openModal" @open="OpenModal" @add="add" />
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
      <a @click.prevent="OpenModal">+</a>
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
import Modal from "../components/CreateWorkerComponent";
export default {
  data() {
    return {
      users: [],
      openModal: false,
      error: false,
    };
  },
  components: { User, Modal },
  async mounted() {
    this.users = await this.$store.dispatch("GetUsers");
  },
  methods: {
    add(body) {
      console.log(body);
      this.users.push(body);
    },
    OpenModal() {
      this.openModal = !this.openModal;
    },
  },
};
</script>