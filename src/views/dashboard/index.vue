<template>
  <div>
    首页
    <button v-debounce="handleDebounce">debounce</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Dashboard',
    props: {},
    setup: () => {
      const handleDebounce = () => {
        console.log('abc');
      };

      return {
        handleDebounce,
      };
    },
  });
</script>

<style lang="less" scoped></style>
