export default {
    addToCart(context, payload) {
        const dList = context.rootGetters['discountModule/getDiscountsList'];
        context.commit('addToCart', payload);
        if (dList.length > 0) {
            context.commit('calculateDiscountAmount', dList);
        }
    },
    removeFromCart(context, payload) {
        const dList = context.rootGetters['discountModule/getDiscountsList'];
        context.commit('removeFromCart', payload);
        if (dList.length > 0) {
            context.commit('calculateDiscountAmount', dList);
        }
    },
    setAnonymousToken(context, payload) {
        context.commit('setAnonymousToken', payload);
    },
    setNewUserCart(context, payload) {
        context.commit('setCart', payload);
    },
    changeVisibility(context) {
        context.commit('changeVisibility');
    },
    setDiscountAmount(context, payload) {
        context.commit('setDiscountAmount', payload);
    }
};