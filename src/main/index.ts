import { app, shell, BrowserWindow, ipcMain, dialog, Menu } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import Registry from "winreg";
import { getFullMenu } from "./menu/fullMenu.js";
import { spawn } from "child_process";
import path from "path";
import * as net from "net";

const Winreg = require("winreg");

function createWindow(): void {
  // 1. Ventana de splash

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1366,
    minHeight: 738,
    maxWidth: 1940,
    maxHeight: 1440,
    show: false, // se mostrará luego de maximizar
    icon: join(__dirname, "./../../resources/novaico.ico"),
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
    },
  });

  // Mostrar la ventana cuando esté lista
  // Cuando la ventana principal esté lista
  mainWindow.once("ready-to-show", () => {
    // Mostrar la ventana principal
    mainWindow?.maximize();
    mainWindow?.show();
    const fullMenu = getFullMenu(mainWindow);
    Menu.setApplicationMenu(fullMenu);
    mainWindow.setMenu(fullMenu);
  });

  mainWindow.webContents.once("did-finish-load", async () => {
    const empresaID = await readEmpresaID();

    // diálogos informativos
    if (!empresaID) {
      console.log("No se encontro empresa registrada");
      await dialog.showMessageBox(mainWindow, {
        type: "error",
        title: "Registro faltante",
        message: "No se encontró el valor HKLM\\SOFTWARE\\NovaGestion.",
        buttons: ["Cerrar"],
      });
    } else {
      console.log("Empresa: ", empresaID);
      // await dialog.showMessageBox(mainWindow, {
      //   type: "info",
      //   title: "Empresa registrada",
      //   message: `Empresa registrada: ${empresaID}`,
      //   buttons: ["OK"],
      // });
    }

    // ✔️  enviar al renderer cuando los listeners YA existen
    mainWindow.webContents.send(empresaID ? "show-login" : "show-registrar", empresaID ?? null);
  });

  // registrar empresa en editor de registro
  ipcMain.on("registrar-empresa", async (event, empresaID) => {
    const regKey = new Winreg({
      hive: Winreg.HKLM,
      key: "\\SOFTWARE\\NovaGestion",
    });

    regKey.create((createErr) => {
      if (createErr) {
        handleRegistryError(createErr, event);
        return;
      }

      regKey.set("EmpresaID", Winreg.REG_SZ, empresaID, (err) => {
        if (err) {
          handleRegistryError(err, event);
          return;
        }

        console.log("Empresa registrada:", empresaID);
        dialog.showMessageBox({
          type: "info",
          title: "Registro exitoso",
          message: `Empresa registrada exitosamente: ${empresaID}`,
        });
        event.sender.send("registro-completo", empresaID);
      });
    });
  });

  // Función auxiliar para mostrar un mensaje específico si no se tiene permisos
  function handleRegistryError(error: any, event: Electron.IpcMainEvent) {
    console.error("Error en registro:", error);

    const isPermissionError = error.code === "EACCES" || error.code === "EPERM";

    dialog.showMessageBox({
      type: "error",
      title: "Error",
      message: isPermissionError
        ? `Ocurrió un error al registrar la empresa: ${error.message}`
        : "No se pudo registrar la empresa porque la aplicación no tiene permisos de administrador. Por favor, ejecútela como administrador.",
    });

    event.sender.send("registro-error", {
      message: error.message,
      code: error.code,
    });
  }

  // obtener numero empresa
  ipcMain.handle("get-initial-mode", async () => {
    const empresaID = await readEmpresaID();
    return empresaID ? { mode: "login", empresaID } : { mode: "registrar", empresaID: null };
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  function readEmpresaID(): Promise<string | null> {
    const key = new Registry({
      hive: Registry.HKLM,
      key: "\\SOFTWARE\\NovaGestion",
      arch: "x64",
    });

    return new Promise((resolve) => {
      key.values((_, items) => {
        const first = items?.[0]; // array de todos los valores
        resolve(first ? first.value : null);
      });
    });
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // server tcp para recibir mensaje que la otra app esta lista.
  const server = net.createServer((socket) => {
    socket.on("data", (data) => {
      const message = data.toString().trim();
      console.log("Mensaje recibido:", message);

      if (message === "READY") {
        mainWindow?.webContents.send("sistema-ready");
      }
    });
  });
  server.listen(8124, () => {
    console.log("Servidor TCP escuchando en el puerto 8124");
  });
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ejecutar app de gestion
ipcMain.handle("launch-sistema-app", async (_event, dataLoginJson) => {
  const isDev = process.env.NODE_ENV === "development";

  const sistemaAppPath = isDev
    ? path.join(__dirname, "..", "..", "..", "NovaClientes-Electron")
    : path.join(path.dirname(process.execPath), "..", "NovaVentas", "NovaVentas.exe");

  console.log(sistemaAppPath);

  const command = isDev ? (process.platform === "win32" ? "npm.cmd" : "npm") : `"${sistemaAppPath}"`; // comillas por si hay espacios

  // const args = isDev ? ["run", "dev"] : [];

  const args = isDev ? ["run", "dev"] : ["/c", "start", '"NovaGestion"', "/B", `"${sistemaAppPath}"`];

  const env = { ...process.env, DATA_LOGIN: dataLoginJson };

  const child = spawn(command, args, {
    cwd: isDev ? sistemaAppPath : undefined,
    shell: true,
    detached: true,
    stdio: "ignore",
    windowsHide: false, // <--- esta línea oculta la consola en Windows
    env,
  });

  child.unref(); // para que el proceso siga corriendo incluso si se cierra Electron

  return "OK";
});

ipcMain.handle("show-native-alert", async (_event, options) => {
  const { type, title, message, buttons, defaultId, cancelId } = options;

  const result = await dialog.showMessageBox({
    type: type || "info",
    title: title || "Confirmación",
    message: message || "",
    buttons: buttons || ["Aceptar"],
    defaultId: defaultId ?? 0,
    cancelId: cancelId ?? 1,
    noLink: true, // Mejora visual en Windows
  });

  return result; // Contiene { response: indexDelBotonPresionado }
});

// Cierra completamente la aplicación
ipcMain.on("close-app", () => {
  app.quit();
});
