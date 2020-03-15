import {getRecordBanner} from '@service/api';
export default {
    state: {
        banners: [],
    },
    actions: {
        getRecordBanners ({commit}) {
            if (state.banners.length) return state.banners;
            return getRecordBanner().then(res => {
                commit('SET_BANNERS', res.data);
                return res;
            });
        }
    },
    mutations: {
        ['SET_BANNERS'] (state, data) {
            state.banners = data;
        },
    }
}
