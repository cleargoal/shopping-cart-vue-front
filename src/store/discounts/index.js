import discountMutations from "./mutations";
import discountActions from "./actions";
import discountGetters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            discounts: [],
        };
    },
    mutations: discountMutations,
    actions: discountActions,
    getters: discountGetters,
};
