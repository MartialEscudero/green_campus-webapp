<template>
  <v-container>
    <v-toolbar flat>
      <v-app-bar-nav-icon to="/"><img src="~/../assets/img/full_logo.png"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="multilingual.navbar">
        <v-btn text>
          <Nuxt-link to="/">{{multilingual.navbar[0]}}</Nuxt-link>
        </v-btn>

        <v-btn text>
          <Nuxt-link to="/qr-code">{{multilingual.navbar[1]}}</Nuxt-link>
        </v-btn>

        <v-btn text>
          <Nuxt-link to="/sentiers">{{multilingual.navbar[2]}}</Nuxt-link>
        </v-btn>

        <v-btn text>
          <Nuxt-link to="/map">{{multilingual.navbar[3]}}</Nuxt-link>
        </v-btn>

        <v-btn text>
          <Nuxt-link to="/a-propos">{{multilingual.navbar[4]}}</Nuxt-link>
        </v-btn>
        fr
        <v-switch
          v-model="langswitch"
          @click="switchLang()"
        ></v-switch>
        en
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      langswitch: false,
    }
  },
  methods: {
    ...mapActions('store',['changeLang','getSentiers','getSentier','getMultilingual', 'getLangLocale']),
    
    getLang() {
      var lang = localStorage.getItem('lang')
      if (!lang) {
        localStorage.setItem('lang', 'fr');
        this.getLangLocale("fr")
        this.langswitch = false
      } else {
        this.getLangLocale(lang) 
        if (lang === "fr") {
          this.langswitch = false
        }
        if (lang === "en") {
          this.langswitch = true
        }
      }
    },

    switchLang() {
      this.getMultilingual(),
      this.changeLang(this.langswitch),
      this.getSentiers()
      if (this.$route.name === "sentier-slug") {
        this.getSentier(this.$route.params.slug);
      }
    }
  },
  computed: {
    ...mapGetters('store',['multilingual'])
  },
  mounted() {
    this.getMultilingual(),
    this.getLang()
  }
}
</script>

<style lang="scss" scoped>

</style>