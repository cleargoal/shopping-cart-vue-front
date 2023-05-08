<template>
    <div class="cart-item-card">
        <div class="flex">
            <div class="mr-3">
                <img
                    :src="item.image"
                    :alt="item.name"
                >
            </div>

            <div
                class="flex flex-column justify-content-between"
                style="width: 60%;"
            >
                <div class="flex justify-content-between">
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

                <div class="flex justify-content-between align-items-start">
                    <div class="mr-3">
                        {{ description }}
                    </div>
                    <span class="flex flex-column max-w-6rem">
                        <span class="min-w-min">Decrease quantity or remove item</span>
                        <button
                            class="flex justify-content-center trash max-w-3rem"
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

  . header {
    display: flex;
    justify-content: space-between;
  }
    .trash {
        font-weight: bolder;
        padding: 0.8rem 1rem;
    }
  .trash:hover {
    color: #888;
      background-color: #FFD8B2;
  }
}
</style>