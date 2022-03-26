<template>
  <client-only>
    <div>
      
      <div id="pc" v-if="$vuetify.breakpoint.mdAndUp">
        <div v-if="multilingual.qrcode">
          <div class="container">
            <h1>{{multilingual.qrcode[0]}}</h1>
            <!-- <div class="mx-auto md:grid md:gap-28 xl:grid-cols-2">
              <div>
              </div>
              <div></div>
            </div> -->
            <div class="infos">
              <v-text-field
                rounded
                clearable
                solo
                v-model="uuid"
                :label="multilingual.qrcode[2]"
                append-icon="mdi-magnify"
                @click:append="pushPoi"
              ></v-text-field>
              <p>{{multilingual.qrcode[3]}}</p>
            </div>
          </div>
          <img v-if="multilingual.qrcode[1].slice(0,7) == 'Utilise'" class="mobile w-2/5" src="~/assets/img/bloc/mobile_fr.png">
          <img v-else class="mobile w-2/5" src="~/assets/img/bloc/mobile_en.png">
          <img class="bloc" src="~/assets/img/bloc/two.png">
        </div>
      </div>
      
      <div id="mobile" v-if="$vuetify.breakpoint.smAndDown">
        <div v-if="multilingual.qrcode">
          <h1>{{multilingual.qrcode[0]}}</h1>
          <p class="camera active" v-if="camera == true">● {{multilingual.qrcode[4]}}</p>
          <p class="camera inactive" v-else>● {{multilingual.qrcode[5]}}</p>
          <p class="error">{{ error }}</p>
          <qrcode-stream @decode="onDecode" @init="onInit" />
          <div v-if="poi" class="titleCard">
            <span v-if="poi.length == 0">{{multilingual.qrcode[6]}}</span>
            <span v-else>{{poi.Nom.slice(0,25) + "..."}}</span>
          </div>
          <button v-if="poi.length != 0" class="transition ease-in-out" >
            <Nuxt-link class="btn" :to="'/point-interet/' + poi.UUID">{{multilingual.qrcode[7]}}</Nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  head: {
    title: 'QR Code',
  },
  data () {
    return {
      uuid: null,
      result: null,
      error: '',
      camera: true
    }
  },
  methods: {
    ...mapActions('store',['getPoi']),

    pushPoi() {
      if (this.uuid.length === 10 ) {
        this.$nuxt.$options.router.push('/point-interet/' + this.uuid)
      }
    },

    onDecode (result) {
      this.getPoi(result.slice(result.length-10,result.length))
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.camera = false
        } else if (error.name === 'NotFoundError') {
          this.camera = false
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
  },
  computed: {
    ...mapGetters('store',['poi','multilingual']),
  }
}
</script>

<style lang="scss" scoped>
#pc {
  position: relative;
  height: calc(100vh - 120px);
  
  & h1 {
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 42px;
    color: rgba(6, 102, 100, 0.8);
  }

  & .mobile {
    position: absolute;
    top: 50px;
    right: 100px;
  }

  & .bloc {
    position: absolute;
    width: 60%;
    bottom: 0;
    left: 0;
  }

  & .infos {
    width: 30%;
    position: absolute;
    bottom: 20%;
    z-index: 99;
    color: white;
    text-align: justify;
  }
}

#mobile {
  height: calc(100vh - 150px);
  position: relative;

  & .qrcode-stream-wrapper {
    height: 50%;
  }

  & .camera {
    text-align: center;
    margin-bottom: 20px;
  }

  & .active {
      color: #3DBB49;
  }

  & .inactive {
    color: #e22911;
  }

  & .error {
    font-weight: bold;
    color: rgb(124, 32, 32);
    text-align: center;
  }

  & h1 {
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: rgba(6, 102, 100, 0.8);
    margin-bottom: 30px;
  }

  & .titleCard {
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 9px;
    width: 90%;
    padding: 5px 10px;
    background-color: #F1F1F1;
  }

  & span {
    text-align: center;
    color: rgba(6, 102, 100, 0.8);
    font-size: 16px;
  }

  & button {
    margin-top: 30px;
    background: rgba(6, 102, 100, 0.8);
    border-radius: 20px;
    width: 300px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-style: normal;
    font-size: 17px;
    line-height: 130.19%;
    text-align: center;
    color: #FFFFFF;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

  & button:hover {
    background: rgba(5, 73, 72, 0.8);
  }

  & .btn {
    color: #FFFFFF;
  }
}

@media screen and (min-width: 1699px) {
  .infos {

  }
}
</style>