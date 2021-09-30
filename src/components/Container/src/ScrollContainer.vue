<template>
  <Scrollbar class="scroll-container">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Scrollbar, ScrollbarType } from '@/components/Scrollbar';
  export default defineComponent({
    name: 'ScrollContainer',
    components: { Scrollbar },
    setup: () => {},
  });
</script>

<style lang="less">
  .scroll-container {
    width: 100%;
    height: 100%;

    .scrollbar {
      &__wrap {
        margin-bottom: 18px !important;
        overflow-x: hidden;
      }

      &__view {
        box-sizing: border-box;
      }
    }
  }
</style>
