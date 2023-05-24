import {defineComponent} from "vue";
import ShoppingCart from "../components/cart/ShoppingCart.vue";

export function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function normalPrice(val) {
    return (val / 100).toFixed(2);
}

export default defineComponent({
    components: {ShoppingCart}
})
