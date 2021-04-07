const { resolve } = require('path');
const { QLabel, QMainWindow, QSystemTrayIcon, QIcon, QMenu, QAction } = require('@nodegui/nodegui');

const win = new QMainWindow();

const label = new QLabel(win);
label.setText('Hello world');
label.setInlineStyle('color: green; background: white');

win.show();
global.win = win;

const trayIcon = new QIcon(resolve(__dirname, "./images/icon.png"));
const tray = new QSystemTrayIcon();
const menu = new QMenu();
const action = new QAction();
action.setText('hhh');
action.addEventListener('triggered', console.log);
menu.addAction(action);
tray.setIcon(trayIcon);
tray.setContextMenu(menu);
tray.show();

global.tray = tray; // prevents garbage collection of tray
