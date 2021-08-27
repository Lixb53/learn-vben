import { useAppProviderContext } from '@/components/Application';

export function useDesign(scope: string) {
  const values = useAppProviderContext();
  console.log(values, 'values');
  values.prefixCls = values.prefixCls || 'vben';
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
