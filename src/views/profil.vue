<template>
  <v-container v-if="this.userProfil!=null">
    <v-row>
      <v-col align="center">
        <h1 class="title text-primary mt-5">
          Profil de <span class=" text-capitalize"> {{userProfil.firstName}} {{userProfil.lastName}}</span>
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-avatar size="80">
          <img
            :src="userProfil.avatar"
            alt="profil-image"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="mt-0 pt-0">
        <v-rating
          readonly
          :value="parseFloat(rating)"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          large
        ></v-rating>
      </v-col>
    </v-row>
    <v-row v-if="advisors" class="pb-0 mb-0">
      <v-col align="center" class="ma-5 pt-0 pb-0 mb-0">
        <h2 class="title">Avis</h2>
        <v-card v-for="advisor of advisors" :key="advisor.id" class="mb-4">
          <v-card-title>
          <v-avatar size="80">
          <img  v-if="advisor.user != null"
            :src="advisor.user.avatar"
            alt="profil"
          />
          </v-avatar>
          <v-row align="center" class="pl-2 pt-8">
            <v-col cols="12" align="left" >
              <p class="mb-0" v-if="advisor.user != null">
                <span class="title">{{advisor.user.firstName}} {{advisor.user.lastName}}</span><br>
                <span class="caption">{{advisor.date}}</span>
                 <v-rating
            :value="parseFloat(advisor.rating)"
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
    <v-row>
      <v-col align="center">
        <v-btn rounded outlined color="primary" class="mt-3"
          @click="toogleModal(true)">Ajouter un avis</v-btn
        >
        <v-btn rounded color="primary" class="mt-3 ml-2" @click="returnHome()">OK</v-btn>
      </v-col>
    </v-row>
    <v-card class="elevation-16 mx-auto raking" width="300" v-if="modal">
      <v-card-title class="text-h5" align="center"> Ecrire un avis sur le profil de {{userProfil.first}} {{userProfil.last}} </v-card-title>
      <v-card-text>
        <v-col cols="12">
            <v-textarea
              v-model="comment"
              color="primary"
            >
              <template v-slot:label>
                <div>
                  Commentaire <small>(optional)</small>
                </div>
              </template>
            </v-textarea>
          </v-col>
        <div class="text-center my-0 py-0">
          <v-rating
            v-model="newRating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            large
          ></v-rating>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-between">
        <v-btn text @click="toogleModal(false)"> Annuler </v-btn>
        <v-btn color="primary" text @click="toogleModal(false); sendComment()"> Évaluer </v-btn>
      </v-card-actions>
    </v-card>
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
    modal:false,
    rating: 0,
    newRating: 0,
    comment: "",
    id: null,
    currentUser: null,
    userProfil:null,
    advisors: null
  }),
  components: {},
  methods: {
    ...mapActions("user", ["getUserById", "getInformationUserLocalStorage"]),
    ...mapActions('offres', ['addNotification']),
    ...mapActions("advisor", {
      getAdvisorUser: 'get',
      addAdvisor: 'add',
    }),
    toogleModal(activate){
        this.modal = activate;
    },
    returnHome(){
      this.$router.push("/")
    },
    async sendComment(){
      let payload = {
        id: this.id,
        userId: this.userProfil.id,
        userIdAdvisor: this.currentUser.id,
        comment: this.comment,
        rating: this.newRating,
        date: this.getDate()
      }
      let response = await this.addAdvisor(payload)
      if(response['code'] == 200){
        this.getRating()
      }
    },
    getDate(){
      let date = new Date()
      const event = date;
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const response = event.toLocaleDateString('fr-FR', options);
      return response
    },
    async addingComment(){
      let payload = {
        id: this.id,
        message: `vous avez reçu un nouveau commentaire de ${localStorage.firstName} ${localStorage.lastName}`,
        icon: "mdi-message",
        color: "purple lighten-3",
        date: this.getDate()
      }
      let response = await this.addNotification(payload)
    },
    async getRating(){
      let responseAdvisors =  await this.getAdvisorUser(this.id);
      if(responseAdvisors['code'] == 200){
        this.advisors = responseAdvisors['data']
        let rating = 0;
        let i = 0;
        for(let advisor of this.advisors){
          advisor.rating = parseFloat(advisor.rating)
          rating += advisor.rating
          let response = await this.getUserById(advisor.userIdAdvisor);
          if(response['code']==200){
            this.advisors[i].user = response['data'][0]
          }
          i++
        }
        this.rating  = parseFloat(rating/this.advisors.length)
      }
    }


  },
  computed:{
  },
  async created(){
    this.currentUser = await this.getInformationUserLocalStorage();
    console.log("current", this.currentUser)
    this.id = this.$route.params.id;
    this.idSend = this.$route.params.idSend;
    let response =  await this.getUserById(this.id);
    
    if(response['code'] == 200){
      console.log(response['data'][0])
      this.userProfil = response['data'][0];
      this.getRating();
    }
    
   
  },
};
</script>
