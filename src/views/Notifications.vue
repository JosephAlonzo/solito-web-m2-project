<template>
  <v-container >
    <h1 class="title ml-8 pb-4">Mes Notifications:</h1>
    <div v-if="notifications != null">
      <notification v-for="item,index in notifications" :key="index" :item="item" />
    </div>
    <div v-if="notifications == {}"> 
      <p class="pl-5 pt-3">Vous n'avez aucune notification pour le moment.</p>
    </div>
  </v-container>
</template>
<script>
import Notification from '../components/Notification.vue';
import { mapState, mapActions } from "vuex";

export default {

  data: () => ({
    notifications: null
  }),
  components: {
    Notification
  },
  methods:{
     ...mapActions("notifications", [
      "get",
    ]),
  },
  async created(){
    let response = await this.get(localStorage.id);
    if(response['code'] == 200){
      this.notifications = response['message']
      let keys = [];
      let tmp = {}
      for (let i in this.notifications) {
        keys.push(i);
      }
      keys = keys.reverse()
      for (let i of keys) {
        tmp[i] = this.notifications[i]
      }
      this.notifications = tmp
    }
  }
};
</script>