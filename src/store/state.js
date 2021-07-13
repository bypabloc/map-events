export default {
    theme: 'blue',
    
    user: {
        loggedIn: false,
        data: null,
        error: null,
        register: {
            error: null
        },
    },

    data: {
        config: {
            data: {
                img : null,
            },
            fetchingData: false,
            err: null,
        },
        prouds: [],
        educations: [],
        skills: [],
    },

    fetchingData: true,
    error: null,

    prouds: [/**
        {
            id: '',
            icon: 'icon',
            title: 'title',
            description: 'description',
        },
    */],
    educations: [],
    skills: [],
}