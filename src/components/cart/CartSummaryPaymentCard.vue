<template>
  <div class="cart-item-card total-flex font-bold">
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
  <div class="cart-item-card">
    <button class="p-button p-component mr-2 mb-2">Pay by Credit Card</button>
    <button class="p-button p-component p-button-secondary mr-2 mb-2" @click="changeVisibility">
      Hide
    </button>
    <button class="p-button p-component p-button-danger mr-2 mb-2">Remove Cart</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

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
    ...mapActions('cartModule', ['changeVisibility']),
  },
}
</script>
<style scoped>
.total-flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 3rem;
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
</style>