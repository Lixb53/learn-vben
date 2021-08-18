import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});

import path$1 from 'path';
const fs$2 = require('fs');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e['default'] : e;
}

const path__default = /*#__PURE__*/ _interopDefaultLegacy(path$1);
const fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs$2);

console.log(path__default, fs__default);
