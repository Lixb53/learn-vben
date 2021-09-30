import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/user-account',
  meta: {
    orderNo: 10,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.001base.user.user'),
  },
  children: [
    {
      path: 'user-account',
      name: 'UserAccount',
      component: () => import('@/views/001base/user/user-account/index.vue'),
      meta: {
        title: t('routes.001base.user.userAccount'),
      },
    },
    {
      path: 'user-role',
      name: 'UserRole',
      component: () => import('@/views/001base/user/user-role/index.vue'),
      meta: {
        title: t('routes.001base.user.userRole'),
      },
    },
  ],
};

export default user;
