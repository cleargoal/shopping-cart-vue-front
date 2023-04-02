import { createApp } from "vue";
import PrimeVue from "primevue/config";

import router from "./router.js";
import store from "./store/index.js";

import App from "./app/App.vue";
import "./index.css";

import "./assets/main.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import Badge from "primevue/badge";

// import "@tailwindcss/forms";
// import "@tailwindcss/aspect-ratio";
// import "@tailwindcss/typography";
// import "tailwindcss-children";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store);

app.component('TheToast', Toast);
app.component('BadgeColored', Badge);


app.mount("#app");
