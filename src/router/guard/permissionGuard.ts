// import type { Router } from 'vue-router';

// import { usePermissionStoreWithOut } from '@/store/modules/permission';

// import { PageEnum } from '@/enums/pageEnum';

// import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic';

// import { RootRoute } from '../routes';

// const LOGIN_PATH = PageEnum.BASE_LOGIN;

// const ROOT_PATH = RootRoute.path;

// const whitePathList: PageEnum[] = [LOGIN_PATH];

// export function createPermissionGuard(router: Router) {
//   const permissionStore = usePermissionStoreWithOut();
//   router.beforeEach(async () => {
//     const routes = await permissionStore.buildRoutesActions();
//     console.log(routes);
//   });
// }
