<template>
  <v-container >
      <v-row align="center">
        <!-- <v-col align="center">{{candidature}}</v-col>
        <v-col align="center">{{payer}}</v-col>
        <v-col align="center">{{job}}</v-col>
        <v-icon color="primary">
          mdi-currency-eur
        </v-icon> -->
        <v-col align="center" v-if="ok== true">
          <v-icon class="circle mb-5" dark >mdi-check-bold</v-icon>
          <h3>Le paiement a bien été realisé.</h3>
        </v-col>
        <v-col align="center" v-else-if="ok==false">
          <v-icon class="circleRed mb-5" dark >mdi-currency-eur-off</v-icon>
          <h3>{{messageError}}</h3>
        </v-col>

      </v-row>
  </v-container>
</template>

<style scoped>
 .circle {
  background-color: #028ed4;
  padding: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.circleRed{
  background-color: #E53935;
  padding: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data:()=> ({
      ok: false,
      messageError: false,
    }),
    methods: {
      ...mapActions("sents", {
        acceptCandidatura: 'update',
        getSentById: 'getById',
      }),
      ...mapActions("offers", {
        getOfferById: 'getById',
      }),
      ...mapActions("notifications", {
        addNotification: 'add',
      }),
      ...mapActions("comptes", [
        "add"
      ]),
      getDate(){
        let date = new Date()
        const event = date;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const response = event.toLocaleDateString('fr-FR', options);
        return response
      },
       getMoth(){
      const d = new Date();
      let month = d.getMonth();
      return month+1
    },
    },
    async created(){
        this.idSent = this.$route.params.idSent;
        this.candidature = await this.getSentById(this.idSent);
        let currentDate = this.getDate();
       
        if(this.candidature['code'] == 200){
          this.candidature = this.candidature['message'][0]
          
          console.log("CANDIDATURE",this.candidature);
          if(this.candidature.status == "4"){
            this.ok = false;
            this.messageError = "Ce paiement a été déjà réalisé avant"
            return 
          }
          if( this.candidature.status == "1" ){
            let payload = {
              sentId:this.candidature.id,
              offerId:this.candidature.offerId,
              status:4
            }
            let response = await this.acceptCandidatura(payload)
            if(response['code'] == 200) this.ok=true;
            else this.ok=false;
          }
          else this.ok=false;
        }
        
        if(this.ok){
          let payload = {
            userId: this.candidature.offerUserId,
            message: `Le paiement a été bien effectué à ${this.candidature.firstNameSent} ${this.candidature.lastNameSent} pour un montant de ${this.candidature.price}€`,
            icon: "mdi-swap-horizontal",
            color: "green darken-1",
            date: currentDate
          }
          let response = await this.addNotification(payload)
          console.log(response)
          if(this.ok){
            let payload = {
              userId: this.candidature.userSend,
              message: `Vous avez bien reçu un virement de ${this.candidature.price}€ de ${this.candidature.firstName} ${this.candidature.lastName}`,
              icon: "mdi-currency-eur",
              color: "light-blue accent-2",
              date: currentDate
            }
            let response = await this.addNotification(payload)
            console.log(response)

          }
        }
        if(this.ok){
          let payload = {
            userId: this.candidature.userId,
            date: currentDate,
            icon: "mdi-swap-horizontal",
            month: this.getMoth(),
            total: this.candidature.price,
            color: "green darken-2"
          }
          let response = await this.add(payload)
          console.log(response)
        }
        if(this.ok){
          let payload = {
            userId: this.candidature.offerUserId,
            date: currentDate,
            icon: "mdi-swap-horizontal",
            month: this.getMoth(),
            total: `-${this.candidature.price}`,
            color: "red darken-2"
          }
          let response = await this.add(payload)
          console.log(response)
        }
        
    }
};
</script>