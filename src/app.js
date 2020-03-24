import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

Vue.use(Meta, {
    refreshOnceOnNavigation: true
});

export function createApp (context) {
    const store = createStore();
    const router = createRouter();

    sync(store, router);

    if (context && context.beforeResolve) {
        context.beforeResolve({store, router});
    }

    const app = new Vue({
        metaInfo: {
            title: 'Vue SSR',
            meta: [
                { vmid: 'description', name: 'description', content: 'vue ssr template' }
            ],
            titleTemplate: '%s | Test',
            htmlAttrs: {
                lang: 'en'
            }
        },
        router,
        store,
        render: h => h(App)
    });
    return { app, router, store }
}
