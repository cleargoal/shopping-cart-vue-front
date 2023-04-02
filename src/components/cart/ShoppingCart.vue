<template>
    <div class="open">
        <h1 class="cart-header">
            Your cart: {{ cartItemsCount }} items
        </h1>

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
            ...mapGetters('cartModule', ['cartItems', 'cartItemsCount']),
            items() {
                return this.cartItems;
            },
        },
    }
</script>
<style scoped>
.open {
}
.cart-header {
  width: fit-content;
  margin: 1.5rem auto 0;
}
.items {
  max-height: 60vh;
  overflow-y: scroll;
}
</style>