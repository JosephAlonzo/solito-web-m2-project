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
            .post("http://localhost:8000/api/advisor",{
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
            .get("http://localhost:8000/api/advisor/userId/"+id)
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
            .delete("http://localhost:8000/api/advisor/"+id)
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