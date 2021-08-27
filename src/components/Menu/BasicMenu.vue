<template>
  <Menu mode="inline" theme="dark" @click="handleClick">
    <a-menu-item key="A">
      <template #icon>
        <Icon icon="simple-icons:about-dot-me" />
      </template>
      testA
    </a-menu-item>
    <a-menu-item key="B">
      <template #icon>
        <!-- <appstore-outlined /> -->
      </template>
      testB
    </a-menu-item>
    <a-sub-menu>
      <template #icon>
        <!-- <setting-outlined /> -->
      </template>
      <template #title>Navigation Three - Submenu</template>
      <a-menu-item-group title="Item 1">
        <a-menu-item key="setting:1">Option 1</a-menu-item>
        <a-menu-item key="setting:2">Option 2</a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Item 2">
        <a-menu-item key="setting:3">Option 3</a-menu-item>
        <a-menu-item key="setting:4">Option 4</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>
    <a-menu-item key="alipay">
      <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    </a-menu-item>
  </Menu>
</template>

<script lang="ts">
  // import type { MenuState } from './types';
  import { defineComponent } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Menu } from 'ant-design-vue';
  import Icon from '@/components/Icon';

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      Menu,
      Icon,
      aMenuItem: Menu.Item,
      aMenuItemGroup: Menu.ItemGroup,
      aSubMenu: Menu.SubMenu,
    },
    props: {},
    setup: () => {
      const router = useRouter();
      const handleClick = (e) => {
        console.log(e, router);
        router.push(e.key);
      };

      return {
        handleClick,
      };
    },
  });
</script>

<style lang="less" scoped></style>
