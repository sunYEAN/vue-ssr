import {getIssueDetail} from '../services/api';

export function createModule() {
    return {
        state: {
            issue: {}
        },
        actions: {
            getIssueById ({commit, state}, id) {
                return getIssueDetail(id).then(res => {
                    console.log(res)
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
