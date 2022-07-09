import { createRouter, createWebHashHistory } from "vue-router";

import Game from "../views/Game.vue";
import About from "../views/About.vue";

const routes = [
  { name: "Game", path: "/", component: Game },
  { name: "About", path: "/about", component: About }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
