import endpoint from '../endpoint/settings'

export default {
    getKeywords(){
        return endpoint.get({
            url: 'keywords',
        })
    },
    saveKeyword( { text } ){
        return endpoint.post({
            url: 'keywords',
            params: { text },
        })
    },

    getEvents( { keywords } ){
        return endpoint.post({
            url: 'events-list',
            params: { keywords },
        })
    },
    saveEvent( { description, keywords, coordenadas } ){
        return endpoint.post({
            url: 'events',
            params: { description, keywords, coordenadas },
        })
    },
}

export const getError = response => {
    const err = response?.status ? response.status : null

    if(err){
        let res = {
            message: '',
        }
        if(err===422){
            res.message = response?.data?.errors ? response.data.errors.join('<br/>') : ''
        }else if(err===401){
            res.message = response?.data?.errors ? response.data.errors.join('<br/>') : ''
        }else{
            res.message = response?.statusText ? response.statusText : null
        }

        return res
    }
}
