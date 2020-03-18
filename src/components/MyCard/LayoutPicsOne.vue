<template>
    <div class="card-layout layout-pics pics-one">
        <h3>{{info.title}}</h3>
        <img :src="info.poster[0]" alt="">
        <p>{{info.desc}}</p>
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
        background-color: pink;
        h3{}
        img{
            width: 100%;
        }
    }
</style>
