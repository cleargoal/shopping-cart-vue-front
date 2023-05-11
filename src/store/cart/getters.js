export default {
    productQuantity: (state) => (product) => {
        const item = state.userCart.find(i => i.id === product.id)

        if (item) {
            return item.quantity;
        } else {
            return null;
        }
    },
    cartItems: (state) => {
        return state.userCart.items;
    },
    cartItemsCount: (state) => {
        return state.userCart.items.length;
    },
    cartPacksCount: (state) => {
        let sum = 0;
        state.userCart.items.map(x => sum += x.quantity);
        return sum;
    },
    getAnonymousToken: (state) => {
        return state.anonymousToken;
    },
    getCart: (state) => {
        return state.userCart;
    },
    getCartTotal: (state) => {
        return (state.userCart.total / 100).toFixed(2);
    },
    getCartPreTotal: (state) => {
        return (state.userCart.preTotal / 100).toFixed(2);
    },
    getDiscountAmount: (state) => {
        return (state.userCart.discountAmount / 100).toFixed(2);
    },
    getCartVisibility: (state) => {
        return state.visible;
    },
};
