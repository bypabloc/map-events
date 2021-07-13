export default {
    user(state){
        return state.user
    },
    theme(state){
        return state.theme
    },
    getListProuds: (state) => (proudId) => {
        return Object.values(state.prouds)
            .filter(list => list.id === proudId)
    },
    getListEducations: (state) => (educationId) => {
        return Object.values(state.educations)
            .filter(list => list.id === educationId)
    },
    getListSkills: (state) => (skillId) => {
        return Object.values(state.skills)
            .filter(list => list.id === skillId)
    },
}