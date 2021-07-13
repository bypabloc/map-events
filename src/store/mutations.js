import * as types from './mutations-types'

export default {
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
