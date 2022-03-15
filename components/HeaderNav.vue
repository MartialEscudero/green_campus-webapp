<template>
    <v-container>
        <v-toolbar flat>
        <v-app-bar-nav-icon><img src="~/../assets/img/full_logo.png"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text>
                <Nuxt-link to="/">Index</Nuxt-link>
            </v-btn>

            <v-btn text>
                <Nuxt-link to="/sentiers">Sentiers</Nuxt-link>
            </v-btn>

            <v-btn text>
                <Nuxt-link to="/map">Map</Nuxt-link>
            </v-btn>

            <v-btn text>
                <Nuxt-link to="/a-propos">A-Propos</Nuxt-link>
            </v-btn>
        </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>

<style lang="scss" scoped>

</style>