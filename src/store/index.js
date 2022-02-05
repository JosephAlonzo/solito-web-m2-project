import Vue from 'vue'
import Vuex from 'vuex'
import offers from "../modules/offers"
import sents from "../modules/sents"
import favs from "../modules/favs"
import advisor from "../modules/advisor"
import comptes from "../modules/comptes"
import user from "../modules/user"
import notifications from "../modules/notifications"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
   
  },
  modules: {
    comptes,
    user,
    offers,
    sents,
    favs,
    advisor,
    notifications
  }
})
