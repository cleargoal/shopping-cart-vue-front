<template>
    <div class="cart-item-card">
        <h3>{{ item.name }}</h3>
        <div class="header">
            <p><b>{{ item.category }}</b></p>
            <p>Item quantity: <b>{{ item.quantity }}</b></p>
            <p>Item Price: <b>${{ item_price }}</b></p>
            <p>Total Item Cost: <b>${{ item_cost }}</b></p>
        </div>

        <div class="header">
            <p>{{ description }}</p>
            <span>
                <button
                    class="p-link trash"
                    @click="removeFromCart(item)"
                >
                    <i class="pi pi-trash" />
                </button>
            </span>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        props: {
            item: {
                type: Array,
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
            ...mapActions('cartModule', ['removeFromCart']),
            getNormalPrice(value) {
                return value/100;
            },
        },
    }
</script>

<style lang="scss">
.cart-item-card {
  width: 90%;
  margin: 1% auto;
  background-color: white;
  box-shadow: 0 0 5px gray;
  border-radius: 5px;
  padding: 10px;
  text-align: left;

  .header {
    display: flex;
    justify-content: space-between;
  }
  .trash:hover {
    color: #888;
  }
}
</style>