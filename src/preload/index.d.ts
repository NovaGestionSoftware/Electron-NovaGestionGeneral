import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI & {
      ipcRenderer: {
        on: (ch: string, fn: (...a: any[]) => void) => void;
        removeListener: (ch: string, fn: (...a: any[]) => void) => void;
      };
    };
    api: unknown;
  }
}
