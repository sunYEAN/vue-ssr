<template>
    <div class="swiper-slider-node" @click="handlerClick">
        <slot></slot>
    </div>
</template>

<style rel="stylesheet/less" lang="less">
    .swiper-slider-node {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        flex-shrink: 0;
        overflow: hidden;
    }
</style>

<script>
	export default {
		methods: {
			handlerClick(){
				this.$emit( 'click' );
			}
		}
	};
</script>