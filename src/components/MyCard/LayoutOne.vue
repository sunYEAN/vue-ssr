<template>
    <div class="card-layout card-layout-one">
        <div class="content">
            <img v-if="info.poster && info.poster.length" class="cover" :src="info.poster[0]" alt="">

            <div class="c-info">
                <h3>{{info.layout}}{{info.title}}</h3>
                <p class="line-2">{{info.desc}}</p>
            </div>
        </div>
        <div class="desc">
            <label>发布：</label><span>{{info.edit_time}}</span>
            <label>更新：</label><span>{{info.update_time}}</span>
            <label>分类：</label><span class="cate">{{info.cate}}</span>
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
                width: 90px;
                height: 114px;
                flex-shrink: 0;
                margin-right: 8px;
            }
            .c-info{
                overflow: hidden;
                h3{
                    color: #333;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                p{
                    color: #93939F;
                    -webkit-line-clamp: 3;
                }
            }
        }
        .desc{
            font-size: 12px;
            margin-top: 10px;
            >span{
                color: #93939F;
                margin-right: 10px;
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
