<template>
    <div class="header-tab">
        <nav-tab class="nav-tab" :tabs="tabs"></nav-tab>
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
                        path: '/app/home',
                        title: '首页'
                    },
                    // {
                    //     id: 'tab_02',
                    //     path: '/app/issue',
                    //     title: '文章'
                    // },
                    {
                        id: 'tab_03',
                        path: '/app/record',
                        title: '记录'
                    },
                    {
                        id: 'tab_02',
                        path: '/app/demos',
                        title: 'demo'
                    },
                    {
                        id: 'tab_04',
                        path: '/app/about',
                        title: 'about'
                    }
                ]
            }
        }
    }
</script>

<style lang="less">
    @navBarHeight: 90px;
    .logo{
        width: 60px;
        height: 60px;
    }
    body {
        font-family: -apple-system, "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Apple Legacy Chevron", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;    }
    html{
        color: #353C46;
        width: 100%;
        font-size: 30px;
        background-color: #f3f5f7;
    }
    .router-link-active{
        box-sizing: border-box;
        font-weight: bold;
    }
    .header-tab{
        .nav-tab,.nav-search{
            left: 0;
            width: 100%;
            height: @navBarHeight;
            bottom: 0;
            z-index: 100;
            position: fixed;
            background-color: #ffffff;
        }
        .nav-search{
            top: 0;
            bottom: auto;
        }
        .article{
            padding-bottom:  calc(@navBarHeight + 10px);
        }
    }

    .f-c{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
