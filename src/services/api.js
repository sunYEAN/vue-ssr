import axios from 'axios';

export const getHomeData = (params) => axios.get('/admin/issue', {params});

export const getIssueDetail = (id) => axios.get('/admin/issue/' + id);
