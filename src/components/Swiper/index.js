/**
 * 轮播插件
 * 采用下标作为驱动轮播滚动，在滚动时长speed较长时动画效果不理想
 * @Author: Jafish
 * @Date: 2018-07-24 16:50:15
 * @Last Modified by: Jafish
 * @Last Modified time: 2018-07-24 16:52:07
 */
import Swiper from './swiper.vue';
// import Slider from './slider.vue';

export {
	Swiper
}

export default {
	install( vue ){

		vue.mixin( {
			created(){
				if ( !this.id ) return;
				( !vue.prototype.$swiper ) && ( vue.prototype.$swiper = {} );
				vue.prototype.$swiper[ this.id ] = this;
			}
		} );

		vue.component( 'Swiper', Swiper );
		// vue.component( 'slider', Slider );
	}
};
