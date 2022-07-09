import { createApp } from "vue";
import store from "./store";
import router from "./router";
import { doGETRequest } from "./utils/cors-anywhere.js";

import App from "./App.vue";
import SearchResult from "./components/SearchResult";

import "./assets/app.css";

const app = createApp(App);
app.use(store);
app.use(router);

app.provide("doGETRequest", doGETRequest);
app.component("SearchResult", SearchResult);
app.mount("#app");
