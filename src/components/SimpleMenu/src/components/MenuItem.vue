<template>
  <li :class="getClass" @click.stop="handleClickItem" :style="getCollapse ? {} : getItemStyle">
    <slot></slot>
    <slot name="title"></slot>
  </li>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, ref, unref, watch } from 'vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import { useSimpleRootMenuContext } from './useSimpleMenuContext';
  import { useMenuItem } from './useMenu';
  export default defineComponent({
    name: 'MenuItem',
    props: {
      name: {
        type: [String, Number] as PropType<string | number>,
        required: true,
      },
      disabled: propTypes.bool,
    },
    setup: (props) => {
      const instance = getCurrentInstance();

      const active = ref(false);

      const { getItemStyle, getParentList, getParentRootMenu } = useMenuItem(instance);

      const { prefixCls } = useDesign('menu');

      const { rootMenuEmitter, activeName } = useSimpleRootMenuContext();

      const getClass = computed(() => {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: unref(active),
            [`${prefixCls}-item-selected`]: unref(active),
            [`${prefixCls}-item-disabled`]: !!props.disabled,
          },
        ];
      });

      const getCollapse = computed(() => unref(getParentRootMenu)?.props.collapse);

      function handleClickItem() {
        const { disabled } = props;
        if (disabled) {
          return;
        }

        rootMenuEmitter.emit('on-menu-item-select', props.name);
        if (unref(getCollapse)) {
          return;
        }
        const { uidList } = getParentList();

        rootMenuEmitter.emit('on-update-opened', {
          opened: false,
          parent: instance?.parent,
          uidList: uidList,
        });
      }

      watch(
        () => activeName.value,
        (name: string) => {
          if (name === props.name) {
            const { list, uidList } = getParentList();
            active.value = true;
            list.forEach((item) => {
              if (item.proxy) {
                (item.proxy as any).active = true;
              }
            });

            rootMenuEmitter.emit('on-update-active-name:subMenu', uidList);
          } else {
            active.value = false;
          }
        },
        { immediate: true }
      );

      return {
        getClass,
        prefixCls,
        getItemStyle,
        getCollapse,
        handleClickItem,
      };
    },
  });
</script>
