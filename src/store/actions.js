import * as types from './mutations-types'
import endpoint, { getError } from '../endpoint'

// import io from '../endpoint/socket'

export default {
    
    setKeywordsFiltered({commit}, { keywords } ){
        commit( types.SET_KEYWORDS, { keywords } )
    },

    fetchKeywords({commit}){
        commit(types.FETCH_KEYWORDS_REQUEST)
        endpoint.getKeywords()
            .then(res => {
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
                const { id, text } = res
                commit( types.FETCH_KEYWORD_SAVE_SUCCESS, { id, text } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_KEYWORD_SAVE_FAILURE, { error } )
            })
    },

    fetchEvents({commit},{ keywords }){
        commit(types.FETCH_EVENTS_REQUEST)
        endpoint.getEvents({ keywords })
            .then(res => {
                const { list } = res
                commit( types.FETCH_EVENTS_SUCCESS, { list } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_EVENTS_FAILURE, { error } )
            })
    },

    saveEvent({commit}, { description, keywords, coordenadas } ){
        commit( types.FETCH_EVENT_SAVE_REQUEST )
        endpoint.saveEvent({ description, keywords, coordenadas })
            .then(res => {
                const { description, keywords, coordenadas } = res
                commit( types.FETCH_EVENT_SAVE_SUCCESS, { description, keywords, coordenadas }  )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                commit( types.FETCH_EVENT_SAVE_FAILURE, { error } )
            })
    },
}