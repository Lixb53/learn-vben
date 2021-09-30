<template>
  <Menu
    v-bind="getBindValues"
    :class="prefixCls"
    :activeName="activeName"
    :openNames="getOpenKeys"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapsedShowTitle="collapsedShowTitle"
        :collapse="collapse"
      />
    </template>
  </Menu>
</template>

<script lang="ts">
  import type { MenuState } from './types';
  import type { Menu as MenuType } from '@/router/types';
  import type { RouteLocationNormalizedLoaded } from 'vue-router';

  import { computed, defineComponent, reactive, ref, toRefs, watch, unref } from 'vue';
  import { useRouter } from 'vue-router';

  import { listenerRouteChange } from '@/logics/mitt/routeChange';

  import Menu from './components/Menu.vue';
  import SimpleSubMenu from './SimpleSubMenu.vue';

  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import { useOpenKeys } from './useOpenKeys';
  import { REDIRECT_NAME } from '@/router/constant';
  import { isUrl, isFunction } from '@/utils/is';
  import { openWindow } from '@/utils';
  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      Menu,
      SimpleSubMenu,
    },
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
      theme: propTypes.string,
      accordion: propTypes.bool.def(true),
      collapse: propTypes.bool,
      collapsedShowTitle: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>,
      },
    },
    emits: ['menuClick'],
    setup: (props, { attrs, emit }) => {
      const currentActiveMenu = ref('');
      const isClickGo = ref(false);

      const menuState = reactive<MenuState>({
        activeName: '',
        openNames: [],
        activeSubMenuNames: [],
      });

      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('simple-menu');

      const { items, collapse } = toRefs(props);

      const { setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, collapse);

      const getBindValues = computed(() => ({ ...attrs, ...props }));

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openNames = [];
          } else {
            setOpenKeys(currentRoute.value.path);
          }
        },
        {
          immediate: true,
        }
      );

      watch(
        () => props.items,
        () => {
          setOpenKeys(currentRoute.value.path);
        },
        { flush: 'post' }
      );

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return;

        currentActiveMenu.value = route.meta?.currentActiveMenu as string;
        handleMenuChange(route);

        if (unref(currentActiveMenu)) {
          menuState.activeName = unref(currentActiveMenu);
          setOpenKeys(unref(currentActiveMenu));
        }
      });

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;

        menuState.activeName = path;

        setOpenKeys(path);
      }

      async function handleSelect(key: string) {
        if (isUrl(key)) {
          openWindow(key);
          return;
        }
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }

        emit('menuClick', key);

        isClickGo.value = true;
        setOpenKeys(key);
        menuState.activeName = key;
      }
      return {
        prefixCls,
        getBindValues,
        getOpenKeys,
        handleSelect,
        ...toRefs(menuState),
      };
    },
  });
</script>
