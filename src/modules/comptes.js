import axios from "axios";

export default{
    namespaced: true,
    state: {
       
    },
    mutations: {
   
    },
    actions: {
        add: async function({commit}, payload){
            let payload2 = {...payload}
            delete payload2['id']
            let data = await axios
            .post("http://localhost:8000/api/comptes",{
                ...payload2,
                'vigente': true
            })
            .then((response) => {
                let result = {...response.data};
                return result;
            })
            .catch(function (error) {
                console.log(error)
                return null
             })
            return data
        },
        getCompte: async function({commit}, id){
            let data = await axios
            .get("http://localhost:8000/api/comptes/"+id)
            .then((response) => {
                let result = {...response.data};
                return result;
            })
            .catch(function (error) {
                console.log(error)
                return null
             })
            return data
        },
    }
}