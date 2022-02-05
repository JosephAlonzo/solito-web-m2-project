<template>
    <v-container>
        <h1 class="title ml-8 pb-4">Mes cadeaux:</h1>
        <v-card class=" pa-5" elevation="3">
            <v-row class="pb-4">
                <v-col align="center"><v-img src="@/assets/tcl.svg" width="80px" class="img"></v-img></v-col>
            </v-row>
           <p class="text-center">Vous avez un code promo solito</p>
           <h3 class="text-primary text-center">-10€ sur votre abonnement TCL</h3>
           <v-row class="pt-4">
                <v-col align="center">
                    <v-btn rounded color="primary" @click="showCode(0)">Utiliser</v-btn>
                    <p class="text-center pt-2">{{codeTcl}}</p>
                </v-col>
            </v-row>
           
        </v-card>
        <v-card class="mt-4 pa-5" elevation="3">
            <v-row class="pb-4">
                <v-col align="center"><v-img src="@/assets/intermarche.svg" width="150px" class="img"></v-img></v-col>
            </v-row>
           <p class="text-center">Vous avez un code promo solito</p>
           <h3 class="text-primary text-center">10€ Offert</h3>
           <v-row class="pt-4">
                <v-col align="center">
                    <v-btn rounded color="primary" @click="showCode(1)">Utiliser</v-btn>
                    <p class="text-center pt-2">{{codeIntermarche}}</p>
                </v-col>
            </v-row>
           
        </v-card>
    </v-container>
</template>
<style scoped>
    .text-primary{
        color: #028ED4;
    }
    
</style>
<script>

export default {

  data: () => ({
   codes: [
       "tcl-xgdpslsd-10-solito",
       "intermarche-huods-10-solito",
   ],
   codeIntermarche: "",
   codeTcl: ""
  }),
  components: {
  },
  methods:{
      showCode(index){
          if(index == 1){
            this.codeIntermarche = this.codes[index]
          }
          else{
            this.codeTcl = this.codes[index]
          }
      }
  }
};
</script>
