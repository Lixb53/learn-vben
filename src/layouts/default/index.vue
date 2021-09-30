<template>
  <Layout :class="prefixCls">
    <Layout :class="[layoutClass]">
      <LayoutSideBar />
      <Layout>
        <Header> Header1 </Header>
        <Content> <RouterView /></Content>
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';

  import { Layout } from 'ant-design-vue';
  import LayoutSideBar from './sider/index.vue';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useAppInject } from '@/hooks/web/useAppInject';
  export default defineComponent({
    name: 'DefaultLayout',
    components: { Layout, LayoutSideBar, Header: Layout.Header, Content: Layout.Content },
    props: {},
    setup: () => {
      const { prefixCls } = useDesign('default-layout');
      const { getIsMobile } = useAppInject();
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

      const layoutClass = computed(() => {
        let cls: string[] = ['ant-layout'];
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
          cls.push('ant-layout-has-sider');
        }
        return cls;
      });

      return {
        prefixCls,
        getIsMobile,
        getShowSidebar,
        layoutClass,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
      background: red;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
