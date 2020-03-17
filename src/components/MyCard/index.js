import LayoutOne from './LayoutOne';
import LayoutTwo from './LayoutTwo';
import LayoutThree from './LayoutThree';

export const withEvent = (CardComponent) => {

    return {
        props: CardComponent.props,
        methods: {
            // 统一做点击处理
            handleCardTap (info, e) {
                // todo
                this.$emit('onTap', info);
            }
        },
        render(h) {
            return h('div', {
                on: {
                    'click': this.handleCardTap.bind(this, this.$props.info)
                }
            }, [
                h(CardComponent, {
                    props: this.$props,
                    attrs: this.$attrs,
                    on: this.$listeners,
                    scopedSlots: this.$scopedSlots
                })
            ]);
        }
    };

};

export default {
    CardLayoutOne: withEvent(LayoutOne),
    CardLayoutTwo: withEvent(LayoutTwo),
    CardLayoutThree: withEvent(LayoutThree),
};
