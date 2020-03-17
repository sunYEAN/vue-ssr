import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Home from './home';
import record from './record';
import detail from './detail';

const modules = {
    Home,
    detail,
    record
};


// root store
export const createStore = () => new Vuex.Store({
    state: {
        loading: false,
    },
    actions: {
        handleLoading ({commit}, status) {
            commit('SET_LOADING', status);
        }
    },
    mutations: {
        ['SET_LOADING'] (state, status) {
            state.loading = status;
        }
    },
    modules
})
