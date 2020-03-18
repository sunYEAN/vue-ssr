<template>
    <div class="card-layout layout-pics pics-one">
        <h3></h3>
        <img :src="info.poster[0]" alt="">
        <p>{{info.desc}}</p>
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

</style>
