import Vue from "vue";
import VueRouter from "vue-router";
import WorkersView from "../views/WorkersView.vue";
import WorkerView from "../views/WorkerView.vue";
import OrderView from "../views/OrderView.vue";
import WorkShiftView from "../views/WorkShiftView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/workers",
    name: "workers",
    component: WorkersView,
  },
  {
    path: "/worker/:id",
    name: "worker",
    component: WorkerView,
  },
  {
    path: "/shifts",
    name: "shifts",
    component: WorkShiftView,
  },
  {
    path: "/shifts/:id",
    name: "orders",
    component: OrderView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
