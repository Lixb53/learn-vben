import '/@/design/index.less';
import '/@/design/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import 'vite-plugin-svg-icons/register';
import SvgIcon from './components/Icon/src/SvgIcon.vue';

createApp(App).component('svg-icon', SvgIcon).mount('#app');
