import LayoutIssueOne from './LayoutIssueOne';
import LayoutIssueTwo from './LayoutIssueTwo';
import LayoutIssueThree from './LayoutIssueThree';
import LayoutIssueFour from './LayoutIssueFour';

import './common.less';

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
    CardLayoutIssueOne: withEvent(LayoutIssueOne),
    CardLayoutIssueTwo: withEvent(LayoutIssueTwo),
    CardLayoutIssueThree: withEvent(LayoutIssueThree),
    CardLayoutIssueFour: withEvent(LayoutIssueFour),
};
