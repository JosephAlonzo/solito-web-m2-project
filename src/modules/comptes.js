import axios from "axios";

export default{
    namespaced: true,
    state: {
       
    },
    mutations: {
   
    },
    actions: {
        add: async function({commit}, payload){
            let data = await axios
            .post("https://josephalonzo.com/api/comptes",{
                ...payload,
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
            .get("https://josephalonzo.com/api/comptes/userId/"+id+"/byUser")
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