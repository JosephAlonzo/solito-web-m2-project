<template>
  <v-container >
      <v-row >
        <signup-senior-services></signup-senior-services>
      </v-row>
       <!-- <v-expansion-panels class="mb-2" flat>
      <v-expansion-panel
        v-for="(item,i) in menu"
        :key="i"
        class="separator"
      >
        <v-expansion-panel-header>
            item
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          
            
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> -->
  </v-container>
</template>

<style scoped>
  .separator{
    min-width: 100%;
    padding: 0%;
  }
  
</style>

<script>
import SignupSeniorServices from "../components/SignupSeniorServices.vue";
export default {
    data:()=> ({
      menu: [
        {},
        {},
        {},
      ]
    }),
    components: {
    SignupSeniorServices,
    },
};
</script>