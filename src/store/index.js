import {createStore} from "vuex";
import rootMutations from "./mutations";
import rootActions from "./actions";
import rootGetters from "./getters";
import shoppingCart from "./cart/index";
import categories from "./categories";
import discounts from "./discounts";
import commonStore from './common';

const store = createStore({
    modules: {
        cartModule: shoppingCart,
        categoryModule: categories,
        discountModule: discounts,
        commonModule: commonStore,
    },
    state() {
        return {
            isLoggedIn: false,
        };
    },
    mutations: rootMutations,
    actions: rootActions,
    getters: rootGetters,
});

export default store;