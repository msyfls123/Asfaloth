<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
    import type { NSVElement, RNWindow } from "@nodegui/svelte-nodegui";
    /**
     * The exact type for this is: NSVElement<RNWindow>
     * ... However, the Svelte language tools erroneously expect all bind:this values to extend HTMLElement, so
     * for now, we have to rely on reasserting the type.
     */
    let win;
    let showAnother = writable(false);
    let otherWin;
    onMount(() => {
        (window as any).win = win; // Prevent garbage collection, otherwise the window quickly disappears!
        (window as any).otherWin = otherWin;
        (win as NSVElement<RNWindow>).nativeView.show();
        return () => {
            delete (window as any).win;
            delete (window as any).otherWin;
        };
    });
    showAnother.subscribe((show) => {
        console.log(show)
        if (show) {
            (otherWin as NSVElement<RNWindow>).nativeView.show();
        } else if (otherWin) {
            (otherWin as NSVElement<RNWindow>).nativeView.close();
        }
    })
</script>

<body>
    <window
        bind:this={win}
        minSize={{ width: 500, height: 520 }}
        windowTitle="Hello 👋🏽"
    >
        <view style="flex: 1;">
            <text id="welcome-text">Welcome to Svelte NodeGUI 🐕</text>
            <text id="step-1">1. Play around</text>
            <text id="step-2">2. Debug</text>
            <button on:clicked={() => showAnother.update(v =>!v)}>Toggle Window</button>
        </view>
    </window>

    <window bind:this={otherWin}>
        <view><text>hello world</text></view>
    </window>
</body>

<style>
    /* 
     * CSS has a few gotchas for now.
     * 1) Some values need to be enclosed with quotes (e.g. `width: '100%';` rather than `width: 100%;`).
     *    See: https://github.com/nodegui/svelte-nodegui/issues/4
     * 2) Classes are not supported yet; they're a bit weird in Qt5.
          See: https://github.com/nodegui/svelte-nodegui/issues/6
     * 3) You can't write element-level rules like `text { color: 'red'; }`, unless they're global (not scoped).
     *    For scoped rules, you have to refer to the underlying native element, e.g. `QLabel { color: 'red'; }`.
     *    See: https://github.com/nodegui/svelte-nodegui/issues/7
     */
    #welcome-text {
        font-size: 24px;
        padding-top: 20px;
        qproperty-alignment: 'AlignHCenter';
        font-family: 'sans-serif';
    }
    #welcome-text:hover {
        font-size: 28px;
        color: #39aebf;
    }
    #step-1, #step-2 {
        font-size: 18px;
        padding-top: 10px;
        padding-horizontal: 20px;
    }
</style>
