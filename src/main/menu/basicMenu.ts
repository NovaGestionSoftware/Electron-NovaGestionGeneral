// src/main/menus/basicMenu.ts
import { Menu, shell } from "electron";

export const basicMenu = Menu.buildFromTemplate([
  {
    label: "Archivo",
    submenu: [
      { role: "about", label: "Acerca de" },
      { role: "toggleDevTools", label: "Herramientas de desarrollo" },
      { role: "quit", label: "Salir" },
    ],
  },
  {
    label: "Ayuda",
    submenu: [
      {
        label: "Ir a la documentación",
        click: async () => {
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
]);
