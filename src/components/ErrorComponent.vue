<template>
  <div class="error">
    {{ map.get("message") }}
    <div v-if="map.get('errors')">
      <div v-for="error in map.get('errors')" :key="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    map: "",
  }),
  mounted() {
    this.map = this.$store.getters.getErrors;
  },
};
</script>