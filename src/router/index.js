import Vue from "vue";
import VueRouter from "vue-router";
import WorkersView from "../views/WorkersView";
import WorkerView from "../views/WorkerView";
import OrderView from "../views/OrderView";
import WorkShiftView from "../views/WorkShiftView";
import WorkerOnShift from "../views/WorkerOnShift";
import DetailOrder from "../views/DetailOrderView";
import Home from "../views/HomeView";

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
  {
    path: "/shifts/:id/workers",
    name: "WorkerOnShift",
    component: WorkerOnShift,
  },
  {
    path: "/orders",
    name: "OrdersWaiter",
    component: OrderView,
  },
  {
    path: "/order/:id",
    name: "OneOrder",
    component: DetailOrder,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
