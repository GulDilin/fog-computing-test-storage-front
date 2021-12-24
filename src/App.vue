<template>
  <v-app id="app">
    <div class="display-1 font-weight-black white--text pa-4 text-center">
      Fog computing tests storage
    </div>

    <v-main class=" overflow-hidden">
      <v-container
        class=""
        :fluid="$vuetify.breakpoint.lgAndDown"
      >
        <Main></Main>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
  #app {
    --tw-gradient-from: #6366f1;
    --tw-gradient-to: #7f7fab;
    --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to,rgb(99 102 241/0));
    background-image: linear-gradient(to right,var(--tw-gradient-stops));
  }
</style>
