import '@/design/index.less';
import '@/design/tailwind.css';
// Register icon sprite
import 'vite-plugin-svg-icons/register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from './logics/initAppConfig';
import { router, setupRouter } from './router';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales/setupI18n';
import { createPermissionGuard } from '@/router/guard/permissionGuard';
import { setupGlobDirectives } from '@/directives';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  //Initialize internal system configuration
  initAppConfigStore();

  // Multilingual configuration
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  createPermissionGuard(router);

  setupGlobDirectives(app);

  await router.isReady();
  app.mount('#app', true);
}

void bootstrap();
