import type { LocaleType } from '#/config';

import { set } from 'lodash-es';

export const loadLocalePool: LocaleType[] = [];

export function setHtmlPageLang(local: LocaleType) {
  // 获取html根标签,添加自定义属性lang并赋值
  document.querySelector('html')?.setAttribute('lang', local);
}

// 应该是设置语言种类
export function setLoadLocalePool(cb: (loadLocalPool: LocaleType[]) => void) {
  cb(loadLocalePool);
}

/**
 *
 * @param langs 指定路径下所有ts文件的路径
 * @param prefix 前缀
 * @returns 返回以文件名为key的所有ts文件数据
 */
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {};

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default ?? {};
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleNam = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleNam) {
      if (objKey) {
        set(obj, moduleNam, obj[moduleNam] || {});
        set(obj[moduleNam], objKey, langFileModule);
      } else {
        set(obj, moduleNam, langFileModule || {});
      }
    }
  });

  return obj;
}
