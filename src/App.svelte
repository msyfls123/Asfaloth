<script lang="ts">
    import path from 'path';
    import { QIcon } from '@nodegui/nodegui';
    import Dummy from './components/Dummy.svelte';
    import Window from './components/Window.svelte'
    import WindowProvider from './containers/WindowProvider.svelte';
    import Tray from './components/Tray.svelte';
    import ImageRosi from './images/rosi-2298-040.jpg';
    import ImageIcon from './images/icon.png';

    let windowProvider: WindowProvider;

    const imageRosiLocal = path.join(__dirname, ImageRosi);
    const icon = new QIcon(path.join(__dirname, ImageIcon));

    const handleAddWindow = () => {
        const name = (Math.random() * 10000).toFixed(0)
        const winId = windowProvider.addWindow({
            comp: Dummy,
            compProps: {
                name,
                close: () => {
                    windowProvider.removeWindow(winId)
                }
            },
            winProps: {}
        })
    }
</script>

<WindowProvider bind:this={windowProvider}>
    <Window
        minSize={{ width: 500, height: 520 }}
        windowTitle="Hello 👋🏽"
    >
        <view style="flex: 1;">
            <text id="welcome-text">Welcome to Svelte NodeGUI 🐕</text>
            <text id="step-1">1. Play around</text>
            <text id="step-2">2. Debug</text>
            <image id="rosi-image" src={imageRosiLocal}/>
            
            <button on:clicked={handleAddWindow}>Add Window</button>
        </view>
    </Window>
    <Tray {icon} tooltip="Hello World" visible>
        <menu>
            <action text="hello" on:triggered={() => console.log(123)}></action>
        </menu>
    </Tray>
</WindowProvider>

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
    #rosi-image {
        margin: 0 auto;
        max-width: 250px;
        max-height: 100px;
    }
</style>
