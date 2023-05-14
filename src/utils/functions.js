import {defineComponent} from "vue";
import ShoppingCart from "../components/cart/ShoppingCart.vue";

export function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export default defineComponent({
    components: {ShoppingCart}
})
