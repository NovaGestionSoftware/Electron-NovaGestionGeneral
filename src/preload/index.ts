import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Puedes añadir más utilidades propias aquí
const api = {};

const exposed = {
  ...electronAPI, // utilidades de electron‑toolkit
  ipcRenderer: {
    on: ipcRenderer.on.bind(ipcRenderer),
    removeListener: ipcRenderer.removeListener.bind(ipcRenderer),
    // agrega send / invoke si los necesitas
  },
};

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld("electron", exposed);
  contextBridge.exposeInMainWorld("api", api);
} else {
  // @ts-ignore
  window.electron = exposed;
  // @ts-ignore
  window.api = api;
}
