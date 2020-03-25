<template>
    <div class="card-layout card-layout-three">
        <h3 class="line-1">{{info.title}}</h3>
        <div class="p-img">
            <div class="c-img" v-for="i in info.poster.slice(0, 3)">
                <img :src="i" alt="">
            </div>
        </div>
        <p class="line-2">{{info.desc}}</p>

        <div class="desc">
            <span>{{info.create_time}}</span>
            <!--<label>更新：</label><span>{{info.update_time}}</span>-->
            <span class="cate">{{info.cate}}</span>
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
    .card-layout-three{
        >.p-img{
            display: flex;
            justify-content: space-between;
            >.c-img{
                width: 33%;
                box-sizing: border-box;
                >img{
                    width: 100%;
                    object-fit: cover;
                }
            }
        }
        >p{
            margin-top: 14px;
        }
    }
</style>
