import type { NSVElement, RNSystemTrayIcon } from "@nodegui/svelte-nodegui";

declare global {
  interface Window {
    tray: NSVElement<RNSystemTrayIcon>
  }
}
