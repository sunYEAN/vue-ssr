import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Home from './home';
import record from './record';

const modules = {
    Home,
    record
};


// root store
export function createStore(context) {
    return new Vuex.Store({
        state: {},
        actions: {},
        mutations: {},
        modules
    })
}
