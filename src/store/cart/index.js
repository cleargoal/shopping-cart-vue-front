import cartMutations from "./mutations";
import cartActions from "./actions";
import cartGetters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            anonymousToken: '',
            userCart: {
                anonymous_uuid: '',
                items: [],
                itemsCount: 0,
                discountAmount: 0.0,
                preTotal: 0,
                total: 0,
            },
            visible: false,
        };
    },
    mutations: cartMutations,
    actions: cartActions,
    getters: cartGetters,
};
