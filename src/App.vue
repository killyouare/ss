<template>
  <div id="app">
    <Modal v-if="openModal" @open="OpenModal" />
    <HeaderComponent @open="OpenModal" />

    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Modal from "./components/LoginComponent";
export default {
  components: { HeaderComponent, FooterComponent, Modal },
  name: "app",
  data() {
    return {
      openModal: false,
    };
  },
  methods: {
    OpenModal() {
      this.openModal = !this.openModal;
    },
  },
};
</script>
