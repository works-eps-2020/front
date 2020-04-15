import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Chats from "@/views/Chats.vue";
import Level from "@/views/Level.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: "/chats",
    name: "Chats",
    component: Chats
  },
  {
    path: "/level",
    name: "Cours",
    component: Level
  },
  {
    path: '/organizations/:id',
    name: 'organizations',
    component: () => import(/* webpackChunkName: "organization" */ '../views/Organization.vue'),
  },
  {
    path: '/',
    redirect: 'Home',
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
