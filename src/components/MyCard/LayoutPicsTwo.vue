<template>
    <div class="card-layout layout-pics pics-two">
        <div class="img-wrap">
            <img v-for="img in info.poster.slice(0, 9)" :src="img" alt="">
        </div>
        <h3 class="line-2">{{info.title}}</h3>
    </div>
</template>

<script>
    export default {
        name: "LayoutPicsTwo",
        props: {
            info: Object
        }
    }
</script>

<style scoped lang="less">
    .pics-two{
        .img-wrap{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            img{
                width: 33.33333%;
            }
        }
    }
</style>
