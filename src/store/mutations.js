import * as types from './mutations-types'

export default {

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
        state.keywords.data.list.push({ id: text, text });
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

    "SOCKET_KEYWORD_ADD"(state, { text }) {
        state.keywords.data.list.push({ id: text, text });
    },
    "SOCKET_EVENT_ADD"(state, { description, keywords, coordenadas }) {
        const keywordsFiltered = state.keywordsFiltered
        if(keywordsFiltered.length>0){
            const matched = keywordsFiltered.filter(element => keywords.includes(element));
            if(matched.length>0){
                state.events.data.list.push({ description, keywords, coordenadas });
            }
        }else{
            state.events.data.list.push({ description, keywords, coordenadas });
        }
    },
    "SOCKET_LIST"(state, { list }) {
        console.log('list',list)
        // state.events.data.list = list;
    },
}
