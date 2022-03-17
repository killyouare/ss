<template>
  <div class="error">
    {{ map.get("message") }}
    <div v-if="map.get('errors')">
      <div v-for="(error, index) in map.get('errors')" :key="index">
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
  destroyed() {
    this.map = "";
  },
};
</script>