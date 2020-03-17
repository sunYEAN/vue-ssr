import VueRouter from 'vue-router';
import Vue from 'vue';

import App from '../pages';
import Home from '../pages/Home';
import Issue from '../pages/Home';
import Record from '../pages/Home';
import About from '../pages/Home';

Vue.use(VueRouter);

export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                name: 'app',
                path: '/app',
                // component: () => import('../pages'),
                component: App,
                children: [
                    {
                        name: 'home',
                        path: 'home',
                        // component: () => import('../pages/Home')
                        component: Home
                    },
                    {
                        name: 'issue',
                        path: 'issue',
                        // component: () => import('../pages/Issue')
                        component: Issue
                    },
                    {
                        name: 'record',
                        path: 'record',
                        // component: () => import('../pages/Record')
                        component: Record
                    },
                    {
                        name: 'about',
                        path: 'about',
                        // component: () => import('../pages/About')
                        component: About
                    },
                ]
            },
            // {
            //     path: '/',
            //     redirect: '/app/home'
            // },
            {
                name: 'detail',
                path: '/detail/:id',
                component: () => import('../pages/Detail')
            },
        ]
    })
}
