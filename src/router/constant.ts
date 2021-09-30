export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('../views/sys/exception');

export const LAYOUT = () => import('@/layouts/default/index.vue');

// export const getParentLayout = (_name?: string) => {
export const getParentLayout = () => {
  return () => {
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      });
    });
  };
};
