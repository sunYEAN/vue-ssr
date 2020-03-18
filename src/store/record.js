import {getRecordBanner, getDataByCate} from '../services/api';
export default {
    state: {
        list: [],
        banners: [],
    },
    actions: {
        getRecordBanners ({commit, state}) {
            if (state.banners.length) return state.banners;
            return getRecordBanner().then(res => {
                commit('SET_BANNERS', res.data);
                return res;
            });
        },

        getDataByCate ({commit, state}, cateId) {
            if (state.list.length) return state.list;
            return getDataByCate(cateId).then(res => {
                commit('SET_RECORD_DATA', res.data);
                return res;
            });
        }
    },
    mutations: {
        ['SET_BANNERS'] (state, data) {
            state.banners = data;
        },
        ['SET_RECORD_DATA'] (state, data) {
            state.list = data;
        },
    }
}
