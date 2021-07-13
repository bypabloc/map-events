import * as types from './mutations-types'
import endpoint, { getError } from '../endpoint'

export default {
    fetchKeywords({commit}){

        commit(types.FETCH_KEYWORDS_REQUEST)
        endpoint.getKeywords()
            .then(res => {
                console.log('res',res)
                const { list } = res
                commit( types.FETCH_KEYWORDS_SUCCESS, { list } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_KEYWORDS_FAILURE, { error } )
            })
    },
    saveKeyword({commit}, { text } ){
        commit( types.FETCH_KEYWORD_SAVE_REQUEST )
        endpoint.saveKeyword({ text })
            .then(res => {
                const { text, created_by, created_at } = res.data
                commit( types.FETCH_KEYWORD_SAVE_SUCCESS, { text, created_by, created_at } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_KEYWORD_SAVE_FAILURE, { error } )
            })
    },

    fetchEvents({commit}){

        commit(types.FETCH_EVENTS_REQUEST)
        endpoint.getEvents()
            .then(res => {
                console.log('res',res)
                const { list } = res
                commit( types.FETCH_EVENTS_SUCCESS, { list } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_EVENTS_FAILURE, { error } )
            })
    },
    saveEvent({commit}, { text } ){
        commit( types.FETCH_EVENT_SAVE_REQUEST )
        endpoint.saveEvent({ text })
            .then(res => {
                const { text, created_by, created_at } = res.data
                commit( types.FETCH_EVENT_SAVE_SUCCESS, { text, created_by, created_at } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_EVENT_SAVE_FAILURE, { error } )
            })
    },
}