import {updateLocalStorage} from '../../utils/functions';
import calc from "../../utils/discount_calc";

export default {
    addToCart(state, product) {
        let item = state.userCart.items.find(i => i.id === product.id)

        if (item) {
            item.quantity++
        } else {
            state.userCart.items.push({...product, quantity: 1});
            state.userCart.itemsCount++;
        }

        state.userCart.preTotal += product.price;

        updateLocalStorage('userCart', state.userCart);
    },
    removeFromCart(state, product) {
        let item = state.userCart.items.find(i => i.id === product.id)

        if (item) {
            if (item.quantity > 1) {
                item.quantity--
            } else {
                state.userCart.items = state.userCart.items.filter(i => i.id !== product.id)
                state.userCart.itemsCount--;
            }
        }

        state.userCart.preTotal -= product.price;

        updateLocalStorage('userCart', state.userCart);
    },
    setAnonymousToken(state, token) {
        state.anonymousToken = token;
    },
    setCart(state, cart) {
        state.userCart = cart;
    },
    changeVisibility(state) {
        state.userCart.visible = !state.userCart.visible;
    },
    setDiscountAmount(state, amount) {
        state.userCart.discountAmount = amount;
    },
    calculateDiscountAmount(state, discounts) {
        if (state.userCart.items.length > 0) {
            state.userCart.discountAmount = calc.methods.calculation(discounts, state.userCart.items, state.userCart.preTotal);
            state.userCart.total = state.userCart.preTotal - state.userCart.discountAmount;
            updateLocalStorage('userCart', state.userCart);
        }
    },
    emptyCart(state) {
        state.userCart = {
            anonymous_uuid: '',
            items: [],
            itemsCount: 0,
            discountAmount: 0.0,
            preTotal: 0,
            total: 0,
            visible: true,
        };
    },
};
