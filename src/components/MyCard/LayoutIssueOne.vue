<template>
    <div class="card-layout card-layout-one">
        <div class="content">
            <img v-if="info.poster && info.poster.length" class="cover" :src="info.poster[0]" alt="">

            <div class="c-info">
                <h3 class="line-2">{{info.layout}}{{info.title}}</h3>
                <p class="line-2">{{info.desc}}</p>
            </div>
        </div>
        <div class="desc">
            <span>{{info.create_time}}</span>
            <!--<label>更新：</label><span>{{info.update_time}}</span>-->
            <span class="cate">{{info.cate && info.cate.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardLayoutOne",
        props: {
            size: {
                type: String,
                default: 'normal',
            },
            info: Object
        }
    }
</script>


<style scoped lang="less">
    @import "./common";
    @defaultColor: #c87c1c;
    .card-layout-one{
        .content{
            display: flex;
            img.cover{
                width: 180px;
                height: 228px;
                flex-shrink: 0;
                margin-right: 16px;
            }
            .c-info{
                overflow: hidden;
                h3{
                    color: #333;
                    margin-bottom: 10px;
                }
                p{
                    color: #93939F;
                    margin-top: 0;
                    -webkit-line-clamp: 3;
                }
            }
        }
    }

    /*.cover-small{*/
    /*    .cover-box{*/
    /*        width: 60px;*/
    /*        height: 60px;*/
    /*        flex-shrink: 0;*/
    /*        img.cover{*/
    /*            width: 40px;*/
    /*            height: 40px;*/
    /*            border-radius: 50%;*/
    /*        }*/
    /*    }*/
    /*    .info{*/
    /*        h3.i-name{*/
    /*            font-size: 14px;*/
    /*            line-height: 28px;*/
    /*        }*/
    /*        p.i-desc{*/
    /*            font-size: 12px;*/
    /*            line-height: 16px;*/

    /*            display: -webkit-box;*/
    /*            -webkit-line-clamp: 2;*/
    /*            -webkit-box-orient: vertical;*/
    /*            text-overflow: ellipsis;*/
    /*            overflow: hidden;*/
    /*        }*/
    /*    }*/
    /*}*/
</style>
