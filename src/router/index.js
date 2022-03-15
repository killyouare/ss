import Vue from "vue";
import VueRouter from "vue-router";
import WorkerView from "../views/WorkerView.vue";
import OrderView from "../views/OrderView.vue";
import WorkShiftView from "../views/WorkShiftView.vue";
import LoginComponent from "../components/LoginComponent.vue";
import WorkerComponent from "../components/WorkerComponent.vue";
import WorkShiftComponent from "../components/WorkShiftComponent.vue";
import OrderComponent from "../components/OrderComponent.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/workers",
    name: "workers",
    component: WorkerView,
  },
  {
    path: "/shifts",
    name: "shifts",
    component: WorkShiftView,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrderView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
  },
  {
    path: "/addWorker",
    name: "addWorker",
    component: WorkerComponent,
  },
  {
    path: "/addWorkShift",
    name: "addWorkShift",
    component: WorkShiftComponent,
  },
  {
    path: "/addOrder",
    name: "addOrder",
    component: OrderComponent,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
