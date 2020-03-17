// 高阶函数
Function.prototype.before = function (callback) {
    const _self = this;
    return function (...args) {
        callback.call(_self, ...args);
        _self.call(_self, ...args);
    }
};
function tellName(name) {
    console.log(`my name is ${name}`);
}
const newHi = tellName.before(function () {
    console.log('hi');
});
newHi();


function add(x) {
    return function (y) {
        return x + y;
    }
}
add(10)(20);


// 函数柯里化
function curring(fn, ...args) {
    if (fn.length <= args.length) return fn(...args);

    return function (...args2) {
        return curring(fn, ...args, ...args2);
    }
}
function add(a, b, c, d) {
    return a + b + c + d;
}

const newAdd = curring(add);
newAdd(1)(2)(3)(4);


// A+规范的promise
const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};

class Promise {
    constructor(executor) {

        this.status = STATUS.PENDING;
        this.value;
        this.reason;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (res) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FULFILLED;
                this.value = res;
                this.onResolvedCallbacks.forEach(callback => callback(this.value));
            }
        };

        let reject = (err) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = err;
                this.onRejectedCallbacks.forEach(callback => callback(this.reason));
            }
        };

        // 立即执行传入的方法，并把resolve和reject方法给其当做参数调用
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === "function" ? onRejected : (reason) => {
            throw reason;
        };

        const _self = this;

        let promise2 = new Promise((resolve, reject) => {
            if (_self.status === STATUS.PENDING) {
                _self.onResolvedCallbacks.push((value) => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(value);
                            Promise.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
                _self.onRejectedCallbacks.push((reason) => {
                    setTimeout(() => {
                        try {
                            // 得到promise1 -> then的返回值
                            const x = onRejected(reason);
                            Promise.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }

            // 已完成
            else if (_self.status === STATUS.FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(_self.value);
                        Promise.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            }
            // 已拒绝
            else if (_self.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(_self.reason);
                        Promise.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            }
        });

        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    //
    static resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            reject(new TypeError('Chaining cycle detected for promise ---'));
        }

        let called = false;

        if (x instanceof Promise) {
            x.then(value => {
                Promise.resolvePromise(promise2, value, resolve, reject);
            }, reason => {
                reject(reason);
            })
        } else if (x !== null && (typeof x === "object") || typeof x === "function") {
            try {
                const then = x.then;
                if (typeof then === "function") {
                    then.call(x, value => {
                        if (called) return;
                        called = true;
                        Promise.resolvePromise(promise2, value, resolve, reject);
                    }, reason => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    })
                } else {
                    if (called) return;
                    called = true;
                    resolve(x);
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }
}

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;
