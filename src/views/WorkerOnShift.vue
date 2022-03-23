<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
    </article>
    <User
      v-for="user in users.filter((value) => {
        if (value.status == 'working') return value;
      })"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :group="user.group"
      :status="
        getData.users.findIndex((value) => {
          if (value.id == user.id) return value;
        }) == -1
          ? false
          : true
      "
      :ws="true"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import User from "../components/WorkerComponent";
export default {
  data() {
    return {
      users: [],
    };
  },
  components: { User },
  async mounted() {
    await this.f({ path: "user" });
    this.users = this.getData;
    await this.f({ path: `work-shift/${this.$route.params.id}` });
  },
  methods: {
    ...mapActions(["f"]),
  },
  computed: {
    ...mapState([""]),
    ...mapGetters(["getData"]),
  },
};
</script>