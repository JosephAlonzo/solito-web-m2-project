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
            .post("https://josephalonzo.com/api/sent",{
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
        update: async function({commit}, payload){
            console.log(payload)
            let data = await axios
            .put("https://josephalonzo.com/api/sent/"+payload.sentId+"/"+payload.status+"/"+payload.offerId+"/updateStatus")
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
        get: async function({commit}, id){
            let data = await axios
            .get("https://josephalonzo.com/api/sent/userId/"+id+"/byUser")
            .then((response) => {
                let result = {...response.data};
                console.log(result)
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
            .get("https://josephalonzo.com/api/sent/"+id)
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
        getByOfferId: async function({commit}, id){
            let data = await axios
            .get("https://josephalonzo.com/api/sent/offerId/"+id+"/byOffer")
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
        delete: async function({commit}, id){
            let data = await axios
            .delete("https://josephalonzo.com/api/sent/"+id)
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