<template>
  <v-container>
    <v-row>
      <v-col align="center">
     <v-avatar size="70px">
          <img
            :src="user.selectedAvatar"
            alt="profil-photo"
            @click="selectAvatar(index)"
          />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row class="pt-0">
      <v-col align="center"  class="pt-0">
        <h2 class="subtitle-1 font-weight-medium">
            {{ user.first }} {{ user.last }}
          </h2>
          <v-btn rounded color="primary" outlined @click="$router.push('/profilDetail')" class="mt-5">Voir mon profil</v-btn>
         
      </v-col>
    </v-row>

    <v-expansion-panels class="mt-4" flat>
      <v-expansion-panel v-for="(submenu, i) in menu" :key="i">
        <v-divider></v-divider>
        <v-expansion-panel-header>
          <v-row align="center">
            <v-col cols="1"
              ><v-icon>{{ submenu.icon }}</v-icon>
            </v-col>
            <v-col class="pt-4">{{ submenu.title }}</v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pl-6">
          <v-row v-for="link in submenu.items" :key="link.title">
            <router-link :to="link.href" class="link mt-2">
              {{ link.title }}</router-link
            >
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="text-center mt-8">
      <v-btn color="secondary" rounded dark @click="deconected"
        >Déconnexion</v-btn
      >
    </div>
  </v-container>
</template>

<style scoped>
.link {
  text-decoration: none;
}
</style>

<script>
export default {
  data: () => ({
    menu: [
      {
        title: "Paramètres et confidentialité",
        icon: "mdi-cog",
        items: [
          {
            title: "Notifications",
            href: "",
          },
          {
            title: "Confidentialité",
            href: "",
          },
          {
            title: "Sécurité",
            href: "",
          },
          {
            title: "Publicité",
            href: "",
          },
          {
            title: "Compte",
            href: "",
          },
        ],
      },
      {
        title: "Aide et assistance",
        icon: "mdi-information-outline ",
        items: [
          {
            title: "Aide",
            href: "",
          },
          {
            title: "Espace d'assistance",
            href: "",
          },
          {
            title: "Conditions et réglements",
            href: "",
          },
          {
            title: "À propos de solito",
            href: "",
          },
        ],
      },
    ],
    user: [],
  }),
  components: {},
  methods: {
    deconected() {
      localStorage.removeItem("address");
      localStorage.removeItem("address2");
      localStorage.removeItem("city");
      localStorage.removeItem("cp");
      localStorage.removeItem("email");
      localStorage.removeItem("first");
      localStorage.removeItem("last");
      localStorage.removeItem("first");
      localStorage.removeItem("localId");
      localStorage.removeItem("phone");
      localStorage.removeItem("selectedAvatar");
      localStorage.removeItem("sexe");
      localStorage.removeItem("type");
      localStorage.removeItem("lat");
      localStorage.removeItem("lng");
      localStorage.removeItem("birthday");
      localStorage.removeItem("savedCV");

      this.$router.push("/login");
    },
    getInformationUser() {
      this.user["address"] = localStorage.address;
      this.user["address2"] = localStorage.address2;
      this.user["city"] = localStorage.city;
      this.user["cp"] = localStorage.cp;
      this.user["email"] = localStorage.email;
      this.user["firstName"] = localStorage.firstName;
      this.user["lastName"] = localStorage.lastName;
      this.user["localId"] = localStorage.localId;
      this.user["phone"] = localStorage.phone;
      this.user["sexe"] = localStorage.sexe;
      this.user["type"] = localStorage.type;
      this.user["selectedAvatar"] = localStorage.selectedAvatar;
    },
  },
  created() {
    this.getInformationUser();
  },
};
</script>