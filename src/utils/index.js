export function throttle(fn, time) {
    let timer = null;
    let first = true;
    return function () {
        if (timer) return;
        if (first) {
            fn(...arguments);
            first = false;
            return;
        }
        timer = setTimeout(() => {
           clearTimeout(timer);
           fn(...arguments);
           timer = null;
        }, time);
    }
}
