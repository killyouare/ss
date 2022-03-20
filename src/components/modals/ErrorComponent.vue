<template>
  <div class="error">
    {{ errors.message }}
    <div v-if="errors.errors">
      <div v-for="(error, index) in errors.errors" :key="index">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ErrorComponent",
  methods: {
    ...mapMutations({
      clear: "clearErrors",
    }),
  },
  mounted() {
    setTimeout(() => this.clear(), 3000);
  },
  computed: {
    errors() {
      return this.$store.getters.getErrors;
    },
  },
};
</script>