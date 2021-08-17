<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="viteport">{{ vitePort }}</div>
  <div class="viteport1">{{ vitePort }}</div>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import HelloWorld from './components/HelloWorld.vue';

  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
    },
    setup() {
      console.log(import.meta);
      let title: string = import.meta.env.VITE_GLOB_APP_TITLE as string;
      document.title = title;
      const vitePort = ref(import.meta.env.VITE_PORT);
      return {
        vitePort,
      };
    },
  });
</script>

<style>
  #app {
    margin-top: 60px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
  }

  .viteport {
    position: absolute;
    height: 50px;
  }

  .viteport1 {
    position: absolute;
    height: 50px;
  }
</style>
