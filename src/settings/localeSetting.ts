// import type { DropMenu } from '../components/Dropdown';
import type { LocaleSetting, LocaleType } from '../../types/config';

// 国际化的Key
export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  // 展示语言切换按钮
  showPicker: true,
  // Locale
  // 默认本地语言
  locale: LOCALE.ZH_CN,
  // Default locale
  // 默认失败后的语言
  fallback: LOCALE.ZH_CN,
  // available Locales
  // 支持的语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

// locale list
// export const localeList: DropMenu[] = [
//   {
//     text: '简体中文',
//     event: LOCALE.ZH_CN,
//   },
//   {
//     text: 'English',
//     event: LOCALE.EN_US,
//   },
// ];
