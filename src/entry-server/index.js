import { createApp } from '../app'
import '../services/axios';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now();
        const { app, router, store } = createApp();

        const { url } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url) {
            return reject({ url: fullPath })
        }

        router.push(url);

        // wait until router has resolved possible async hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // no matched routes
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                store,
                route: router.currentRoute
            }))).then((res) => {
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
                context.state = store.state;
                // context.meta = app.$meta();
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
