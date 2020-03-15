<template>
    <div class="record-wrap">
        <div v-swiper:mySwiper="sOption" @someSwiperEvent="handleSwiperEvent">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(b, index) in banners">
                    <img :alt="b.title" :src="b.cover"/>
                    <p>{{b.title}}</p>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "Record",
        data () {
            return {
                sOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                }
            }
        },
        asyncData ({store, route}) {
            // 触发 action 后，会返回 Promise
            return Promise.all([
                store.dispatch('getRecordBanners'),
            ])
        },
        computed: {
            ...mapState({
                banners: state => state.record.banners
            })
        },
        methods: {
            // 监听swiper事件
            handleSwiperEvent () {},
        }
    }
</script>

<style scoped>

</style>
