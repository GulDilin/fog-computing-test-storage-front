<template>
  <div id="app">
    <div class="display-1 font-weight-black primary--text text--darken-3 grey pa-4 text-center">
      Fog compution tests storage
    </div>

    <v-main class="grey overflow-hidden">
      <v-container
        class="grey"
        :fluid="$vuetify.breakpoint.lgAndDown"
      >
        <Main></Main>
      </v-container>
    </v-main>
  </div>
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
</style>
