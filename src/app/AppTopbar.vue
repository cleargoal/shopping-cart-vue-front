<template>
    <div class="layout-topbar">
        <router-link
            to="/"
            class="layout-topbar-logo"
        >
            <img
                alt="Good Foods"
                :src="topbarImage()"
            >
            <span
                title="Good Foods"
                class="text-600"
                style="font-size: small"
            >Good Foods</span>
        </router-link>
        <button
            class="p-link layout-menu-button layout-topbar-button"
            @click="onMenuToggle"
        >
            <i class="pi pi-bars" />
        </button>

        <button
            class="p-link layout-topbar-menu-button layout-topbar-button"
            @click="toggleElli"
        >
            <i class="pi pi-ellipsis-v" />
        </button>
        <ul
            class="layout-topbar-menu lg:flex origin-top"
            :class="{hidden: hideElMenu}"
        >
            <li>
                <cart-widget
                    @show-cart="toggleElli"
                />
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-calendar" />
                    <span>Events</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-cog" />
                    <span>Settings</span>
                </button>
            </li>
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-user" />
                    <span>Profile</span>
                </button>
            </li>
        </ul>
        <div
            v-if="cartVisibility"
            class="nice-cart"
        >
            <shopping-cart />
        </div>
    </div>
</template>

<script>
    import CartWidget from "../components/cart/CartWidget.vue";
    import ShoppingCart from "../components/cart/ShoppingCart.vue";
    import {mapGetters, mapState} from "vuex";

    export default {
        components: {ShoppingCart, CartWidget},
        emits: ['menu-toggle', 'topbar-menu-toggle'],
        data() {
            return {
                hideElMenu: true,
            };
        },
        computed: {
            ...mapGetters('cartModule', ['getAnonymousToken', 'cartItemsCount', 'getCart', 'getCartVisibility', 'getCartTotal', 'getDiscountAmount', 'cartItems',]),
            ...mapGetters('discountModule', ['getDiscountsList',]),
            ...mapState({
                cartVisibility: state => state.cartModule.visible,
            }),
        },
        methods: {
            onMenuToggle(event) {
                this.$emit('menu-toggle', event);
            },
            onTopbarMenuToggle(event) {
                this.$emit('topbar-menu-toggle', event);
            },
            topbarImage() {
                return '/images/whole-europe.svg';
            },
            toggleElli() {
                this.hideElMenu = !this.hideElMenu;
            },
        }
    }
</script>
<style scoped>
.nice-cart {
    background-color: #fff;
    position: fixed;
    width: 60%;
    top: 0;
    left: 25%;
    z-index: 1000;
    border-radius: 0.6rem;
    padding-bottom: 0;
    box-shadow: 0 0 5px gray;
}
@media (max-width: 412px) {
    .nice-cart {
        top: 2rem;
    }
}
@media (max-width: 800px) {
    .nice-cart {
        left: 3%;
        width: 94%;
    }
}
</style>