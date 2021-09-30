import type { App, Directive } from 'vue';

const debounceDirective: Directive = {
  mounted(el, binding) {
    let timer;
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 300);
    });
  },
  beforeUnmount(el, binding) {
    console.log(el, binding, 'unmount');
  },
};

export function setupDebounceDirective(app: App) {
  app.directive('debounce', debounceDirective);
}

export default setupDebounceDirective;
