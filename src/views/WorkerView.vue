<template>
  <section class="employees">
    <article>
      <span>Имя</span>
      <span>Статус</span>
      <span>Должность</span>
    </article>
    <Worker
      :id="getData.id"
      :name="
        getData.surname
          ? getData.patronymic
            ? `${getData.surname} ${getData.name} ${getData.patronymic}`
            : `${getData.surname} ${getData.name}`
          : getData.name
      "
      :group="getData.group"
      :status="getData.status"
      :dismiss="true"
    />
  </section>
</template>

<script>
import Worker from "../components/WorkerComponent";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Worker },

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