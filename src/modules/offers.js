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
            .post("https://josephalonzo.com/api/offers",{
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
            .get("https://josephalonzo.com/api/offers")
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
            .get("https://josephalonzo.com/api/offers/userId/"+id+"/byUser")
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
        getById: async function({commit}, id){
            let data = await axios
            .get("https://josephalonzo.com/api/offers/"+id)
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