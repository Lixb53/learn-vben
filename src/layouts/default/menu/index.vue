<script lang="tsx">
  import { CSSProperties, PropType, toRef } from 'vue';
  import { computed, defineComponent, unref } from 'vue';

  import { AppLogo } from '@/components/Application';
  import { SimpleMenu } from '@/components/SimpleMenu';
  import { ScrollContainer } from '@/components/Container';

  import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum';

  import { useSplitMenu } from './useLayouttMenu';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { propTypes } from '@/utils/propTypes';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { isUrl } from '@/utils/is';
  import { openWindow } from '@/utils';
  import { useGo } from '@/hooks/web/usePage';
  export default defineComponent({
    name: '',
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE,
      },
    },
    setup: (props) => {
      const go = useGo();
      const { getMenuTheme, getCollapsed, getCollapsedShowTitle } = useMenuSetting();

      const { getShowLogo } = useRootSetting();

      const { prefixCls } = useDesign('layout-menu');

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      const { getIsMobile } = useAppInject();

      const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

      const getIsShowLogo = computed(() => unref(getShowLogo));

      const getLogoClass = computed(() => {
        return [`${prefixCls}-logo`, unref(getComputedMenuTheme)];
      });

      const getScrollContainerStyle = computed((): CSSProperties => {
        return {
          height: '539px',
          // height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'}`,
        };
      });

      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          theme: unref(getComputedMenuTheme),
          collapse: unref(getCollapsed),
          collapsedShowTitle: unref(getCollapsedShowTitle),
          onMenuClick: handleMenuClick,
        };
      });

      function handleMenuClick(path: string) {
        go(path);
      }

      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) {
          return true;
        }
        openWindow(path);
        return false;
      }

      function renderHeader() {
        if (!unref(getShowLogo)) return null;
        return <AppLogo class={unref(getLogoClass)} theme={unref(getComputedMenuTheme)} />;
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps);
        if (!menus || !menus.length) return null;
        return <SimpleMenu {...menuProps} items={menus} />;
      }

      return () => {
        return (
          <>
            {renderHeader()}
            <ScrollContainer style={unref(getScrollContainerStyle)}>
              {renderMenu()}
              <div style={{ height: '1000px' }}></div>
            </ScrollContainer>
          </>
        );
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';

  .@{prefix-cls} {
    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;

      img {
        width: @logo-width;
        height: @logo-width;
      }
    }
  }
</style>
