<template>
  <ul :class="getClass">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import type { SubMenuProvider } from './types';
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    provide,
    ref,
    watch,
    watchEffect,
    onMounted,
  } from 'vue';

  import mitt from '@/utils/mitt';
  import { createSimpleRootMenuContext } from './useSimpleMenuContext';

  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import { nextTick } from 'process';
  export default defineComponent({
    name: 'Menu',
    props: {
      theme: propTypes.oneOf(['light', 'dark']).def('dark'),
      collapse: propTypes.bool.def(false),
      activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
      openNames: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      activeSubMenuNames: {
        type: Array as PropType<string | number[]>,
        default: () => [],
      },
    },
    emits: ['select'],
    setup: (props, { emit }) => {
      const rootMenuEmitter = mitt();
      const instance = getCurrentInstance();

      // 当前触发菜单
      const currentActiveName = ref<string | number>('');
      // 打开的菜单集合
      const openedNames = ref<string[]>([]);

      const { prefixCls } = useDesign('menu');

      createSimpleRootMenuContext({
        rootMenuEmitter,
        activeName: currentActiveName,
      });

      const getClass = computed(() => {
        const { theme } = props;
        return [
          prefixCls,
          `${prefixCls}-${theme}`,
          `${prefixCls}-vertical`,
          {
            [`${prefixCls}-collapse`]: props.collapse,
          },
        ];
      });

      watchEffect(() => {
        openedNames.value = props.openNames;
      });

      watchEffect(() => {
        if (props.activeName) {
          currentActiveName.value = props.activeName;
        }
      });

      watch(
        () => props.openNames,
        () => {
          nextTick(() => {
            updateOpened();
          });
        }
      );

      function updateOpened() {
        rootMenuEmitter.emit('on-update-opened', openedNames.value);
      }

      function addSubMenu(name: string) {
        if (openedNames.value.includes(name)) return;
        openedNames.value.push(name);
        updateOpened();
      }

      function removeSubMenu(name: string) {
        openedNames.value = openedNames.value.filter((item) => item !== name);
        updateOpened();
      }

      function removeAll() {
        openedNames.value = [];
        updateOpened();
      }

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        addSubMenu,
        removeSubMenu,
        removeAll,
        getOpenNames: () => openedNames.value,
        props,
      });

      onMounted(() => {
        openedNames.value = !props.collapse ? [...props.openNames] : [];
        updateOpened();
        rootMenuEmitter.on('on-menu-item-select', (name: string) => {
          currentActiveName.value = name;

          nextTick(() => {
            props.collapse && removeAll();
          });
          emit('select', name);
        });
      });

      return {
        getClass,
      };
    },
  });
</script>

<style lang="less">
  @import './menu.less';
</style>
