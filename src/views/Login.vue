<template>
  <v-container class="">
    <v-row  class="login d-flex justify-center">
      <v-col cols="9" align="center" class="align-self-center col-6 col-sm-4 col-md-3">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-img
            max-height="200"
            max-width="100"
            src="@/assets/logo2.png" 
            class="mb-2"
          ></v-img>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Mot de passe"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn rounded color="primary" class="mr-4" @click="validate">
            Se connecter
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
        <v-col align="center">
            <router-link to="Signup" class="link mt-2">S'inscrire</router-link>   
        </v-col>
    </v-row>
    <v-row>
        <v-col align="center">
            <a class="mt-2" @click="dialog=true">Mot de passe oublié?</a>   
        </v-col>
    </v-row>
    <v-alert type="error" id="alert-error" class="alert" v-model="error">
      Nom d'utilisateur ou mot de passe incorrect
    </v-alert>

    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Réinitialiser mot de passe</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
            
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Fermer
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="resetPass()"
          >
            Envoyer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <v-alert
      v-model="alertReinitMotPasse"
      
      color="success"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-check"
      class="alert-success"
    >
      Un mail vous a été envoyé pour réinitialiser votre mot de passe

    </v-alert>  

  </v-container>
</template>

<style scoped>
    .login {
        min-height: 75vh;
    }
    .link{
        text-decoration: none;    
    }
    .alert{
      position: fixed;
      top: 5%;
      right: 5%;
      width: 90%;
    }
    .alert-success{
      position: fixed;
      top: 5%;
      width: 80%;
    }
</style>
<script>
import {mapState, mapMutations, mapActions} from 'vuex' 

export default {
  data: () => ({
    password: "",
    dialog: false,
    alertReinitMotPasse: false,
    valid: true,
    show1: false,
    email: '',
    emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    error: false
  }),
  computed:{
  },
  methods:{
    ...mapActions('user', ['validateLogin']),
    validate: async function(){
      if(this.$refs.form.validate()){
        let user = await this.validateLogin({ email: this.email, password: this.password})
        console.log(user)
        if(user['code'] == 200 ){
          localStorage.id = user["data"][0].id
          localStorage.address = user["data"][0].address
          localStorage.address2 = user["data"][0].address2
          localStorage.city = user["data"][0].city
          localStorage.cp = user["data"][0].cp
          localStorage.email = user["data"][0].email
          localStorage.birthday = user["data"][0].birthday
          localStorage.firstName = user["data"][0].firstName
          localStorage.lastName = user["data"][0].lastName
          localStorage.phone = user["data"][0].phone
          localStorage.selectedAvatar = user["data"][0].avatar
          localStorage.sexe = user["data"][0].sexe
          localStorage.type = user["data"][0].type
          localStorage.rating = 5
          localStorage.evaluations = 1
          localStorage.lat = user["data"][0].latitude
          localStorage.lng = user["data"][0].longitude

          this.$router.push('/')
        }
        else{
          this.error = true
        }
      }
    },
    resetPass(){
      this.resetPassword(this.email);
      this.dialog = false;
      this.alertReinitMotPasse = true;
      setTimeout(() => {
        this.alertReinitMotPasse = false;
      }, 5000);
    }
  },
  components: {},
};
</script>