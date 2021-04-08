<template>
  <v-app>
    <ShadowAiHeader/>
    <ShadowAiBody/>
    <ShadowAiFooter/>
  </v-app>
</template>

<script>
import ShadowAiHeader from './components/ShadowAiHeader.vue';
import ShadowAiBody from './components/ShadowAiBody.vue';
import ShadowAiFooter from './components/ShadowAiFooter.vue';

export default {
  name: 'App',
  components: {
    ShadowAiHeader,
    ShadowAiBody,
    ShadowAiFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
