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
            .post("https://josephalonzo.com/api/favorites",{
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
        get: async function({commit}, id){
            let data = await axios
            .get("https://josephalonzo.com/api/favorites/userId/"+id)
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
            .delete("https://josephalonzo.com/api/favorites/"+id)
            .then((response) => {
                let result = {...response.data};
                return result;
            })
            .catch(function (error) {
                console.log(error)
                return null
             })
             console.log(data)
            return data
        },
    }
}