<template>
    <div class="search">{{name}}</div>
</template>

<docs>
    # 哈哈哈哈
</docs>

<script>
    import {sayHi} from '../../utils'
    export default {
        name:'search',
        data () {
            return {
                name: 'search'
            }
        },
        mounted() {
            sayHi('yangheng');
        }
    }
</script>

<style lang="less" module>
    .search{
        background-color: pink;
    }
</style>
