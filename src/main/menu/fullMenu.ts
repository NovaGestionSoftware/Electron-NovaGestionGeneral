// src/main/menus/fullMenu.ts
import { Menu, BrowserWindow } from "electron";
import { join } from "path";
import { basicMenu } from "./basicMenu.js";
import { is } from "@electron-toolkit/utils";

export function getFullMenu(mainWindow: BrowserWindow) {
  return Menu.buildFromTemplate([
    // Archivo
    {
      label: "Archivo",
      submenu: [
        {
          label: "Inicio",
          click: async () => {
            if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
              await mainWindow?.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/#/home`);
            } else {
              await mainWindow?.loadFile(join(__dirname, "../renderer/index.html"), {
                hash: "home",
              });
            }
          },
        },
        {
          label: "Acerca de",

          click: async () => {
            mainWindow?.webContents.send("show-acerca-de");
          },
        },
        {
          label: "Cerrar Sesión",
          click: async () => {
            console.log("logout");
            Menu.setApplicationMenu(basicMenu);
            mainWindow?.setMenu(basicMenu);

            if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
              await mainWindow?.loadURL(`${process.env["ELECTRON_RENDERER_URL"]}/#/`);
            } else {
              await mainWindow?.loadFile(join(__dirname, "../renderer/index.html"), {
                hash: "",
              });
            }
          },
        },
        { role: "quit", label: "Salir" },
      ],
    },
    // Ver
    {
      label: "Ver",
      submenu: [
        { role: "reload", label: "Recargar" },
        { role: "toggleDevTools", label: "Herramientas de desarrollo" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "togglefullscreen", label: "Pantalla completa" },
      ],
    },
    // Edicion
    {
      label: "Edición",
      submenu: [
        {
          label: "Edición",
          click: async () => {
            mainWindow?.webContents.send("show-configuracion");
          },
        },
      ],
    },
    // Ventana
    {
      label: "Ventana",
      submenu: [
        {
          label: "Configuración",
          click: async () => {
            mainWindow?.webContents.send("show-configuracion");
          },
        },
      ],
    },
    // Usuarios
    {
      label: "Usuarios",
      submenu: [
        {
          label: "Usuarios",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
        {
          label: "Categorías",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
        {
          label: "Passwords",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
      ],
    },
    // Atributos
    {
      label: "Atributos",
      submenu: [
        {
          label: "Usuarios",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
        {
          label: "Categorías",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
        {
          label: "Env. Suc.",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
      ],
    },
    // Empresas
    {
      label: "Empresas",
      submenu: [
        {
          label: "Empresas",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
        {
          label: "Nodos",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
      ],
    },
    // Mantenimiento
    {
      label: "Mantenimiento",
      submenu: [
        {
          label: "Respaldar",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
      ],
    },
    // Utilidades
    {
      label: "Utilidades",
      submenu: [
        {
          label: "Registrar",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
        {
          label: "Config. PC",
          click: async () => {
            mainWindow?.webContents.send("show-");
          },
        },
      ],
    },
  ]);
}
