import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import version from "./package.json";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    build: {
      rollupOptions: {
        external: [
          "src/renderer/src/frontend-resources/components/Inputs/Checkbox.tsx",
          "src/renderer/src/frontend-resources/components/Inputs/RangeDatesInput.tsx",
          "src/renderer/src/frontend-resources/components/Modales/ModalBase.tsx",
          "src/renderer/src/frontend-resources/components/Modales/ModalFiltro.tsx",
          "src/renderer/src/frontend-resources/components/Tables/Busqueda/BusquedaInputs.tsx",
          "src/renderer/src/frontend-resources/components/Tables/TablaExpansible/TablaExpandible.tsx", //
          "src/renderer/src/frontend-resources/components/Charts/GraficoConZoom.tsx", 
          "src/renderer/src/frontend-resources/electron/components/Modales/modalesBusqueda/SearchClienteModal.tsx",
          "src/renderer/src/frontend-resources/electron/components/Modales/modalStep2/MedioPagoModal.tsx",
          "src/renderer/src/frontend-resources/electron/components/Modales/modalStep2/ParametrosFacturacionModal.tsx",
          "src/renderer/src/frontend-resources/electron/components/Search/SearchFormVendedorCliente.tsx"
        ],
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appVersion: version,
          },
        },
      }),
    ],
  },
});
