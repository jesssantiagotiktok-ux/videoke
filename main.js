const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

function createWindow() {

    const win = new BrowserWindow({
        width: 1920,
        height: 1080,

        fullscreen: true,
        kiosk: true,

        frame: false,
        autoHideMenuBar: true,

        resizable: false,
        maximizable: false,
        minimizable: true,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Disable Zoom
    win.webContents.setZoomFactor(1);
    win.webContents.setVisualZoomLevelLimits(1, 1);

    win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {

    createWindow();

    // Check for updates only when packaged
    if (app.isPackaged) {
        autoUpdater.checkForUpdatesAndNotify();
    }

});

// Exit App
ipcMain.on("exit-app", () => {
    app.quit();
});

autoUpdater.on("update-available", () => {

    dialog.showMessageBox({
        type: "info",
        title: "Update",
        message: "New version found.\nDownloading..."
    });

});

autoUpdater.on("update-downloaded", () => {

    dialog.showMessageBox({
        type: "info",
        title: "Update",
        message: "Update downloaded.\nRestart to install."
    }).then(() => {

        autoUpdater.quitAndInstall();

    });

});

app.on("window-all-closed", () => {
    app.quit();
});