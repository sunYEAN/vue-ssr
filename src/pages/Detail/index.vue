<template>
    <div class="detail-wrap">
        <h3>{{issue.title}}</h3>
        <p class="i-d">
            <label>发布于：</label>
            <span>{{issue.edit_time}}</span>

            <template v-if="issue.update_time">
                <label>更新于：</label>
                <span>{{issue.update_time}}</span>
            </template>

            <span>{{issue.cate}}</span>
        </p>
        <p class="content" v-html="issue.content"></p>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "DetailWrap",
        computed: {
            ...mapState({
                issue: state => state.Detail.issue
            })
        },
        mounted () {
        },
        asyncData ({store, route}) {
            console.log(route);
            // 触发 action 后，会返回 Promise
            return store.dispatch('getIssueById', route.params.id)
        },
    }
</script>

<style scoped lang="less">
    .detail-wrap{
        padding: 0 20px;
        font-size: 30px;
        box-sizing: border-box;
        h3{
            margin: 20px 0;
            font-size: 32px;
            font-weight: bold;
        }
        .i-d{
            font-size: 26px;
        }
        .content{
            margin: 30px 0;
            font-size: 32px;
            line-height: 46px;
        }

    }
</style>
