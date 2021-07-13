import * as types from './mutations-types'

export default {

    [types.FETCH_KEYWORDS_REQUEST] (state){
        state.keywords.fetchingData = true;
        state.keywords.error = null;
    },
    [types.FETCH_KEYWORDS_SUCCESS] (state, { list } ){
        state.keywords.fetchingData = false;
        state.keywords.error = null;
        state.keywords.data = { list };
    },
    [types.FETCH_KEYWORDS_FAILURE] (state, { error }){
        state.keywords.fetchingData = true;
        state.keywords.error = error;
    },
    [types.FETCH_KEYWORD_SAVE_REQUEST] (state){
        state.keywords.save.fetchingData = true;
        state.keywords.save.error = null;
    },
    [types.FETCH_KEYWORD_SAVE_SUCCESS] (state, { text, created_by, created_at } ){
        state.keywords.save.fetchingData = false;
        state.keywords.save.error = null;
        state.keywords.save.data = { text, created_by, created_at };
        // state.keywords.data.data = [ { text, created_by, created_at } , ...state.keywords.data.data ];
    },
    [types.FETCH_KEYWORD_SAVE_FAILURE] (state, { error }){
        state.keywords.save.fetchingData = false;
        state.keywords.save.error = error;
    },

    [types.FETCH_EVENTS_REQUEST] (state){
        state.events.fetchingData = true;
        state.events.error = null;
    },
    [types.FETCH_EVENTS_SUCCESS] (state, { list } ){
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
    [types.FETCH_EVENT_SAVE_SUCCESS] (state, { text, created_by, created_at } ){
        state.events.save.fetchingData = false;
        state.events.save.error = null;
        state.events.save.data = { text, created_by, created_at };
        // state.events.data.data = [ { text, created_by, created_at } , ...state.events.data.data ];
    },
    [types.FETCH_EVENT_SAVE_FAILURE] (state, { error }){
        state.events.save.fetchingData = false;
        state.events.save.error = error;
    },
}
