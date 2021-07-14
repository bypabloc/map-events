import axios from 'axios'

const baseURL = 'http://localhost:3000'
// const baseURL = 'http://twitter-api.prueba/api/v1'

let headers = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    device: `SO: ${navigator.platform} || Navegador: ${navigator.userAgent}`,
};

export default {
    
    get({url,params}){
        const instance = axios.create({
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache', 
            baseURL,
            headers,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
        });

        return instance.get(url,params)
            .then( res => res.data )
    },
    post({url,params}){
        const instance = axios.create({
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache', 
            baseURL,
            headers,
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
        });
        return instance.post(url,params)
            .then( res => res.data )
    },
}