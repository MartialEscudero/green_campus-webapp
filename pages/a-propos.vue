<template>
  <div class="container">
    <h1>À PROPOS DE GREEN CAMPUS</h1>
    <div class="bloc">
      <h2>LE CONCEPT</h2>
      <p class="text">
        Le projet que doivent réaliser les étudiants est un projet de valorisation du campus de La Borie au travers de la création d’un parcours de déambulation des usagers du campus, mais également de visiteurs et/ou de citoyens de la ville de Limoges et de l’agglomération de Limoges. 
        <br><br>
        L’idée est de rendre cette déambulation informative en apportant aux usagers du site des renseignements sur le patrimoine bâti, arboré, scientifique. Il existe sur le site actuel, 2 sentiers d’interprétation, l’un sur les roches face aux amphis et l’autre sur la biodiversité. Ces 2 sentiers sont une base de réflexion mais sont, dans la forme, ce que nous rencontrons partout sur le territoire.
        <br><br>
        Ce que nous souhaitons mettre en place maintenant, ce sont des sentiers thématiques valorisant l’ensemble des espaces arborés allant de l’IUT, en passant par le SUAPS, le campus de la Borie et la barre de Genève. Ces sentiers thématiques devront être innovants à la fois dans les thématiques à aborder, mais également dans les outils à utiliser pour déambuler et comprendre le patrimoine scientifique, arboré et bâti du campus.</p>
    </div>
    <div class="bloc">
      <h2>L’ÉQUIPE</h2>
      <div class="container mx-auto md:grid md:gap-28 xl:grid-cols-4">
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/martial.png">
          <p class="font-bold text-xl uppercase mt-5">Escudero Martial</p>
          <p class="text-sm">Chef de projet - Développeur Full Stack JS</p>
        </div>
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/pacome.png">
          <p class="font-bold text-xl uppercase mt-5">Pacome Perrichot</p>
          <p class="text-sm">Développeur Full Stack</p>
        </div>
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/gabriel.png">
          <p class="font-bold text-xl uppercase mt-5">Gabriel Denajar</p>
          <p class="text-sm">Développeur Full Stack</p>
        </div>
        <div class="text-center">
          <img class="mx-auto hover:scale-110 transition ease-in-out" src="~/assets/img/pdp/hakima.png">
          <p class="font-bold text-xl uppercase mt-5">Hakima Bidelhadjela</p>
          <p class="text-sm">Assistante MOA</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'À propos',
  }
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
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .bloc {
    margin-right: 0;
    margin-left: 0
  }

  .bloc:nth-child(3) {
    margin-top: 70px;
  }

  .bloc p:nth-child(3) {
    margin-bottom: 60px;
  }
}
</style>