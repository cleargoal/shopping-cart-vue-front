<template>
    <div class="open">
        <div class="flex text-2xl md:text-3xl justify-content-center">
            Your cart: {{ cartItemsCount }} items, ( {{ cartPacksCount }} packs)
        </div>

        <div class="items">
            <CartItemCard
                v-for="item in items"
                :key="item"
                :item="item"
            />
        </div>
        <CartSummaryPaymentCard />
    </div>
</template>

<script>
    import CartItemCard from './CartItemCard.vue';
    import CartSummaryPaymentCard from './CartSummaryPaymentCard.vue';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            CartItemCard, CartSummaryPaymentCard
        },
        computed: {
            ...mapGetters('cartModule', ['cartItems', 'cartItemsCount', 'cartPacksCount']),
            items() {
                return this.cartItems;
            },
        },
    }
</script>
<style scoped>
.cart-header {
    width: fit-content;
    margin: 0.5rem auto 0;
}

.items {
    max-height: 83vh;
    width: 96%;
    margin: 0 auto;
    overflow-y: scroll;
    background-color: #ddd;
}

@media (max-width: 800px) {
    .items {
        max-height: 59vh;
    }
}
</style>