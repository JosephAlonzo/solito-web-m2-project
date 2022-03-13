<template>
  <v-container>
    <h1 class="title ml-8 pb-4">Offres:</h1>
    <v-row class="mb-0">
      <v-col align="right" class="mt-0 pt-0 pb-0">
        
        <v-btn rounded dark color="primary" class="mr-2" @click="dialog = true">
          Filtrer</v-btn
        >
        
        <v-icon color="secondary" class="mr-2" @click="filterFav = !filterFav" v-if="!filterFav"> mdi-heart-outline </v-icon>
        <v-icon color="primary" class="mr-2" @click="filterFav = !filterFav" v-else > mdi-heart </v-icon>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mt-0 pb-0" v-if="filters.length != 0">
      <v-col cols="12" sm="10" md="8" class="pb-0 mb-0">
        <v-sheet elevation="0" class="py-0 px-1">
          <v-chip-group mandatory active-class="primary--text">
            <v-chip
              v-for="(tag, i) in filters"
              :key="i"
              class="pr-0"
              :id="`tag-${tag.i}`"
            >
              {{ tag.text }}
              <v-btn
                class="ma-0"
                text
                icon
                color="red lighten-2"
                @click="removeFilter(tag)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
    
    <div v-if="markers != null">
      <div v-for="item of markers" :key="item.id">
        <OffreIndividual 
        v-if="((s && f && markers)  && ((filterFav && item.isFav) 
        || (!filterFav&&!filterSelected) ) 
        || filterSelected && showItem(item))" :item="item" :currentUser="user" @itemModif="item = $event"></OffreIndividual>

        <!-- <OffreIndividual 
        v-if="
        ((s && f && markers)  && favsFinish && showItem(item)) && item.position != null
        " :item="item" @itemModif="item = $event"></OffreIndividual> -->
      </div>
    </div>
    <div>
      <!-- <v-alert
        v-model="alertCandidateOffre"
        color="success"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-check"
        class="alert"
      >
        Une demande a été envoyée à solito. Vous aurez un retour sous 5-7 jours.
      </v-alert> -->
      <v-dialog v-model="dialog" persistent max-width="1000" max-height="1000">
        <v-card class="pa-9">
          <h3 class="pb-4">Quoi</h3>
          <v-row>
            <v-col
              class="col-4"
              align="center"
              v-for="(item, index) in icons"
              :key="index"
            >
              <v-avatar size="65" @click="addFilterByType(index)">
                <img
                  :id="`img-${index}`"
                  :src="require(`@/assets/${item.iconSecondary}`)"
                  :alt="item.title"
                />
              </v-avatar>
              <p class="caption">{{ item.title }}</p>
            </v-col>
          </v-row>
          <h3 class="pb-4">Où</h3>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            class=""
            flat
            hide-no-data
            hide-details
            label="où"
            v-on:keyup.enter="addPlace"
            @click="addPlace"
          ></v-autocomplete>

          <v-card-actions class="mt-0 pb-5 pt-4">
            <v-spacer></v-spacer>
            <v-btn
              rounded
              color="primary"
              @click="
                dialog = false;
                if (select != null) {
                  addPlace();
                };
                filterSelected=!filterSelected
              "
            >
              rechercher
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import OffreIndividual from "../components/OffreIndividuel.vue";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    alert: true,
    elements: [],
    dialog: false,
    icons: [
      {
        icon: "icons/primary/courses.svg",
        iconSecondary: "icons/secondary/courses2.svg",
        selected: false,
        title: "courses",
      },
      {
        icon: "icons/primary/cuisine.svg",
        iconSecondary: "icons/secondary/cuisine2.svg",
        selected: false,
        title: "cuisine",
      },
      {
        icon: "icons/primary/loisirs.svg",
        iconSecondary: "icons/secondary/loisirs2.svg",
        selected: false,
        title: "loisirs",
      },
      {
        icon: "icons/primary/menage.svg",
        iconSecondary: "icons/secondary/menage2.svg",
        selected: false,
        title: "ménage",
      },
      {
        icon: "icons/primary/promenade.svg",
        iconSecondary: "icons/secondary/promenade2.svg",
        selected: false,
        title: "promenade",
      },
    ],
    loading: false,
    items: [],
    search: null,
    select: null,
    searchInformation: [],
    filters: [],
    filterFav: false,
    filterSelected: false,
    showMap:false,
    s:null,
    f:null,
    markers:null,
    favsFinish: null
  }),
  methods: {
    //...mapActions("offres", ["getSents", "getFavs", "getJobs"]),
    ...mapActions("offers", {
      getOffers: 'get',
    }),
    ...mapActions("sents", {
      getSents: 'get',
    }),
    ...mapActions("favs", {
      getFavs: 'get',
    }),
    ...mapActions("user", {
      getInformationUserLocalStorage: 'getInformationUserLocalStorage',
    }),
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.searchInformation.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    addFilterByType(index) {
      if(this.filters.length == 0){
        this.filters.push( {text: "annuler filtres",type: "delete",index: "9999999", i: Math.random() * 485986547755544459});
      }
      let element = document.querySelector("#img-" + index);
      const selected = this.icons[index].selected;
      if (!selected) {
        this.icons[index].selected = true;
        element.src = require(`@/assets/${this.icons[index].icon}`);
        this.filters.push( {text: this.icons[index].title,type: "icon",index: index, i: Math.random() * 485986547755544459});
        } 
      else {
        this.icons[index].selected = false;
        element.src = require(`@/assets/${this.icons[index].iconSecondary}`);
        delete this.filters[this.icons[index].title];
      }
    },
    addPlace() {
      if(this.filters.length == 0){
        this.filters.push( {text: "annuler filtres",type: "delete",index: "0000", i: Math.random() * 485986547755544459});
      }
      let placeIndex = this.searchInformation.indexOf(this.select);
      if (placeIndex !== -1) {
        this.filters.push(  {
          text: this.select,
          type: "place",
          i: Math.random() * 485986547755544459,
        });
        this.select = null;
      }
    },
    removeFilter(item) {
      try {
        let c = 0;
        for(let element of this.filters){
          if(element.i == item.i){
            this.filters.splice(c, 1);
          }
          c++
        }
        if (item.type == "icon") {
          let element = document.querySelector("#img-" + item.index);
          this.icons[item.index].selected = false;
          element.src = require(`@/assets/${this.icons[item.index].iconSecondary}`);
        }
        else if (item.type == "delete"){
          const variable = [...this.filters];
          variable.forEach(element => {
            this.removeFilter(element);
          });
          this.filterSelected = false;
        }
      } catch (e) {
      }
    },
    showItem(item){
      for(let filter of this.filters){
        if(item.title == filter.text){
          return true;
        }
        else if(filter.text == item.cp || filter.text == item.address || filter.text == item.city){
          return true;
        }
      }
      return false;
    },
  },
  computed: {
    ...mapState("offres", [
      "alertCandidateOffre",
      "favs",
      "sentJobs",
      "isMounted",
    ]),
  },
  components: {
    OffreIndividual,
  },
  async created() {
    this.user = await this.getInformationUserLocalStorage();
    this.markers = await this.getOffers();
    this.s = await this.getSents(this.user.id);
    this.f = await this.getFavs(this.user.id);
    console.log(this.markers)
    if(this.markers['code'] == 200){
      this.markers = this.markers['message'] 
      for (let i of this.markers) {
        this.searchInformation.push(String(i.cp));
        this.searchInformation.push(i.address);
        this.searchInformation.push(i.city);
        i.isFav = false
        i.isSent = false
        i.idFav =  null
        i.idSent = null
      }
      if(this.f['code'] == 200){
        this.f = this.f['message']
        for (let i in this.markers) {
          for (let j in this.f) {
            if(this.markers[i].id == this.f[j]['offerId'] ){
              this.markers[i].isFav = true
              this.markers[i].idFav = this.f[j]['id']
            }
          }
        }
      }
      if(this.s['code'] == 200){
        this.s = this.s['message']
        for (let i in this.markers) {
          for (let j in this.s) {
            if(this.markers[i].id == this.s[j]['offerId'] ){
              this.markers[i].isSent = true
              this.markers[i].idSent = this.s[j]['id']
            }
          }
        }
      }
    }

  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 10%;
  width: 80%;
}
</style>