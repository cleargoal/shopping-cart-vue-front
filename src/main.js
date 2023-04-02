import { createApp } from "vue";
import PrimeVue from "primevue/config";

import router from "./router";

import App from "./App.vue";
import "./index.css";

import "./assets/main.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// import "@tailwindcss/forms";
// import "@tailwindcss/aspect-ratio";
// import "@tailwindcss/typography";
// import "tailwindcss-children";

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.component("Button", Button);

app.mount("#app");
