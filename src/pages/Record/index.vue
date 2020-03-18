<template>
    <div class="record-wrap">
        {{banners}}
        {{list}}
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "Record",
        data () {
            return {
            }
        },
        asyncData ({store, route}) {
            // 触发 action 后，会返回 Promise
            return Promise.all([
                store.dispatch('getRecordBanners'),
                store.dispatch('getDataByCate', 2),
            ])
        },
        computed: {
            ...mapState({
                list: state => state.Record.list,
                banners: state => state.Record.banners
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
