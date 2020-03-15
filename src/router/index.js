import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                name: 'home',
                path: '/home',
                component: () => import('../pages/Home')
            },
            {
                name: 'search',
                path: '/search',
                component: () => import('../pages/Search')
            },
            {
                name: 'record',
                path: '/record',
                component: () => import('../pages/Record')
            },
            {
                path: '/',
                redirect: '/home'
            }
        ]
    })
}
