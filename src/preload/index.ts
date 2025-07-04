import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { readFileSync } from "fs";
import { join } from "path";

const packageJson = JSON.parse(readFileSync(join(__dirname, "../../package.json"), "utf8"));

// Custom APIs for renderer
const api = {
  getAppVersion: () => packageJson.version,
  getEnviroment: () => (process.env.NODE_ENV === "development" ? "Desarrollo" : ""),
};

// 👉 Esta es la parte nueva que necesitás:
const ipc = {
  on: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.on(channel, listener),
  removeListener: (channel: string, listener: (...args: any[]) => void) =>
    ipcRenderer.removeListener(channel, listener),
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
};

// Usar contextBridge para exponer APIs
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", {
      ...electronAPI,
      ipcRenderer: ipc, // 👈 agregamos ipcRenderer manualmente
    });
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

contextBridge.exposeInMainWorld("electronAPI", {
  showAlert: (message, type = "info", title = "Alerta") => {
    // Valores por defecto
    ipcRenderer.send("show-native-alert", { message, type, title });
  },
});
