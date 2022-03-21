<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
    </article>
    <User
      :id="getData.data.id"
      :name="
        getData.data.surname
          ? getData.data.patronymic
            ? `${getData.data.surname} ${getData.data.name} ${getData.data.patronymic}`
            : `${getData.data.surname} ${getData.data.name}`
          : getData.data.name
      "
      :group="getData.data.group"
      :status="getData.data.status"
      :dismiss="true"
    />
  </section>
</template>

<script>
import User from "../components/WorkerComponent";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { User },

  mounted() {
    this.f({
      path: `user/${this.$route.params.id}`,
    });
  },
  methods: {
    ...mapActions(["f"]),
  },
  computed: {
    ...mapGetters(["getData"]),
  },
};
</script>