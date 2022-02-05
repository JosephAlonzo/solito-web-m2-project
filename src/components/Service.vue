<template>
    <v-container>
        <div class="border pa-2">
        <v-row align="center" class=" d-flex align-start pl-4 mt-1" justify="space-around">
            <v-col class="" align="center">
                <v-avatar
                size="50"
                class="ma-1"
                >
                    <img :src="item.avatar" alt="1">
                </v-avatar>
                <v-avatar
                size="50"
                class="ma-1"
                >
                    <img :src="require(`@/assets/${item.icon}`)" alt="1">
                </v-avatar>
            </v-col>
        </v-row>
         <v-row class="pb-0 mb-0"  >
                <v-col class="pb-0 mb-0" align="center">
                    <h3 class="subtitle-2"> </h3>
                </v-col>
        </v-row>
        <v-row class="pt-0 mt-0">
            <v-col class="pt-0 mt-0" align="center">
                <h3 class="subtitle-2"> <span class="text-capitalize">{{item.title}}</span> avec {{item.firstName}} {{item.lastName}}
                <br>
                le {{changeDateFormat(item.date)}}
                </h3>
            </v-col>
        </v-row>
        <v-row class="">
            <v-col class="pb-5" align="center">
               <v-btn outlined rounded color="primary" @click="seeMore()">Voir plus</v-btn>
            </v-col>
        </v-row>
        </div>
    </v-container>
</template>
<style scoped>
    .border{
        border: 1px solid #d3d2d2;
    } 
    .border-left{
        border-left: 0px !important; 
    }
    .text-primary{
        color: #028ED4;
    }

</style>
<script>
export default {
    name: "Service",
    props: [ "item"],
    data: () => ({
        //
    }),
    methods:{
        changeDateFormat(date){
            date = new Date(date)
            date.setDate(date.getDate() + 1);
            const event = date ;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const response = event.toLocaleDateString('fr-FR', options);
            return response
        },
        seeMore(){
            this.$router.push({
                name: 'DetailServiceStudent',
                params: {
                    item: this.item
                }
            });
        },
    }
};
</script>
