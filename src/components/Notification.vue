<template>
  <v-container class="pb-0">
    <v-row class="center px-5" align="center">
      <v-col align="left" cols="3" sm="2" md="1" class="pt-4">
        <v-avatar
          :color="item.color"
          size="50"
          class="mb-3"
        >
        <v-icon dark mr-4>{{item.icon}}</v-icon>
        </v-avatar>
        </v-col>
      <v-col cols="9" sm="10" md="11" class="pr-0" align="left" style="margin-left:-5px" >
        <p class="pt-1 pb-0 mb-0 subtitle-1"> {{item.message}}.
          <br />
        </p>
          <span class="caption ">{{item.date}}</span>
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
</style>
<script>
export default {
  name: "Notification",

  props: ['item'],
  data: () => ({
    //
  }),
};
</script>
