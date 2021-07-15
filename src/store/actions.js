import * as types from './mutations-types'
import endpoint, { getError } from '../endpoint'

// import io from '../endpoint/socket'

export default {
    // para obtener la lista de keywords
    fetchKeywords({commit}){
        // ejecutamos una mutacion para cambiar el estado de "fetchingData" 
        commit(types.FETCH_KEYWORDS_REQUEST)
        // ejecutamos getKeywords
        endpoint.getKeywords()
            .then(res => {
                const { list } = res
                // ejecutamos una mutacion donde le pasaremos la lista obtenida por el endpoint
                commit( types.FETCH_KEYWORDS_SUCCESS, { list } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                // ejecutamos esta mutacion en caso de haber obtenido alguna clase de error
                commit( types.FETCH_KEYWORDS_FAILURE, { error } )
            })
    },
    // para guardar un keyword
    saveKeyword({commit}, { text } ){
        // ejecutamos una mutacion para cambiar el estado de "fetchingData" de "save"
        commit( types.FETCH_KEYWORD_SAVE_REQUEST )
        // guardamos un keyword
        endpoint.saveKeyword({ text })
            .then(res => {
                const { id, text } = res
                // ejecutamos una mutacion donde le pasaremos la data obtenida por el endpoint
                commit( types.FETCH_KEYWORD_SAVE_SUCCESS, { id, text } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                // ejecutamos esta mutacion en caso de haber obtenido alguna clase de error
                commit( types.FETCH_KEYWORD_SAVE_FAILURE, { error } )
            })
    },

    fetchEvents({commit},{ keywords }){
        // ejecutamos esta mutacion para setear los keywords en los states
        commit( types.SET_KEYWORDS, { keywords } )
        // ejecutamos una mutacion para cambiar el estado de "fetchingData" pero esta vez de "events"
        commit(types.FETCH_EVENTS_REQUEST)
        // ejecutamos getKeywords
        endpoint.getEvents({ keywords })
            .then(res => {
                const { list } = res
                // ejecutamos una mutacion donde le pasaremos la data obtenida por el endpoint
                commit( types.FETCH_EVENTS_SUCCESS, { list } )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                // ejecutamos esta mutacion en caso de haber obtenido alguna clase de error
                commit( types.FETCH_EVENTS_FAILURE, { error } )
            })
    },

    saveEvent({commit}, { description, keywords, coordenadas } ){
        // ejecutamos una mutacion para cambiar el estado de "fetchingData" de "save" de "event"
        commit( types.FETCH_EVENT_SAVE_REQUEST )
        // ejecutamos saveEvent
        endpoint.saveEvent({ description, keywords, coordenadas })
            .then(res => {
                const { description, keywords, coordenadas } = res
                // ejecutamos una mutacion donde le pasaremos la data obtenida por el endpoint
                commit( types.FETCH_EVENT_SAVE_SUCCESS, { description, keywords, coordenadas }  )
            } )
            .catch( err => {
                const error = getError(err.response)?.message ? getError(err.response).message : 'Inaccesible'
                // ejecutamos esta mutacion en caso de haber obtenido alguna clase de error
                commit( types.FETCH_EVENT_SAVE_FAILURE, { error } )
            })
    },
}