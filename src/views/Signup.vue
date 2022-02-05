<template>
  <v-container>
    <v-stepper v-model="e1" flat elevation="0">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          type de services
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Mes données </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">
          Choisir mon avatar
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="4" :complete="e1 > 4">
          Mes Informations</v-stepper-step
        >
        <v-divider></v-divider>

        <v-stepper-step step="5"> Mot de passe </v-stepper-step>
      </v-stepper-header>
      <v-form ref="form">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12" height="200px" elevation="0">
              <div class="text-center">
                <v-btn
                  rounded
                  class="ma-2"
                  outlined
                  color="primary"
                  @click="selectTypeService(2)"
                >
                  Je demande un service
                </v-btn>
                <v-btn
                  rounded
                  class="ma-2"
                  outlined
                  color="primary"
                  @click="selectTypeService(1)"
                >
                  J'offre mes services
                </v-btn>
              </div>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" height="250px" elevation="0">
              <div class="text-left">
                <v-btn
                  class="ma-2"
                  v-bind:outlined="selectM"
                  color="primary"
                  rounded
                  @click="selectSexe(1)"
                >
                  M.
                </v-btn>
                <v-btn
                  rounded
                  class="ma-2"
                  v-bind:outlined="selectMme"
                  color="primary"
                  @click="selectSexe(2)"
                >
                  Mme.
                </v-btn>
                <v-text-field
                  v-model="form.lastName"
                  :rules="[rules.required]"
                  color="primary"
                  label="Nom"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.firstName"
                  :rules="[rules.required]"
                  color="primary"
                  label="Prenom"
                  required
                ></v-text-field>
                <v-row>
                  <v-col cols="12">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.birthday"
                          label="Date de naissance"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.birthday"
                        :active-picker.sync="activePicker"
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <v-btn rounded color="primary" @click="continuer()">
              Continuer
            </v-btn>

            <v-btn rounded text @click="e1--"> Annuler </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" height="320px" elevation="0">
              <p>Choisissez un avatar...</p>
              <v-avatar
                :key="index"
                v-for="(i, index) in avatars"
                size="90"
                class="ma-1"
              >
                <img :src="i.src" :alt="i.alt" @click="selectAvatar(index)" />
              </v-avatar>
            </v-card>

            <v-btn rounded text @click="e1--"> Annuler </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card class="mb-12" height="450px" elevation="0">
              <p>Informations personelles</p>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.phone"
                :rules="[rules.required]"
                label="Numéro de téléphone"
                required
              ></v-text-field>
              <vuetify-google-autocomplete
                ref="t"
                id="map"
                classname="form-control"
                placeholder="addrese"
                v-on:placechanged="getAddressData"
                country="fr"
                label=""
                autocomplete="name"
                :rules="[rules.required]"
              >
              </vuetify-google-autocomplete>

              <v-text-field
                v-model="form.address"
                :rules="[rules.required]"
                label="Adresse"
                required
                readonly
              ></v-text-field>
              <v-text-field
                v-model="form.address2"
                :rules="[rules.required]"
                label="Complément d'adresse"
                required
                readonly
              ></v-text-field>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    v-model="form.cp"
                    :rules="[rules.required]"
                    label="Code postal"
                    required
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field
                    v-model="form.city"
                    :rules="[rules.required]"
                    label="ville"
                    required
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>

            <v-btn rounded color="primary" @click="continuer()">
              Continuer</v-btn
            >

            <v-btn rounded text @click="e1--"> Annuler </v-btn>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card class="mb-12" height="200px" elevation="0">
              <p>Création de mot de passe</p>
              <v-text-field
                v-model="form.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Mot de passe"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-card>

            <v-btn rounded color="primary" @click="signup()">
              S'inscrire
            </v-btn>
            <v-btn rounded text @click="e1--"> Annuler </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-form>
    </v-stepper>
    <v-alert type="error" id="alert-error" class="alert" v-model="error">
      une erreur s'est produite lors de la création de l'utilisateur
    </v-alert>
  </v-container>
</template>

<style scoped>
.v-stepper__header {
  box-shadow: none;
}
.alert {
  position: fixed;
  top: 10%;
  right: 5%;
  width: 90%;
}
</style>

<script>
import { mapActions, mapState } from "vuex";
import GoogleMapSearch from "../components/GoogleMapSearch.vue";

export default {
  components: { GoogleMapSearch },
  data: () => ({
    error: false,
    form: Object.assign({
      firstName: "Joseph",
      lastName: "Alonzo",
      birthday: null,
      terms: false,
      city: null,
      email: "josep_alonzo@icloud.com",
      phone: "0695126895",
      address: null,
      address2: null,
      cp: null,
      type: 1,
      sexe: 1,
      avatar: null,
      password: "qwertyuiop",
      addressGoogle: null,
      latitude : null,
      longitude: null,
      vigente: true
    }),
    valid: true,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),
    modal: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    e1: 1,
    selectM: false,
    selectMme: true,
    show1: false,
    avatars: [
      {
        src: "https://hirondelle-basket.fr/public/2768/upload/theme/profils/kal-theme-photo-profil-defaut-femme.jpg",
        alt: "1",
      },
      {
        src: "https://archi-africa.com/wp-content/uploads/2019/05/profil-avatar-femme-icone-ronde_24640-14042.jpg",
        alt: "1",
      },
      {
        src: "data:image/png;base64,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",
        alt: "1",
      },
      {
        src: "data:image/png;base64,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",
        alt: "1",
      },
      {
        src: "data:image/png;base64,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",
        alt: "1",
      },
      {
        src: "data:image/png;base64,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",
        alt: "1",
      },
      {
        src: "data:image/png;base64,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",
        alt: "1",
      },
      {
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABGlBMVEX/////2Mn/5Nm1a2M5PFSmYlyPVlP/hHX/1sb/59yNYmj/6d2ZW1ewoKAqMU3/3M7/4NShWVOyZVz/9/T/3tH/7OXUrqvmwbeeZmb/8eyuZ2AxOlOFUlD/+/mpZF65bWSIS0mnaGUhLEr218yWZGexYVguOlPieXDc2t3tysDbsqmfVVC7g3yUY2eLUE2UXl/Mk4rOcGbCv8TMm5Olc29JQlawgXyGWF3lvLK6dGzJjoXbrKL+f3DgysQdLkz0gHNwZnK1nZvTta7oem4bIEHt6+xURViWlJ1XVmh4doKHgo1fW2y0eXJzUVq6j4hSRVdjS1nt3tz+uq7/rqL/movItbPempObjpOZhoptTVuinqbJx8zi4OKurrVoByBnAAARaklEQVR4nO2d+VvbOBPHwXEIrtMkhDuBhCTlCKWBFrJA6W67QLmXdu9tWf7/f+O1ncOHZqQZ2U7Y9+H7w26f4EMfz2hGkiV5YuJZz3rWs571rKeg1dnlecsozRWLk5PT09OTk8XiXMmw5pdnV8ddtLhanZ23SsVpT5NR9X4ulqz/KujsvDE3CZEBpJNzxvzsuAvM0up8aZLAFuacLM3/R2y5bBWZdAFKa3ncxVdp2eAaT4A0njDkrKFrvTDlpPE0K+V8Inh9yOKTq5OzRnJ4PcbpJ2XI5VLCfD3IuadSI5eLKeD1GIvz44abSJPPY5wctx3T5fMYi+NknC2lzecxzo0r5qwao+DzGI2x5I75NOInhjg9+pAzOzc6Po9x1K5qjZbPY7RGyDebegQFEYsjM+P8OPg8xtHUxtWRpAgEsTSCoDo7qQNYLM7NlUoloyfnX3PeuJSGUs//bA91h9Vwlea4nGl7KivJy+F0MaeNFPlWGTG0SKMbUtIhp4upVcZZciEQ41mWZdu281/ElOTrp5Q2lokGBKzngFmlVqt9tO3qqN1qldyftC05nUq8ocWY4hyAV2pv7+80sjO+so2d/e12ybY1IdOINyRA0XyW3dreabhMUTm/1Xa2W6IlSYzJI1IaokWx3pW27wC4IObddkmslwTGpJupBEDBfpbV3pPiDSD32jqMySKqAUU+e1FuvpAhFwVGta8miagGFPnadzS8PuRdW6iQpdEhKoOMED+t1s5rBp+r1zstIbCqEmRS4UYFKAYY4yTLMeBAJwa3OiaDqEr0ggHtFstBfc3csc2YROqfVQBGi2TYR3p8nrbFJoDcjNOxG3CrTAMaxn4MwOzMvnhBhRnjNsPlT1Bswhg7cQAdxB2xMsqDajEeoLw/KDxuq6RZBQOIdy2xRS4rRLz+ojSMCjHUSRKNmHyuagCizJXiBFRplAE6Ea1aAoAwoqwy6gdUaZQBAEtJWNBDLAFdR1lhdKON7KJQJ/4uIcBs9g64uqQ00yU9QFklhABjRtGgnIjKQ9SqirJKCADasfKggLgvpn4pok7il4QvANCK05IB9PoIGK6SIGpkRUmPCQJsJcrnCgioEkR+T0rio1AdtHYSJ9yBxhwliFw/xfMP0BQ1rO1kfdTVzDYPcY4HiMdRCNBI3kddtaBboY+eF09XUUCxqebIfp+8CR0jvgfiqaQBN83J+3iDG7qn1eYOWdD0ug0O/6OEjCY4HmagOxp28mGmpx3QiDgiPdig1Rl84WK10/BRVzOwEfHiUQHRkRkwyqSRKQYCMwYebcidDLQuw4CpmRA1IuqnxJYNakLwZgk3SCOE+zAhhkg0IvaAYB81jNT4XCH3RLMiBRBL9mAmTL7J7Wk4VjADNcBdITWJZESsFiJPM5gqasmMYmQrleE/kYSB+imhJmK1EPNRI2DCSiYRxErGJ5zBbov4KcGIWLJBbmQthggDZdNVLRO8yswi4qaYEZU5EWvOYHNH7L0wYWxEFzCT8Qmhzr4nxBTKhg3yaJAw49gwOPzkFS4WY62SCRNm7zBCLNioWqdME4b7TZlMPMYBXyZYn8E+lMyIckAkVeAmDFbDWiYTh9HnCxLiFRExoqKfiFkeJTyJVEOfkRdWa6GTg6HmBCVEjChNGEicQU3oBJpAKTMRkSEjeOGKuIdWRMyIsliD9HzRW4THuYViepQKTIAuEmokd4cJZbEGMTt+i+CrihpYVA/T4YyCOr9UKjCdK//whmSSI1KpcECkPSO5RTCU4sUNssqwggf610WDKVYTJe0a2OoSExqtQKChFJyu4WVnJISwESVuCttcYkKr5Y9B4U6qJb97AQ1+y42IuinipJJHGOzfk5yPrqGbYv38nnhuCr+qkDlpMOEnC+i7qSTlG5ibYi8x2E4aJEzYSX0jyglhN0WSPjLQLbl8kDBpwKER5YSIm8LD33CbFO35hgkTN+Ew1igIwZ4w0jaFDS5dVOATJhxnPJEIkVIzqqHs6j4hZMI6nQU+tEYhRDq0ECDc6pZF0gBhpMD1TKXRWHrz4kVDTbf04sWbpYbTPK0LnCRCOJpCrW+4GspXvgwIfR/14JZeOXA9qQ05OPLNq6VGBLNCIQTdFKyIsLmlFx8Q1ga+1jNcQK/UhK9CJ7jm9J22RiBEyg0QgkFJ4aS2RziohGE4B2+J4KSZjGPyyIlvhn+ruYTA4pqgQDcF3nnDU7xkucK2Wqf3ARdthCwR9TiJ/Go7kP9kHEe9P21ZeC8YGzkVMyIcaPBqaNmnB521fNAWA8NVWHF0yJnxarB3kVDuya91Dk4ldoQrohhq4ECDG7C9tDY1NRUkzNQajYwWXAjTqczh3JN37rO21MbNCBKKjW+42Y0Cbnc6U1HClOQSOozAFHAZodj4Bm2NBRp7Yc277QgJp9YWMEQw1IitGjgiYRbsA46ScGrtFEGEs4BAyAg0VqszJSWs1ysVXqOtUsED74BwqoP09uFQIyQLRjW0fpAT1pe+mtXuLxVqsqj80q2aF7vY4T7hD4x33kIHCk4WMGB74KMwYf2wWjVNh7FGQ6x0vcM3DpHDh4RTa4yJC0K6gMdowOvZ9x0ZYb3hFtgt8xcSYf1icDxiRZ+wc0+fQiSkCzAdwqHU9gFBwq/9EqNFhh+IWf2qIpyaggmhKCm0vcF0CBJarTUpYaZrDor8C4XwcEBoduFudIBwDY41IGE0IYKWBpOFdRSHsJKPYAQITTUhPDUDTBfR3gUYcUFCPxkiXnoxJARih3NOmKO+OyT8AgKGCOGGDUgYTfnwQaANFxSEhxu4TbLAObIHEiVcoE/li/af4JYPSHiq8NL6l55VoPDvnRQ5fHejH3phE4ZtSCeMNmoYhIsKwkzm60bVERBJa95J0VGdXdM5fuMrAhgihPv7JELoGKxnoSSs13YPd6FmW/+s6OH13cPDhrrV5hDCBYJHFPUJ7QMVoVtoqMCV/lnC2CN8uEh4gLS9KYScZum2vNWmLqveWWg1TJzQMHb1CCvD01gj5D7hLlYgqPDRzgWHMGBEFmFe78EMT0NNSLIheAz2yPzuE6uofn1iGXFAiHaeUiA0jKUOnzAbIOS8jOsTdpbQ0pBiKT0fekYsHXTYhFNBsQk7B8DSWRmhfsbvIRr3ax0eYS1EyDCiS9hZuxfX6fMI6e3SAePigcNIJ6znpzSNmHf4DvivuqPtUnrfYohote+XOuRyVsKAjFjTWboHNiEKitS3oPcPA4y2XWJYIiy69UvQvmdqwmj/kN7HD6l0TC3nVFRUIx6rN+8j9fEZ4zQh3RHLmRUIqUaUzU2UEUbHaRhjbUFZ74nlFADJsQZeZxkSVHRhrI0xXhoi3C+TilkDCGkJo4zPEZYTRsdLOWPeQcKj1AmxdUEqQuEVqcY8BZewRSPMZPNREXN+WTY1sSfaewvWu6egyMFUU8fqIhDfPbHeH/qyqaFGV4RAQ3x/yHsHPJS1TXRTTZXRPqEv0EnFd8DM9/hDUSuiLqFsDrSMUHyPz52LMZCdbkU8VjspdS4Gfz5NT9YJwYhlWIQTCdmQOp9GZ06UJ4qbLsAiEBKclDonSmtem2dEZTRd/xW4natf11WnEiIpfV6bztxEj3BRZcT1zwjhZxVhWTVrz8CqITRbX2d+aU+qWKNvQ0K6Z8wv1Zkj7EkZa9Z/RAh/VBBSkiFjjrDOPO++FEYs7yOEqo4JxYSced4ac/V7UrdrEELFaSQTcubqa6y3GCAqjIi4qcpJjwmArPUWGmtmBoSLqrKC95Ofk1knBFLemhmNdU9DxD25w5UXgNspamF5j2JC3ron/tq1IWFLZQ/RT09VqULd9TUwJ0VXAmu7qWEdKcq7fhq514IqUxBGL9jrD5GFzhQ3NWyFn2bW94IPdnZPBShZwh0Qdw0pfx1wQKqWTbm8MGjb/Lqg7FdQUqHGOmD+Wm5fyqroMK7f7Ts9iv27dXV3hFQJkbXcsi0H+OvxA4iqFni93u8nyqdeeM+CkigMnfX47D0VgrKl0aayFJbstUX5iFQJdfZUYO+LEUY8kSBGlwy9wQ8tn9AAdfbFYO9tEkXEHfVFVLEB9fY2Ye9PQ0ZsRADRRV9lfOlIWHr707D3GIoi4u8x6mGhgMQ6qL3HEHefKAGxfRxnALWckaxvCkt3nyjuXl+CrNaOPmL5mJYHXSHlVO9/yd6vTUAkjaDCgPuqN/a+9Pdr4+65B0jTU8vHZA814uy5hxqRGmwM71M6hIZZhK8MfEgHV5x9E9l7X4KMrffK0d4w4HvxKzoSxdr7krt/KYJot99TXkz07fde/KCVVEgJqZvQ8vaglTDukRjL5T0mX9w9aLn7COOMVosQVssnLfmcLlGx9xFm7gUtZVxTzEjI5te4fAnsBc3dz1smb8F3HtyUrVLLe8u02dfECsf5eABvT3YVYW+SVz7r7dDmqlbL5v3Z24kBcj6LxNxXH5XjpcBUobC4Xorvq88AZH8bAeEzpn9TE3Z+m8bnN4tK6NsI3O9bwPo99+HDipJw5cOH3O/xAbnft6B+o8SybPcjxpCsPz7kcjkCoXPUhz/Qq9ghJ07wGyWE78w4hTJ+/PMlpr9cQCJh7sNf6HX+/NEYThJO8jszym8FOXR/3zabzQKin85yDMLc2U/YhZx73P7tUEoBtb6gJ/3ek916edUs+Ct4RXU/sgg/diXXqhaaVy9bdtLfe5LE02LxpSnFcwp1kWMR5i7k1zML5t9FPFFofj6vhPUUT7sFeXEcXfRsqAScmurZ8IvyioXuKdYr1PzuGvbtvOLPCvt56ntpdBGCqLzaSwdq/owgan+pE6yKxX+ahMKY1V6kiS4kEVXpRRrCQ3MQ/wGn5cf42ipQFYmA5samV/K3qoq48tY7bnNDfUkEMd5HgYUmePFnGqC50beNkrBvaxoh4KjxvkMqZsU2yZtMd/+AXowUl5JA1TB3SL5uO/rM4wFGo83cJ2pJzG6O4qZ9J81Rr2pWP0WapnG/BxyONsVToo862uiXXR5N+yZ8S3RSR81Qzoj/TefwqE2RbsKhm27KjLiyyXRS14gBwiS+yx0KqIv0gjhG7GXEXBlHXCn3Djmjm9BBXEwojAKIxX/UbZkA4W5O5ad9H83tcggLw4yRFKDfk2ozymEOU2LuI4aY71uZmAyH6odTnR6THNFprrEKUv3WN1EuCznqSnbw528c53eM2MuJSQL2EYtXrII4RmwMGNZFxJX1wR8bTBOaV8XEAT1ETqoYIG4OKM4iZlzJng3+xPXRXsJIGtANN4xsDyDmzsr5lR7lykq+POTTAHSzfnJBJoC4yKuFvbJ0fUQH8u16uVxef3sW+G2zy39uZmExBcCJiYdzflHMqvk2J9NbUwPQPH9IA3BiYkurNH64AVTju6j71LbSAZyY+Hyl4ajmxrdNhG/zmw5g4Qpbg5OAVq/Z4dR0t7XcPQP4Pu5WdXyieR27NyHV93ONQpkb5mG0Om4emjoGNM+/p8rn6MHU8VTHjuZhfbPXSvu4WXfwdOzn3DulGBPU5086nupBbmx0L75edJ3/a+E5HvopxSoY0PemZgFdTK261z+3mbqHDrSlFVPjqnCVWpIAdEkZFE5U1cLlCPkcbd1q1kZNNW9HacCeHs9H56qF88eR8zn6fDMiV60WbkYTQkU5rjoCxnE4qK93V2lXx+bVuzHyeYxmmoxNc9x8rhw7puOr1ebVWAIMoIdPzeTjaqF5O4I2KFlbNwkzFs5vxhlfIK0+dhODLBS638eVH6TaukkCstDsPjnz+Vp9uDFjQRaa5s1Dun342Fp9uDTPCzqU1cK5efnU8fr69/HaqUuMNl3VObp7/fjvuAvO0erWu5tb0531pvLLguOZtzePT7fqyfR56/Hyuts89+b3hTr31ao3J++82b2+fNx6knGTo89b7x4vb65vu13PZKbZ7d5e31w+vnv4z6M961nPetaz/k/0P9GKk/JXbaBXAAAAAElFTkSuQmCC",
        alt: "1",
      },
      {
        src: "https://atformation.fr/wp-content/uploads/2021/09/at-formation-avis.png",
        alt: "1",
      },
    ],
    activePicker: null,
    date: null,
    menu: false,
  }),
  methods: {
    ...mapActions("user", ["add"]),
    save(date) {
      this.$refs.menu.save(date);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$router.push("/SignupSenior");
      }
    },
    continuer() {
      let validate = false;
      switch (this.e1) {
        case 2:
          if (
            this.form.sexe &&
            this.form.firstName &&
            this.form.lastName &&
            this.form.birthday
          )
            validate = true;
          break;
        case 4:
          if (this.form.email && this.form.phone && this.form.addressGoogle)
            validate = true;
          break;
      }

      if (this.$refs.form.validate() || validate) {
        this.e1++;
      }
    },
    selectTypeService(type) {
      this.form.type = type;
      this.e1++;
    },
    selectSexe(sexe) {
      this.form.sexe = sexe;
      if (sexe == 1) {
        this.selectM = false;
        this.selectMme = true;
      } else {
        this.selectMme = false;
        this.selectM = true;
      }
    },

    getAddressData: function (addressData) {
      this.form.addressGoogle = addressData;
      this.form.latitude = addressData.latitude
      this.form.longitude = addressData.longitude
      this.form.address = addressData.street_number + " " + addressData.route;
      this.form.address2 = addressData.name;
      this.form.cp = addressData.postal_code;
      this.form.city = addressData.locality;
    },
    selectAvatar(index) {
      this.form.avatar = this.avatars[index].src;
      this.e1++;
    },
    async signup() {
      console.log(this.form);
      let data = await this.add(this.form);
      if (data['code']==200) {
          localStorage.address = this.form.address;
          localStorage.address2 = this.form.address2;
          localStorage.city = this.form.city;
          localStorage.cp = this.form.cp;
          localStorage.email = this.form.email;
          localStorage.firstName = this.form.firstName;
          localStorage.lastName = this.form.lastName;
          localStorage.localId = this.form.localId;
          localStorage.phone = this.form.phone;
          localStorage.avatar = this.form.avatar;
          localStorage.sexe = this.form.sexe;
          localStorage.type = this.form.type;
          localStorage.rating = 0;
          localStorage.evaluations = 0;
          this.$router.push("/");
      } else {
        this.error = true;
      }
    },
  },
  computed: {
    ...mapState("login", ["localId"]),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>