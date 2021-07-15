import axios from 'axios'

// importamos la url base (endpoint), sino es indicada en un archivo .env entonces tomara el sig caso
export const baseURL = process.env.VUE_APP_BASE_URL ?? 'https://bypabloc-map-events-api.herokuapp.com/';

// una preconfiguracion de los headers
let headers = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    device: `SO: ${navigator?.platform} || Navegador: ${navigator?.userAgent}`,
};
    
// configuracion estandar para las peticiones axios

export default {

    // si se llama una get todo se crea de forma que sea mas simple desde donde se llama
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

        // todas las respuestas devuelve "data"
        return instance.get(url,params)
            .then( res => res.data )
    },

    // al igual que en la post
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
        // todas las respuestas devuelve "data"
        return instance.post(url,params)
            .then( res => res.data )
    },
}