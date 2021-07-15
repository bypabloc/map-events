export default {

    keywordsFiltered: [],
    
    // objeto para manejar keywords
    keywords: {
        fetchingData: false, // esta propiedad es para manejar en la vista el estado de "cargando" para el usuario
        error: null,
        // aca es donde guardaremos la lista o data obtenida por el endpoint
        data: [],
        save: {
            fetchingData: false,
            error: null,
            data: {
                description: '',
                coordinates: {
                    lat: 44.575287999258315,
                    lng: 45.08166464862419,
                },
            },
        },
    },

    // un objeto para menejar los events
    events: {
        fetchingData: false,
        error: null,
        // aca es donde guardaremos la lista o data obtenida por el endpoint
        data: [],
        save: {
            fetchingData: false,
            error: null,
            data: {
                // es un ejemplo del objeto que obtendremos en cada respuesta al guardar
                description: '',
                coordinates: {
                    lat: 44.575287999258315,
                    lng: 45.08166464862419,
                },
            },
        },
    },
}