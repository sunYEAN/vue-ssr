<template>
    <header class="tab-list animated fadeInUp">
        <ul class="container">
            <router-link class="f-c animated bounceInUp" tag="li" :to="tab.path" :key="tab.id" v-for="tab in tabs">{{tab.title}}</router-link>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "navTabs",
        props: {
            tabs: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped lang="less">
    .tab-list{
        box-shadow: 0 -1px 0px 0px rgba(0,0,0,0.1);
        >ul{
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            .slot{
                margin-right: auto;
            }
            li{
                width: 120px;
                height: 100%;
                font-size: 28px;
            }
            >li:nth-of-type(1){
                animation-delay: 0.1s;
            }
            >li:nth-of-type(2){
                animation-delay: 0.2s;
            }
            >li:nth-of-type(3){
                animation-delay: 0.3s;
            }
            >li:nth-of-type(4){
                animation-delay: 0.4s;
            }
            >li:nth-of-type(5){
                animation-delay: 0.5s;
            }
        }
    }
</style>
