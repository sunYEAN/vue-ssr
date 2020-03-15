<template>
    <div class="comment-item">
<!--        <v-card size="small" :info="comment"></v-card>-->
    </div>
</template>

<script>
    // import VCard from '@src/components/MyCard';
    export default {
        name: "CommentItem",
        // components: {
        //     VCard
        // },
        props: {
            comment: {}
        }
    }
</script>

<style scoped lang="less">
    .comment-item{
        padding-left: 16px;
        box-sizing: border-box;
    }
</style>
