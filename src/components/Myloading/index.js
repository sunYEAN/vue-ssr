class LineProcess {
    constructor() {
        this.count = 0;
        this.finish = 0;
        this.$el = document.createElement('div');
        this.$el.style.cssText = 'top: 0;left: 0;width: 0;position: fixed;z-index: 1000;background-color: #333;height: 2px;transition: all 0.1s linear;';
        document.getElementsByTagName('body')[0].appendChild(this.$el);
    }

    renderWidth (str) {
        this.$el.style.width = str;
    }

    addQueue () {
        this.count ++;
    }
    endQueue () {
        this.finish ++;
        if (this.finish === this.count) {
            this.renderWidth('100%');
            setTimeout(() => {
                this.renderWidth(0);
            }, 100)
        }
    }


    start () {}

    renderLine () {

    }
}

export default LineProcess;
