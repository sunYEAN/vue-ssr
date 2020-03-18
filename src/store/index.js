import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const matched = require.context('', false, /\.js$/);
const modules = {};

matched.keys().map(key => {
    let name = key.match(/\.\/(.*)\.js$/)[1];
    if (name && name !== 'index') {
        name = name.replace(/.{1}/, (s) => s.toUpperCase());
        modules[name] = matched(key).default;
    }
});

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
    modules: modules
});
