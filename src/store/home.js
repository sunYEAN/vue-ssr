import {getHomeData} from '@service/api';

let Loading = false;
export default {
    state: {
        data: {
            page: 1,
            list: [],
            isEnd: false,
            pageSize: 5,
        },
    },
    actions: {
        getHomeData ({commit, state}) {
            if (state.data.isEnd || Loading) return;
            Loading = true;
            const {data: {page, pageSize}} = state;
            commit('SET_CURRENT_PAGE', page + 1);
            return getHomeData({
                page,
                page_size: pageSize
            }).then(res => {
                commit('SET_HOME_DATA', res.data);
                Loading = false;
                return res;
            });
        }
    },
    mutations: {
        ['SET_HOME_DATA'] (state, {isEnd, list}) {
            state.data.isEnd = isEnd;
            state.data.list.push(...list);
        },
        ['SET_CURRENT_PAGE'] (state, page) {
            state.data.page = page;
        }
    }

}
