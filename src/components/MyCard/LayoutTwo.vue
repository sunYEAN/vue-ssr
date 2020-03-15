<template>
    <div class="card-layout card-layout-two">
        <h3 class="line-2">{{info.layout}}{{info.title}}</h3>
        <div v-if="info.poster.length" class="p-img">
            <img :src="info.poster[0]" alt="">
        </div>
        <p>{{info.desc}}</p>
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
    .card-layout-two{
        >.p-img{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            >img{
                width: 100%;
            }
        }
        >p{
            margin-top: 14px;
        }
    }
</style>
