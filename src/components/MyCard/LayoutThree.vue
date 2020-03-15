<template>
    <div class="card-layout card-layout-three">
        <h3 class="line-1">{{info.layout}}{{info.title}}</h3>
        <div class="p-img">
            <img v-for="i in info.poster" :src="i" alt="">
        </div>
        <p class="line-2">{{info.desc}}</p>
    </div>
</template>

<script>
    export default {
        name: "CardLayoutTwo",
        props: {
            info: Object
        }
    }
</script>

<style scoped lang="less">
    @import "./common";
    .card-layout-three{
        >.p-img{
            display: flex;
            justify-content: space-between;
            >img{
                width: 32%;
                height: 100px;
                object-fit: cover;
            }
        }
        >p{
            margin-top: 14px;
        }
    }
</style>
