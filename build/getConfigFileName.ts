/**
 * Get the configuration file variable name
 * 获取配置文件变量名
 * @param env
 */

export const getConfigFileName = (env: Record<string, any>) => {
  return (
    `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
      // 转换成大写
      .toUpperCase()
      // 将空白替换空字符串
      .replace(/\s/g, '')
  );
};
