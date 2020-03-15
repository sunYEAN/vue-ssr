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

export const getHomeData = parseFetch(800,() => axios.get('/api/getHomeData'));
export const getProvince = parseFetch(200,() => axios.get('/api/getCityData'));
export const getRecordBanner = parseFetch(300,() => axios.get('/api/getHomeBanner'));
