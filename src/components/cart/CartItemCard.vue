<template>
    <div class="cart-item-card">
        <div class="flex xs:flex-column">
            <div class="mr-3">
                <img
                    :src="item.image"
                    :alt="item.name"
                >
            </div>

            <div
                class="flex flex-column justify-content-between content-width"
            >
                <div class="header">
                    <div class="text-3xl font-bold">
                        {{ item.name }}
                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <div class="mr-2">
                            Category:
                        </div>
                        <div class="text-2xl font-italic">
                            {{ item.category }}
                        </div>
                    </div>
                </div>
                <div class="flex flex-column justify-content-between text-xl">
                    <div class="flex justify-content-between">
                        <span>Item quantity:</span>
                        <b>{{ item.quantity }}</b>
                    </div>
                    <div class="flex justify-content-between">
                        <span>Item Price:</span> <b>${{ item_price }}</b>
                    </div>
                    <div class="flex justify-content-between">
                        <span>Total Item Cost:</span> <b>${{ item_cost }}</b>
                    </div>
                </div>

                <div class="flex justify-content-between align-items-start xs:mt-2">
                    <div class="mr-3">
                        {{ description }}
                    </div>
                    <span class="flex max-w-10rem">
                        <span class="min-w-min">Decrease quantity or remove item</span>
                        <button
                            class="flex justify-content-center align-content-center flex-wrap trash max-w-3rem"
                            @click="removeFromCart(item)"
                        >
                            <i class="pi pi-trash" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        props: {
            item: {
                type: Object,
                default: null,
            }
        },
        computed: {
            description() {
                return this.item.description.substring(0, 120);
            },
            item_price() {
                return this.getNormalPrice(this.item.price).toFixed(2);
            },
            item_cost() {
                return (this.getNormalPrice(this.item.price) * this.item.quantity).toFixed(2);
            },
        },
        methods: {
            ...mapActions('cartModule', ['removeFromCart', 'increaseQuantity', 'decreaseQuantity']),
            getNormalPrice(value) {
                return value/100;
            },
        },
    }
</script>

<style scoped>
.cart-item-card {
    width: 98%;
    margin: 1% auto;
    background-color: white;
    box-shadow: 0 0 5px gray;
    border-radius: 5px;
    padding: 1rem 2rem;
    text-align: left;

    .header {
        display: flex;
        justify-content: space-between;
    }

    .trash {
        font-weight: bolder;
        padding: 0.8rem 1rem;
        border: 0;
        border-radius: 5px;
        color: #777;
        background-color: transparent;
    }

    .trash:hover {
        color: #333;
        background-color: #FFD8B2;
        cursor: pointer;
    }
}
.content-width {
    width: 60%;
}
@media(max-width: 412px) {
    .xs\:flex-column {
        flex-direction: column;
    }
    .cart-item-card {
        padding: 1rem;
    }
    .content-width {
        width: 100%;
    }
    .xs\:mt-2 {
        margin-top: 0.5rem;
    }
}
</style>