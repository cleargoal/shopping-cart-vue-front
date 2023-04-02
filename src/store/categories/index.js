import categoryMutations from "./mutations";
import categoryActions from "./actions";
import categoryGetters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            categories: [],
        };
    },
    mutations: categoryMutations,
    actions: categoryActions,
    getters: categoryGetters,
};
