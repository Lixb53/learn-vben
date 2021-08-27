<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAppProviderContext } from './useAppContext';
  import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
  import { prefixCls } from '@/settings/designSetting';
  // import

  const props = {
    prefixCls: {
      type: String,
      default: prefixCls,
    },
  };

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup: () => {},
  });
</script>
