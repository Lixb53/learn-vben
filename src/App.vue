<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="viteport">{{ vitePort }}</div>
  <div class="viteport1">{{ vitePort }}</div>
  <svg-icon name="sun" />
  <Button type="primary">Primary Button</Button>
  <Menu />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import HelloWorld from '/@/components/HelloWorld.vue';
  import axios from 'axios';
  import { Button } from 'ant-design-vue';
  // import { changeTheme } from './logics/theme';
  import Menu from './components/menu.vue';
  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld,
      Button,
      Menu,
    },
    setup() {
      console.log(import.meta);
      let title: string = import.meta.env.VITE_GLOB_APP_TITLE as string;
      document.title = title;
      const vitePort = ref(import.meta.env.VITE_PORT);
      onMounted(() => {
        axios.get('/basic-api/tree/getDemoOptions').then((res) => {
          console.log(res);
          // let t = changeTheme('red');
        });
      });
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
