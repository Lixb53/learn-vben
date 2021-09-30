import type { Menu } from '@/router/types';
import { Ref } from 'vue';

import { computed, unref, watch, ref } from 'vue';

import { MenuSplitTyeEnum } from '@/enums/menuEnum';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { getMenus } from '@/router/menus';
import { usePermissionStore } from '@/store/modules/permission';

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>) {
  const menusRef = ref<Menu[]>([]);

  const { getSplit } = useMenuSetting();

  const permissionStore = usePermissionStore();

  // 正常类型  不分割菜单
  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTyeEnum.NONE || !unref(getSplit);
  });

  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus();
    },
    {
      immediate: true,
    }
  );

  async function genMenus() {
    // normal mode
    if (unref(normalType)) {
      menusRef.value = await getMenus();
      return;
    }
  }
  return { menusRef };
}
