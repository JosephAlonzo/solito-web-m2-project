<template>

  <v-container fluid class="bottom-menu d-md-none">
    <v-row align="center" justify="space-around">
      <router-link :to="link.href" v-for="link in links" :key="link.text" v-bind:class="{ active: isActive(link) }"><v-img alt="img" class="shrink" :src="require(`@/assets/${link.svg}`)" transition="scale-transition"/></router-link> 
    </v-row>
    <!-- <v-tabs centered >
      <v-tab v-for="link in links" :key="link.text" @click="$router.push(link.href)">
            {{link.text}}
          </v-tab>
    </v-tabs> -->
  </v-container>
</template>
<style scoped>
  .bottom-menu{
    position: fixed;
    bottom: 0%;
    border-top: 1px solid#E5E5E5;
    padding-top: 2rem;
    background-color: #ffffff;
    z-index: 200;
    padding-bottom: 15px;
  }
  .active{
    border-bottom: #028ED4 3px solid;
  }
</style>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "BottomMenu",

  data: () => ({
    links: [
      {
        text: "Home",
        href: "/",
        svg: "home.svg"
      },
      {
        text: "Compte",
        href: "/Compte",
        svg:"euro.svg"
      },
      {
        text: "Offres",
        href: "/Offres",
        svg:"offres.svg"
      },
      {
        text: "Cadeaux",
        href: "/Cadeaux",
        svg:"cadeau.svg"
      },
      {
        text: "Account",
        href: "/Account",
        svg:"menu.svg"
      },
    ],
    user:null
  }),
  computed:{
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods:{
    ...mapActions('user', ['getInformationUserLocalStorage']),
    isActive(link){
      return this.currentRouteName==link.text
    }
  },
  async created() {
    this.user = await this.getInformationUserLocalStorage()
    if(this.user.type == 2){
      this.links.splice(2,2)
    }
  },
};

</script>
