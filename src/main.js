import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./assets/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import store from "./store";
import router from "./router";

// Setup FA5 icons
library.add(faSearch);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");
