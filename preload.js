const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

const videoDir = path.join(__dirname, "videos");
const soundDir = path.join(__dirname, "sounds");

contextBridge.exposeInMainWorld("api", {

    saveVideo: async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const savePath = path.join(videoDir, file.name);
        fs.writeFileSync(savePath, buffer);
    },

    saveSound: async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const savePath = path.join(soundDir, file.name);
        fs.writeFileSync(savePath, buffer);
    }

});