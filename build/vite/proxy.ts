import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargtList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>;

const httpsRE = /^https:\/\//;

/**
 * Gneerate proxy
 * @param list
 */

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargtList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
