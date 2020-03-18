<template>
    <div class="about-wrap">about</div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "About",
        mounted() {
            axios.post('/api/admin/addIssue', {
                title: '哈哈哈',
                desc: '你好啊'
            }).then(res => {
                console.log(res);
            })
        }
    }
</script>

<style scoped lang="less">

</style>
