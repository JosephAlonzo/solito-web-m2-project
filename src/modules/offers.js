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
            .post("http://localhost:8000/api/offers",{
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
        get: async function({commit}){
            let data = await axios
            .get("http://localhost:8000/api/offers")
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
        getByUser: async function({commit}, id){
            let data = await axios
            .get("http://localhost:8000/api/offers/userId/"+id)
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