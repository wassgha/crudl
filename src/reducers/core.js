import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import { types } from '../actions/core'

/**
 * The initial core state. Add variables as you like.
 */
export const initialState = {
    auth: {
        loggedIn: false,
        requestHeaders: {},
        info: {},
    },
    cache: {
        listView: {
            key: undefined,
            state: undefined,
        },
    },
    activeView: undefined,
    permissions: {},
    admin: { id: undefined },
}

/**
 * Returns a copy of the state with a new value of the given variable
 */
function transit(state, variable, value) {
    // FIXME: deep copying of the whole state can be eventually slow...
    const newState = cloneDeep(state)
    set(newState, variable, value)
    return newState
}

function coreReducer(state = initialState, action) {
    // A simpler transit function:
    const t = (variable, value) => transit(state, variable, value)

    switch (action.type) {
        case types.LOGIN:
            return t('auth', {
                loggedIn: true,
                requestHeaders: action.auth.requestHeaders || {},
                info: action.auth.info || {},
            })
        case types.LOGOUT:
            return t('auth', { loggedIn: false, requestHeaders: {}, info: {} })
        case types.CACHE_SET_LISTVIEW:
            return t('cache', { listView: action.data })
        case types.CACHE_CLEAR_LISTVIEW:
            return t('cache', { listView: initialState.cache.listView })
        case types.ACTIVE_VIEW_SET:
            return t('activeView', action.ref)
        case types.ACTIVE_VIEW_CLEAR:
            return t('activeView', undefined)
        case types.SET_PERMISSIONS:
            return t('permissions', action.permissions)
        default:
            return state
    }
}

export default coreReducer
