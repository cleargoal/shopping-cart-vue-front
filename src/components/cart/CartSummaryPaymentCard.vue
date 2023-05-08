<template>
    <div class="flex flex-column md:flex-row md:justify-content-between">
        <div class="total-flex font-bold">
            <div class="element-flex discount">
                <span>Before Discount: </span>
                <span>${{ beforeDiscount }}</span>
            </div>
            <div class="element-flex discount">
                <span>Discount: </span>
                <span>${{ discountAmount }}</span>
            </div>
            <div class="element-flex total">
                <span>Cart Total: </span>
                <span>${{ cart_total }}</span>
            </div>
        </div>
        <div class="buttons-flex">
            <button class="p-button p-component mr-2 mb-2">
                Pay Online
            </button>
            <button
                class="p-button p-component p-button-secondary mr-2 mb-2 justify-content-center hide-button"
                @click="hideCart"
            >
                Hide
            </button>
            <button
                class="p-button p-component p-button-warning mr-2 mb-2"
                @click="setEmptyCart"
            >
                Empty Cart
            </button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters('cartModule', ['getCartTotal', 'getCartVisibility', 'getDiscountAmount', 'getCartPreTotal']),
            cart_total() {
                return this.getCartTotal;
            },
            discountAmount() {
                return this.getDiscountAmount;
            },
            beforeDiscount() {
                return this.getCartPreTotal;
            },
        },
        methods: {
            ...mapActions('cartModule', ['changeVisibility', 'emptyCart']),
            hideCart() {
                this.changeVisibility();
            },
            setEmptyCart() {
                this.emptyCart();
            },
        },
    }
</script>
<style scoped>
.total-flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 3rem;
    min-width: 48%;
}

.buttons-flex {
    display: flex;
    justify-content: space-between;
    padding: 1rem 3rem;
}

.hide-button {
    min-width: 8rem;
}

.element-flex {
    display: flex;
    justify-content: space-between;
}

.discount {
    font-size: large;
}

.total {
    font-size: x-large;
}

@media (max-width: 800px) {
    .total-flex {
        padding: 0.5rem 1rem;
    }

    .buttons-flex {
        padding: 0 1rem;
    }

    .hide-button {
        min-width: unset;
    }

    .p-button {
        padding: 0.5rem;
        white-space: nowrap;
    }
}
</style>