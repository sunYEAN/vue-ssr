<template>
    <div class="container home">
        <template v-for="(item, index) in list">
            <component :is="getComponentName(item)" :info="item"></component>
            <v-comment :key="comment.id" v-for="(comment, ind) in item.comments" :comment="comment"></v-comment>
        </template>
    </div>
</template>

<script>
    import CardLayoutOne from '@src/components/MyCard/LayoutOne';
    import CardLayoutTwo from '@src/components/MyCard/LayoutTwo';
    import CardLayoutThree from '@src/components/MyCard/LayoutThree';
    import VComment from '@src/components/Comment';
    const $utils = require('../../utils');
    import {mapState} from 'vuex';


    const layouts = ['one', 'two', 'three'];

    export default {
        name:'Home',
        components: {
            CardLayoutOne,
            CardLayoutTwo,
            CardLayoutThree,
            VComment,
        },
        data () {
            return {
                name: 'home',
                loading: false,
            }
        },

        computed: {
            ...mapState({
                list: state => state.Home.list,
                banners: state => state.Home.banners,
                province: state => state.Home.province,
            }),
            item () {
                return this.$store.state.ob || {};
            }
        },

        // 我们将在路由组件上暴露出一个自定义静态函数 asyncData。
        // 注意，
        // 由于此函数会在组件实例化之前调用，所以它无法访问 this

        asyncData ({store, route}) {
            // 触发 action 后，会返回 Promise
            return Promise.all([
                store.dispatch('getHomeData')
            ])
        },
        methods: {
            // 页面请求太快的时候，解决loading闪屏的问题
            // 方式一
            // 方式二 通过Promise.race来做
            loadingFetch (ms, fetch, callback) {
                return new Promise((resolve, reject) => {
                    const timer = setTimeout(callback, ms);
                    // let time = Date.now();
                    return fetch().then(res => {
                        // time = Date.now() - time;
                        // console.log(time, ms);
                        clearTimeout(timer);
                        // if (time - ms > 0 && time - ms <= 300) {
                        //     setTimeout(() => {
                        //         console.log('setTimeout');
                        //         resolve(res);
                        //     }, 300);
                        // } else
                        resolve(res);
                    }).catch(err => {
                        reject(err);
                    })
                })
            },

            getComponentName (card) {
                console.log(card.layout)
                return 'card-layout-' + layouts[card.layout];
            }
        },
        async mounted() {
            console.log(1, process.env.VUE_ENV, '----');

            // this.loadingFetch(300, () => Promise.all([
            //     getHomeData(),
            //     getHomeBanner(),
            //     getProvinces()
            // ]), () => {
            //     this.loading = true;
            // }).then(res => {
            //     console.log(res);
            //     this.books = res[0].data;
            //     this.banner = res[1].data;
            //     this.provinces = res[2].data;
            //
            //     console.time('start');
            //
            //     this.$nextTick(() => {
            //         console.log('渲染完成');
            //         console.timeEnd('start')
            //     })
            // }).catch(err => {
            //     console.log(err);
            // }).finally(() =>{
            //     this.loading = false;
            // });
        }
    }
</script>

<style lang="less" module>
    .home{
        overflow: hidden;
    }
    .loading{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.5);
        transform: translateY(100px);
    }
</style>
