<script context="module">
  let globalId = 0;

  function getWindowKey(id) {
    return `$$QT_WINDOW-${id}`;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  export let onClose;
  let win: any;

  onMount(() => {
    const winKey = getWindowKey(globalId++);
    window[winKey] = win;
    win.nativeView.show();
    return () => {
      win.nativeView.close();
      delete window[winKey];
    }
  })
</script>

<window
  bind:this={win}
  on:Close={onClose}
  {...$$restProps}
>
  <slot>void</slot>
</window>
