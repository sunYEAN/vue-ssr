<template>
   <div
      class="swiper-container"
      :class="{vertical: vertical}"
      :style="vertical && domLoad ? `height: ${DOM.offset}px;` : ''"
      @touchstart="_touchContainer($event, 'Start')"
      @touchmove="_touchContainer($event, 'Move')"
      @touchend="_touchContainer($event, 'End')"
      v-if="coversLength"
   >
      <div
         class="swiper-context"
         :style="_transform"
         ref="swiperContext"
      >
         <SwiperSlider 
            class="swiper-context_slider"
            v-for="(cover, index) in coversList" 
            :key="`slider-${index}`"
         >
            <slot :data="cover">
               <div 
                  class="swiper-context_slider-default" 
                  @click="location(cover.url)"
               >
                  <img :src="cover.img" @load="imageLoad" />
                  <p class="slide-dec">{{cover.title}}</p>
               </div>
            </slot>
         </SwiperSlider>
      </div>
      <div class="swiper-pagination">
         <span
            v-for="index in coversLength"
            :key="`swiper-pagination_bullet-${index}`"
            class="swiper-pagination_bullet"
            :class="{'bullet-active': loopActive(index)}"
         />
      </div>
   </div>
</template>

<script type="text/ecmascript">
import SwiperSlider from './slider.vue';

export default {
   props: {
      covers: { // 滚动内容
         type: Array,
         default: () => [],
      },
      time: { // 滚动间隔时长
         type: Number,
         default: 4000,
      },
      speed: { // 滚动动画时长
         type: Number,
         default: 300,
      },
      vertical: { // 是否垂直
         type: Boolean,
         default: false,
      },
      loop: { // 无缝滚动
         type: Boolean,
         default: true
      },
      auto: { // 自动滚动
         type: Boolean,
         default: true,
      },
   },
   components: { SwiperSlider },
   data() {
      return {
         current: 0, // 当前滚动下标
         domLoad: false, // dom加载完成
         disable: true, // 关闭动画
         touchIng: false, // 点击中
         rectifyed: false, // current校正完成
         sameVertical: false, // 滑动与滚动方向相同
         moveOnce: true, // 一次move，校对滚动方向
         DOM: {
            offset: 0, // 偏移距离
            pageX: 0, // 在页面的距离
            pageY: 0,
         },
         touch: { // 相对于节点的位置
            matrix: 0, // 移动中的偏移距离
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
         },
      };
   },

   watch: {
      current(newValue) {
         if (newValue > this.coversList.length - 1) {
            this.current = this.loop ? 1 : this.coversList.length - 1;
         } else if (newValue < 0) {
            this.current = this.loop ? this.coversList.length - 2 : 0
         }
      },
      touch: {
         deep: true,
         handler(newV) {
            if (this.moveOnce) {
               const row = Math.abs(newV.moveX - newV.startX) > Math.abs(newV.moveY - newV.startY);
               this.sameVertical = this.vertical ? (row ? false : true) : (row ? true : false);
            }
         }
		},
		coversLength(newValue, oldValue) {
			if (newValue && newValue !== oldValue && this.awaitLoad) {
				this.$nextTick(() => {
					this.domInit();
					this.auto && this.autoPlay();
				})
			}
		},
   },
   mounted() {
		if (this.coversLength) {
			this.domInit();
			this.auto && this.autoPlay();
		} else {
			// 等待数据进行加载
			this.awaitLoad = true;
		}
   },
   computed: {
      _offset() {
         const offset = this.DOM.offset * this.current;
         if (!this.touchIng || !this.rectifyed) return offset;

         const diff = this.touch[this._move] - this.touch[this._start];

         return this.touch.matrix - diff;
      },
      _transform() {
         const transform = `translate3d(${this.vertical ? `0, ${-this._offset}px` : `${-this._offset}px, 0`}, 0)`;

         return {
            ...this._transition,
            'transform': transform,
            'webkitTransform': transform,
            'mozTransform': transform,
            'msTransform': transform,
         }
      },
      _transition() {
         const transition = `${this.disable ? 0 : this.speed}ms`;

         return {
            'transition-duration': transition,
            'webkitTransition-duration': transition,
            'mozTransition-duration': transition,
            'msTransition-duration': transition
         }
      },
      coversList() {
         return this.loop && this.domLoad ? 
            [this.covers[this.covers.length - 1], ...this.covers, this.covers[0]] : 
            this.domLoad ? this.covers : [this.covers[0]];
      },
      coversLength() {
         return this.covers.length;
      },
      _move() {
         return this.vertical ? 'moveY' : 'moveX';
      },
      _start() {
         return this.vertical ? 'startY' : 'startX';
      },
      _page() {
         return this.vertical ? 'pageY' : 'pageX';
      },
      _offsetDOM() {
         return this.vertical ? 'offsetHeight' : 'offsetWidth';
      },
      
   },
   methods: {
      autoPlay() {
         // 自动播放
         this.autoTimer = setInterval(() => {
            this.disable = false;
            this.current = !this.loop && this.current === this.coversLength - 1 ? 0 : this.current + 1
         }, this.time);
      },
      clearInterval() {
         // 清除定时器
         if (!this.autoTimer) return;

         clearInterval(this.autoTimer);
         this.autoTimer = null;
      },
      _touchContainer(e, name) {
         if (this.sameVertical) {
            // e.stopPropagation();
            e.preventDefault();
         }

         this.disable = true;
         this.touchIng = true;
         this.clearInterval();

         typeof this[`_touch${name}`] === 'function' && this[`_touch${name}`](e);
      },
      _touchStart(e) {
         this.rectifyed = false;
         this.moveOnce = true;
         // this.touch[this._move] = this.touch[this._start] = e.touches[0][this._page] - this.DOM[this._page];
         this.touch.moveX = this.touch.startX = e.touches[0].pageX - this.DOM.pageX;
         this.touch.moveY = this.touch.startY = e.touches[0].pageY - this.DOM.pageY;

         // 坐标校正
         if (this.loop) {
            if (this.current >= this.coversList.length - 1) {
               this.current = this.loop ? 1 : 0;
            } else if (this.current <= 0) {
               this.current = this.coversList.length - 2;
            }
         }

         this.$nextTick(() => {
            this.rectifyed = true;
            
            const style = window.getComputedStyle(this.$refs['swiperContext']);
            const matrix = style.transform || style.MozTransform || style.OTransform || style.MsTransform || style.msTransform  || style.getPropertyValue('transform');
            this.touch.matrix = Math.abs(parseFloat(matrix.split(',')[this.vertical ? 5 : 4]));
         });

         this.$emit('swiperTouchStart', this.current);
      },
      _touchMove(e) {
         // this.touch[this._move] = e.touches[0][this._page] - this.DOM[this._page];
         this.touch.moveX = e.touches[0].pageX - this.DOM.pageX;
         this.touch.moveY = e.touches[0].pageY - this.DOM.pageY;

         this.moveOnce && this.$nextTick(() => this.moveOnce = false);

         this.$emit('swiperTouchMove', this.current);
      },
      _touchEnd(e) {
         this.touchIng = false;
         this.disable = false;
         this.sameVertical = false;

         const diff = this.touch[this._move] - this.touch[this._start];
         const criterion = this.DOM.offset / 10;
         if (diff > criterion) {
            this.current--;
         } else if (diff < -criterion) {
            this.current++;
         }

         this.auto && this.autoPlay();

         this.$emit('swiperTouchEnd', this.current);
      },
      domInit() {
         // 获取节点偏移距离
         this.DOM.offset = this.$refs['swiperContext'][this._offsetDOM] / (this.vertical ? this.coversLength : 1);
         // 获取节点所在窗口位置
         const { x, y, left, top } = (this.$refs['swiperContext'].parentNode || this.$refs['swiperContext'].parentElement).getBoundingClientRect();
         // 获取页面滚动位置
         const d = document;
         const { scrollTop, scrollLeft } = 
            d.scrollingElement && (d.scrollingElement.scrollTop || d.scrollingElement.scrollLeft) ? d.scrollingElement :
            d.documentElement && (d.documentElement.scrollTop || d.documentElement.scrollLeft) ? d.documentElement :
            d.body && (d.body.scrollTop || d.body.scrollLeft) ? d.body : { scrollTop: 0, scrollLeft: 0 };
         // 获取节点所在文档位置
         this.DOM.pageX = (x || left) - scrollLeft;
         this.DOM.pageY = (y || top) - scrollTop;
         // 改变下标
         if (this.loop) this.current = 1;
         // dom加载完成 -> 判断是否无缝轮播 -> 添加两边节点
         this.domLoad = true;
         // 监听 transition 
         const transitionEvents = ['transitionend', 'webkitTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd'];
         transitionEvents.forEach(e => this.$refs['swiperContext'].addEventListener(e, this.transitionEnd.bind(this)));
      },
      imageLoad(e) {
         // 图片加载完成，修正偏移距离
         if (this.vertical) this.DOM.offset = e.path[0][this._offsetDOM];
      },
      transitionEnd() {
         // 动画结束
         this.disable = true;
         if (this.loop) {
            if (this.current === this.coversList.length - 1) this.current = 1;
            else if (this.current === 0) this.current = this.coversList.length - 2;
         }

         this.$emit('swiperAnimationed', this.current);
      },
      loopActive(index) {
         // 无缝滚动时的游标校准
         if (!this.loop || !this.domLoad) return index === this.current + 1;

         return index === this.current || (index === this.coversLength && this.current === 0) || (index === 1 && this.current === this.coversList.length - 1);
      },
   },
   
};
</script>

<style rel="stylesheet/less" lang="less">
.swiper-container {
  position: relative;
  overflow: hidden;
   
  .swiper-context {
    height: 100%;
    display: flex;
    transition-property: transform, -webkit-transform;
    .swiper-context_slider {
      position: relative;
    }
    .swiper-context_slider-default {
      height: 100%;
      width: 100%;
    }
    .slide-dec {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 68px;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      line-height: 70px;
      padding-left: 30px;
      font-size: 26px;
      letter-spacing: 0.8px;
    }
    img {
      vertical-align: top;
      width: 100%
    }
  }
  &.vertical {
    .swiper-context {
      flex-direction: column;
    }
  }
  .swiper-pagination {
    position: absolute;
    right: 20px;
    bottom: 0;
    height: 68px;
    line-height: 0;
    display: flex;
    align-items: center;
    .swiper-pagination_bullet {
      margin: 0 6px;
      // display: inline-block;
      height: 12px;
      width: 12px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
    }
    .bullet-active {
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
</style>