import {getIssueDetail} from '../services/api';

export function createModule() {
    return {
        state: {
            issue: {}
        },
        actions: {
            getIssueById ({commit, state}, id) {
                if (state.issue._id === id) return;
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
    };
}
