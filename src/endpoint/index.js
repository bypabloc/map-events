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

    getEvents(){
        return endpoint.get({
            url: 'events',
        })
    },
    saveEvent( { text } ){
        return endpoint.post({
            url: 'events',
            params: { text },
        })
    },
}

export const getError = response => {
    const err = response?.status ? response.status : null

    if(err){
        let res = {
            message: '',
        }

        console.log('err',err)
        console.log('response',response)

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
