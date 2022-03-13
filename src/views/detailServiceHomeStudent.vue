<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h1 class="title text-primary mt-5 text-capitalize">{{changeDateFormat(item.date)}} {{changeHour(item.time)}}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-avatar size="80">
          <img
            :src="item.avatar"
            alt="profil"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <h2 class="title mt-5  text-capitalize">{{item.firstName}} {{item.lastName}}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-btn rounded outlined color="primary" @click="showProfil()">
          Voir profil
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <p> <span class="text-capitalize">{{item.title}}</span> avec {{item.firstName}} {{item.lastName}}.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-btn rounded outlined color="primary" class="mt-3" @click="dialog=true" v-if="item.status == 1">
          Annuler RDV
        </v-btn>
        <v-btn rounded outlined color="primary" class="mt-3" @click="dialog=true" v-else>
          Annuler solicitud
        </v-btn>
        <v-btn rounded color="primary" class="ml-2 mt-3" dark @click="showAccueil">
          Revenir à l'accueil
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <h3 class="px-5 py-5">Êtes-vous sûr d’annuler votre rendez-vous ?</h3>
          
        <v-card-text
          ></v-card-text
        >
        <v-card-actions class="mt-0 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded outlined  @click="dialog = false;">
            Non
          </v-btn>
          <v-btn color="primary" rounded  @click="dialog = false; annulerRdv(item.sentId)">
            Oui
          </v-btn>
          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.text-primary {
  color: #028ed4;
}
</style>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  props: ['item'],
  data: () => ({
    dialog:false,
  }),
  components: {},
  methods: {
    ...mapActions("sents", {
      deleteSent: 'delete',
    }),

    showProfil() {
      this.$router.push({
          path: '/profil/'+this.item.userId,
        });
    },
    async annulerRdv(id){
      let response = await this.deleteSent(id)
      if(response['code']==200){
        this.$router.push({
          name: 'Home',
          params: {
            idDelete: this.item.sentId
          }
        });
      }
    },
    showAccueil() {
      this.$router.push("/");
    },
    changeDateFormat(date){
        date = new Date(date)
        date.setDate(date.getDate() + 1);
        const event = date ;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const response = event.toLocaleDateString('fr-FR', options);
        return response
    },
    changeHour(hour){
        hour = hour.replace(':', 'h')
        return hour
    },
  },
  computed:{
  },
  async created(){
  },
};
</script>
