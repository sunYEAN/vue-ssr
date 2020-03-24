<template>
    <div class="container home">
        <template v-if="list.length">
            <template v-for="(item, index) in list">
                <component :is="getComponentName(item)" @onTap="handleItemTap" :info="item"></component>
                <v-comment :key="comment.id" v-for="(comment, ind) in item.comments" :comment="comment"></v-comment>
            </template>
        </template>

        <div class="loading">
            {{isEnd ? '历史被掏空~' : '加载中...'}}
        </div>
    </div>
</template>

<script>
    import CardLayout from '../../components/MyCard';
    import VComment from '@src/components/Comment';
    const $utils = require('../../utils');
    import {mapState} from 'vuex';


    const layouts = ['one', 'two', 'three', 'four'];

    export default {
        name:'Home',
        metaInfo: {
            title: '首页',
            titleTemplate: '%s - issues!',
            htmlAttrs: {
                lang: 'en',
                amp: true
            }
        },
        components: {
            ...CardLayout,
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
                list: state => state.Home.data.list,
                isEnd: state => state.Home.data.isEnd,
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
            return store.dispatch('getHomeData');
        },
        methods: {
            getComponentName (card) {
                return `card-layout-Issue-${layouts[card.layout]}`;
            },

            // event props cardLayout 监听item被点击
            handleItemTap (item) {
                this.$router.push({
                    path: '/detail/' + item._id
                });
            },

            handleScroll (e) {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let screenHeight = window.innerHeight;
                let doc = document.documentElement || document.body;
                if (scrollTop + screenHeight >= doc.offsetHeight) {
                    this.$store.dispatch('getHomeData');
                }
            }
        },
        async mounted() {
            console.log(1, process.env.VUE_ENV, '----');

            if (process.env.VUE_ENV === 'client') {
                window.addEventListener('scroll', $utils.throttle(this.handleScroll, 200));
            }

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
        color: #93939F;
        padding: 16px 0;
        font-size: 28px;
        text-align: center;
    }
</style>
