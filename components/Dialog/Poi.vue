<template>
  <div class="text-center">
    <v-dialog
      v-model="piDialog"
      width="1500"
      persistent
    >
      <v-card v-if="piSelected" >
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn @click="close()" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="text-justify" v-if="$vuetify.breakpoint.mdAndUp">
          <div class="mx-auto md:grid md:gap-28 xl:grid-cols-2">
            <div>
              <v-carousel
                cycle
                hide-delimiter-background
                show-arrows-on-hover
                height="600"
              >
                <v-carousel-item
                  v-for="(slide, i) in piSelected.attributes.Image.data"
                  :key="i"
                  :src="slide.attributes.url"
                >
                </v-carousel-item>
              </v-carousel>
            </div>
            <div>
              <h1>{{piSelected.attributes.Nom}}</h1>
              <vue-markdown id="markdown" class="text-justify" :source="piSelected.attributes.Description"></vue-markdown>
              <div v-if="piSelected.attributes.Audio.data">
                <div class="flex items-center mt-20" v-for="audio in piSelected.attributes.Audio" :key="audio.item">
                  <audio controls :src="audio[0].attributes.url"></audio>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-text class="text-justify" v-if="$vuetify.breakpoint.smAndDown">
          <div class="mx-auto md:grid md:gap-28 xl:grid-cols-2">
            <div>
              <h1>{{piSelected.attributes.Nom}}</h1>
              <vue-markdown id="markdown" class="text-justify" :source="piSelected.attributes.Description"></vue-markdown>
              <div v-if="piSelected.attributes.Audio.data">
                <div class="flex items-center mt-20" v-for="audio in piSelected.attributes.Audio" :key="audio.item">
                  <audio controls :src="audio[0].attributes.url"></audio>
                </div>
              </div>
            </div>
            <div>
              <v-carousel
                cycle
                hide-delimiters
                height="600"
                class="mt-20"
              >
                <v-carousel-item
                  v-for="(slide, i) in piSelected.attributes.Image.data"
                  :key="i"
                  :src="slide.attributes.url"
                >
                </v-carousel-item>
              </v-carousel>
            </div>
          </div>
        </v-card-text>  
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: { 
    piDialog: { 
      default: false 
    },
    piSelected: Object,
  },
  methods: {
    close() { 
      this.$emit('update:piDialog', false) 
    },
  },
  computed: {
  ...mapGetters('store',['heroku'])
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-style: normal;
  font-weight: 800;
  font-size: 35px;
  line-height: 41px;
  color: rgba(6, 102, 100, 0.8);
  margin-bottom: 10px;
}

audio {
  display:block;
  margin:auto;
  text-align: center
}
</style>