import {createApp} from '../app'
import 'reset.css';
import '../services/axios';
import '../mock';
import '../animate.css';


const beforeResolve = function ({store, router}) {
    // asyncData 客户端实现
    router.beforeResolve(async (to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });

        if (!activated.length) return next();

        // 不阻塞代码执行
        Promise.all(activated.map(c => {
            if (c.asyncData) c.asyncData({store, route: to});
            next();
        })).catch(next);

    });
};

const { app, router, store } = createApp({
    beforeResolve: beforeResolve
});

if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// onReady
// 在导航完成初始导航时调用

// beforeEach，beforeResolve
// 全局前置守卫：当一个导航触发时，全局前置守卫按照创建顺序调用。
// 全局解析守卫，和beforeEach类似，区别是 在导航被确认之前，同时在所有组件内守卫和异步路由被解析之后被调用

// 注意到，这个beforeResolve守卫，是在route好了之后才设置的，
// 目的是为了防止服务器已经获取的数据，客户端不用二次获取。
// 然而在非ssr应用里，我们应该是在路由解析之前就应该设置这个导航，
// 不能等页面router解析好了才设置。这就是为什么一刷新页面，没有响应，切换页面时正常的原因所在。

router.onReady(() => {
    app.$mount('#app');
});

