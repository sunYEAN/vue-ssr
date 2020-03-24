import axios from 'axios'
import LineProcess from '../components/Myloading';

// const lineProcess = new LineProcess();
// lineProcess.start();

axios.defaults.baseURL = '/api';

axios.interceptors.request.use(function (config) {

    // lineProcess.addQueue();

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // lineProcess.endQueue();
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

