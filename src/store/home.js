import {getHomeData} from '@service/api';
export default {
    state: {
        list: [],
    },
    actions: {
        getHomeData ({commit, state}) {
            if (state.list.length) return state.list;
            return getHomeData().then(res => {
                commit('SET_HOME_DATA', res.data);
                return res;
            });
        }
    },
    mutations: {
        ['SET_HOME_DATA'] (state, data) {
            state.list = data;
        },
    }
}
