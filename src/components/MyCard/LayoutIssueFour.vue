<template>
    <div class="card-layout layout-pics pics-one">
        <div class="c-img">
            <img :src="pics[0]" alt="">
        </div>
        <h3 class="line-2">{{info.title}}</h3>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "LayoutPicsOne",
        props: {
            info: Object
        },
        computed: {
            pics () {
                return this.info.poster || this.info.images || [];
            }
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
