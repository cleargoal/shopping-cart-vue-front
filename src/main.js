import { createApp } from "vue";
import PrimeVue from "primevue/config";

import router from "./router.js";
import store from "./store/index.js";

import App from "./app/App.vue";
import './assets/styles/main.scss';
import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import Badge from "primevue/badge";
import Dropdown from "primevue/dropdown";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Rating from "primevue/rating";
import Button from "primevue/button";
import DataView from "./components/products/DataView.vue";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store);

app.component('TheToast', Toast);
app.component('BadgeColored', Badge);
app.component('DropdownList', Dropdown);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('RatingMark', Rating)
app.component('ButtonDefault', Button)
app.component('DataView', )
app.component('DataView', DataView)


app.mount("#app");
