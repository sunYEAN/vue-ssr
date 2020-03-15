<template>
    <div class="header-tab">
        <nav-tab class="nav-tab" :tabs="tabs">
            <template v-slot:logo>
                <img class="logo" src="./images/logo.png" alt="">
            </template>
        </nav-tab>
        <article class="article">
            <router-view></router-view>
        </article>
    </div>
</template>

<script>
    import NavTab from '../components/NavTabs';
    export default {
        name: "App",
        components: {NavTab},
        data () {
            return {
                tabs: [
                    {
                        id: 'tab_01',
                        path: '/home',
                        title: '首页'
                    },
                    {
                        id: 'tab_02',
                        path: '/record',
                        title: '文章'
                    },
                    {
                        id: 'tab_03',
                        path: '/cate',
                        title: '记录'
                    },
                    {
                        id: 'tab_04',
                        path: '/about',
                        title: '关于'
                    }
                ]
            }
        }
    }
</script>

<style lang="less">
    @navBarHeight: 80px;
    .logo{
        width: 40px;
        height: 40px;
    }
    body {
        font-family: -apple-system, "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;    }
    html{
        color: #353C46;
    }
    .router-link-active{
        font-weight: bold;
    }
    .container {
        margin: 0 auto;
        max-width: 1024px;
    }
    .header-tab{
        .nav-tab{
            top: 0;
            left: 0;
            width: 100%;
            height:  @navBarHeight;
            position: fixed;
            background-color: #ffffff;
        }
        .article{
            padding-top:  @navBarHeight;
        }
    }

    .f-c{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
