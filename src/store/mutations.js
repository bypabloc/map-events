import * as types from './mutations-types'

export default {

    // la accion de cada una de estas mutaciones esta explicada en el "actions"
    // a exceppcion de las de sockets
    [types.FETCH_KEYWORDS_REQUEST] (state){
        state.keywords.fetchingData = true;
        state.keywords.error = null;
    },
    [types.FETCH_KEYWORDS_SUCCESS] (state, { list } ){
        state.keywords.fetchingData = false;
        state.keywords.error = null;
        state.keywords.data.list = list.map((x) => {
            return {
                id: x.text,
                text: x.text,
            };
        });
    },
    [types.FETCH_KEYWORDS_FAILURE] (state, { error }){
        state.keywords.fetchingData = true;
        state.keywords.error = error;
    },
    [types.FETCH_KEYWORD_SAVE_REQUEST] (state){
        state.keywords.save.fetchingData = true;
        state.keywords.save.error = null;
    },
    [types.FETCH_KEYWORD_SAVE_SUCCESS] (state, { id, text } ){
        state.keywords.save.fetchingData = false;
        state.keywords.save.error = null;
        state.keywords.save.data = { id, text };
    },
    [types.FETCH_KEYWORD_SAVE_FAILURE] (state, { error }){
        state.keywords.save.fetchingData = false;
        state.keywords.save.error = error;
    },

    [types.FETCH_EVENTS_REQUEST] (state){
        state.events.fetchingData = true;
        state.events.error = null;
    },
    [types.FETCH_EVENTS_SUCCESS] (state, { list }){
        state.events.fetchingData = false;
        state.events.error = null;
        state.events.data = { list };
    },
    [types.FETCH_EVENTS_FAILURE] (state, { error }){
        state.events.fetchingData = true;
        state.events.error = error;
    },
    [types.FETCH_EVENT_SAVE_REQUEST] (state){
        state.events.save.fetchingData = true;
        state.events.save.error = null;
    },
    [types.FETCH_EVENT_SAVE_SUCCESS] (state, { description, keywords, coordenadas } ){
        state.events.save.fetchingData = false;
        state.events.save.error = null;
        state.events.save.data = { description, keywords, coordenadas };
        // state.events.data.data = [ { text, created_by, created_at } , ...state.events.data.data ];
    },
    [types.FETCH_EVENT_SAVE_FAILURE] (state, { error }){
        state.events.save.fetchingData = false;
        state.events.save.error = error;
    },

    [types.SET_KEYWORDS] (state, { keywords } ){
        state.keywordsFiltered = keywords;
    },

    // sockets:
    // este socket respondera cada vez que se emita un envio desde el backend a "KEYWORD_ADD"
    // los keywords se disparan a todas los users que utilicen el sistema
    "SOCKET_KEYWORD_ADD"(state, { text }) {
        state.keywords.data.list.push({ id: text, text });
    },
    // los events llegaran por un filtrado en el backend (debe pertenecer a la sala correspondiente)
    // desde el backend espera ser llamado como "EVENT_ADD"
    "SOCKET_EVENT_ADD"(state, { description, keywords, coordenadas }) {
        state.events.data.list.push({ description, keywords, coordenadas });
    },
}
