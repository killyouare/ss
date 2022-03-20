<template>
  <div id="app">
    <Modal v-if="modal" />
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Modal from "./components/ModalComponent";
export default {
  components: { HeaderComponent, FooterComponent, Modal },
  name: "app",
  computed: {
    modal() {
      return this.$store.getters.getModal;
    },
  },
};
</script>
