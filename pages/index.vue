<template>
  <div v-if="multilingual.accueil">
    <!-- Desktop & Tablet-->
    <div class="hidden h-full md:flex lg:flex xl:flex overflow-hidden">
      <div class="absolute inset-y-0 lg:-top-12 lg:right-0 md:-right-28 xl:max-w-4xl lg:max-w-3xl md:max-w-2xl">
        <img src="~/assets/img/bloc/one.png" alt="" />
      </div>
      <div class="2xl:m-40 xl:m-32 lg:m-28 md:m-20">
        <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div class="relative">
            <div>
              <img class="lg:max-w-full md:max-w-xs" src="~/assets/img/bloc/green-campus.svg" />
            </div>

          </div>

          <div class="relative">
            <div class="lg:ml-32 xl:ml-72 mr-20">
              <Nuxt-link to='/sentiers'>
                <v-btn
                  rounded
                  x-large
                  height="4.2rem"
                  width="360px"
                  color="white"
                  class="ml-3"
                ><img class="w-10 ml-5" src="~/assets/img/bloc/noun-way.svg" alt=""><p class="m-5 text-green-campus">{{multilingual.accueil[1]}}</p>
                </v-btn>
              </Nuxt-link>
              <p class="w-96 mt-5 text-white text-justify font-medium">{{multilingual.accueil[2]}}</p>
            </div>          
          </div>

          <div class="relative">
            <div class="mr-32 mt-10">
              <p class="xl:w-auto lg:w-96 md:w-72 text-justify font-medium">{{multilingual.accueil[0]}}</p>
            </div>
          </div>

          <div class="relative">
            <div class="lg:ml-32 xl:ml-72 mr-20 xl:-mt-16">
              <Nuxt-link to="/qr-code">
                <v-btn
                  rounded
                  x-large
                  height="4.2rem"
                  width="360px"
                  color="white"
                  class="ml-3"
                ><img class="w-10 ml-5" src="~/assets/img/bloc/noun-qr-code.svg" alt=""><p class="m-5">{{multilingual.accueil[3]}}</p>
                </v-btn>
              </Nuxt-link>
              <p class="w-96 mt-5 text-white text-justify font-medium">{{multilingual.accueil[4]}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="md:hidden m-7">
      <div>
        <img class="w-52" src="~/assets/img/bloc/green-campus.svg" alt="">
      </div>
      <div>
        <p class="mr-12 mt-7 text-justify font-medium text-sm">{{multilingual.accueil[0]}}</p>
      </div>
      <div>
        <div>
          <img class="ml-2 mt-24" src="~/assets/img/bloc/sentence.svg" alt="">
        </div>
        <div class="grid grid-cols-2 justify-items-end">
          <div><img class="-mt-10 ml-14" src="~/assets/img/bloc/noun-arrow.svg" alt=""></div>
          <div class="mt-12 h-20 w-20 z-10">
            <Nuxt-link to='/sentiers'>
              <v-btn
                  rounded
                  color="white"
                  height="5rem"
                  width="5rem"
                ><img src="~/assets/img/bloc/noun-way.svg" alt="">
              </v-btn>
            </Nuxt-link>
          </div>
          <div></div>
          <div class="mt-7 h-20 w-20 z-10">
            <Nuxt-link to="/qr-code">
                <v-btn
                  rounded
                  color="white"
                  height="5rem"
                  width="5rem"
                ><img src="~/assets/img/bloc/noun-qr-code.svg" alt="">
                </v-btn>
              </Nuxt-link>
          </div>
        </div>
      </div>
      <div>
        <img class="absolute bottom-0 right-0" src="~/assets/img/bloc/rectangle-mobile.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: this.multilingual.navbar ? this.multilingual.navbar[0] : 'Accueil',
    }
  },
  computed: {
    ...mapGetters('store',['multilingual']),
  }
}
</script>