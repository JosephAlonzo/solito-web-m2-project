<template>
  <v-container>
    <v-dialog v-model="dialogQr" max-width="600">
      <v-card class="pa-5">
        <v-alert type="error" v-if="error">
          {{ error }}
        </v-alert>
        
        <!-- <p class="decode-result">
          Last result: <b>{{ result }}</b>
        </p> -->

        <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
          <div v-if="validationSuccess" >
            c'est bon
          </div>

          <div v-if="validationFailure" >
            Le QRCode n'est pas valide
          </div>

          <div v-if="validationPending" >
            ...
          </div>
        </qrcode-stream>

        <v-card-actions class="pt-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined rounded @click="turnCameraOff(); dialogQr= false">Fermer</v-btn>
          <v-btn color="primary" rounded @click="getPaid();" v-if="isValid===true">Accepter</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <h1 class="title ml-4 pb-4"  v-if="user != null">
      Bonjour <br />
      <span class="subtitle text-capitalize"
        >{{ user.firstName }} {{ user.lastName }} !</span
      >
    </h1>
    <v-row class="mb-0 pb-0" v-if="user != null">
      <v-col align="center" class="mb-0 pb-0"  v-if="user.type == 2">
        <v-btn rounded outlined color="primary" dark @click="dialog = true"
          >Ajouter un service</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" v-if="user != null">
        <v-btn
          rounded
          color="primary"
          dark
          v-if="user.type == 1"
          @click="trigger"
          >Accepter paiement</v-btn
        >
        <v-btn
          rounded
          color="primary"
          dark
          v-else
          @click="$router.push('/Compte')"
          >Recharger mon compte</v-btn
        >
      </v-col>
    </v-row>
    <!-- <input type="file" accept="image/*" capture="camera" /> -->
    <div
      v-if="user != null &&
        user.type == 1 && (pending != [] || accepted != [] || refused != [])
      "
    >
      <h2 class="subtitle-1 ml-4 mt-4 font-weight-bold">Mes prochains jobs</h2>
      <div v-for="item of accepted" :key="item.idSend">
        <service :item="item" v-if="item.status == 1" />
      </div>
      <h2 class="subtitle-1 ml-4 mt-4 font-weight-bold">
        En attente d'acceptation
      </h2>
      <div v-for="item of pending" :key="item.idSend">
        <service :item="item" v-if="item.status == 2" />
      </div>
      <h2 class="subtitle-1 ml-4 mt-4 font-weight-bold">Refusé</h2>
      <div v-for="item of refused" :key="item.idSend">
        <service :item="item" v-if="(item.status = 3)" />
      </div>
    </div>
    <div v-if="user != null && user.type == 2">
      <h2 class="subtitle-1 ml-4 mt-4 font-weight-bold">Mes demandes</h2>
      <div v-for="(item, index) of myjobs" :key="index">
        <Job :item="item" :id="item.id" />
      </div>
    </div>
    <input
      type="file"
      accept="image/*"
      capture="camera"
      ref="btnCard"
      class="d-none"
    />

    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000"
      max-height="1000"
      class="pa-4"
    >
      <v-stepper v-model="e1" flat elevation="0" class="pt-2">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1"> </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3"> </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" :complete="e1 > 4"> </v-stepper-step>
        </v-stepper-header>
        <v-form ref="form">
          <v-stepper-items class="pt-0 mt-0">
            <v-stepper-content step="1" class="pt-0 mt-0">
              <v-card class="" height="270px" width="300" elevation="0">
                <h3 class="pb-4">Quoi</h3>
                <v-row>
                  <v-col
                    class="col-4"
                    align="center"
                    v-for="(item, index) in icons"
                    :key="index"
                  >
                    <v-avatar size="65">
                      <img
                        :id="`img-${index}`"
                        :src="require(`@/assets/${item.iconSecondary}`)"
                        :alt="item.title"
                        @click="
                          form.service = item;
                          form.icon = item.icon;
                          form.iconSecondary = item.iconSecondary;
                          form.title = item.title;
                          e1++;
                        "
                      />
                    </v-avatar>
                    <p class="caption">{{ item.title }}</p>
                  </v-col>
                </v-row>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded text @click="dialog = false"> Annuler </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="2" class="pt-0 mt-0">
              <v-card class="mb-12" height="250px" width="300" elevation="0">
                <h3 class="pb-4">Quand</h3>
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
                          :rules="[rules.required]"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu1 = false"
                        locale="fr"
                        :min="(new Date(Date.now())).toISOString().substr(0, 10)"

                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6" sm="6">
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="form.time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                      style="z-index: 999999"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.time"
                          label="heure"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="form.time"
                        full-width
                        @click:minute="$refs.menu.save(form.time)"
                        format="24hr"
                        scrollable
                        min="06:00"
                        max="23:00"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-checkbox
                  v-model="form.recurrent"
                  label="Régulier"
                ></v-checkbox>
                <h3 class="pb-4">Durée</h3>
                <v-row justify="space-around" class="pl-0">
                  <v-col cols="12" sm="10" md="12">
                    <v-sheet elevation="0" class="py-0 px-0">
                      <v-chip-group
                        mandatory
                        active-class="primary white--text"
                      >
                        <v-chip
                          v-for="tag in tags"
                          :key="tag"
                          color="secondarySolito"
                          dark
                          @click="form.duree = tag"
                        >
                          {{ tag }}
                        </v-chip>
                      </v-chip-group>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="primary" @click="continuer()">
                  Continuer
                </v-btn>
                <v-btn rounded text @click="e1--"> Annuler </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" height="80px" width="300" elevation="0">
                <h3 class="pb-4">Combien</h3>
                <v-text-field
                  label="combien"
                  append-icon="mdi-currency-eur"
                  type="number"
                  v-model="form.price"
                  :rules="[rules.required, rules.min]"
                  class="pt-0 mt-0"
                ></v-text-field>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="primary" @click="continuer()">
                  Continuer</v-btn
                >
                <v-btn rounded text @click="e1--"> Annuler </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card class="mb-12" height="230px" width="300" elevation="0">
                <v-row class="mb-0 pb-0">
                  <v-col align="center" class="mb-0 pb-0">
                    <h3 class="pb-4">Mon service demandé</h3>
                    <v-avatar size="65" v-if="form.service != null">
                      <img
                        :src="require(`@/assets/${form.service.icon}`)"
                        :alt="form.service.title"
                      />
                    </v-avatar>
                    <p class="caption" v-if="form.service != null">
                      {{ form.service.title }}
                    </p>
                  </v-col>
                </v-row>
                <v-row class="mt-0 pt-0 pb-4">
                  <v-col align="center" class="mt-0 pt-0">
                    <p>
                      Le {{ date }} à {{ form.time }} <br />
                      Durée {{ form.duree }}<br />
                      Tarif {{ form.price }}€ <br />
                      <span v-if="form.recurrent">Régulier</span>
                    </p>
                  </v-col>
                </v-row>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="primary" @click="register()"
                  >Confirmer</v-btn
                >
                <v-btn rounded text @click="e1--"> Annuler </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-dialog>
  </v-container>
</template>

<script>
import Service from "../components/Service.vue";
import Job from "../components/Job.vue";
import { mapState, mapActions } from "vuex";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  props: ["idDelete"],
  data: (vm) => ({
    user: null,
    dialogQr:false,
    isValid: undefined,
    camera: 'auto',
    result: null,
    error: null,
    menu1: false,
    menu2: false,
    e1: 1,
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

    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

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
      "5h00",
      "5h30",
      "6h00",
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v >= 1 || "valeur ne pas valide",
    },
    form: Object.assign({
      time: null,
      recurrent: false,
      duree: null,
      icon: null,
      iconSecondary: null,
      title: null,
      price: null,
      service: null,
      type: null
    }),
    //////// Student ///////////////////////
    pending: [],
    accepted: [],
    refused: [],
    //////// Senior ///////////////////////
    myjobs: {},
    candidates: [],
  }),
  components: {
    Job,
    Service,
    QrcodeStream,
  },
  computed: {
    
    DateFormatted() {
      return this.formatDate(this.date);
    },
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    ...mapActions("user", [
      "getInformationUserLocalStorage",
      "getUserById"
    ]),
    ...mapActions("offers", [
      "add",
      "getByUser"
    ]),
    ...mapActions("sents", {
      getSents: 'get',
    }),
    trigger() {
      //this.$refs.btnCard.click();
      this.dialogQr = true;
      this.turnCameraOn()
    },
    getPaid(){
      window.location.href = this.result;
    },
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
    continuer() {
      let validate = false;
      switch (this.e1) {
        case 2:
          if (this.form.duree == null) this.form.duree = this.tags[0];
          if (this.form.time && this.date) validate = true;
          break;
        case 3:
          if (this.form.combien) validate = true;
          break;
      }
      if (this.$refs.form.validate() || validate) {
        this.e1++;
      }
    },
    async register() {
      console.log(this.user)
      this.form["userId"] = parseInt(this.user.id);
      this.form["date"] = this.date;
      let response = await this.add(this.form);
      if (response['code'] == 200) {
        this.dialog = false;
        this.e1 = 1;
        let response = await this.getByUser(this.user.id);
        if (response['code'] == 200) {
          this.myjobs = response['message'];
          let keys = [];
          let tmp = {}
          for (let i in this.myjobs) {
            keys.push(i);
          }
          keys = keys.reverse()
          for (let i of keys) {
            tmp[i] = this.myjobs[i]
          }
          this.myjobs = tmp
        }
      }
    },
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(3000)
      this.isValid = content.startsWith('http')

      // some more delay, so users have time to read the message
      await this.timeout(2000)

      this.turnCameraOn()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
        })
      },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },

  },
  async created() {
    this.user = await this.getInformationUserLocalStorage();

    if (this.user.type == 1) {
      this.sentJobs = await this.getSents(this.user.id);
      if(this.sentJobs['code'] == 200){
        this.sentJobs = this.sentJobs['message']
        for (let job of this.sentJobs) {
          if (job.status == 1) 
            this.accepted.push(job);
          else if( job.status == 3)
            this.refused.push(job);
          else
            this.pending.push(job);
        }
      }
    } else {
      let response = await this.getByUser(this.user.id);
      if (response['code'] == 200) {
        this.myjobs = response['message'];
        let keys = [];
        let tmp = {}
        for (let i in this.myjobs) {
          keys.push(i);
        }
        keys = keys.reverse()
        for (let i of keys) {
          tmp[i] = this.myjobs[i]
        }
        this.myjobs = tmp
      }
    }
  },
};
</script>
<style scoped>
.v-stepper__header {
  box-shadow: none;
}
</style>