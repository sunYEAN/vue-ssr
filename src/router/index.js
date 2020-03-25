import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '../pages';
// import Home from '../pages/Home';
// import Issue from '../pages/Issue';
// import Record from '../pages/Record';
// import About from '../pages/About';
// import Detail from '../pages/Detail';

Vue.use(VueRouter);

export const createRouter = () => new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'app',
            path: '/app',
            component: App,
            // component: App,
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: () => import('../pages/Home')
                    // component: Home
                },
                {
                    name: 'issue',
                    path: 'issue',
                    component: () => import('../pages/Issue')
                    // component: Issue
                },
                {
                    name: 'record',
                    path: 'record',
                    component: () => import('../pages/Record')
                    // component: Record
                },
                {
                    name: 'demos',
                    path: 'demos',
                    component: () => import('../pages/Demo')
                    // component: Issue
                },
                {
                    name: 'about',
                    path: 'about',
                    component: () => import('../pages/About')
                    // component: About
                },
            ]
        },
        {
            path: '/',
            redirect: '/app/home'
        },
        {
            name: 'detail',
            path: '/detail/:id',
            component: () => import('../pages/Detail'),
            // component: Detail,
        },
    ]
});

