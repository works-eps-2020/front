import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Chats from "@/views/Chats.vue";
import Level from "@/views/Level.vue";
import Chat from "@/views/Chat.vue";
import Topic from "@/views/Topic.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
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
    path: "/topic",
    name: "Matière",
    component: Topic
  },
  {
    path: "/organizations/:id",
    name: "organization",
    component: () => import(/* webpackChunkName: "organization" */ "../views/Organization.vue")
  },
  {
    path: "/organizations",
    name: "organizations",
    component: () => import(/* webpackChunkName: "organization" */ "../views/Organizations.vue")
  },
  {
    path: "/",
    redirect: "Home"
  },
  {
    path: "/chat/:chat_id",
    name: "Chat",
    component: Chat
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
