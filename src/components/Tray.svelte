<script lang="ts">
  import { onMount } from "svelte";

  let tray;
  onMount(() => {
    window.tray = tray;
    window.tray.nativeView.show();
    return () => {
      delete window.tray;
    }
  })
</script>

<systemTrayIcon bind:this={tray} {...$$restProps}>
  <slot></slot>
</systemTrayIcon>
