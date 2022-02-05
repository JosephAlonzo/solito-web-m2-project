<template>
  <v-app>
    <v-app-bar app color="white" dark class="" elevation="0" v-if="showAppBar()" >
      <v-spacer></v-spacer>
      <div class="my-8 pl-10 text-center">
        <v-img alt="solito Logo" class="shrink mr-2" contain src="@/assets/logo.png" transition="scale-transition" width="200" />
      </div>
      <v-spacer></v-spacer>
       <v-btn icon color="primary">
        <router-link to="/Notifications" class="decoration"> <v-icon>mdi-bell-outline</v-icon> </router-link>
      </v-btn>
    </v-app-bar>
    <v-card class="mb-16 d-none d-md-block " v-if="showBottomMenu()">
      <v-app-bar
        fixed
        color="white"
        elevate-on-scroll
      >
      <v-spacer></v-spacer>
     
      <v-toolbar-title>
        <v-img alt="solito Logo" class="shrink mr-2" contain src="@/assets/logo.png" transition="scale-transition" width="130" />

      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <a class="decoration" @click="showNotification()"> <v-icon>mdi-bell-outline</v-icon> </a>
      </v-btn>

      <template v-slot:extension>
        <v-tabs centered>
          <div v-for="link in links" :key="link.text" @click="$router.push(link.href)" >
          <v-tab v-if="showSeniorAppBar(link.text)" style="height: 100%;">
            {{link.text}}
          </v-tab>
          </div>
        </v-tabs>
      </template>
     
    </v-app-bar>
    </v-card>
      

    <v-main>
      <router-view class="mb-16 pb-16" v-if="isMobile" />
      <router-view class="mb-16 pb-16 pt-16" v-else/>
      <bottom-menu v-if="showBottomMenu()" />
    </v-main>

  </v-app>
</template>

<style>
  body::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .decoration{
    text-decoration: none;
  }

  .v-application .pt16{
    padding-bottom: 64px !important;
  }

</style>

<script>
import BottomMenu from '@/components/BottomMenu'

export default {
  name: "App",

  data: () => ({
    notShowBottomMenu: ["Login", "Signup"],
    notShowAppBar: ["Login"],
     links: [
      {
        text: "Accueil",
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
        text: "Menu",
        href: "/Account",
        svg:"menu.svg"
      },
    ],
    isMobile: false 
  }),
  components: {
    BottomMenu
  },
  
  methods: {
    showBottomMenu() {
      if( this.notShowBottomMenu.includes(this.$route.name) ) return false
      return true
    },
    showSeniorAppBar(value){
      if(localStorage.type == 2){
        let notShow = ["Cadeaux", "Offres"]
        if(notShow.includes(value) ){
          return false
        } 
        return true
      }
      else{
        return true;
      }
    },
    showAppBar() {
      if( this.notShowAppBar.includes(this.$route.name) ) return false
      return true
    },
    onResize () {
        this.isMobile = window.innerWidth < 600
      },
    showNotification(){
      if(this.currentRouteName == "Notifications"){
        this.$router.go(-1)
      }
      else{
        this.$router.push("/Notifications")
      }
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
},
  created(){
    if (!localStorage.email) {
      this.$router.push('/login')
    }
  },
  beforeDestroy () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
    },

    mounted () {
      this.onResize()

      window.addEventListener('resize', this.onResize, { passive: true })
    },
};
</script>
