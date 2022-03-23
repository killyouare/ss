import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

window.onerror = function (message) {
  console.log('ONE ERROR HANDLER TO RULE THEM ALL:', message);
}

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.config.errorHandler = function (err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
