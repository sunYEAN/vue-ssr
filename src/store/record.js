export default {
    state: {
        list: [],
        banners: [],
    },
    actions: {
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
