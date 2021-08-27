<template>
  <div class="anticon" :class="getAppLogoClass">
    <img src="../../../assets/logo.png" alt="" srcset="" />
    <div :class="getTitleClass"> VSAP </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  // 拿到全局配置信息
  // import { useGlobSetting } from '@/hooks/setting';
  // import { useGo } from '@/hooks/web/usePage';
  import { useDesign } from '@/hooks/web/useDesign';

  const props = {
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  };

  export default defineComponent({
    name: 'AppLogo',
    props: props,
    setup: (props) => {
      const { prefixCls } = useDesign('app-logo');
      const title = 'VSAP';
      // const go = useGo();

      const getAppLogoClass = computed(() => [
        prefixCls,
        props.theme,
        { 'collapsed-show-title': true },
      ]);

      const getTitleClass = computed(() => [
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !props.alwaysShowTitle,
        },
      ]);

      return {
        getAppLogoClass,
        getTitleClass,
        title,
        prefixCls,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    align-items: center;

    &.lignt {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      padding-left: 10px;
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
    }
  }
</style>
