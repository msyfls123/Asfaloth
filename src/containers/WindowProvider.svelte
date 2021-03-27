<script lang="ts">
  import Window from '../components/Window.svelte';

  type WindowOptions = {
    id: number
    winProps?: any
    comp: any
    compProps: any
  }

  let globalId = 0;
  let windows: WindowOptions[] = [];

  export function addWindow(options: Omit<WindowOptions, 'id'>) {
    const win = {
      ...options,
      id: globalId++,
    };
    windows = windows.concat(win);
    return win.id;
  }

  export function removeWindow(winId: number) {
    windows = windows.filter(w => w.id !== winId);
  }

</script>

<body>
  {#each windows as win (win.id)}
    <Window
      {...win.winProps}
      onClose={() => removeWindow(win.id)}
    >
      <svelte:component this={win.comp} {...win.compProps}/>
    </Window>
  {/each}
  <slot></slot>
</body>
