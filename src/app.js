import Vue from 'vue'
import App from './pages/app.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr";

export function createApp (context) {
    // 创建 router 和 store 实例
    const router = createRouter();
    const store = createStore();

    Vue.use(VueAwesomeSwiper);

    // 同步路由状态(route state)到 store
    sync(store, router);

    if (context.beforeResolve) {
        context.beforeResolve({store, router});
    }

    // 创建应用程序实例，将 router 和 store 注入
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    // 暴露 app, router 和 store。
    return { app, router, store }
}
