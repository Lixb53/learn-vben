import { isDevMode } from '@/utils/env';

// System default cache time, in seconds
// 默认内存存活时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
// 加密key和偏移量
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// Whether the system cache is encrypted using aes
// 系统缓存是否使用aes加密。
// 生产环境加密
export const enableStorageEncryption = !isDevMode();
