<template>
    <button
        class="p-link layout-topbar-button"
        :title="cartTitle"
        @click="changeVisibility"
    >
        <i
            class="pi pi-shopping-cart"
            :class="{cartColor: isItemsInCart}"
        />
        <span
            title="Items"
            :class="{cartColor: isItemsInCart}"
            style="display: block; margin-left: 0.3rem;"
        >
            {{ itemsCount }}</span>
    </button>
    <div
        v-show="cartVisibility"
        class="nice-cart"
    >
        <shopping-cart />
    </div>
</template>

<script>
    import ApiService from "../../service/ApiService";
    import {mapActions, mapGetters} from "vuex";
    import ShoppingCart from "./ShoppingCart.vue";
    import { updateLocalStorage } from "../../utils/functions.js";

    export default {
        name: "CartWidget",
        apiService: null,
        components: {
            ShoppingCart,
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters('cartModule', ['getAnonymousToken', 'cartItemsCount', 'getCart', 'getCartVisibility', 'getCartTotal', 'getDiscountAmount', 'cartItems',]),
            ...mapGetters('discountModule', ['getDiscountsList',]),
            itemsCount() {
                return this.getCart ? this.cartItemsCount : 0;
            },
            isItemsInCart() {
                return this.getCart ? this.cartItemsCount > 0 : false;
            },
            cartTitle() {
                return this.getCartVisibility === false ? 'Open' : 'Close';
            },
            cartVisibility() {
                return this.getCartVisibility;
            },
        },
        watch: {
            getCartTotal(newVal, oldVal) {

                let message;
                let severity;
                if (newVal > oldVal) {
                    message = "added to";
                    severity = 'info';
                } else {
                    message = "removed from";
                    severity = 'warn';
                }
                this.$toast.add({severity: severity, summary: 'Successful', detail: 'Item ' + message + ' Cart', life: 5000});
            },
        },
        created() {
            this.apiService = new ApiService();
        },
        mounted() {
            this.getUserCart();
            this.getDiscounts();
        },
        methods: {
            async checkTokenForAnonymous() {
                if (!window.localStorage.getItem('anonymousToken')) {
                    await this.createNewAnonymous();
                }
                this.setAnonymousToken(JSON.parse(window.localStorage.getItem('anonymousToken')));
            },
            async createNewAnonymous() {
                return this.apiService.getAnonymousTokenFromDb().then((token) => {
                    updateLocalStorage('anonymousToken', token);
                });
            },
            async getUserCart() {
                await this.checkTokenForAnonymous();
                if (!window.localStorage.getItem('userCart')) {
                    await this.getSavedUserCart();
                }
                this.setNewUserCart(JSON.parse(window.localStorage.getItem('userCart')));
            },
            async getSavedUserCart() {
                let cart;
                const cartDB = await this.apiService.getUserCardFromDb(this.getAnonymousToken);
                if (Object.keys(cartDB).length === 0) {
                    cart = this.getCart;
                } else {
                    cart = cartDB;
                }
                updateLocalStorage('userCart', cart);
            },
            async getDiscounts() {
                if (!window.localStorage.getItem('discounts')) {
                    await this.getDiscountsFromDB();
                }
                await this.setDiscountsList(JSON.parse(window.localStorage.getItem('discounts')));
            },
            async getDiscountsFromDB() {
                const list = await this.apiService.getCalculation();
                updateLocalStorage('discounts', list);
            },
            ...mapActions('cartModule', ['setAnonymousToken', 'setNewUserCart', 'changeVisibility']),
            ...mapActions('discountModule', ['setDiscountsList']),
        },
    }
</script>

<style scoped>
.cartColor {
  color: #6366f1;
}

.nice-cart {
  background-color: #eee;
  position: fixed;
  width: 60%;
  top: 8%;
  left: 25%;
  z-index: 100;
  border-radius: 0.6rem;
  padding-bottom: 1.5rem;
  box-shadow: 0 0 5px gray;
}
</style>