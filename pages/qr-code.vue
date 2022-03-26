<template>
  <client-only>
    <div>
      <div v-if="$vuetify.breakpoint.mdAndUp">
        <div>pc</div>
      </div>
      <div v-if="$vuetify.breakpoint.smAndDown">
        <div v-if="multilingual.qrcode" id="mobile">
          <h1>{{multilingual.qrcode[0]}}</h1>
          <p class="camera active" v-if="camera == true">● {{multilingual.qrcode[4]}}</p>
          <p class="camera inactive" v-else>● {{multilingual.qrcode[5]}}</p>
          <p class="error">{{ error }}</p>
          <qrcode-stream @decode="onDecode" @init="onInit" />
          <div v-if="poi" class="titleCard">
            <span v-if="poi.length == 0">{{multilingual.qrcode[6]}}</span>
            <span v-else>{{poi.Nom.slice(0,25) + "..."}}</span>
          </div>
          <button class="transition ease-in-out" >
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
      result: null,
      error: '',
      camera: true
    }
  },
  methods: {
    ...mapActions('store',['getPoi']),

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
    color: #bd1616;
  }
}
#mobile .error {
  font-weight: bold;
  color: rgb(124, 32, 32);
  text-align: center;
}

#mobile h1 {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  color: rgba(6, 102, 100, 0.8);
  margin-bottom: 30px;
}

#mobile .titleCard {
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 9px;
  width: 90%;
  padding: 5px 10px;
  background-color: #F1F1F1;
}

#mobile span {
  text-align: center;
  color: rgba(6, 102, 100, 0.8);
  font-size: 16px;
}

#mobile button {
  margin-top: 50px;
  background: rgba(6, 102, 100, 0.8);
  border-radius: 20px;
  width: 260px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 15px;
  line-height: 130.19%;
  text-align: center;
  color: #FFFFFF;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}

#mobile button:hover {
  background: rgba(5, 73, 72, 0.8);
}

#mobile .btn {
  color: #FFFFFF;
}
</style>