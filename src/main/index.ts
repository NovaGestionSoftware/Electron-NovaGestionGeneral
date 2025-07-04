import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import Registry from "winreg";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", async () => {
    mainWindow.show();
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
      await dialog.showMessageBox(mainWindow, {
        type: "info",
        title: "Empresa registrada",
        message: `Empresa registrada: ${empresaID}`,
        buttons: ["OK"],
      });
    }

    // ✔️  enviar al renderer cuando los listeners YA existen
    mainWindow.webContents.send(empresaID ? "show-login" : "show-registrar", empresaID ?? null);
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
