<template>
    <div class="issue">{{list}}</div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name:'Issue',
        data () {
            return {
                name: 'issue'
            }
        },
        asyncData ({store, route}) {
            return Promise.all([
                store.dispatch('getDataByCate', 1)
            ])
        },
        computed: {
            ...mapState({
                list: state => state.Issue.list
            })
        },
        mounted() {
        }
    }
</script>

<style lang="less" module>
    .search{
        background-color: pink;
    }
</style>
