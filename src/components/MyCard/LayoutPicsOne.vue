<template>
    <div class="card-layout layout-pics pics-one">
        <img :src="info.poster[0]" alt="">
        <h3 class="line-2">{{info.title}}</h3>
    </div>
</template>

<script>
    export default {
        name: "LayoutPicsOne",
        props: {
            info: Object
        }
    }
</script>

<style scoped lang="less">
    .pics-one{
        img{
            width: 100%;
        }
    }
</style>
