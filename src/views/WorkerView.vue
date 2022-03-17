<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
    </article>
    <User
      :id="user.id"
      :name="
        user.surname
          ? user.patronymic
            ? `${user.surname} ${user.name} ${user.patronymic}`
            : `${user.surname} ${user.name}`
          : user.name
      "
      :group="user.group"
      :status="user.status"
      @dismiss="dismiss"
    />
  </section>
</template>

<script>
import User from "../components/DetailUserComponent";
export default {
  data() {
    return {
      user: [],
    };
  },
  components: { User },

  async mounted() {
    this.user = await this.$store.dispatch("GetUser", this.$route.params.id);
    console.log(this.user);
  },
  methods: {
    dismiss: async function () {
      await this.$store.dispatch("dismiss", this.$route.params.id);
      this.user.status = "fired";
    },
  },
};
</script>