import axios from "axios";

export default{
    namespaced: true,
    state: {
       
    },
    mutations: {
   
    },
    actions: {
        update: async function({commit}, payload){
            let payload2 = {...payload}
            delete payload2['id']
            delete payload2['id2']
            let data = await axios
            .patch("https://josephalonzo.com/api/user"+payload.id,{
                ...payload2
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
        add: async function({commit}, payload){
            let data = await axios
            .post("https://josephalonzo.com/api/user",{
                ...payload
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
        getUser: async function({commit}){
            let data = await axios
            .get("https://josephalonzo.com/api/user")
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
        getUserById: async function({commit}, id){
            let data = await axios
            .get("https://josephalonzo.com/api/user/"+id)
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
        validateLogin: async function({commit}, payload){
            console.log(payload)

            let data = await axios
            .post("https://josephalonzo.com/api/user/login",{
                ...payload
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
        getInformationUserLocalStorage({commit}){
            let user = []
            user['id']=localStorage.id;
            user['address']=localStorage.address;
            user['address2']=localStorage.address2;
            user['city']=localStorage.city;
            user['cp']=localStorage.cp;
            user['email']=localStorage.email;
            user['firstName']=localStorage.firstName;
            user['lastName']=localStorage.lastName;
            user['birthday']=localStorage.birthday;
            user['phone']=localStorage.phone;
            user['lat']=localStorage.lat;
            user['lng']=localStorage.lng;
            if(localStorage.sexe == 1 ){
                user['sexe']= "Homme"
            }
            else{
                user['sexe']= "Femme"
            }
            user['type']=localStorage.type;
            user['selectedAvatar']=localStorage.selectedAvatar;
            user['rating']=localStorage.rating;
            user['evaluations']=localStorage.evaluations;
            return user
        }
    }
}