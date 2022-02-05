<template>
  <v-container>
    <v-row align="center" class="center" justify="space-around">
      <!-- <v-col cols="2" class="pt-0"><v-icon class="circle" dark mr-4>{{item.icon}}</v-icon></v-col> -->
      <v-avatar
          :color="getColor()"
          size="56"
          class="mr-2 mb-4"
        >
      <v-icon dark mr-4>{{item.icon}}</v-icon>
      </v-avatar>
      <v-col v-if="item.name&&item.civilite">
        <p class="pt-1">
          {{item.civilite}} {{item.name}}
          <br />
          <span class="caption">{{item.date}}</span>
        </p>
      </v-col>
      <v-col v-else>
        <p class="pt-1">
          virement sur votre compte bancaire
          <br />
          <span class="caption">{{item.date}}</span>
        </p>
      </v-col>
      <v-col cols="2" class="pt-1">{{item.total}}€</v-col>
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
</style>
<script>
export default {
  name: "Task",
  props: ["item"],
  data: () => ({
    //
  }),
  methods:{
    getColor(){
      if(this.item.color != undefined) return this.item.color
      else return "primary"
    }
  }
};
</script>
