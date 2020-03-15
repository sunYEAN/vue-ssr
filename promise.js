


class Promise {
    constructor (executor) {
        this.status = 'pending';
        this.value = undefined; // promise的结果
        this.errMessage = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        // 不让外部更改，私有方法 箭头函数 绑定当前this
        const reject = (err) => {
            // todo 错误回调
            // 只能在pending的状态下取执行resolve和reject
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.errMessage = err;
            }
        };
        const resolve = (res) => {
            // todo 正确回调
            if (this.status === 'pending') {
                this.status = 'fulfilled';
                this.value = res;
            }
        };

        // 立即执行promise中的方法, 有可能会抛出错误
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    // A+ 规范规定
    // 1、必须提供一个then方法 来访问当前promise实例的value或者errMessage
    // 2、promise的then方法接收两个参数，成功回调onFulfilled 失败回调onRejected
    // 3、如果onFulfilled 和 onRejected 不是函数的时候，将被忽略。
    // 4、onFulfilled回调函数将在 fulfilled 状态“后”执行且只能执行一次
    // 5、onRejected回调函数将在 rejected 状态“后”执行且只能执行一次
    // 6、
    // 7、同意个promise的then方法可以多次调用
    // 7.1 当同一个promise状态变为fulfilled后，需要依次执行then传递的方法(需要一个队列保存当前promise中的then传递的方法)
    // 7.1 rejected同理
    then (onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled !== "function" ? (res) => res : onFulfilled;
        onRejected = typeof onRejected !== "function" ? (err) => {throw err;} : onRejected;

        let self = this;
        let promise2;
        // then方法需要返回一个新的promise实例
        return promise2 = new Promise(function (resolve, reject) {
            // 三种状态都判断一下
            if (self.status === 'fulfilled') {}
            if (self.status === 'rejected') {}
            if (self.status === 'pending') {}
        })
    }
}

const promise1 = new Promise((resolve, reject) => {
    resolve(1);
   // throw 'throw';
   // reject('err');
});

promise1.then(res => {
   console.log(res);
});


//
// new Promise(function (resolve, reject) {
//     resolve(1);
// }).then(res => {
//     console.log(res);
// });
