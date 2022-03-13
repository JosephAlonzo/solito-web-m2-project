<template>
  <v-container v-if="show && user != null">
    <v-card elevation="2" class="mt-2 mx-0 px-2 pt-3 pb-3">
    <v-row>
      <v-col align="center">
        <!-- {{item.message}} -->
        <v-avatar size="60">
            <img :src="user.avatar" alt=""> 
        </v-avatar>
        <v-avatar size="60" class="ml-2">
            <img :src="require(`@/assets/${item.icon}`)" alt=""> 
        </v-avatar>
      </v-col>
    </v-row>
    <v-row class="pt-0 mt-0">
      <v-col align="center" class="pt-0 mt-0">
        <h1 class="title">Chez {{user.firstName | nulo}} {{user.lastName | nulo}}</h1>
        <p class="caption"> {{user.address | nulo}} {{user.city | nulo}} {{user.cp | nulo}}</p>
<p class="mb-0 pb-0">
          <v-btn
            :dark="!item.isDisabled"
            color="primary"
            rounded
            elevation="0"
            outlined
            @click="showProfil()"
            >Voir profil</v-btn
          >
        </p>
      </v-col>
    </v-row>
    <v-row
      align="center"
      class=" "
      justify="space-around"
    >
     

      <v-col class="col-7">
        <h2 class="title text-capitalize">{{ item.title }}</h2>
        <p class="">
          <span class="caption"
            >{{ item.address | nulo }} {{ item.city }} {{ item.cp }}</span
          >
          <br />
          <span class="caption">Le {{ item.date | dateLarge }} à {{item.time}}</span
          ><br />
          <span class="caption">{{ item.distance | nulo }} Km</span>
        </p>
      </v-col>
      <v-col class="col-4 justify-end">
        <p class="d-flex justify-end mb-2 pr-2 title" style="color:#028ED4">{{ item.price }}€</p>
        <p class="d-flex justify-end">
          <v-btn
            :dark="!item.isDisabled"
            color="primary"
            rounded
            elevation="0"
            @click="modifiedbutton()"
            >{{btnText}}</v-btn
          >
        </p>
        
      </v-col>
      <v-col class="col-1 d-flex align-end flex-column pb-16">
        <v-icon @click="addToFav(item.id)" :color="heartColor">
          {{ heart }}
        </v-icon>
        <v-icon @click="show=false" color="secondary"> mdi-cancel </v-icon>
      </v-col>

    </v-row>
    </v-card>
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
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: ["item", "currentUser"],
  data: () => ({
    show:true,
    heart: "mdi-heart-outline",
    heartColor: "secondary",
    idFav: null,
    user: null,
    btnText: "Postuler"
  }),
  computed: {
  },
  methods: {
   
    ...mapActions("sents", {
      addSent: 'add',
      deleteSent: 'delete',
    }),
    ...mapActions("favs", {
      addFav: 'add',
      deleteFav: 'delete',
    }),
    ...mapActions("user", ["getUserById"]),
    async modifiedbutton() {
      if(this.item.isSent){
        let response = await this.deleteSent(this.item.idSent);
        if (response['code'] == 200) {
          this.item.idSent = null;
          this.$set(this.item, "isSent", false);
          this.btnText = "Postuler"
        }
      }
      else{
        let payload = {
          userId: this.currentUser.id,
          offerId: this.item.id,
          status: 2,
        }
        let response = await this.addSent(payload);

        if (response['code'] == 200) {
          this.item.idSent = response['message'];
          this.$set(this.item, "isSent", true);
          this.btnText = "Annuler candidature"
        }
      }
    },
    async addToFav(id) {
      if (this.heart == "mdi-heart-outline") {
        this.heart = "mdi-heart";
        this.heartColor = "primary";
        let payload = {
          userId: this.currentUser.id,
          offerId: id
        }
        let response = await this.addFav(payload);
        if (response['code'] == 200) {
          this.item.idFav = response['message'];
          this.item.isFav = true;
        }
      } 
      else {
        this.heart = "mdi-heart-outline";
        this.heartColor = "secondary";
        let response = await this.deleteFav(this.idFav);
        if (response == 200) {
          this.item.idFav = null;
          this.item.isFav = false;
        }
      }
      this.$emit("itemModif", this.item);
    },
   
    showProfil() {
      this.$router.push({
          path: '/profil/'+this.currentUser.id,
        });
    },
  },
  async created() {
    this.user = await this.getUserById(this.item.userId)
    this.user =  this.user['message'][0]

    if (this.item.isFav) {
      this.heart = "mdi-heart";
      this.heartColor = "primary";
      this.idFav = this.item.idFav;
    }
    if (this.item.isSent) {
      this.btnText = "Annuler candidature";
    }
  },
  filters: {
    nulo: function (value) {
      if (!value) return "";
      return value
    },
    dateLarge: function (date) {
      if (!date) return "";
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
  },
};
</script>
