import axios from 'axios';

const isClientDev = process.env.ENVIRONMENT === 'dev';

let baseURL = process.env.VUE_ENV === 'client' ? '/api' : 'http://localhost:3000/';

console.log(baseURL);

const request = axios.create({
    baseURL
});

request.interceptors.request.use(function (config) {

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么

return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default request;
