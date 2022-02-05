<template>
  <v-container>
    <v-row class="my-0">
      <v-col align="center" class="my-0">
        <h1 class="title mt-0">
          Mon profil
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-avatar size="80">
          <img
            :src="user.selectedAvatar"
            alt="profil"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-rating
          readonly
          :value="getRating()"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          
        ></v-rating>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-spacer></v-spacer>
      <v-col class="col-10">
      <p class="my-0">
        <strong>Nom: </strong> {{user.lastName}} <br>
        <strong>Prénom: </strong> {{user.firstName }} <br>
        <strong>Date de naissance: </strong> {{user.birthday}} <br>
        <strong>Sexe: </strong> {{user.sexe }} <br>
        <strong>Adresse: </strong> {{user.address }} {{user.address2 }} {{user.cp }} {{user.city }}
      </p>

      </v-col>
      <v-spacer></v-spacer>

    </v-row>
    <v-row v-if="advisors" class="pb-0 mb-0">
      <v-col align="center" class="ma-5 pt-0 pb-0 mb-0">
        <h2 class="title">Avis</h2>
        <v-card v-for="advisor of advisors" :key="advisor.id" class="mb-4">
          <v-card-title>
          <v-avatar size="80">
          <img 
            :src="advisor.selectedAvatar"
            alt="profil"
          />
          </v-avatar>
          <v-row align="center" class="pl-2 pt-8">
            <v-col cols="12" align="left" >
              <p class="mb-0">
                <span class="title">{{advisor.name}} {{advisor.last}}</span><br>
                <span class="caption">{{advisor.date}}</span>
                 <v-rating
            :value="advisor.rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            
          ></v-rating>
              </p>
              
            </v-col>
          </v-row>
          
          
          </v-card-title>
         
          <v-card-text>
            {{advisor.comment}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="my-0 pb-0">
      <v-col align="center" class="my-0 pb-0">
        <v-btn rounded color="primary" class="mt-3 ml-2" @click="$router.push('/Account')">Revenir</v-btn>
      </v-col>
    </v-row>
   
  </v-container>
</template>
<style scoped>
.text-primary {
  color: #028ed4;
}
.border {
  border: 1px solid #d3d2d2;
}
.raking{
    position: fixed;
    left: 0;
    right: 0;
    top: 15%;
    margin-left: auto; 
    margin-right: auto; 
    margin-top: auto;
}
</style>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  data: () => ({
    advisors:null,
    user: null
  }),
  computed:{
  },
  components: {},
  methods: {
    ...mapActions('user', ['getInformationUserLocalStorage']),
    ...mapActions('advisor', ['get']),
    toogleModal(activate){
        this.modal = activate;
    },
    returnHome(){
        this.$router.push("/detailServiceStudent")
    },
    getRating(){
      if( parseFloat(this.user.rating) <= 0 || parseFloat(this.user.evaluations) <= 0){
        return 0
      }
      let r = this.user.rating/this.user.evaluations
      return parseFloat(r)
    }
  },
  async created(){
    this.user = await this.getInformationUserLocalStorage();
    let responseAdvisors = await this.getAdvisorUser(this.user.id);
    if(responseAdvisors['code']== 200){
      this.advisors = responseAdvisors['message']
    }
  },
};
</script>
