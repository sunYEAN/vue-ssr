<template>
    <div class="record-wrap">
        记录
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
