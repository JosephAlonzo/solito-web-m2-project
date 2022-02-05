<template>
    <div>
        <vuetify-google-autocomplete
            ref="t"
            id="map"
            classname="form-control"
            placeholder="adresse"
            v-on:placechanged="getAddressData"
            country="fr"
            label=""
            autocomplete="name"
        >
        </vuetify-google-autocomplete>
    </div>
</template>
 
<script>
    export default {
        data: function () {
            return {
              t: ''
            }
        },
        mounted() {
        },
        methods: {
            /**
            * When the location found
            * @param {Object} addressData Data of the found location
            * @param {Object} placeResultData PlaceResult object
            * @param {String} id Input container ID
            */
            getAddressData: function (addressData, placeResultData, id) {
              this.$emit('addressData', addressData)
            }
        }
    }
</script> 