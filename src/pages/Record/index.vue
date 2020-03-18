<template>
    <div class="record-wrap">
        <template>
            <record-card class="record-item" v-for="item in list" :key="'record' + item.id" :info="item"></record-card>
        </template>
    </div>
</template>

<script>
    import CardLayout from '../../components/MyCard';
    import RecordCard from "../../components/RecordCard";

    import {mapState} from 'vuex';

    const componentsMap = ['one', 'two'];
    export default {
        name: "Record",
        data() {
            return {}
        },
        asyncData({store, route}) {
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
            }),
        },
        components: {
            RecordCard,
            ...CardLayout
        },
        methods: {
            // 监听swiper事件
            handleSwiperEvent() {
            },

            getComponentName(item) {
                return 'card-layout-image-' + componentsMap[item.layout]
            }
        }
    }
</script>

<style scoped lang="less">
    .record-wrap {
        display: flex;
        flex-wrap: wrap;
        .record-item{
            flex-shrink: 0;
        }
    }

    @media screen and (min-width: 0px){
        .record-wrap {
            padding: 6px;
            .record-item{
                width: 100%;
            }
        }
    }

    @media screen and (min-width: 375px){
        .record-wrap {
            .record-item{
                width: 50%;
            }
        }
    }

    @media screen and (min-width: 768px){
        .record-wrap {
            padding: 16px;
            .record-item{
                width: 33.3333%;
            }
        }
    }
    @media screen and (min-width: 1024px){
        .record-wrap {
            .record-item{
                width: 25%;
            }
        }
    }
    @media screen and (min-width: 1200px){
        .record-wrap {
            .record-item{
                width: 20%;
            }
        }
    }
</style>
