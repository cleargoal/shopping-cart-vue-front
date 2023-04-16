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
import Column from "primevue/column";
import Button from "./components/ButtonDefault.vue";
import DataView from "./components/products/DataView.vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import MultiSelect from "primevue/multiselect";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store);

app.component('TheToast', Toast);
app.component('BadgeColored', Badge);
app.component('DropdownList', Dropdown);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('RatingMark', Rating);
app.component('ColumnList', Column);
app.component('ButtonDefault', Button);
app.component('DataView', DataView);
app.component('DataTable', DataTable);
app.component('InputText', InputText);
app.component('CalendarDef', Calendar);
app.component('MultiSelect', MultiSelect);

app.mount("#app");
