<template>
    <div class="issue">{{name}}</div>
</template>

<script>
    export default {
        name:'Issue',
        data () {
            return {
                name: 'issue'
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" module>
    .search{
        background-color: pink;
    }
</style>
