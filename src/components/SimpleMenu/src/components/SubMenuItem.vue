<template>
  <li :class="getClass">
    <div :class="`${prefixCls}-submenu-title`" @click.stop="handleClick" :style="getItemStyle">
      <slot name="title"></slot>
      <Icon
        icon="eva:arrow-ios-downward-outline"
        :size="14"
        :class="`${prefixCls}-submenu-title-icon`"
      />
    </div>
    <CollopseTransition>
      <ul :class="prefixCls" v-show="opened">
        <slot></slot>
      </ul>
    </CollopseTransition>
  </li>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    inject,
    onBeforeMount,
    provide,
    reactive,
    toRefs,
    unref,
  } from 'vue';

  import Icon from '@/components/Icon';
  import CollopseTransition from './MenuCollapseTransition.vue';

  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import { useMenuItem } from './useMenu';
  import { useSimpleRootMenuContext } from './useSimpleMenuContext';
  import { SubMenuProvider } from './types';
  import { isBoolean, isObject } from '@/utils/is';
  export default defineComponent({
    name: 'SubMenu',
    components: {
      Icon,
      CollopseTransition,
    },
    props: {
      name: {
        type: [String, Number] as PropType<string | number>,
        required: true,
      },
      disabled: propTypes.bool,
      collapsedShowTitle: propTypes.bool,
    },
    setup: (props) => {
      const instance = getCurrentInstance();
      const state = reactive({
        active: false,
        opened: false,
      });

      const { getParentSubMenu, getItemStyle, getParentMenu, getParentList } =
        useMenuItem(instance);

      const { prefixCls } = useDesign('menu');

      const { rootMenuEmitter } = useSimpleRootMenuContext();

      const {
        addSubMenu: parentAddSubmenu,
        removeSubMenu: parentRemoveSubmenu,
        removeAll: parentRemoveAll,
        getOpenNames: parentGetOpenNames,
        level,
        props: rootProps,
      } = inject<SubMenuProvider>(`subMenu:${getParentMenu.value?.uid}`)!;

      const getClass = computed(() => {
        return [
          `${prefixCls}-submenu`,
          {
            [`${prefixCls}-item-active`]: state.active,
            [`${prefixCls}-opened`]: state.opened,
            [`${prefixCls}-submenu-disabled`]: props.disabled,
            [`${prefixCls}-submenu-has-parent-submenu`]: unref(getParentSubMenu),
            [`${prefixCls}-child-item-active`]: state.active,
          },
        ];
      });

      const getCollapse = computed(() => rootProps.collapse);
      const getAccordion = computed(() => rootProps.accordion);

      function handleClick() {
        const { disabled } = props;
        if (disabled || unref(getCollapse)) return;
        const opened = state.opened;

        if (unref(getAccordion)) {
          const { uidList } = getParentList();
          rootMenuEmitter.emit('on-update-opened', {
            opened: false,
            parent: instance?.parent,
            uidList: uidList,
          });
        }

        state.opened = !opened;
      }

      onBeforeMount(() => {
        rootMenuEmitter.on(
          'on-update-opened',
          (data: boolean | (string | number)[] | Recordable) => {
            if (unref(getCollapse)) return;
            if (isBoolean(data)) {
              state.opened = data;
              return;
            }
            if (isObject(data) && rootProps.accordion) {
              const { opened, parent, uidList } = data as Recordable;
              if (parent === instance?.parent) {
                state.opened = opened;
              } else if (!uidList.includes(instance?.uid)) {
                state.opened = false;
              }
              return;
            }

            if (props.name && Array.isArray(data)) {
              state.opened = (data as (string | number)[]).includes(props.name);
            }
          }
        );

        rootMenuEmitter.on('on-update-active:submenu', (data: number[]) => {
          if (instance?.uid) {
            state.active = data.includes(instance?.uid);
          }
        });
      });

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        addSubMenu: parentAddSubmenu,
        removeSubMenu: parentRemoveSubmenu,
        getOpenNames: parentGetOpenNames,
        removeAll: parentRemoveAll,
        level: level + 1,
        props: rootProps,
      });

      return {
        getClass,
        prefixCls,
        getItemStyle,
        handleClick,
        ...toRefs(state),
      };
    },
  });
</script>
