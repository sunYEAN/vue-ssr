import axios from 'axios';
export function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                info: {
                    id: id,
                    nick: '1',
                    age: '0',
                    tel: '15520074747'
                }
            })
        }, 200);
    })
}
const parseFetch = (ms, fn) => {
    return function () {
        return new Promise((resolve) => {
            return fn.apply(null, [...arguments]).then(res => {
                setTimeout(() => {
                    resolve(res);
                }, ms);
            });
        })
    }
};

export const getHomeData = (params) => axios.get('/admin/issue/get', {params});

export const getIssueDetail = (id) => axios.get('/admin/issue/' + id);
