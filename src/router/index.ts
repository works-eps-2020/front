import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Level from "@/views/Level.vue";
import Messages from "@/views/Messages.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages
  },
  {
    path: "/level",
    name: "Cours",
    component: Level
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
