import commonActions from './actions';
import commonMutations from './mutations';
import commonGetters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            preloader: false,
        };
    },
    mutations: commonMutations,
    actions: commonActions,
    getters: commonGetters,
};