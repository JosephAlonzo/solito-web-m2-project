<template>
  <v-container>
    <h1 class="title ml-8 pb-4">Mon compte:</h1>
    <v-row align="center" justify="space-around" class="pb-4">
      <h2 class="subtitle-1 primary--text font-weight-bold text-sm-h6">
        {{totalMoney}} €
      </h2></v-row
    >
    <!-- <v-banner class="separator px-4 ">Octobre</v-banner>
    <v-banner class="separator px-4">Novembre</v-banner> -->
    <v-expansion-panels class="mb-2" flat>
      <v-expansion-panel v-for="(t, i) in months" :key="i" class="separator">
        <v-expansion-panel-header>
          {{ i }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <task v-for="(ntask, j) in months[i]" :key="j" :item="ntask"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="text-center" >
      <v-btn color="primary" rounded dark @click="transferMoney()"
        v-if="type==1">Faire le virement sur ma banque</v-btn
      >
      <v-btn color="primary" rounded dark @click="if(savedCV){dialog6 = true;}else{rechargerCompte()}"
        v-else-if="type==2">Recharger mon compte</v-btn
      >
      
    </div>
    <v-form v-if="type==1"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <h3 class="px-5 py-5">Virement vers votre compte</h3>
        <v-card-text class="pb-0"
          >C'est votre premier virement, nous aurions besoin de votre RIB pour
          completer cette action.</v-card-text
        >
         <v-col class="col-12 px-10" align="center"><v-file-input truncate-length="15" v-model="rib" :rules="[rules.required]"></v-file-input></v-col>

        
        <v-card-actions class="mt-0 pb-5 pt-0">
          <v-spacer></v-spacer>
          <v-btn rounded outlined color="primary" @click="dialog=false">Annuler</v-btn>
          <v-btn rounded color="primary" dark @click="saveRIB">Confirmer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="290">
      <v-card>
        <h3 class="px-5 py-5"></h3>

        <v-card-text class="pb-0"
          >Votre argent sera tranferé dans les prochaines 5 jours.</v-card-text
        >
         <v-col class="col-12 px-10" align="center">
           <v-text-field type="number" v-model="money" :rules="[rules.required, max(),rules.min]"
            label="Montant à transferer: "
          ></v-text-field>
         </v-col>

        
        <v-card-actions class="mt-0 pb-5 pt-0">
          <v-spacer></v-spacer>
          <v-btn rounded outlined color="primary" @click="dialog2=false">Annuler</v-btn>
          <v-btn rounded color="primary" dark @click="sendMoney">Confirmer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
    <v-dialog v-model="dialog3" persistent max-width="290">
      <v-card>
        
        <v-card-text class="pb-0 pt-10" v-if="type==1"
          >Vous avez bien tranferé {{money}}€ à votre compte bancaire</v-card-text
        >
        <v-card-text class="pb-0 pt-10" v-if="type==2"
          >Vous avez bien tranferé {{money}}€ à votre compte</v-card-text
        > 
        <v-card-actions class="mt-0 pb-5 pt-5">
          <v-spacer></v-spacer>
          <v-btn rounded outlined color="primary" v-if="type==1" @click="dialog3=false; dialog2=false">Fermer</v-btn>
          <v-btn rounded outlined color="primary" v-if="type==2" @click="dialog3=false; dialog6=false">Fermer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-form v-if="type==2"
    ref="form"
    v-model="valid"
    lazy-validation
  >
   
    <v-dialog v-model="dialog2" persistent max-width="290">
      <v-card>
        <h3 class="px-5 py-5">Données bancaires</h3>

        <v-card-text class="pb-0">
          Les données bancaires vous permettront de mettre des sous sur votre compte solito et de pouvoir payer facilement.</v-card-text>
         <v-col class="col-12 px-10" align="center">
           <v-text-field type="number" v-model="numeroCarte" :rules="[rules.required]"
            label="Numéro de carte: "
          ></v-text-field>
           <v-text-field v-model="expiration" :rules="[rules.required]"
            label="Expiration"
          ></v-text-field>
          <v-text-field type="number" v-model="cvv" :rules="[rules.required]"
            label="CVV"
          ></v-text-field>
         </v-col>
        
        <v-card-actions class="mt-0 pb-5 pt-0">
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" dark @click="saveCV(true)">Confirmer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions class="mt-0 pb-5 pt-0">
          <v-spacer></v-spacer>
          <v-btn rounded outlined color="primary" @click="dialog2=false">Annuler</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>

      </v-card>
    </v-dialog>
    </v-form>
    
   
     <v-dialog v-model="dialog6" persistent max-width="290">
      <v-card>
        <h3 class="px-5 py-5"></h3>

        <v-card-text class="pb-0"
          >Vous pourrez payer immédiatement après avoir rechargé votre compte.</v-card-text
        >
         <v-col class="col-12 px-10" align="center">
           <v-text-field type="number" v-model="money" :rules="[rules.required,rules.min]"
            label="Montant à transferer: "
          ></v-text-field>
         </v-col>

        
        <v-card-actions class="mt-0 pb-5 pt-0">
          <v-spacer></v-spacer>
          <v-btn rounded outlined color="primary" @click="dialog6=false">Annuler</v-btn>
          <v-btn rounded color="primary" dark @click="rechargerCompte()">Confirmer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert
        v-model="alertSolitoCompte"
        color="success"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-check"
        class="alert"
        dismissible
      >
      Vos données ont été enregistrées.
      </v-alert>
  </v-container>
</template>

<style scoped>
.separator {
  min-width: 100%;
  padding: 0%;
}
.alert {
  position: fixed;
  top: 10%;
  width: 80%;
  z-index: 1;
}
</style>
<script>
import Task from "@/components/Task";
import {mapActions} from "vuex";

export default {
  data: () => ({
    months: {},
    monCompte: null,
    rib: null,
    valid:true,
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialog5: false,
    dialog6: false,
    alertSolitoCompte: false,
    type: null,
    money: 1,
    totalMoney: 0,
    rules: {
      required: (value) => !!value || "Required.",
      min:(v) => v >= 1 || "valeur ne pas valide",
    },
    numeroCarte:null,
    cvv:null,
    expiration:null,
    savedCV: false,
  }),
  components: {
    Task,
  },
  methods: {
    ...mapActions("comptes", ["getCompte", "add"]),
    max(){
      if ( this.money > this.totalMoney) return "valeur ne pas valide"
      else return true
    },
    transferMoney() {
      if(!this.isSavedRIB()){
        this.dialog =true;
      }
      else{
        this.dialog2 = true;
      }
    },
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
    saveRIB(){
      if(this.rib != null){
        this.dialog=false;
        this.dialog2 = true;
        localStorage.saveRIB = true;
      }
    },
    isSavedRIB(){
      if( localStorage.saveRIB != undefined){
        return true
      }
      return false
    },
    saveCV(first){
      if(this.$refs.form.validate()){
          this.dialog2=false; 
          localStorage.savedCV = true;
          this.alertSolitoCompte=true; 
          this.savedCV = true;
      }
    },
    async rechargerCompte(){
      if(this.savedCV){
        let payload = {
          userId: localStorage.id,
          date: this.getDate(),
          icon: "mdi-swap-horizontal",
          month: this.getMoth(),
          total: `${this.money}`,
          color: "teal darken-1"
        }
        let response = await this.add(payload)
        if(response){
          let response = await this.getAllMovementCompte();
        }
        this.dialog6 = false;
      }
      else{
        this.dialog2=true;
      }
    },
    async sendMoney(){
      if(this.$refs.form.validate()){
        this.dialog3=true;
        this.dialog2=false;
        let payload = {
          userId: localStorage.id,
          date: this.getDate(),
          icon: "mdi-swap-horizontal",
          month: this.getMoth(),
          total: `-${this.money}`,
          color: "red darken-2"
        }
        let response = await this.add(payload)
        if(response){
          let response = await this.getAllMovementCompte();
        }
      }
    },
    async getAllMovementCompte(){
      this.months = {}
      let response = await this.getCompte(localStorage.id );
      console.log(localStorage.id )
      this.totalMoney = 0;
      if(response['code'] == 200){
        this.monCompte = response['message'];
        let compare = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        for(const i in this.monCompte){
          this.totalMoney += parseFloat(this.monCompte[i].total)
          if(this.monCompte[i].sexe == 1) this.monCompte[i].sexe = "M."
          else this.monCompte[i].sexe = "Mme";
          
          let month = compare[this.monCompte[i].month-1];
          if ( !this.months.hasOwnProperty(month)) {
            this.months[month] = []
          }
          this.months[month].push(this.monCompte[i])
        }
      }
    }
  },
  created(){
    if (localStorage.type) {
      this.type = localStorage.type;
    }
    if (localStorage.savedCV) {
      this.savedCV = localStorage.savedCV;
    }
    
    this.getAllMovementCompte();
  }
};
</script>