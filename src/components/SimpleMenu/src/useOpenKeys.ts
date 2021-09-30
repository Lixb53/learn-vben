import type { Menu as MenuType } from '@/router/types';
import type { MenuState } from './types';

import { computed, Ref, toRaw, unref } from 'vue';
import { getAllParentPath } from '@/router/helper/menuHelper';

import { useTimeoutFn } from '@/hooks/core/useTimeout';
import { useDebounceFn } from '@vueuse/core';

export function useOpenKeys(menuState: MenuState, menus: Ref<MenuType[]>, collapse: Ref<boolean>) {
  const debounceSetOpenKeys = useDebounceFn(setOpenKeys, 50);
  async function setOpenKeys(path: string) {
    const menuList = toRaw(menus.value);
    useTimeoutFn(() => {
      if (menuList?.length === 0) {
        menuState.activeSubMenuNames = [];
        menuState.openNames = [];
        return;
      }
      const keys = getAllParentPath(menuList, path);

      menuState.openNames = keys;
      menuState.activeSubMenuNames = menuState.openNames;
    }, 30);
  }

  const getOpenKeys = computed(() => {
    return unref(collapse) ? [] : menuState.openNames;
  });

  return { setOpenKeys: debounceSetOpenKeys, getOpenKeys };
}
