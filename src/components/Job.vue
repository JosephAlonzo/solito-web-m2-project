
<template>
  <v-container>
    <div class="border pa-2">
      <v-row
        align="center"
        class="d-flex align-start mt-1"
        justify="space-around"
      >
        <v-col class="" align="center">
          <v-avatar size="50" class="ma-1">
            <img :src="require(`@/assets/${item.icon}`)" alt="1" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row class="pt-0 mt-0">
        <v-col class="pt-0 mt-0" align="center">
          <h3 class="subtitle-2">
            <span class="text-capitalize"
              >{{ item.title }} <br />
              le {{ changeDateFormat(item.date) }} à {{ item.time }}</span
            >
          </h3>
        </v-col>
      </v-row>
      <v-row justify="center" class="pb-5" v-if="candidates!= null">
        <v-subheader>Candidatures</v-subheader>

        <v-expansion-panels popout >
          <v-expansion-panel
            v-for="c,index in candidates"
            :key="c.sentId"
            hide-actions
          >
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="3" sm="2" md="1">
                  <v-avatar size="36px">
                    <img
                      v-if="c.firstName"
                      alt="Avatar"
                      :src="c.avatar"
                    />
                  </v-avatar>
                </v-col>
                <v-col class="" cols="5" sm="3">
                  <strong v-html="c.lastName+' '+c.firstName"></strong>
                 
                </v-col>

                <v-col
                class="text-no-wrap"
                cols="4"
                sm="3"
              >
                <v-chip
                  v-if="c.status==1"
                  color="teal lighten-4"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                    <span class="mx-2 px-0">acceptée</span>
                </v-chip>
                <v-chip
                  v-else-if="c.status==3"
                  color="red lighten-4"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                   <span class="mx-2 px-0">rejetée</span>
                </v-chip>
                <v-chip
                  v-else-if="c.status==4"
                  color="yellow darken-2"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                  <span class="mx-2 px-0">Payé</span>
                </v-chip>
              </v-col>

              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                  <v-row v-if="c.status < 4">
                      <v-spacer></v-spacer>
                      <v-col align="center" v-if="c.status==1||c.status==2" ><v-btn rounded outlined color="primary" @click="accept(c, 3)" >Refuser</v-btn></v-col>
                      <v-col align="center" v-if="c.status==2||c.status==3"><v-btn rounded color="primary" dark @click="accept(c, 1)" >Accepter</v-btn></v-col>
                      <v-spacer></v-spacer>
                  </v-row>
                  <v-row>
                      <v-spacer></v-spacer>
                     <v-col align="center" v-if="c.status==1"><v-btn rounded color="primary" dark @click="dialog=true;idCandidature=index;" >Payer</v-btn></v-col>
                      <v-spacer></v-spacer>
                  </v-row>
                  <v-row>
                      <v-col align="center">
                        <router-link :to="`/profil/${c.userSend}`" class="decoration"> Voir plus </router-link>
                      </v-col>
                  </v-row>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </div>
     <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <h3 class="pa-5 pb-2">Scanner le QRCode de paiement</h3>
          
        <v-row align="center" class="px-0 mx-0">
          <v-col align="center">
            <v-icon @click="paid()">
              mdi-reload class="px-0 mx-0"
            </v-icon>
            <div id="qrcode" class="mt-2"></div>
          </v-col>
        </v-row>
       
        
        <v-card-actions class="mt-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded outlined @click="dialog=false">Fermer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </v-container>
</template>
<style scoped>
.border {
  border: 1px solid #d3d2d2;
}
.border-left {
  border-left: 0px !important;
}
.text-primary {
  color: #028ed4;
}
</style>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Job",
  props: ["item", "id"],
  data: () => ({
    candidates:null,
    dialog:false,
    ready:false,
    idCandidature:null,
  }),
  methods: {
    ...mapActions("sents", {
      "getSentByOfferId":"getByOfferId",
      "changeStatus":"update",
    }),
    changeDateFormat(date) {
      date = new Date(date);
      date.setDate(date.getDate() + 1);
      const event = date;
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const response = event.toLocaleDateString("fr-FR", options);
      return response;
    },
    paid() {
      if(this.dialog==false){
        this.dialog =true;
      }
      let candidate = null;
      for(let i of this.candidates){
        if(this.item.id == i.offerId){
          candidate = i;
          break;
        }
      }
      console.log(this.item)
      console.log(candidate)
      var element = document.createElement("div");
      const col = document.querySelector("#qrcode")
      const text = `${window.location.origin}/Paid/${candidate.sentId}`
      const qrcode = new QRCode( element, {
        text: text,
        width: 200,
        height: 200,
        colorDark : '#000',
        colorLight : '#fff',
        correctLevel : QRCode.CorrectLevel.H
      });
      col.innerHTML = "";
      col.appendChild(element)
    },
    async accept(item, status){
        let payload = {
          sentId:item.sentId,
          offerId:this.id,
          status:status
        }
        
        let response = await this.changeStatus(payload);
        console.log(response)
        if(response['code'] == 200){
          await this.getCandidates();
        }
    },
    async getCandidates(){
      let response = await this.getSentByOfferId(this.id)
      if(response['code'] == 200){
      this.candidates = response['message']
    }
    }
  },
  async created(){
    await this.getCandidates();
  }
};
</script>
