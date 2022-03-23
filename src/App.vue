<template>
  <div id="app">
    <Modal v-if="modal" />
    <HeaderComponent />
    <Error v-if="errors" />
    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Modal from "./components/ModalComponent";
import Error from "./components/ErrorComponent";
export default {
  components: { HeaderComponent, FooterComponent, Modal, Error },
  name: "app",
  computed: {
    ...mapState(["modal", "errors"]),
  },
};
</script>
