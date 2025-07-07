// electron/types/electron.d.ts

export interface IElectronAPI {
  showAlert: (
    message: string,
    type?: "none" | "info" | "error" | "question" | "warning", // type es opcional
    title?: string, // title es opcional
    buttons?: string[], // buttons es opcional
  ) => Promise<number>; // Devuelve una promesa que se resuelve con un número (índice del botón clickeado)
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    api: {
      getAppVersion: () => string;
      getEnviroment: () => string; // Corrige aquí el typo si es necesario
    };
  }
}
