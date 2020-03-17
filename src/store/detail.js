import {getIssueDetail} from '../services/api';
export default {
    state: {
        issue: {}
    },
    actions: {
        getIssueById ({commit, state}, id) {
            return getIssueDetail(id).then(res => {
                commit('SET_ISSUE', res.data);
            });
        }
    },
    mutations: {
        ['SET_ISSUE'] (state, issue) {
            state.issue = issue;
        }
    }
}
