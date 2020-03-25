<template>
    <div class="card-layout card-layout-two">
        <h3 class="line-2">{{info.title}}</h3>
        <div v-if="info.poster.length" class="c-img">
            <img :src="info.poster[0]" alt="">
        </div>
        <p class="line-2">{{info.desc}}</p>

        <div class="desc">
            <span>{{info.create_time}}</span>
            <!--<label>更新：</label><span>{{info.update_time}}</span>-->
            <span class="cate">{{info.cate && info.cate.name}}</span>
        </div>

        <slot></slot>
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
    .card-layout-two{
        >.c-img{
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
