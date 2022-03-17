<template>
  <section class="employees">
    <Modal v-if="openModal" @open="OpenModal" />
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
      :error="error"
      @create="Create($event)"
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
    async OpenModal() {
      this.openModal = !this.openModal;
    },
    async Create(body) {
      const photo = document.querySelector('input[type="file"]').files[0];
      if (photo) body.photo_file = photo;
      const message = await this.$store.dispatch("CreateUser", body);
      if (message) return this.OpenModal();
      this.errors = true;
    },
  },
  async updated() {
    this.users = await this.$store.dispatch("GetUsers");
  },
};
</script>