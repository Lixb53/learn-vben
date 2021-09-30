import type { App } from 'vue';
import { setupDebounceDirective } from './debounce';

export function setupGlobDirectives(app: App) {
  setupDebounceDirective(app);
  console.log(app);
}
