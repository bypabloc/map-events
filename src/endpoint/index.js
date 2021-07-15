import endpoint from '../endpoint/settings'

export default {

    // funcion para obtener todos los keywords
    getKeywords(){
        return endpoint.get({
            url: 'keywords',
        })
    },
    // funcion para guardar un keyword -> solo espera una propiedad "text"
    saveKeyword( { text } ){
        return endpoint.post({
            url: 'keywords',
            params: { text },
        })
    },
    // funcion para obtener todos los eventos, se puede indicar un array de keywords para filtrar los resultados
    getEvents( { keywords } ){
        return endpoint.post({
            url: 'events-list',
            params: { keywords },
        })
    },
    // funcion para guardar un evento -> espera
    /**
     * description: String
     * keywords: Array
     * coordenadas: Object -> con las siguientes propiedades:
     *            Latitud:   lat: Int
     *            Longitud:  lng: Int
     * */
    saveEvent( { description, keywords, coordenadas } ){
        return endpoint.post({
            url: 'events',
            params: { description, keywords, coordenadas },
        })
    },
}

// getError -> funcion para limpiar los errores
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
