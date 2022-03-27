<template>
  <div v-if="multilingual.apropos" class="container">
    <h1>{{multilingual.apropos[0]}}</h1>
    <div class="bloc">
      <h2>{{multilingual.apropos[1]}}</h2>
      <p class="text">
        <span>{{multilingual.apropos[2]}}</span>
        <br><br>
        <span>{{multilingual.apropos[3]}}</span>
        <br><br>
        <span>{{multilingual.apropos[4]}}</span>
      </p>
    </div>
    <div class="bloc">
      <h2 class="h2-center">{{multilingual.apropos[5]}}</h2>
      <div class="container mx-auto md:grid md:gap-28 xl:grid-cols-4">
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/martial.png">
          <p class="font-bold text-xl uppercase mt-5">{{multilingual.apropos[6]}}</p>
          <p class="text-sm">{{multilingual.apropos[7]}}</p>
        </div>
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/pacome.png">
          <p class="font-bold text-xl uppercase mt-5">{{multilingual.apropos[8]}}</p>
          <p class="text-sm">{{multilingual.apropos[9]}}</p>
        </div>
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/gabriel.png">
          <p class="font-bold text-xl uppercase mt-5">{{multilingual.apropos[10]}}</p>
          <p class="text-sm">{{multilingual.apropos[11]}}</p>
        </div>
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/hakima.png">
          <p class="font-bold text-xl uppercase mt-5">{{multilingual.apropos[12]}}</p>
          <p class="text-sm">{{multilingual.apropos[13]}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: this.multilingual.navbar ? this.multilingual.navbar[4] : 'À propos',
    }
  },
  computed: {
    ...mapGetters('store',['multilingual'])
  },
}
</script>

<style scoped>
h1 {
  font-weight: 800;
  font-size: 35px;
  line-height: 41px;
  color: rgba(6, 102, 100, 0.8);
}

.bloc {
  margin-right: 10vh;
  margin-left: 10vh;
}

h2 {
  font-weight: 800;
  font-size: 24px;
  line-height: 28px;
  color: rgba(6, 102, 100, 0.8);
  margin-top: 70px;
  margin-bottom: 30px;
}

.text {
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  text-align: justify;
}

p {
  color: #4B4B4B;
}

@media screen and (max-width: 640px) {
  h1 {
    text-align: center;
    font-size: 25px;
  }

  h2 {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .h2-center {
    text-align: center;
    margin-bottom: 20px;
  }

  .bloc {
    margin-right: 15px;
    margin-left: 15px;
  }

  .bloc:nth-child(3) {
    margin-top: 70px;
  }

  .bloc p:nth-child(3) {
    margin-bottom: 60px;
  }
}
</style>