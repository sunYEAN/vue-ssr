import {getDataByCate} from '../services/api';
export default {
    state: {
        list: [],
    },
    actions: {
        getDataByCate ({commit, state}, cateId) {
            if (state.list.length) return state.list;
            // return getDataByCate(cateId).then(res => {
            //     commit('SET_ISSUE_DATA', res.data);
            //     return res;
            // });
        }
    },
    mutations: {
        ['SET_ISSUE_DATA'] (state, data) {
            state.list = data;
        },
    }
}
