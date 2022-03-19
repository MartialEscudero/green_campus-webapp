<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="text-h6 green lighten-3 uppercase font-weight-black justify-center ">
          Le serveur se réveille !
        </v-card-title>

        <v-card-text class="text-justify">
          <br>
          <b>Pas de panique si vous voyez ce pop-up !</b>
          <br><br>
          Pour le projet nous avons utilisé une version gratuite des serveurs d’Heroku. Cette version met le serveur en « <b>sommeil</b> » après <b>30min d’inactivité</b>.
          <br><br>
          Il faut environ <b>20sec</b> pour que le serveur se réveille, donc ne bougez pas et ne faites rien, la page va être <b>actualisée automatiquement</b>.
        </v-card-text>
        <template>
          <v-progress-linear 
            color="green lighten-1"
            indeterminate
          ></v-progress-linear>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialog: null,
    }
  },
  computed: {
  ...mapGetters('store',['heroku'])
  },
  mounted() {
    setTimeout(() =>{
      this.dialog = this.heroku
    },4000)
  }
}
</script>