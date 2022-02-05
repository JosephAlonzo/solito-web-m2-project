<template>
  <v-container class="px-10">
    <v-row><h2 class="title font-weight-bold">Quoi</h2></v-row>
    <v-row justify="space-around" class="pb-0">
      <v-col cols="12" sm="10" md="8">
        <v-sheet elevation="0" class="py-0 px-1">
          <v-chip-group mandatory active-class="secondary--text">
            <v-col
              align="center"
              v-for="(service, index) in services"
              :key="index"
              class="pl-0"
            >
              <div class="pa-3 secondarySolito rounded-circle d-inline-block">
                <v-icon dark>{{ service.icon }}</v-icon>
              </div>
              <p class="mb-0 title-icon">{{ service.title }} <br>
              {{ service.price }}€/h
              </p>
            </v-col>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
    
    <v-row><h2 class="title font-weight-bold">Quand</h2></v-row>
    <v-row>
      <v-col cols="6" sm="6">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
          style="z-index: 999999"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              hint="mm/dd/yyyy"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6" sm="6">
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          style="z-index: 999999"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Picker in menu"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row><h2 class="title font-weight-bold">Durée</h2></v-row>
    <v-row justify="space-around" class="pl-0">
      <v-col cols="12" sm="10" md="8">
        <v-sheet elevation="0" class="py-0 px-0">
          <v-chip-group mandatory active-class="blue accent-4 white--text">
            <v-chip v-for="tag in tags" :key="tag" color="secondarySolito" dark>
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>

    

    
    
    <v-row justify="end" class="mt-4">
        <v-btn dark color="primary" rounded>Suivant</v-btn>
    </v-row>
  </v-container>
</template>
<style scoped>
    .title-icon{
        font-size: 1rem;
    }
</style>
<script>
export default {
  name: "SignupSeniorServices",
  data: (vm) => ({
    services: [
      {
        icon: "mdi-domain",
        title: "Promenade",
        price: "13",
      },
      {
        icon: "mdi-domain",
        title: "courses",
        price: "13",
      },
      {
        icon: "mdi-domain",
        title: "Menage",
        price: "18",
      },
      {
        icon: "mdi-domain",
        title: "Loisirs",
        price: "13",
      },
      {
        icon: "mdi-domain",
        title: "Cuisine",
        price: "13",
      },
    ],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    time: null,
    menu2: false,
    modal2: false,
    tags: [
      "30min",
      "1h00",
      "1h30",
      "2h00",
      "2h30",
      "3h00",
      "3h30",
      "4h00",
      "4h30",
    ],
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>