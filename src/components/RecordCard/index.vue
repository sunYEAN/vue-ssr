<template>
    <div class="record-card">
        <div class="img-wrap">
            <div class="imgs">
                <div>
                    <img :src="img" v-for="img in pics.slice(0, 2)" alt="">
                </div>
            </div>
            <p class="t line-1">{{info.title}}</p>
            <p class="d line-1">{{info.desc}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecordCard",
        props: {
            info: Object
        },
        computed: {
            pics () {
                return this.info.poster || this.info.images || [];
            }
        }
    }
</script>

<style scoped lang="less">
    .record-card{
        padding: 14px 20px;
        box-sizing: border-box;
        .img-wrap{
            .imgs{
                position: relative;
                overflow: hidden;
                border-radius: 10px;
                &:after{
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    z-index: 10;
                    content: "";
                    position: absolute;
                    transition: all 0.2s ease-in-out;
                }
                >div{
                    font-size: 0px;
                    transition: transform 0.3s ease-in-out;
                    white-space: nowrap;
                    >img{
                        width: 100%;
                        display: inline-block;
                    }
                }
                &:hover{
                    >div {
                        transform: translateX(-100%);
                    }
                    &:after{
                        background-color: rgba(0,0,0,0.1);
                    }

                }
            }
            .t{
                font-size: 26px;
                margin-top: 12px;
                line-height: 36px;
                font-weight: bold;
            }
            .d{
                color: #575757;
                font-size: 24px;
                margin-top: 10px;
                line-height: 24px;
            }
        }
    }
    @media screen and (min-width: 0px){
        .record-card{
            padding: 6px 6px 20px 6px;
            .img-wrap{
                .imgs{
                    border-radius: 6px;
                }
            }
        }
    }

    @media screen and (min-width: 768px){
        .record-card{
            padding: 16px;
        }
    }
</style>
