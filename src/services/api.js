import request from './axios';

export const getHomeData = (params) => {
    console.log(params, 'params');
    return request.get('/admin/issue', {params});
};

export const getIssueDetail = (id) => request.get('/admin/issue/get', {
    params: {id}
});
