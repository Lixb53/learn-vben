<template>
  <Sider collapsible :collapsed="getCollapsed">
    <LayoutMenu :theme="getMenuTheme" :menuMode="getMode" />
  </Sider>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import LayoutMenu from '../menu/index.vue';

  import { MenuModeEnum } from '@/enums/menuEnum';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  export default defineComponent({
    name: 'LayoutSideBar',
    components: { Sider: Layout.Sider, LayoutMenu },
    setup: () => {
      const { getMenuTheme, getSplit, getCollapsed } = useMenuSetting();

      const { prefixCls } = useDesign('layout-sideBar');

      const getMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.INLINE : null;
      });

      return {
        prefixCls,
        getMenuTheme,
        getMode,
        getCollapsed,
      };
    },
  });
</script>

<style lang="less"></style>
